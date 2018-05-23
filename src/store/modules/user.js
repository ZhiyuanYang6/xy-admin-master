import { GetUserInfo, login, logout } from '@/api/login'
import { getSession, setSession, removeSession } from '@/utils/auth'
// console.log(JSON.parse(window.sessionStorage.getItem('routers'))[0].children);
const user = {
  state: {
    Authorization: getSession(),
    token: getSession(),
    urlImg: 'http://192.168.1.123:8088',
    systemid: 'sram', //资源类型
    resourcetype: 2, //系统名称
    userInfo: {},
    name: 'sram',
    avatar: 2,
    spurlImg: 'http://www.xynetweb.com:8086/spImg/',
    roles: [],
    // routers: sessionStorage.getItem('routers'),
    routers: window.sessionStorage.getItem('routers')?JSON.parse(window.sessionStorage.getItem('routers'))[0].children:[],
    // routers: [
    //   { path: '/', children: [{ path: "dashboard", meta: { title: '首页', icon: 'icon-danweiguanli' } }] },
    //   {
    //     path: '/shj',
    //     meta: { title: '售货机', icon: 'icon-zhnshhj' },
    //     children: [
    //       { path: '/wdshj', meta: { title: '我的售货机', icon: 'icon-zidongshouhuoji' } },
    //       { path: '/ztcx', meta: { title: '状态查询', icon: 'icon-sea-ztcx' } },
    //       { path: '/jqbj', meta: { title: '机器报警', icon: 'icon-baojing' } },
    //       { path: '/mbgl', meta: { title: '模板管理', icon: 'icon-mobanguanli' } },
    //       { path: '/bywx', meta: { title: '保养维修', icon: 'icon-weihubaoyang' } },
    //       { path: '/zdfx', meta: { title: '诊断分析', icon: 'icon-zhenduanfenxi' } },
    //       { path: '/dwgl', meta: { title: '点位管理', icon: 'icon-dianwei' } },
    //       { path: '/llk', meta: { title: '流量卡', icon: 'icon-liuliangqia' } }
    //     ]
    //   },
    //   {
    //     path: '/jygl',
    //     meta: { title: '交易管理', icon: 'icon-caiwuguanli2' },
    //     children: [
    //       { path: '/sh', meta: { title: '售后', icon: 'icon-shouhou' } },
    //       { path: '/ddgl', meta: { title: '订单管理', icon: 'icon-dingdanguanli' } },
    //       { path: '/jqjytj', meta: { title: '机器交易统计', icon: 'icon-icon' } },
    //       { path: '/jqjymx', meta: { title: '机器交易明细', icon: 'icon-jiaoyimingxi' } },
    //       { path: '/gk', meta: { title: '概括', icon: 'icon-fuwugaikuang' } }
    //     ]
    //   },
    //   {
    //     path: '/jxcgl',
    //     name: 'jxcgl',
    //     meta: { title: '进销存管理', icon: 'icon-huowujilu' },
    //     children: [
    //       { path: '/wdgys', meta: { title: '我的供应商', icon: 'icon-duogonghuoshang' } },
    //       { path: '/gysspsz', meta: { title: '供应商商品设置', icon: 'icon-shangpinshezhi' } },
    //       { path: '/spgl', meta: { title: '商品管理', icon: 'icon-cf-c26' } },
    //       { path: '/ccgl', meta: { title: '仓储管理', icon: 'icon-chuhuo' } },
    //       { path: '/cgjh', meta: { title: '采购计划', icon: 'icon-plan-buy' } },
    //       { path: '/cgd', meta: { title: '采购单', icon: 'icon-purchase' } },
    //       { path: '/rkdj', meta: { title: '入库登记', icon: 'icon-rukudengji' } },
    //       { path: '/sfk', meta: { title: '收付款', icon: 'icon-shoufukuan1' } },
    //       { path: '/chd', meta: { title: '出货单', icon: 'icon-fahuodanhao' } },
    //       { path: '/bs', meta: { title: '报损/回库', icon: 'icon-baosun' } },
    //       { path: '/bhd', meta: { title: '补货单', icon: 'icon-buhuo' } },
    //     ]
    //   },
    //   {
    //     path: '/qxgl',
    //     meta: { title: '权限管理', icon: 'icon-quanxian' },
    //     children: [{
    //         path: '/qxgl/dagl',
    //         meta: { title: '档案管理', icon: 'icon-jiaoseguanli1' },
    //         children: [{
    //             path: '/yhgl',
    //             meta: { title: '用户管理', icon: 'icon-icon-test' }
    //           },
    //           { path: '/zzgl', meta: { title: '组织管理', icon: 'icon-xitongguanli1' } },
    //         ]
    //       },
    //       {
    //         path: '/qxgl/zygl',
    //         meta: { title: '资源管理', icon: 'icon-yiji-ziyuanjianguan' },
    //         children: [
    //           { path: '/gngl', meta: { title: '普通资源管理', icon: 'icon-ziyuanguanli' } },
    //           { path: '/cdgl', meta: { title: '树形资源管理', icon: 'icon-xitongguanli1' } },
    //         ]
    //       },
    //       {
    //         path: '/qxgl/cqxgl',
    //         meta: { title: '权限管理', icon: 'icon-erji-yonghuguanli' },
    //         children: [{ path: '/jsgl', meta: { title: '角色管理', icon: 'icon-jiaoseguanli' } }, ]
    //       },
    //     ]
    //   },
    //   {
    //     path: '/yxch',
    //     meta: { title: '营销策划', icon: 'icon-caiwuguanli2' },
    //     children: [
    //       { path: '/cyxch', name: '营销策划', meta: { title: '营销策划', icon: 'icon-yingxiao' } }
    //     ]
    //   },
    //   { path: '/gggl', children: [{ path: '/cgggl', meta: { title: '广告管理', icon: 'icon-guanggaoguanli' } }] },
    //   { path: '/hygl', children: [{ path: '/chygl', meta: { title: '会员管理', icon: 'icon-huiyuan1' } }] },
    //   {
    //     path: '/cwgl',
    //     meta: { title: '财务管理', icon: 'icon-caiwuzhutifenxi' },
    //     children: [
    //       { path: '/cwjsgl', meta: { title: '财务结算管理', icon: 'icon-caiwuzhutifenxi' } },
    //       { path: '/jyjscx', meta: { title: '交易结算查询', icon: 'icon-caiwuzhutifenxi' } }
    //     ]
    //   },
    //   {
    //     path: '/shgl',
    //     meta: { title: '商户管理', icon: 'icon-yonghuguanli' },
    //     children: [
    //       { path: '/cwjsgl', meta: { title: '财务结算管理', icon: 'icon-xianjinqingfenjiesuan' } },
    //       { path: '/shdagl', meta: { title: '商户档案管理', icon: 'icon-navicon-gysda' } },
    //       { path: '/shjqgl', meta: { title: '商户机器管理', icon: 'icon-yonghuguanli' } },
    //       { path: '/shspgl', meta: { title: '商户商品管理', icon: 'icon-jiqiguanli' } },
    //       { path: '/jqsq', meta: { title: '机器授权', icon: 'icon-shangpinguanli1' } },
    //     ]
    //   },
    //   {
    //     path: '/xtgl',
    //     meta: { title: '系统管理', icon: 'example' },
    //     children: [
    //       { path: '/index', icon: 'example', meta: { title: '系统管理' } },
    //       {
    //         path: '/xtgl/zfsz',
    //         meta: { title: '支付设置', icon: 'example' },
    //         children: [
    //           { path: '/zffwgl', meta: { title: '支付服务管理', icon: 'example' } },
    //           { path: '/fwscssz', meta: { title: '服务商参数设置', icon: 'example' } },
    //           { path: '/shzhsz', meta: { title: '商户账户设置', icon: 'example' } },
    //           // { path: 'zshcssz', meta: { title: '', icon: 'example' } },
    //         ]
    //       },
    //     ]
    //   },
    // ]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      state.Authorization = token;
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      state.userInfo = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
      state.routers = roles[0].children;
    }
  },

  actions: {
    // 登录
    Login({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          if (!response.code) {
            commit('SET_TOKEN', response.session_key);
            commit('SET_AVATAR', response.userInfo);
            commit('SET_ROLES', response.userInfo.menuJsonTree);
            sessionStorage.setItem('Authorization', response.session_key);
            let routers = window.JSON.stringify(response.userInfo.menuJsonTree);
            sessionStorage.setItem('routers', routers);
          }
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => { //Promise对象可以理解为一次执行的异步操作，
        GetUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        // commit('SET_TOKEN', '');
        // commit('SET_ROLES', []);
        removeSession();
        resolve();
        // }).catch(error => {
        // reject(error);
        // });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeSession()
        resolve()
      })
    }
  }
}

export default user
