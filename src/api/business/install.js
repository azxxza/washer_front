import axios from '@/libs/api.request'

/**
 * 分页列表
 */
export const page = (params) => {
  return axios.request({ 
    url: 'api/careInstall/listPage',
    method: 'get',
    params: params
  })
}


/**
 * 列表
 */
export const list = (params) => {
  return axios.request({ 
    url: 'api/careInstall/list',
    method: 'get',
    params: params
  })
}

/**
 *  保存
 */
export const save = (params) => {
  return axios.request({ 
    url: 'api/careInstall/save',
    method: 'post',
    data: params
  })
}

/**
 *  删除
 */
export const deleteInstall = (params) => {
  return axios.request({ 
    url: 'api/careInstall/del',
    method: 'delete',
    params: params
  })
}

/**
 *  删除
 */
export const update = (params) => {
  return axios.request({ 
    url: 'api/careInstall/update',
    method: 'put',
    data: params
  })
}