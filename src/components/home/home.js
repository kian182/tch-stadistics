import router from '@/router'
import store from '@/store'

// import LoginService from './login.service'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  beforeCreate() {
    if (store.state.isLogged) {
      router.push('/')
    }
  },
  methods: {
    goToDashboard(){
      router.push('/login')
    }
  }
}
