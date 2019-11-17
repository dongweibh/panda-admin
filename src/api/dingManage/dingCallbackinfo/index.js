import request from '@/utils/request'

const api = {
  dingCallbackinfo: '/dingManage/dingCallbackinfo'
}

export function fetchList(query) {
  return request({
    url: api.dingCallbackinfo + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingCallbackinfo + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingCallbackinfo + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingCallbackinfo,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingCallbackinfo,
    method: 'post',
    data: obj
  })
}

export const dingCallbackinfoExport = api.dingCallbackinfo + '/export'
