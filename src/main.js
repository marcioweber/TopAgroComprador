// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.css'
import VueFire from 'vuefire'
import VueMoment from 'vue-moment'
import VueTheMask from 'vue-the-mask'
import VueToastr from '@deveodk/vue-toastr'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// If you would like custom styling of the toastr the css file can be replaced
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

import App from './App'
import router from './router'
import store from './store/index'

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(VueFire)
Vue.use(VueMoment)
Vue.use(VueTheMask)
Vue.use(VueToastr)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch('init')
  }
})
