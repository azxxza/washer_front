import axios from '@/libs/api.request'

/**
 * 分页列表
 */
export const basicInfo = (params) => {
  return axios.request({ 
    url: 'api/careInstall/listBasicInfo',
    method: 'get',
    params: params
  })
}

export const orderInfo = (params) => {
  return axios.request({ 
    url: 'api/careOrder/listPage',
    method: 'get',
    params: params
  })
}



