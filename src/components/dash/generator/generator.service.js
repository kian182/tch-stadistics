import axios from 'axios'
import {API_ENDPOINT} from '@/http-common'
import {HTTP} from '@/http-common'

export default {
  getMacAddresses(params) {
    return HTTP.get(API_ENDPOINT + 'licenses/search/macAddress', params)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  },
  getLicensesType(params) {
    return HTTP.get(API_ENDPOINT + 'config/licenseType', params)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  },
  generateLicenses(params){
    return HTTP.post(API_ENDPOINT + 'licenses', params)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  },
  searchLicense(licenses){
    function searchLic(lic) {
      return HTTP.get(API_ENDPOINT + 'licenses?format=macAddress&searchString='+lic.macAddress)
        .then((response) => Promise.resolve(response.data[0]))
        .catch((error) => Promise.reject(error.response))
    }
    return Promise.all(licenses.map(searchLic))
  }
}
