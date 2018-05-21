import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getSession } from '@/utils/auth'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => { // 在发送请求之前做些什么
  if (store.getters.token) {
    config.headers['Authorization'] = getSession(); // 让每个请求携带自定义token
  }
  // if (config.data.dkh) {
  //   config.baseURL = config.baseURL + config.data.dkh; //配置端口号
  // }
  // console.log(config)
  console.log(config.data)
  // console.log(config)
  return config
}, error => { // 对请求错误做些什么
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use( // 对响应数据做点什么
  response => {
    const res = response.data;
    if (res.code !== "H0000") {
      if (res.code === "B1000") {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      Message({ message: res.data.msg, type: 'error', duration: 5 * 1000 });
      return response.data;
      // response.data.data;
    } else {
      console.log(res.data);
      // console.log(res);
      return response.data.data;
    }
  },
  error => { // 对响应错误做点什么
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
