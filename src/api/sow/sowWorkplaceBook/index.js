import request from '@/utils/request'

const api = {
  sowWorkplaceBook: '/sow/sowWorkplaceBook'
}

export function fetchList(query) {
  return request({
    url: api.sowWorkplaceBook + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: api.sowWorkplaceBook + '/id/' + id,
    method: 'delete'
  })
}

export function getObj(id) {
  return request({
    url: api.sowWorkplaceBook + '/id/' + id,
    method: 'get'
  })
}
export function putObj(obj) {
  return request({
    url: api.sowWorkplaceBook,
    method: 'put',
    data: obj
  })
}
export function addObj(obj) {
  return request({
    url: api.sowWorkplaceBook,
    method: 'post',
    data: obj
  })
}

export const sowWorkplaceBookExport = api.sowWorkplaceBook + '/export'
