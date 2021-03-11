import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import router from './router.js';
import App from './App.vue'
import './styles/common.scss'
import { url } from '@/config'
// import '@/mock/'
//注册自定义组件
import './components/'
//导入主题文件
import '@/theme/index.js'
window.axios = axios;
Vue.config.productionTip = false
Vue.prototype.url = url;
Vue.use(window.AVUE, {
  size: 'mini'
});
const vm = Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
window.vm = vm;
//token失效处理
axios.interceptors.response.use(
  response => {
  const code = response.data.code;
  if(code===403 || code===500){
    const message = response.data.message;
    if(message){
      let confirMessage = '';
      if(message.includes('Token失效')
       || message.includes('Token失效，请重新登录')
       || message.includes('token不能为空')
       || message.includes('Token不能为空')
       || message.includes('token非法')
       || message.includes('Token非法无效')
       ){
           confirMessage = '很抱歉,登录已过期,请重新登录';
      }
      if(confirMessage){
          Vue.prototype.$alert(confirMessage, '登录已过期', {
             showClose:false,
             confirmButtonText: '确认',
             callback: () => {
                 window.opener=null;
                 window.open("","_self")
                 window.close()
                 return;
             }
           });
       }
    }
  }

   return response
  },
  error => {
   return Promise.reject(error)
  }
 )
