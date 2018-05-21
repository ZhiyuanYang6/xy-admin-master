import request from '@/utils/request';

/************ user **************************/
// 增
export function saveUserInfo(data) {
  return request({
    url: '/sram/archives/saveUserInfo',
    method: 'post',
    data
  });
}


// 删
export function delUserInfo(id) {
  return request({
    url: '/sram/archives/delUserInfo',
    method: 'get',
    params: { id }
  });
}


// 改
export function editUserInfo(data) {
  return request({
    url: '/sram/archives/editUserInfo',
    method: 'post',
    data
  });
}


// 查单个信息
export function getUserInfoById(id) {
  return request({
    url: '/sram/archives/getUserInfoById',
    method: 'get',
    params: { id }
  });
}


// 查 列表信息
export function queryUserInfoAll(data) {
  return request({
    url: '/sram/archives/queryUserInfoAll',
    method: 'post',
    data
  });
}

export function getMyOrgTree() {
  return request({
    url: '/sram/archives/getMyOrgTree',
    method: 'post'
  });
}
// 获取相关下拉列表数据  权限级别 封锁标志
export function getDicts(dictNames) {
  return request({
    url: '/sram/config/dict/getDicts',
    method: 'get',
    params: { dictNames }
  });
}

// 获取相关下拉列表数据  权限级别 封锁标志
export function getDict(dictName) {
  return request({
    url: '/sram/config/dict/getDict',
    method: 'get',
    params: { dictName }
  });
}

/************ organization 企业组织管理 ******************/
// 增
export function newOrgInfo(data) {
  return request({
    url: '/sram/archives/newOrgInfo',
    method: 'post',
    data
  });
}

// 删
export function delOrgInfo(id) {
  return request({
    url: '/sram/archives/delOrgInfo',
    method: 'get',
    params: { id }
  });
}

// 改
export function editOrgInfo(data) {
  return request({
    url: '/sram/archives/editOrgInfo',
    method: 'post',
    data
  });
}

// 根据id查 单个
export function getOrgById(id) {
  return request({
    url: '/sram/archives/getOrgById',
    method: 'get',
    params: { id }
  });
}

//查找角色
export function findUserrole(data) {
  return request({
    url: '/sram/distribution/findUserrole',
    method: 'get',
    params: data
  })
}
//角色管理
export function setUserRole(data) {
  return request({
    url: '/sram/distribution/setUserRole',
    method: 'post',
    data
  });
}

//获取资源数据
export function findResourceInfo(data) {
  return request({
    url: '/sram/managerResource/findResourceInfo',
    method: 'post',
    data
  })
}
