import request from '@/utils/request'

const api = {
  dingProcessInstance: '/dingManage/dingProcessInstance'
}

export function fetchList(query) {
  return request({
    url: api.dingProcessInstance + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingProcessInstance + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingProcessInstance + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingProcessInstance,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingProcessInstance,
    method: 'post',
    data: obj
  })
}

export const dingProcessInstanceExport = api.dingProcessInstance + '/export'
