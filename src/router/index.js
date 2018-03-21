import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const asyncRouterMap = [

]
import Layout from '@/views/layout/Layout'
export const constantRouterMap = [
  // 售货机
  {
    path: '/shj',
    name: 'shj',
    component: Layout,
    redirect: '/shj/wdshj',
    meta: { noCache: false, title: 'shj', icon: 'icon-shebeileifuwuqi' },
    children: [
      { path: 'wdshj', component: _import('shj/wdshj'), name: 'wdshj', meta: { noCache: false, title: 'wdshj', icon: 'example' } },
      { path: 'ztcx', component: _import('shj/ztcx'), name: 'ztcx', meta: { noCache: false, title: 'ztcx', icon: 'example' } },
      { path: 'jqbj', component: _import('shj/jqbj'), name: 'jqbj', meta: { noCache: false, title: 'jqbj', icon: 'example' } },
      { path: 'mbgl', component: _import('shj/mbgl/index'), name: 'mbgl', meta: { noCache: false, title: 'mbgl', icon: 'example' } },
      { path: 'bywx', component: _import('shj/bywx'), name: 'bywx', meta: { noCache: false, title: 'bywx', icon: 'example' } },
      { path: 'zdfx', component: _import('shj/zdfx/index'), name: 'zdfx', meta: { noCache: false, title: 'zdfx', icon: 'example' } },
      { path: 'dwgl', component: _import('shj/dwgl'), name: 'dwgl', meta: { noCache: false, title: 'dwgl', icon: 'example' } },
      { path: 'llk', component: _import('shj/llk'), name: 'llk', meta: { noCache: false, title: 'llk', icon: 'example' } }
    ]
  },
  //交易管理
  {
    path: '/jygl',
    name: 'jygl',
    component: Layout,
    redirect: '/jygl/sh',
    meta: { noCache: false, title: 'jygl', icon: 'icon-jiaoyi' },
    children: [
      { path: 'sh', name: 'sh', component: _import('jygl/sh'), meta: { noCache: false, title: 'sh', icon: 'example' } },
      { path: 'ddgl', name: 'ddgl', component: _import('jygl/ddgl'), meta: { noCache: false, title: 'ddgl', icon: 'example' } },
      { path: 'jqjytj', name: 'jqjytj', component: _import('jygl/jqjytj'), meta: { noCache: false, title: 'jqjytj', icon: 'example' } },
      { path: 'jqjymx', name: 'jqjymx', component: _import('jygl/jqjymx'), meta: { noCache: false, title: 'jqjymx', icon: 'example' } },
      { path: 'gk', name: 'gk', component: _import('jygl/gk'), meta: { noCache: false, title: 'gk', icon: 'example' } }
    ]
  },
  //营销策划
  {
    path: '/yxch',
    component: Layout,
    children: [{
      path: 'index',
      name: 'yxch',
      component: _import('yxch/index'),
      meta: { noCache: false, title: 'yxch', icon: 'icon-yingxiao' }
    }]
  },
  //进销存管理
  {
    path: '/jxcgl',
    name: 'jxcgl',
    component: Layout,
    redirect: '/jxcgl/wdgys',
    meta: { noCache: false, title: 'jxcgl', icon: 'icon-huowujilu' },
    children: [
      { path: 'wdgys', name: 'wdgys', component: _import('jxcgl/wdgys'), meta: { noCache: false, title: 'wdgys', icon: 'example' } },
      { path: 'gysspsz', name: 'gysspsz', component: _import('jxcgl/gysspsz'), meta: { noCache: false, title: 'gysspsz', icon: 'example' } },
      { path: 'spgl', name: 'spgl', component: _import('jxcgl/spgl'), meta: { noCache: false, title: 'spgl', icon: 'example' } },
      { path: 'ccgl', name: 'ccgl', component: _import('jxcgl/ccgl'), meta: { noCache: false, title: 'ccgl', icon: 'example' } },
      { path: 'cgjh', name: 'cgjh', component: _import('jxcgl/cgjh'), meta: { noCache: false, title: 'cgjh', icon: 'example' } },
      { path: 'cgd', name: 'cgd', component: _import('jxcgl/cgd'), meta: { noCache: false, title: 'cgd', icon: 'example' } },
      { path: 'rkdj', name: 'rkdj', component: _import('jxcgl/rkdj'), meta: { noCache: false, title: 'rkdj', icon: 'example' } },
      { path: 'sfk', name: 'sfk', component: _import('jxcgl/sfk'), meta: { noCache: false, title: 'sfk', icon: 'example' } },
      { path: 'chd', name: 'chd', component: _import('jxcgl/chd'), meta: { noCache: false, title: 'chd', icon: 'example' } },
      { path: 'bs', name: 'bs', component: _import('jxcgl/bs'), meta: { noCache: false, title: 'bs', icon: 'example' } },
      { path: 'bhd', name: 'bhd', component: _import('jxcgl/bhd'), meta: { noCache: false, title: 'bhd', icon: 'example' } },
    ]
  },
  //广告管理
  {
    path: '/gggl',
    component: Layout,
    children: [{ path: 'index', name: 'gggl', component: _import('gggl/index'), meta: { noCache: false, title: 'gggl', icon: 'icon-guanggaoguanli' } }]
  },
  //会员管理
  {
    path: '/hygl',
    component: Layout,
    children: [{ path: 'index', name: 'hygl', component: _import('hygl/index'), meta: { noCache: false, title: 'hygl', icon: 'icon-huiyuan1' } }]
  },
  //财务管理
  {
    path: '/cwgl',
    component: Layout,
    children: [{ path: 'index', name: 'cwgl', component: _import('cwgl/index'), meta: { noCache: false, title: 'cwgl', icon: 'icon-caiwuzhutifenxi' } }]
  },
  //商户管理
  {
    path: '/shgl',
    component: Layout,
    children: [{ path: 'index', name: 'shgl', component: _import('shgl/index'), meta: { noCache: false, title: 'shgl', icon: 'icon-yonghuguanli' } }]
  },
  //系统管理 
  {
    path: '/xtgl',
    component: Layout,
    children: [{
      path: 'index',
      name: 'xtgl',
      component: _import('xtgl/index'),
      meta: { noCache: false, title: 'xtgl', icon: 'icon-xitongguanli', noCache: false }
    }]
  },
  //登陆界面
  { path: '/login', component: _import('login/index'), hidden: true, },
  //主页
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'sy', icon: 'sy', icon: 'icon-danweiguanli', noCache: true }
    }]
  },
  //模板设置
  // {
  //   path: '/mbsz',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: _import('shj/mbgl/mbsz'),
  //     name: 'dashboard',
  //   }]
  // },
]
export default new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})