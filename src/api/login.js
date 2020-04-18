import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'api/auth/login',
    data: data,
    method: 'post'
  })
}

export const logout = () => {
  return axios.request({
    url: 'api/auth/logout',
    method: 'post'
  })
}
