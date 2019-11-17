import request from '@/utils/request'

const api = {
  dingCallbackEventMethod: '/dingManage/dingCallbackEventMethod'
}

export function fetchList(query) {
  return request({
    url: api.dingCallbackEventMethod + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingCallbackEventMethod + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingCallbackEventMethod + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingCallbackEventMethod,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingCallbackEventMethod,
    method: 'post',
    data: obj
  })
}

export const dingCallbackEventMethodExport = api.dingCallbackEventMethod + '/export'
