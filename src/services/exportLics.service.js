import _ from "lodash"
import JSZip from "jszip";
import moment from "moment"
import downloadFile from '@/utils/downloadFile'
import BrowserService from "@/services/browser.service"


export const exportLicenses = function (licList) {
  let licListGroup = _.groupBy(licList, 'licenseTo');
  let lizListGroupSize = _.size(licListGroup);
  if(BrowserService.isIpad()){
    return false
  }

  if (lizListGroupSize === 1 && licList.length === 1) {
    downloadFile.download(licList[0].content, licList[0].filename, 'text/lic');
    return false;
  }
  else if (lizListGroupSize === 1 && licList.length > 1) {
    let jsZip = new JSZip();
    _.forEach(licList, function (lic, index) {
      jsZip.file(lic.filename, lic.content);
    });
    jsZip.generateAsync({type: "blob"}).then(function (content) {
      let zipName = licList[0].licenseTo + '_licences_' + moment().format('YYYYMMDD') + '.zip';
      downloadFile.download(content, zipName);
    });
  }
  else if (lizListGroupSize > 1 && licList.length > 1) {
    let jsZip = new JSZip();
    _.forEach(licListGroup, function (lic, key) {
      let folder = jsZip.folder(key)
      _.forEach(lic, function (files, key) {
        folder.file(files.filename, files.content)
      })
    });
    jsZip.generateAsync({type: "blob"}).then(function (content) {
      let zipName = 'history_licences_' + moment().format('YYYYMMDD') + '.zip';
      downloadFile.download(content, zipName);
    });
  }
}
