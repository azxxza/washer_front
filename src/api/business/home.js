import axios from '@/libs/api.request'

/**
 * 首页查询
 */
export const indexData = (params) => {
  return axios.request({ 
    url: 'api/log/list',
    method: 'get',
    params: params
  })
}