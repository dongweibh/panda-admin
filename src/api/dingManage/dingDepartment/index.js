import request from '@/utils/request'

const api = {
  dingDepartment: '/dingManage/dingDepartment'
}

export function fetchList(query) {
  return request({
    url: api.dingDepartment + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingDepartment + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingDepartment + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingDepartment,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingDepartment,
    method: 'post',
    data: obj
  })
}

export const dingDepartmentExport = api.dingDepartment + '/export'
