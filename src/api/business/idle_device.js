import axios from '@/libs/api.request'

/**
 * 分页列表
 */
export const page = (params) => {
  return axios.request({ 
    url: 'api/careIdleDevice/listPage',
    method: 'get',
    params: params
  })
}

export const list = (params) => {
  return axios.request({ 
    url: 'api/careIdleDevice/list',
    method: 'get',
    params: params
  })
}