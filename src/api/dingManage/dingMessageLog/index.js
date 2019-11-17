import request from '@/utils/request'

const api = {
  dingMessageLog: '/dingManage/dingMessageLog'
}

export function fetchList(query) {
  return request({
    url: api.dingMessageLog + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingMessageLog + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingMessageLog + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingMessageLog,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingMessageLog,
    method: 'post',
    data: obj
  })
}

export const dingMessageLogExport = api.dingMessageLog + '/export'
