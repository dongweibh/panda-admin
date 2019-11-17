import request from '@/utils/request'

const api = {
  projectTable: '/sow/projectTable'
}

export function fetchList(query) {
  return request({
    url: api.projectTable + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.projectTable + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.projectTable + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.projectTable,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.projectTable,
    method: 'post',
    data: obj
  })
}

export function getHostTeams() {
  return request({
    url: api.projectTable + '/getHostTeams',
    method: 'post'
  })
}

export const projectTableExport = api.projectTable + '/export'
