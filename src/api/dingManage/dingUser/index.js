import request from '@/utils/request'

const api = {
  dingUser: '/dingManage/dingUser'
}

export function fetchList(query) {
  return request({
    url: api.dingUser + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.dingUser + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.dingUser + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.dingUser,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.dingUser,
    method: 'post',
    data: obj
  })
}

export const dingUserExport = api.dingUser + '/export'
