
import request from '@/utils/request';

/************ ordinary **************************/

//获取相关下拉列表数据  1.系统名称  2.资源类型
export function getDict(data) {
  return request({
    url: '/sram/config/dict/getDict',
    method: 'get',
    data
  });
}

//删除资源
export function delResourceInfo(id){
  return request({
    url: '/sram/managerResource/delResourceInfo',
    method: 'get',
    params:{id}
  })
}
//编辑资源
export function editResourceInfo(data){
  return request({
    url: '/sram/managerResource/editResourceInfo',
    method: 'post',
    data
  })
}
//新增资源
export function saveResourceInfo(data){
  return request({
    url: '/sram/managerResource/saveResourceInfo',
    method: 'post',
    data
  })
}
//根据用户id查询资源
export function getResourceInfoById(id){
  return request({
    url: '/sram/managerResource/getResourceInfoById',
    method: 'get',
    params:{id}
  })
}
/**********tree********************/
export function findTreeResourceInfo(data){
  return request({
    url: '/sram/managerResource/findTreeResourceInfo',
    method: 'post',
    data
  })
}

