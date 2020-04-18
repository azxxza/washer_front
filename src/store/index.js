import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)


export default new Vuex.Store({

  state: {
  },
  //更改state事件
  mutations: {

 
  },
    //更改state事件 可异步
  actions: {
    
  },
  //对state的过滤
  getter: {

  },
  //分割模块
  modules: {
    user,
    app
  },
  //杨李 https://vuex.vuejs.org/zh/guide/getters.html
})
