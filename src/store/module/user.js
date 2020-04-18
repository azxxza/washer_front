import { getUserInfo } from '@/api/user'
import { login, logout } from '@/api/login'
import { setToken, getToken, clearJSESSIONID, setBtnPermissions, setMenu } from '@/libs/util'

import config from '@/config'
import Cookies from 'js-cookie'

export default {
  state: {
    userInfo: {
      userName: '',
      userId: '',
      avatorImgPath: '',
      token: getToken()
    }

  },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId(state, id) {
      state.userId = id
      localStorage.setItem('userId', id)
    },
    setUserName(state, name) {
      state.userName = name
      localStorage.setItem('userName', name)
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo(state, info) {
      state.userInfo = info
      localStorage.setItem('userInfo', JSON.stringify(info))
    },
    // setCipher(state, cipher) {
    //   state.cipher = cipher
    //   localStorage.setItem('cipher', cipher)
    // },
    clearJSESSION() {
      clearJSESSIONID()
    }

  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.response
          commit('setToken', data.token)
          commit('setUserId', data.id)
          const permsBtnList = data.permsBtnList
          setMenu(data.list)
          //页面按钮权限
          setBtnPermissions(permsBtnList)
          resolve(res)
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('clearJSESSION', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.response
          if (data.user) {
            commit('setUserInfo', data.user)
            resolve(data)
          } else {
            reject(err)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
