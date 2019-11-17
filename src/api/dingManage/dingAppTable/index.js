import request from '@/utils/request'

const api = {
  dingAppTable: '/dingManage/dingAppTable'
}

export function fetchList(query) {
  return request({
    url: api.dingAppTable + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingAppTable + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingAppTable + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingAppTable,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingAppTable,
    method: 'post',
    data: obj
  })
}

export const dingAppTableExport = api.dingAppTable + '/export'
