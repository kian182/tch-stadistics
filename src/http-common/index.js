import axios from 'axios';
import store from '@/store'

let urlDev = 'http://10.100.154.253:8000/' //change this URL for development mode
let urlProd = 'http://38.107.160.186/'

export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? urlProd:urlDev
export const HTTP = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: 'SFT '
  }
})

// request interceptor
HTTP.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = config.headers.Authorization +localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
});

// response interceptor
HTTP.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  let status = error.response.status
  if(status===403 || status===401){
    store.commit('LOGOUT_USER')
  }
  return Promise.reject(error)
})
