import axios from '@/libs/api.request'

/**
 * 获取用户列表
 * 
 * @param {参数} params 
 */
export const getRolePageList = params => {
  return axios.request({
      url: 'api/sysRole/listPage',
      method: 'get',
      params: params
  })
}

export const getRoleList = params => {
  return axios.requestApi({
      url: 'api/sysRole/listAll',
      method: 'get',
      params: params
  })
}
export const saveRole = params => {
  return axios.request({
      url: 'api/sysRole/save',
      method: 'post',
      data: params
  })
}

export const updateRole = params => {
  return axios.request({
      url: 'api/sysRole/update',
      method: 'put',
      data: params
  })
}

export const deleteRole = params => {
  return axios.request({
      url: 'api/sysRole/deleteRole',
      method: 'delete',
      params: params
  })
}