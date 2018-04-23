import _ from "lodash"
import moment from "moment"

export default {
    logs:[],

    addMessage : function (msg,loadingFlag) {
      var log = new this.Log();
      log.type = 'message';
      log.text = msg;
      if(loadingFlag){
        log.loading = loadingFlag;
      }
      this.clearLoading();
      this.add(log);
    },
    addWarning (msg) {
      var log = new this.Log();
      log.type = 'warning';
      log.text = msg;
      this.clearLoading();
      this.add(log);
    },
    addError (msg) {
      var log = new this.Log();
      log.type = 'error';
      log.text = msg;
      this.clearLoading();
      this.add(log);
    },
    addSuccess (msg) {
      var log = new this.Log();
      log.type = 'success';
      log.text = msg;
      this.clearLoading();
      this.add(log);
    },

    add (object) {
      this.logs.push(object);
    },
    edit (object, id) {
      this.logs[id] = object;
    },
    removeLoadingAtPreviousMsg (id){
      this.logs[id-1].loading = false;
    },
    clear () {
      this.logs = [];
    },
    clearLoading (){
      _.each(this.logs, function(value) {
        if(value.loading){
          value.loading = false;
        }
      });
    },
    Log() {
      var time = moment().valueOf();
      var date = moment(time).format('DD MMM YYYY, h:mm:ss a');
      this.option = '';
      this.type = '';
      this.text = '';
      this.loading = false;
      this.timestamp = moment().unix();
      this.time = date;
    },
    delay(fn,time){
      return new Promise(function(fn) {
        setTimeout(fn, time);
      });
    }

}
