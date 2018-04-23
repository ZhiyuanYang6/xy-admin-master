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
  if (config.data.dkh) {
    config.baseURL = config.baseURL + config.data.dkh; //配置端口号
  }
  console.log(config.data)
  return config
}, error => { // 对请求错误做些什么
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use( // 对响应数据做点什么
  response => {
    console.log(response.data.data);
    return response.data.data
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
