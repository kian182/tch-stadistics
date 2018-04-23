import axios from 'axios'
import {API_ENDPOINT} from '@/http-common'

export default {
  login(params) {
    return axios.post(API_ENDPOINT + 'auth/login', params)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error.response))
  }
}
