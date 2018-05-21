import request from '@/utils/request';

//获取单个字典定义
export function getDict(dictName) {
  return request({
    url: '/sram/config/dict/getDict',
    method: 'get',
    params: { dictName }
  });
}

//获取多个字典定义
export function getDicts(dictNames) {
  return request({
    url: '/sram/config/dict/getDicts',
    method: 'get',
    params: { dictNames }
  });
}
