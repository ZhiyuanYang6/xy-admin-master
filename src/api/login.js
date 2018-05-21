import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sram/comm/login/onLogin',
    method: 'post',
    data
  })
}
export function getReplaceCode() {
  return request({
    url: '/sram/comm/login/getCheckCode',
    method: 'get'
  })
}

export function GetUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}
