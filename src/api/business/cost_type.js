import axios from '@/libs/api.request'

/**
 * 列表
 */
export const getCostTypeList = (params) => {
  return axios.request({ 
    url: 'api/careCosttype/list',
    method: 'get',
    params: params
  })
}