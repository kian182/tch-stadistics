import BrowserService from "@/services/browser.service"

export default {
  download(content, filename, contentType) {
    contentType = typeof contentType !== 'undefined' ? contentType : 'application/octet-stream';
    var blob = new Blob([content], {
      type: contentType
    });

    if (BrowserService.isIpadChrome() || BrowserService.isIphoneChrome()) {
      // Chrome in iOS iPad does not support uri starting with 'blob:'
      var reader = new FileReader();
      reader.onload = function () {
        var bdata = window.btoa(reader.result);
        var datauri = 'data:' + contentType + ';base64,' + bdata;
        window.open(datauri);
      };
      reader.readAsBinaryString(blob);
      return Promise.resolve();
    }

    if (BrowserService.isIE()) {
      window.navigator.msSaveBlob(blob, filename);

      return Promise.resolve();
    }

    // other browsers
    var a = window.document.createElement('a');
    a.id = '' + Math.random();
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.target = '_blank';
    if (typeof a.click === 'function') {
      if (BrowserService.isFireFox()) {
        // firefox does not support to a.click() programmatically
        var e = window.document.createEvent('MouseEvents');
        e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      } else {
        a.click();
      }
    } else {
      //  //TODO: Review PhantomJS crashed when sending 'click event', uncomment the following lines
      //  var e = document.createEvent('MouseEvents');
      //  e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      //  a.dispatchEvent(e);
    }
    return Promise.resolve();
  }
}
