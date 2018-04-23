import store from '@/store'

import AboutDropDownService from './aboutDropDown.service'

export default {
  data() {
    return {
      msg:'test',
      showModal: false,
      username:localStorage.getItem('usr')
    }
  },
  methods: {
    logout() {
      AboutDropDownService.logout().then(() => {
        store.commit('LOGOUT_USER')
      })
    }
  }
}
