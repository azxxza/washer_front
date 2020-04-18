import axios from '@/libs/api.request'

/**
 * 列表
 */
export const page = (params) => {
  return axios.request({ 
    url: 'api/careWasherusermonthcard/listPage',
    method: 'get',
    params: params
  })
}

export const list = (params) => {
  return axios.request({ 
    url: 'api/careWasherusermonthcard/list',
    method: 'get',
    params: params
  })
}

export const update = (params) => {
  return axios.request({ 
    url: 'api/careWasherusermonthcard/update',
    method: 'put',
    data: params
  })
}
