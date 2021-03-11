import Router from 'vue-router';
import Vue from 'vue';
import { IS_VERIFY_TOKEN } from "@/config.js";
Vue.use(Router)
const vueRouter = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: '列表页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/index')
  }, {
    path: '/build/:id',
    name: 'build',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build')
  }, {
    path: '/view/:id',
    name: 'view',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/view')
  },{
    name: '404',
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/page/404')
  },{
    path: '*',

    redirect: '/404'
  }
]
})
// 路由token校验
vueRouter.beforeEach((to, from, next) => {
  if(IS_VERIFY_TOKEN && to.path!='/404'){
    let token =   window.location.hash.replace("#/?token=","").replace('#/','');
    if(!token){
      token = window.localStorage.getItem('token')
    }
    if(token){
      next()
    }else{
      next({path:'/404',replace:true})
    }
  }else {
    next()
  }
})
export default vueRouter;
