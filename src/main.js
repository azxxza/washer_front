// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import ViewUI from 'view-design';
import { Button,Radio,Tag,Input} from 'view-design' 
// import i18n from '@/locale'
import config from '@/config'
import {fetch, post, patch, put} from '@/libs/axios'
import importDirective from '@/directive'
import 'view-design/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
// import '@/mock'
// 实际打包时应该不引入mock
import env from '../config/env'
import axios from 'axios'
/* eslint-disable */
env === 'development' ? require('@/mock') : ''
Vue.component('Button',Button)
Vue.component('Radio',Radio)
Vue.component('Tag',Tag)
Vue.component('Input',Input)


// Vue.use(ViewUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
axios.defaults.withCredentials = true
Vue.prototype.$config = config
Vue.prototype.$http = axios
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  store,
  render: h => h(App)
})
