import axios from '@/libs/api.request'

/**
 * 列表
 */
export const page = (params) => {
  return axios.request({ 
    url: 'api/careValidpayinfo/listPage',
    method: 'get',
    params: params
  })
}

export const list = (params) => {
  return axios.request({ 
    url: 'api/careValidpayinfo/list',
    method: 'get',
    params: params
  })
}
