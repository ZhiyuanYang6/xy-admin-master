import request from '@/utils/request';

//查询普通资源列表
export function findResourceInfo(data) {

  return request({
    url: '/sram/managerResource/findResourceInfo',
    method: 'post',
    data,
  });
}
//查询树形资源列表
export function findRoleresource(data) {
  return request({
    url: '/sram/distribution/findRoleresource',
    method: 'post',
    data
  });
}
//查询用户权限
export function getRoleresourceByRoleId(roleId) {
  return request({
    url: '/sram/distribution/getRoleresourceByRoleId',
    method: 'get',
    params: { roleId },
  });
}
//保存角色资源权限
export function setRoleResource(data) {
  return request({
    url: '/sram/distribution/setRoleResource',
    method: 'post',
    data
  });
}

/**************roles********************/

//查看角色列表
export function queryRoleinfo(data) {
  return request({
    url: '/sram/authority/queryRoleinfo',
    method: 'post',
    data
  })
}
//根据id查看角色
export function getRoleById(id) {
  return request({
    url: '/sram/authority/getRoleById',
    method: 'get',
    params: { id },
  })
}
//新增角色
export function newRoleinfo(data) {
  return request({
    url: '/sram/authority/newRoleinfo',
    method: 'post',
    data
  })
}
//编辑角色
export function editRoleinfo(data) {
  return request({
    url: '/sram/authority/editRoleinfo',
    method: 'post',
    data
  })
}
//删除角色
export function delRoleinfo(id) {
  return request({
    url: '/sram/authority/delRoleinfo',
    method: 'get',
    params: { id }
  })
}
