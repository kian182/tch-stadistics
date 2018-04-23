import {HTTP} from '@/http-common'

export default {
  logout() {
    return HTTP.delete('auth/logout')
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  }
}
