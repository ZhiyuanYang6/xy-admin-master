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
      { path: 'shjMbadd', component: _import('shj/mbgl/components/shjMbsz'), name: 'shjMbadd', meta: { noCache: false, title: 'shjMbadd', icon: 'example' } },
      { path: 'shjMbset', component: _import('shj/mbgl/components/shjMbsz'), name: 'shjMbset', meta: { noCache: false, title: 'shjMbset', icon: 'example' } },
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
    meta: { noCache: false, title: 'yxch', icon: 'icon-huowujilu' },
    children: [
      { path: 'cyxch', name: 'cyxch', component: _import('yxch/index'), meta: { noCache: false, title: 'yxch', icon: 'icon-yingxiao' } }
    ]
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
    children: [{ path: 'cgggl', name: 'cgggl', component: _import('gggl/index'), meta: { noCache: false, title: 'gggl', icon: 'icon-guanggaoguanli' } }]
  },
  //会员管理
  {
    path: '/hygl',
    component: Layout,
    children: [{ path: 'chygl', name: 'chygl', component: _import('hygl/index'), meta: { noCache: false, title: 'hygl', icon: 'icon-huiyuan1' } }]
  },
  //财务管理
  {
    path: '/cwgl',
    component: Layout,
    name: "cwgl",
    redirect: '/cwgl/cwjsgl',
    meta: { noCache: false, title: 'cwgl', icon: 'icon-caiwuzhutifenxi' },
    children: [
      { path: 'cwjsgl', name: 'cwjsgl', component: _import('cwgl/index'), meta: { noCache: false, title: 'cwgl', icon: 'icon-caiwuzhutifenxi' } },
      { path: 'jyjscx', name: 'jyjscx', component: _import('cwgl/jyjscx'), meta: { noCache: false, title: 'jyjscx', icon: 'icon-caiwuzhutifenxi' } }
    ]
  },
  //商户管理
  {
    path: '/shgl',
    component: Layout,
    name: "shgl",
    redirect: '/shgl/cwjsgl',
    meta: { noCache: false, title: 'shgl', icon: 'icon-yonghuguanli' },
    children: [
      { path: 'cwjsgl', name: 'cwjsgl', component: _import('shgl/cwjsgl'), meta: { noCache: false, title: 'cwjsgl', icon: 'icon-yonghuguanli' } },
      { path: 'shdagl', name: 'shdagl', component: _import('shgl/shdagl'), meta: { noCache: false, title: 'shdagl', icon: 'icon-yonghuguanli' } },
      { path: 'shjqgl', name: 'shjqgl', component: _import('shgl/shjqgl'), meta: { noCache: false, title: 'shjqgl', icon: 'icon-yonghuguanli' } },
      { path: 'shspgl', name: 'shspgl', component: _import('shgl/shspgl'), meta: { noCache: false, title: 'shspgl', icon: 'icon-yonghuguanli' } },
      { path: 'jqsq', name: 'jqsq', component: _import('shgl/jqsq'), meta: { noCache: false, title: 'jqsq', icon: 'icon-yonghuguanli' } },
    ]
  },
  //权限管理 
  {
    path: 'qxgl',
    component: Layout,
    redirect: '/qxgl/dagl/yhgl',
    name: 'qxgl',
    meta: { title: 'qxgl', icon: 'example' },
    children: [{
        path: '/qxgl/dagl',
        component: _import('qxgl/index'),
        redirect: '/qxgl/dagl/yhgl',
        name: 'dagl',
        meta: { title: 'dagl', icon: 'example' },
        children: [
          { path: 'yhgl', component: _import('qxgl/dagl/yhgl'), name: 'yhgl', meta: { noCache: false, title: 'yhgl', icon: 'example' } },
          { path: 'zzgl', component: _import('qxgl/dagl/zzgl'), name: 'zzgl', meta: { noCache: false, title: 'zzgl', icon: 'example' } },
          { path: 'bjyh', component: _import('qxgl/dagl/component/edit'), name: 'bjyh', meta: { title: 'bjyh', isEdit: true, noCache: false, } },
          { path: 'xzyh', component: _import('qxgl/dagl/component/edit'), name: 'xzyh', meta: { title: 'xzyh', isEdit: false, noCache: false, } },
          { path: 'management', component: _import('qxgl/dagl/component/management'), name: 'management', meta: { noCache: false, title: 'gljs' } },
        ]
      },
      {
        path: '/qxgl/zygl',
        component: _import('qxgl/index'),
        redirect: '/qxgl/zygl/ptzygl',
        name: 'zygl',
        meta: { title: 'zygl', icon: 'example' },
        children: [
          { path: 'gngl', component: _import('qxgl/zygl/ptzygl'), name: 'ptzygl', meta: { noCache: false, title: 'ptzygl', icon: 'example' } },
          { path: 'cdgl', component: _import('qxgl/zygl/sxzygl'), name: 'sxzygl', meta: { noCache: false, title: 'sxzygl', icon: 'example' } },
          { path: 'xzptzy', component: _import('qxgl/zygl/component/edit'), name: 'xzptzy', meta: { noCache: false, isEdit: false, title: 'xzptzy', icon: 'example' } },
          { path: 'bjptzy', component: _import('qxgl/zygl/component/edit'), name: 'bjptzy', meta: { noCache: false, isEdit: true, title: 'bjptzy', icon: 'example' } },
        ]
      },
      {
        path: '/qxgl/cqxgl',
        component: _import('qxgl/index'),
        redirect: '/qxgl/cqxgl/cqxgl/jsgl',
        name: 'cqxgl',
        meta: { title: 'qxgl', icon: 'example' },
        children: [
          { path: 'jsgl', component: _import('qxgl/cqxgl/jsgl'), name: 'jsgl', meta: { noCache: false, title: 'jsgl', icon: 'example' } },
          { path: 'xzjs', component: _import('qxgl/cqxgl/component/edit'), name: 'xzjs', meta: { noCache: false, isEdit: false, title: 'xzjs', icon: 'example' } },
          { path: 'bjjs', component: _import('qxgl/cqxgl/component/edit'), name: 'bjjs', meta: { noCache: false, isEdit: true, title: 'bjjs', icon: 'example' } },
          { path: 'jszyqx', component: _import('qxgl/cqxgl/component/resource'), name: 'jszyqx', meta: { noCache: false, isEdit: false, title: 'jszyqx', icon: 'example' } },
        ]
      },
    ]
  },
  //系统管理 
  {
    path: '/xtgl',
    component: Layout,
    redirect: '/xtgl/zfsz/zffwgl',
    name: 'xtgl',
    meta: { title: 'xtgl', icon: 'example' },
    children: [{
        path: '/xtgl/zfsz',
        component: _import('xtgl/zfsz/index'),
        redirect: '/xtgl/zfsz/zffwgl',
        name: 'zfsz',
        meta: { title: 'zfsz', icon: 'example' },
        children: [
          { path: 'zffwgl', component: _import('xtgl/zfsz/zffwgl'), name: 'zffwgl', meta: { noCache: false, title: 'zffwgl', icon: 'example' } },
          { path: 'fwscssz', component: _import('xtgl/zfsz/shzffwcssz'), name: 'shzffwcssz', meta: { noCache: false, title: 'shzffwcssz', icon: 'example' } },
          { path: 'shzhsz', component: _import('xtgl/zfsz/zshcssz'), name: 'zshcssz', meta: { noCache: false, title: 'zshcssz', icon: 'example' } },
        ]
      },
      { path: '/xtgl/index', icon: 'example', component: _import('xtgl/index'), name: 'tab', meta: { title: 'xtgl' } }
    ]
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
