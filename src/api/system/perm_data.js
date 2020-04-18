import axios from '@/libs/api.request'

export const getPermList = params => {
  return axios.request({
    url: 'api/sysPerm/listTree',
    method: 'get',
    params: params
  })
}

export const savePerm = params => {
  return axios.request({
    url: 'api/sysPerm/save',
    method: 'post',
    data: params
  })
}

export const saveRolePerm = params => {
  return axios.request({
    url: 'api/sysPerm/saveRolePerm',
    method: 'post',
    data: params
  })
}

export const updatePerm = params => {
  return axios.request({
    url: 'api/sysPerm/update',
    method: 'put',
    data: params
  })
}

export const deletePerm = params => {
  return axios.request({
    url: 'api/sysPerm/deletePerm',
    method: 'delete',
    params: params
  })
}

export const getPermTree = () => {
  return axios.request({
    url: 'api/sysPerm/getPermTree',
    method: 'get',
  })
}

export const getPermCascader = () => {
  return axios.request({
    url: 'api/sysPerm/listPermCascader',
    method: 'get'
  })
}
export const getPermPage = params => {
  return axios.request({
    url: 'api/sysPerm/listPage',
    method: 'get',
    params: params
  })
}