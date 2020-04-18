import axios from '@/libs/api.request'
var qs = require('qs')
export const getUserInfo = (token) => {
  return axios.request({
    url: 'api/auth/getInfo',
    method: 'get'
  })
}

export const updateUserPwd = (params) => {
  return axios.request({
    url: 'api/auth/updateUserPwd/',//server/changePassword
    method: 'post',
    data: params
  })
}