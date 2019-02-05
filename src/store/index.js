import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import common from '@/store/common'
import client from '@/store/client'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    common: common,
    client: client
  },

  state: {
    world: 'world'
  },

  actions: {},

  mutations: {},

  getters: {}
})
