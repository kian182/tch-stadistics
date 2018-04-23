import _ from 'lodash'
import LicenseTypeService from './licenseType.service'

export default {
  data() {
    return {
      licenseTypeList: {},
      removeModal: {
        show: false,
        licTypeModel: {}
      },
      licenseTypeMng: {
        showModal: false,
        mode: 'create',
        model: {
          name: '',
          licenseTypeCode: '',
          description: ''
        }
      }
    }
  },
  beforeCreate() {
    LicenseTypeService.getLicensesType().then(response => {
      this.licenseTypeList = response.licenseTypes
    })
  },
  methods: {
    setLicenseTypeCode: function (licTypeName) {
      let licTypeCode = licTypeName.toLowerCase()
      licTypeCode = licTypeCode.replace(" ","_")
      return licTypeCode
    },
    saveLicenseType: function () {
      LicenseTypeService.getLicensesType().then(licenseTypeConf => {
        let newLicTypeCode = this.setLicenseTypeCode(this.licenseTypeMng.model.name);
        if (this.licenseTypeMng.mode === 'edit') {
          let index = _.findIndex(licenseTypeConf.licenseTypes, o => {
            return o.licenseTypeCode === this.licenseTypeMng.model.licenseTypeCode
          })
          this.licenseTypeMng.model.licenseTypeCode = newLicTypeCode
          licenseTypeConf.licenseTypes[index] = this.licenseTypeMng.model
        } else {
          this.licenseTypeMng.model.licenseTypeCode = newLicTypeCode
          licenseTypeConf.licenseTypes.push(this.licenseTypeMng.model)
        }
        LicenseTypeService.saveLicenseTypeList(licenseTypeConf)
      }).then(() => {
        return LicenseTypeService.getLicensesType()
      }).then(response => {
        this.licenseTypeList = response.licenseTypes
        this.closeLicTypeManager();
      })
    },
    openLicTypeManager: function (mode, model) {
      this.licenseTypeMng.mode = mode
      if (mode === 'edit') {
        this.licenseTypeMng.model.name = model.name
        this.licenseTypeMng.model.licenseTypeCode = model.licenseTypeCode
        this.licenseTypeMng.model.description = model.description
      }
      this.licenseTypeMng.showModal = true
    },
    closeLicTypeManager: function () {
      this.licenseTypeMng.showModal = false
      this.licenseTypeMng.mode = 'create'
      this.licenseTypeMng.model.name = ''
      this.licenseTypeMng.model.licenseTypeCode = ''
      this.licenseTypeMng.model.description = ''
    },
    deleteLicenseType: function () {
      LicenseTypeService.removeLicenseType(this.removeModal.licTypeModel.licenseTypeCode).then(() => {
        return LicenseTypeService.getLicensesType()
      }).then(response => {
        this.licenseTypeList = response.licenseTypes
        this.closeRemoveModal();
      })
    },
    openRemoveModal: function (licType) {
      this.removeModal.licTypeModel = licType
      this.removeModal.show = true
    },
    closeRemoveModal: function () {
      this.removeModal.show = false
      this.removeModal.licTypeModel = {}
    },
    showLicTypeDetails: function () {
      console.log('showLicTypeDetails')
    }
  }
}
