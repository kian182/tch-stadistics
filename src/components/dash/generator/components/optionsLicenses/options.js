import _ from "lodash"

export default {
  props : {
    options: {},
    macAddress : {},
    savemsg : {}
  },
  data() {
    return {
      status : null,
      global : {
        error : false
      },
      model : {
        generalCopy:{},
        customCopy: {}
      }
    }
  },
  mounted(){
    this.goToTab(this.options.status);
    this.saveModelCopies();
    this.validateGeneral(this.options);
  },
  methods: {
    saveModelCopies(){
      this.model.generalCopy = JSON.parse(JSON.stringify(this.options.general));
      this.model.customCopy = JSON.parse(JSON.stringify(this.options.custom));
    },
    save(){
      let vm = this;
      vm.options.status = vm.status ? vm.status:'general';
      switch (vm.options.status) {
        case 'general':
          this.validateGeneral(vm.options);
          if(!this.global.error){
            vm.setSavedMessage('General');
            vm.$emit('close')
          }
          break;
        case 'custom':
          vm.validateCustom(vm.options);
          _.each(vm.options.newItems,function(item,index){
            if(item.id!=='' && item.value!==''){
              vm.addNewCustomField(index);
            }
          });
          if(!this.global.error){
            vm.setSavedMessage('Custom');
            vm.$emit('close')
          }
          break;
      }
    },
    cancel(){
      this.options.general = JSON.parse(JSON.stringify(this.model.generalCopy));
      this.options.custom = JSON.parse(JSON.stringify(this.model.customCopy));
      this.$emit('close');
    },
    /* General Methods */
    validateGeneral(options){
      let vm  = this;
      vm.global.error = false;
      var optArray = JSON.parse(JSON.stringify(options.general));
      let obj = {};
      _.each(optArray,function (item,key) {
        options.general[key].error = false;
        options.general[key].empty = false;
        obj[item.id] = _.isUndefined(obj[item.id]) ? {} : obj[item.id];
        obj[item.id]['key'] = _.isUndefined(obj[item.id]['key']) ? [] : obj[item.id]['key'];
        obj[item.id]['key'].push(key);
        if(item.id!=='' && item.id.trim()!==''){
          obj[item.id]['counter'] = _.isUndefined(obj[item.id]['counter']) ? 1 : obj[item.id]['counter']+1;
          obj[item.id]['lastRepeated'] = obj[item.id]['key'].length > 1 ? key:null;
        }
        else{
          obj[item.id]['lastEmpty'] = obj[item.id]['key'].length > 0? key:null;
        }
      });
      _.each(obj,function (elem) {
        if(elem.lastRepeated){
          vm.global.error = true;
          options.general[elem.lastRepeated].error = true;
        }
        if(elem.lastEmpty){
          vm.global.error = true;
          options.general[elem.lastEmpty].empty = true;
        }
      })
    },
    checkGeneralValidations(){
      this.validateGeneral(this.options);
    },
    checkCustomValidations(){
      this.validateCustom(this.options);
    },
    addNewField(){
      if(!this.disableGeneralAddFieldOption()){
        this.options.general.push(this.options.newItem);
        this.options.newItem = { id: '', value: '', error: false, empty: false};
      }
    },
    deleteNewField(index){
      let vm  = this;
      vm.global.error = false;
      this.options.general.splice(index, 1);
    },
    disableGeneralAddFieldOption(){
      let length = this.options.general.length-1;
      return this.options.general.length > 1 && (this.options.general[length].id==='');
    },
    /* Custom Methods */
    validateCustom(options){
      let vm  = this;
      vm.global.error = false;
      var optArray = JSON.parse(JSON.stringify(options.custom));
      _.each(optArray,function (elem,index) {
          let obj = {};
          _.each(elem.description,function (item,key) {
            options.custom[index].error = false;
            options.custom[index].description[key].error = false;
            options.custom[index].description[key].empty = false;
            obj[item.id] = _.isUndefined(obj[item.id]) ? {} : obj[item.id];
            obj[item.id]['key'] = _.isUndefined(obj[item.id]['key']) ? [] : obj[item.id]['key'];
            obj[item.id]['key'].push(key);
            if(item.id!=='' && item.id.trim()!==''){
              obj[item.id]['counter'] = _.isUndefined(obj[item.id]['counter']) ? 1 : obj[item.id]['counter']+1;
              obj[item.id]['lastRepeated'] = obj[item.id]['key'].length > 1 ? key:null;
            }
            else{
              obj[item.id]['lastEmpty'] = obj[item.id]['key'].length > 0 ? key:null;
            }
          });
          _.each(obj,function (o) {
            if(o.lastRepeated){
              vm.global.error = true;
              options.custom[index].error = true;
              options.custom[index].description[o.lastRepeated].error = true;
            }
            if(o.lastEmpty){
              vm.global.error = true;
              options.custom[index].error = true;
              options.custom[index].description[o.lastEmpty].empty = true;
            }
          })
      });
    },
    addNewCustomField(index){
      if(!this.disableCustomAddFieldOption(index)) {
        this.options.custom[index].description.push(this.options.newItems[index]);
        this.options.newItems[index] = {id: '', value: '', error: false};
      }
    },
    deleteNewCustomField(index,i){
      let vm  = this;
      vm.global.error = false;
      this.options.custom[index].description.splice(i, 1);
    },
    disableCustomAddFieldOption(index){
      let length = this.options.custom[index].description.length-1;
      return this.options.custom[index].description.length > 1 && (this.options.custom[index].description[length].id==='');
    },
    goToTab(tab){
      if(!tab || tab==='general'){  this.$refs.gotoGeneral.click(); }
      else if(tab==='custom'){ this.$refs.gotoCustom.click(); }
    },
    switchTab(){
      this.global.error = false;
    },
    setSavedMessage(msg){
      let vm = this;
      vm.savemsg.optionsSaved = msg;
      setTimeout(function () {
        vm.savemsg.optionsSaved = '';
      },4000);
    }
  }
}
