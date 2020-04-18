import axios from '@/libs/api.request'

/**
 * 日志查询
 */
export const optLog = (params) => {
  return axios.request({ 
    url: 'api/log/listPage',
    method: 'get',
    params: params
  })
}