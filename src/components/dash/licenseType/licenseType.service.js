import {HTTP} from '@/http-common'
import _ from 'lodash'

export default {
  getLicensesType() {
    return HTTP.get('/config/licenseType')
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  },
  saveLicenseTypeList(licenseTypeList) {
    return HTTP.put('/config/licenseType', licenseTypeList)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  },
  removeLicenseType(licenseTypeCode) {
    return this.getLicensesType().then(licTypeList => {
      // delete licTypeList.licenseTypes[licenseTypeCode]
      _.remove(licTypeList.licenseTypes, function (o) {
        return o.licenseTypeCode === licenseTypeCode
      });
      return HTTP.put('/config/licenseType', licTypeList)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error.response))
    })
  }
}
