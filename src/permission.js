import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getSession, removeSession } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => { //全局前置守卫
  if (getSession()) { //验证登陆权限通过，进入主界面
    if (to.path === '/login') {
      removeSession();
      next({ path: '/' });
    } else {
      next();
      // if (store.getters.roles.length === 0) {
      // store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
      // next()
      // }).catch(() => {
      // next()
      // store.dispatch('FedLogOut').then(() => {
      // Message.error('验证失败,请重新登录')
      // next({ path: '/login' })
      // })
      // })
      // } else {
      // }
    }
  } else { //验证不通过
    if (whiteList.indexOf(to.path) !== -1) { //如果是登陆界面不重定向
      next();
    } else {
      next('/login');
    }
  }
});
