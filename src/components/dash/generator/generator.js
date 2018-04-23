import LoginService from './generator.service'

import Vue from 'vue'
/** Import Generator Components **/
import inputSelect from "./components/inputSelect/input-select.component.vue"

/** Services **/
import GeneratorService from './generator.service'
import LogService from './log.service'
import {exportLicenses} from '@/services/exportLics.service'

/*** Add components in Generator Module ***/
Vue.component('input-select', inputSelect);

export default {
  name: 'Generator',
  data() {
    return {
      msg:'Generator',
      baseMacAddressStr : '001F48',
      macAddress : { value: '' , list : {} },
      licenseTo : { value: '' , list : {} },
      endCustomer : { value: '' , list : {} },
      licenses : [],
      licensesType : {},
      licensesTypeObj : {},
      showOptionModal:false,
      optionIndex : null,
      selectAll:false,
      options : {
        status: null,
        general: [],
        custom: [],
        macAddressSelected : null
      },
      errors:{
        watchErrors : false,
        global: false,
        macAddress: {
          hexValue : false,
          length : false,
          format: false,
          isEmpty : false
        },
        licenseTo: {
          isEmpty : false,
          hasSpecialChars : false
        }
      },
      flags: {
        noneSelected : true,
        optionsSaved: '',
        disabledBtnGenerate: false
      },
      logs: [],
      existDuplicated: false,
      duplicateWarningModal: {
        show: false
      }
    }
  },
  mounted(){
    function loadTable() {
      var classTablebody      = document.getElementsByClassName("table-body")[0];
      var classTablebodyTable = document.getElementById("bodytable");
      var classTableheader    = document.getElementsByClassName("table-header")[0];
      var classTableLeftSide  = document.getElementsByClassName("table-leftSide")[0];
      classTableheader.style.right = '18px';
      classTablebody.onscroll = function(){
        classTableheader.style.left = -1 * classTablebody.scrollLeft + 'px' ;
        classTableLeftSide.style.top = -1 * classTablebody.scrollTop + 'px' ;
      };
    }
    loadTable();
  },
  created(){
    LogService.logs.length = 0;
    this.logs = LogService.logs;
    this.getLicenseValues();
  },
  beforeCreate() {
    function setTableBody() {
      var classTablebody   = document.getElementsByClassName("table-body")[0];
      var classTableheader = document.getElementsByClassName("table-header")[0];
      var classInnerContainer  = document.getElementsByClassName("inner-container")[0];
      var classTableLeftSide  = document.getElementsByClassName("table-leftSide")[0];
    }
  },
  methods:{
    getLicenseValues() {
      return GeneratorService.getMacAddresses().then((response) => {
        Vue.set(this.macAddress, 'list' , response);
        return GeneratorService.getLicensesType()
      }).then((licType) => {
        this.licensesType = licType.licenseTypes;
        this.licensesTypeObj = this.setLicenseModel(this.licensesType);
      }).catch(() => {
        //error
      })
    },
    updateMacAddresses(macAddress){
      let vm = this;
      this.licenses = this.filterOnlyMacAddresses(macAddress,this.licensesTypeObj);
      this.validateLicensesFields();
      this.searchDuplicatedLicenses(this.licenses).then(function (response) {
        vm.parseSearchValues(response);
        vm.validateCheckboxes();
      })
    },
    /* License List */
    filterOnlyMacAddresses(macAddresses,checkboxObj){
      let vm = this;
      if(!macAddresses){ return []; }
      let reg = /001F48([0-9]|[A-F]|[a-f]){6}a{0,12}/g;
      let splitted = macAddresses ? macAddresses.match(reg):'';
      if(!splitted){ return []; }
      splitted = _.uniq(splitted)
      _.each(splitted,function (mac,key) {
        splitted[key] = { macAddress : mac.replace(/[^\w\s]/gi, '') };
        splitted[key] = Object.assign(splitted[key], checkboxObj);
        splitted[key]['options'] = vm.setOptionsModel();
        splitted[key]['duplicated'] = {};
      });
      return splitted;
    },
    setLicenseModel(licenses){
      let obj = {};
      _.each(licenses,function (lic,key) {
        obj[key] = false;
      });
      return obj;
    },
    deleteLicense(index){
      this.$data.licenses.splice(index, 1);
      let str = JSON.parse(JSON.stringify(this.macAddress.value));
      let edit = str.split(/[_ ,-]+/);
      edit.splice(index, 1);
      this.$data.macAddress.value = edit.toString();
    },
    selectAllLicenses(){
      let vue = this;
      _.each(vue.licenses,function(lic){
        _.each(vue.licensesType,function (type,key) {
          lic[key] = vue.selectAll;
        })
      });
      vue.validateCheckboxes();
    },
    /* Search */
    searchDuplicatedLicenses(licenses){
      let vm = this;
      let array = [];
      _.each(licenses,function (item) {
        let obj = {};
        obj['macAddress'] = item.macAddress;
        array.push(obj);
      });
      return GeneratorService.searchLicense(array);
    },
    parseSearchValues(searchResponse){
      let vm = this;
      var licTypeMap = {};
      var falseFlags = {};
      vm.existDuplicated = false;
      _.each (this.licensesType,function (type,index) {
        licTypeMap[type[Object.keys(type)[1]]] = index;
        falseFlags [index] = false;
      });
      var obj = {};
      _.each(searchResponse, function (item) {
        if(item){
          obj[item._id]={};
          obj[item._id]['duplicated']=JSON.parse(JSON.stringify(falseFlags));
          _.each(item.totalLicenses,function (lic) {

            let elem = licTypeMap[lic];
            if(elem !== undefined || elem !== null){
              obj[item._id]['duplicated'][elem] = true;
              vm.existDuplicated = true;
            }
          })
        }
      });
      _.each(this.licenses,function (license,key) {
        let dup = obj[license.macAddress];
        if(dup){
          vm.licenses[key] = Object.assign(vm.licenses[key], dup);
        }
      })
    },
    /* Generate */
    generate() {
      // LogService.logs.length = 0;
      let vm = this
      vm.flags.disabledBtnGenerate = true;
      this.errors.watchErrors = true;
      this.validateLicensesFields();
      if(this.errors.global){
        return;
      }
      this.errors.watchErrors = false;
      var model = this.setModel();
      LogService.addWarning('Starting Licences Generation Process.');
      LogService.delay(LogService.addMessage('Generating Licences...'),1000).then((response) => {
        return GeneratorService.generateLicenses(model)
      })
        .then((response) => {
          _.each(response,function (lic) {
            if(lic.status==='ok'){
              LogService.addSuccess('The generation of licence "'+lic.filename+'" was successful.');
            }
            else if(lic.status==='failed'){
              LogService.addError('The generation of licence "'+lic.filename+'" has failed.');
            }
          })

          vm.searchDuplicatedLicenses(vm.licenses).then(function (lics) {
            vm.parseSearchValues(lics);
            exportLicenses(response);
            vm.flags.disabledBtnGenerate = false;
          })
        }).catch(() => {
        LogService.addError('Licence Generator request has failed.');
        vm.flags.disabledBtnGenerate = false;
      })
    },
    /* Validations */
    checkIfAllAreSelected(){
      var vm = this;
      let allSelected = true;
      _.each(vm.licenses,function (lic) {
        for(var i=0;i<vm.licensesType.length;i++){
          if(!lic[i]){
            allSelected = false;
            return false;
          }
        }
      });
      return allSelected;
    },
    validateCheckboxes(){
      let vm = this;
      setTimeout(function () {
        vm.flags.noneSelected = true;
        _.each(vm.licenses,function (lic) {
          if(vm.flags.noneSelected){
            _.each(vm.licensesType,function (item,index) {
              if(lic[index]){
                vm.flags.noneSelected = false;
                return false;
              }
            })
          }
        });
        vm.selectAll = vm.licenses.length === 0 ? false : vm.checkIfAllAreSelected(vm.licenses)
      },0)
    },
    validateLicensesFields(){
      if(this.errors.watchErrors){
        this.validateMacAddress();
      }
    },
    validateMacAddress(){
      let re1 = new RegExp( /^[0-9A-Fa-f]+$/ );
      let vue = this;
      vue.errors.global = false;
      vue.errors.macAddress.hexValue = false;
      vue.errors.macAddress.length = false;
      vue.errors.macAddress.format = false;
      vue.errors.macAddress.isEmpty = false;
      _.each(vue.licenses,function (lic) {
        if(!lic.macAddress.startsWith(vue.baseMacAddressStr)){
          vue.errors.macAddress.format = true;
          vue.errors.global = true;
          return false;
        }
        if(!re1.test(lic.macAddress)){
          vue.errors.macAddress.hexValue = true;
          vue.errors.global = true;
          return false;
        }
        if(lic.macAddress.length!==12){
          vue.errors.macAddress.length = true;
          vue.errors.global = true;
          return false;
        }
        if(_.isEmpty(lic.macAddress)){
          vue.errors.macAddress.isEmpty = true;
          vue.errors.global = true;
          return false;
        }
      });
      /*licenseTo*/
      vue.errors.licenseTo.isEmpty = false;
      vue.errors.licenseTo.hasSpecialChars = false;
      if(_.isEmpty(this.licenseTo.value.trim())){
        vue.errors.licenseTo.isEmpty = true;
        vue.errors.global = true;
        return false;
      }
      if(this.hasSpecialCharacters(this.licenseTo.value.trim())){
        vue.errors.licenseTo.hasSpecialChars = true;
        vue.errors.global = true;
        return false;
      }
    },
    /* Model */
    setModel(){
      let vm = this;
      let licenses = this.licenses;
      let type = this.licensesTypeObj;
      let licenseTo = this.licenseTo.value.trim();
      let endCustomer = this.endCustomer.value;
      var model = [];
      _.each(licenses,function (lic) {
        _.each(type,function (t,key) {
          if(lic[key]){
            let obj = {};
            obj.macAddress = lic.macAddress;
            obj.licenseTypeCode = vm.licensesType[key].licenseTypeCode ;
            obj.licenseTo = licenseTo;
            if(endCustomer) { obj.endCustomer = endCustomer; }
            obj.options = vm.parseOptions(lic.options,obj.licenseTypeCode);
            model.push(obj);
          }
        })
      });
      return model;
    },
    /* Option */
    removeLeftRightSpaces(str){
      return str.trimLeft().trimRight();
    },
    parseOptions(model,licenseTypeCode){
      let opt = this;
      switch(true){
        case model.status === null || model.status==='general':
          let gArray = [];
          _.each(model.general,function (item) {
            let obj = {};
            item.id = opt.removeLeftRightSpaces(item.id);
            item.value = opt.removeLeftRightSpaces(item.value);
            obj[item.id] = item.value;
            if(item.id!=='description' || (item.id==='description' && item.value!=='') ){
              gArray.push(obj);
            }
          });
          return gArray;
          break;
        case model.status === 'custom':
          let array = [];
          let elem = _.find(model.custom,function(item){
            return item.licenseTypeCode === licenseTypeCode;
          });
          _.each(elem.description,function (desc) {
            let obj = {};
            desc.id = opt.removeLeftRightSpaces(desc.id);
            desc.value = opt.removeLeftRightSpaces(desc.value);
            obj[desc.id] = desc.value;
            if(desc.id!=='description' || (desc.id==='description' && desc.value!=='') ){
              array.push(obj);
            }
          });
          return array;
          break;
      }
    },
    setOptionsModel(){
      var option =  { status: null, general: [], custom: [] , newItem : { id: '', value: '', error: false } , newItems: []};
      option.general.push({ id: 'description', value:'', error: false });
      option.custom = JSON.parse(JSON.stringify(this.licensesType));
      _.each(option.custom,function(item,key){
        item.description = [];
        item.description.push({ id: 'description', value:'', error: false });
        option.newItems.push({ id: '', value: '', error: false});
      });
      return option;
    },
    p(text){
      console.log(JSON.stringify(text,null,4));
    },
    hasSpecialCharacters(text) {
      let reg = /^[a-zA-Z\d\ \s]+$/;
      return !reg.test(text)
    },

    verifyLicenseDuplicateIschecked() {
      let vm = this
      let bool = false
      _.forEach(vm.licenses, function (lic) {
        _.forEach(lic, function (item, key) {
          var k = parseInt(key)
          if (typeof k === 'number' && lic.duplicated[key] && lic[key]) {
            return bool = true
          }
        })
      })
      return bool;
    },

    beforeGenerate() {
      if (this.existDuplicated && this.verifyLicenseDuplicateIschecked()) {
        this.openDuplicateWarningModal()
        return false
      }
      this.generate()
    },
    closeDuplicateWarningModal() {
      this.duplicateWarningModal.show = false
    },
    openDuplicateWarningModal() {
      this.duplicateWarningModal.show = true
    }
  }
}
