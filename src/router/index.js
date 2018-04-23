import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '../components/login/login.vue'
import DashView from '../components/dash/dash.vue'
import Generator from '../components/dash/generator/generator.vue'
import History from '../components/dash/history/history.vue'
import LicenseType from '../components/dash/licenseType/licenseType.vue'

/** Import Components **/
import aboutDropDown from "../components/dash/aboutDropDown/aboutDropDown.vue"
import treeView from "../components/dash/history/treeView.vue"
import detailsIcon from "../components/dash/history/detailsIcon.vue"
import aboutModal from "../components/dash/aboutModal/aboutModal.vue"
import optionModal from "../components/dash/generator/components/optionsLicenses/options.modal.vue"
import licenseTypeModal from "../components/dash/licenseType/components/licTypeManagerModal.vue"
import removeLicTypeModal from "../components/dash/licenseType/components/removeLicTypeModal.vue"
import licTypeDetailIcon from "../components/dash/licenseType/components/licTypeDetailsIcon.vue"
import removeLicensesModal from "../components/dash/history/components/removeLicenseModal.vue"
import duplicateWarningModal from "../components/dash/generator/components/duplicateWarning/duplicateWarningModal.vue"

/*** Add components in App***/
Vue.component('about-drop-down', aboutDropDown);
Vue.component('tree-view', treeView);
Vue.component('details-icon', detailsIcon);
Vue.component('about-modal', aboutModal);
Vue.component('option-modal', optionModal);
Vue.component('licType-mng-modal', licenseTypeModal);
Vue.component('licType-rm-modal', removeLicTypeModal);
Vue.component('lt-detail-icon', licTypeDetailIcon);
Vue.component('licenses-rm-modal', removeLicensesModal);
Vue.component('duplicate-warning-modal', duplicateWarningModal);

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: DashView,
    meta: {requiresAuth: true},
    children: [
      { path: '',
        beforeEnter: (to, from, next) => next('/generator')
      },
      {
        path: '/generator',
        name: 'Generator',
        component: Generator,
        meta: {requiresAuth: true}
      },
      {
        path: '/history',
        name: 'History',
        component: History,
        meta: {requiresAuth: true}
      },
      {
        path: '/licenseType',
        name: 'LicenseType',
        component: LicenseType,
        meta: {requiresAuth: true}
      }
    ]
  }
]

const router = new Router({routes})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.requiresAuth) && (!router.app.$store.state.token || router.app.$store.state.token === 'null')) {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.isLogged && !localStorage.getItem('token')) {
    window.console.log('Not authenticated')
    next({name: 'login'})
  } else {
    next()
  }
})

export default router


