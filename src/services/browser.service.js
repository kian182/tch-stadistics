export default {
  isIpadChrome() {
    return navigator.platform === 'iPad' && navigator.userAgent.match(/CriOS/i)
  },

  isIphoneChrome() {
    return navigator.platform === 'iPhone' && navigator.userAgent.match(/CriOS/i);
  },

  isIE() {
    return (false || !!window.document.documentMode);
  },

  isFireFox() {
    return typeof InstallTrigger !== 'undefined';
  },

  isIpad: function () {
    return navigator.userAgent.match(/iPad/i) != null;
  },

  isMobileBrowser: function () {
    var navigatorAgent = navigator.userAgent;
    if (navigatorAgent.match(/Android/i) ||
      navigatorAgent.match(/webOS/i) ||
      navigatorAgent.match(/iPhone/i) ||
      navigatorAgent.match(/iPad/i) ||
      navigatorAgent.match(/iPod/i) ||
      navigatorAgent.match(/BlackBerry/i) ||
      navigatorAgent.match(/Windows Phone/i) ||
      navigatorAgent.match(/Opera Mini/i) ||
      navigatorAgent.match(/IEMobile/i)
    ) {
      return true;
    }
    return false;
  }
}
