import LoginService from './generator.service'

import Vue from 'vue'
import router from '@/router'

/** Import Generator Components **/
import inputSelect from "./components/inputSelect/input-select.component.vue"

/** Services **/
import GeneratorService from './generator.service'
import LogService from './log.service'
import {exportLicenses} from '@/services/exportLics.service'

/*** Add components in Generator Module ***/
Vue.component('input-select', inputSelect);

export default {
  name: 'Generator',
  data() {
    return {

    }
  },
  mounted(){

  },
  created(){

  },
  beforeCreate() {

  },
  methods:{
    goToHistory() {
      router.push('/history')
    },
  }
}
