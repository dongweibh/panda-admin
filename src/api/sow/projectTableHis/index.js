import request from '@/utils/request'

const api = {
  projectTableHis: '/sow/projectTableHis'
}

export function fetchList(query) {
  return request({
    url: api.projectTableHis + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.projectTableHis + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.projectTableHis + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.projectTableHis,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.projectTableHis,
    method: 'post',
    data: obj
  })
}

export const projectTableHisExport = api.projectTableHis + '/export'
