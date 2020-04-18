import axios from '@/libs/api.request'

/**
 * 列表
 */
export const getCostModelList = (params) => {
  return axios.request({ 
    url: 'api/careCostmodel/list',
    method: 'get',
    params: params
  })
}