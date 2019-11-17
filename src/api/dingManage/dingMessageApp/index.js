import request from '@/utils/request'

const api = {
  dingMessageApp: '/dingManage/dingMessageApp'
}

export function fetchList(query) {
  return request({
    url: api.dingMessageApp + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingMessageApp + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingMessageApp + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingMessageApp,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingMessageApp,
    method: 'post',
    data: obj
  })
}

export const dingMessageAppExport = api.dingMessageApp + '/export'
