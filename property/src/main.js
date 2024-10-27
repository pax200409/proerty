import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI, { Message } from 'element-ui'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 粒子特效
import VueParticles from 'vue-particles'

Vue.use(VueParticles)

// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// 富文本插件
import VueUeditorWrap from 'vue-ueditor-wrap'; // 引入 vue-ueditor-wrap 插件
Vue.config.productionTip = false;
Vue.component('vue-ueditor-wrap', VueUeditorWrap); // 全局注册

Vue.use(VueUeditorWrap);
Vue.prototype.UEDITOR_HOME_URL = '/static/ueditor/';

Vue.config.productionTip = false



/**
 * 封装axios方法，为不需要登录操作时使用
 * @param options配置
 */

let Axios = (options) => {
  axios({
    url: options.url,
    method: options.method || 'POST',
    data: options.data,
    params: options.data
  }).then(result => {
    if (options.success) options.success(result.data)
  }).catch(err => {
    let msg = err.response ? err.response.data : '请求异常'
    if (options.error) {
      options.error(msg)
      Message.error(({ message: msg, offset: 150 }))
    } else {
      Message.error(({ message: msg, offset: 150 }))
    }
  })
};
Vue.prototype.$Axios = Axios;
/**
 * 携带token的axios
 * @param options
 */
let axiosToken = (options) => {
  options.data.token = sessionStorage.token
  axios({
    url: options.url,
    method: options.method || 'POST',
    data: options.data,
    params: options.data
  }).then(result => {
    if (options.success) options.success(result.data)
  }).catch(err => {
    let msg = err.response ? err.response.data : '请求异常'
    if (options.error) {
      options.error(msg)
      Message.error(({ message: msg, offset: 150 }))
    } else {
      Message.error(({ message: msg, offset: 150 }))
    }
  })
};
Vue.prototype.$axiosToken = axiosToken;

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
