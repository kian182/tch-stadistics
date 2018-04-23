import HistoryService from './history.service'

import _ from 'lodash'
import InfiniteLoading from 'vue-infinite-loading';

import {exportLicenses} from '@/services/exportLics.service'
import utils from '@/utils/sf-utils'
import BrowserService from "@/services/browser.service"

export default {
  name: 'History',
  data() {
    return {
      open: true,
      searchString:'',
      treeList: [],
      licensesSelected:[],
      page:2,
      removeModal:{
        show:false
      },
      isIpad: BrowserService.isIpad(),
      isMobileBrowser: BrowserService.isMobileBrowser()
    }
  },
  beforeCreate() {
    HistoryService.getLicensesTree('1','').then(response => {
      this.treeList = this.parserLicenseTree(response);
    })
  },
  watch:{
    searchString: function () {
      this.search()
    }
  },
  methods: {
    parserLicenseTree: function (licensesTree) {
      return _.forEach(licensesTree, function (licenseTo) {
        licenseTo['open'] = true;
        licenseTo['_id'] = utils.getUUID();
        licenseTo['checked'] = false
        _.forEach(licenseTo.endCustomers, function (endCustomer) {
          endCustomer['open'] = true;
          endCustomer['_id'] = utils.getUUID();
          endCustomer['checked'] = false
          _.forEach(endCustomer.sf_devices, function (sf_device) {
            sf_device['open'] = true;
            sf_device['_id'] = utils.getUUID();
            sf_device['checked'] = false
            _.forEach(sf_device.licenses, function (license) {
              license['checked'] = false
            })
          })
        })
      })
    },

    checkAllLicenseTo: function (licTo) {
      let vm = this.$data
      let checkIpad = vm.isMobileBrowser? licTo.checked : !licTo.checked;
      _.each(licTo.endCustomers, (endCustomer) => {
        if (endCustomer.checked !== checkIpad) {
          if (vm.isMobileBrowser) {
            endCustomer.checked = checkIpad
          }
          this.checkAllEndCustomers(endCustomer)
          endCustomer.checked = checkIpad
        }
      })
    },

    checkAllEndCustomers:function(endCustomer){
      let vm = this.$data
      let checkIpad = vm.isMobileBrowser? endCustomer.checked : !endCustomer.checked;
      _.each(endCustomer.sf_devices, (device) => {
        if (device.checked !== checkIpad) {
          if (vm.isMobileBrowser) {
            device.checked = checkIpad
          }
          this.checkAllMacAddress(device)
          device.checked = checkIpad
        }
      })
    },

    checkAllMacAddress: function (mac) {
      let vm = this.$data
      let checkIpad = vm.isMobileBrowser? mac.checked : !mac.checked
      _.each(mac.licenses, (lic) => {
        if (lic.checked !== checkIpad) {
          if (vm.isMobileBrowser) {
            lic.checked = checkIpad
          }
          this.addLicenseToSelected(lic)
          lic.checked = checkIpad
        }
      })
    },

    addLicenseToSelected: function(license) {
      let vm = this.$data;
      let checkIpad = vm.isMobileBrowser? license.checked : !license.checked
      if(checkIpad){
        vm.licensesSelected.push(license)
        return false;
      }
      _.remove(vm.licensesSelected, function(lic) {
        return lic._id === license._id
      });
    },

    removeLicensesSelected:function(){
      this.licensesSelected = []
    },

    download: function () {
      exportLicenses(this.licensesSelected);
    },

    toggle: (item) => {
      item.open = !item.open
    },

    infiniteHandler($state) {
      HistoryService.getLicensesTree(this.page++,this.searchString).then(response => {
        if(response.length === 0){
          $state.complete()
        }else{
          this.treeList = this.treeList.concat(this.parserLicenseTree(response));
          $state.loaded()
        }
      })
    },
    search: function () {
      HistoryService.getLicensesTree(1, this.searchString).then(response => {
        this.treeList = this.parserLicenseTree(response)
        this.removeLicensesSelected();
        this.page = 2
        if(this.$refs.infiniteLoading){
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        }

      })
    },
    removeLicenses: function () {
      HistoryService.removeLicenses(this.licensesSelected).then(response => {
        return HistoryService.getLicensesTree(1, this.searchString)
      }).then((response) => {
        this.treeList = this.parserLicenseTree(response)
        this.closeRemoveModal()
        this.removeLicensesSelected()
        this.page = 2
        if (this.$refs.infiniteLoading) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        }
      })
    },
    closeRemoveModal: function () {
      this.removeModal.show = false
    },
    openRemoveModal: function () {
      this.removeModal.show = true
    }
  },
  components:{
    InfiniteLoading
  }
}
