import axios from '@/libs/api.request'

/**
 * 分页列表
 */
export const page = (params) => {
  return axios.request({ 
    url: 'api/careCustomerPhone/listPage',
    method: 'get',
    params: params
  })
}


/**
 *  保存
 */
export const save = (params) => {
  return axios.request({ 
    url: 'api/careCustomerPhone/save',
    method: 'post',
    data: params
  })
}

/**
 *  删除
 */
export const deleteInstall = (params) => {
  return axios.request({ 
    url: 'api/careCustomerPhone/del',
    method: 'delete',
    params: params
  })
}

/**
 *  修改
 */
export const update = (params) => {
  return axios.request({ 
    url: 'api/careCustomerPhone/update',
    method: 'put',
    data: params
  })
}