import {HTTP} from '@/http-common'

export default {
  getLicensesTree(page,searchString) {
    let limit = 4
    return HTTP.get('/licenses?format=tree'+'&page='+page+'&limit='+limit+'&searchString='+searchString)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  },

  removeLicenses(licIdsForRemove) {
    function removeLic(lic) {
      return HTTP.delete('/licenses/' + lic._id)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error.response))
    }
    return Promise.all(licIdsForRemove.map(removeLic))
  }
}
