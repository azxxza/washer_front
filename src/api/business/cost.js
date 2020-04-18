import axios from '@/libs/api.request'

/**
 * 列表
 */
export const page = (params) => {
  return axios.request({ 
    url: 'api/careCost/listPage',
    method: 'get',
    params: params
  })
}

/**
 *  保存
 */
export const save = (params) => {
  return axios.request({ 
    url: 'api/careCost/save',
    method: 'post',
    data: params
  })
}


/**
 *  更新
 */
export const update = (params) => {
  return axios.request({ 
    url: 'api/careCost/update',
    method: 'put',
    data: params
  })
}

/**
 *  删除
 */
export const deleteCost = (params) => {
  return axios.request({ 
    url: 'api/careCost/del',
    method: 'delete',
    params: params
  })
}


/**
 *  列表
 */
export const list = (params) => {
  return axios.request({ 
    url: 'api/careCost/list',
    method: 'get',
    params: params
  })
}