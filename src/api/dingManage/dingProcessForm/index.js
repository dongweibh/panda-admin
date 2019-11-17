import request from '@/utils/request'

const api = {
  dingProcessForm: '/dingManage/dingProcessForm'
}

export function fetchList(query) {
  return request({
    url: api.dingProcessForm + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingProcessForm + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingProcessForm + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingProcessForm,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingProcessForm,
    method: 'post',
    data: obj
  })
}

export const dingProcessFormExport = api.dingProcessForm + '/export'
