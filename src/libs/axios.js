import Axios from 'axios'
import baseURL from '_conf/url'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import { Message } from 'view-design'
import md5 from 'js-md5'
class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy(url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      if (config.url.includes('api')) {
        config.headers[TOKEN_KEY] = Cookies.get(TOKEN_KEY)
        var params = config.params
        var paramsUrl = config.url.substring(3, config.url.length)
        var result = paramsUrl + '?' + TOKEN_KEY + '=' + config.headers[TOKEN_KEY]
        for (var p in params) {
          result = result + '&' + p + '=' + params[p]
        }
        console.warn("加编码result：" + result)
        var sign = md5(result)
        var finalParams = {}
        for (var p in params) {
          finalParams[p] = params[p]
        }
        config.headers["sign"] = sign;
        config.params = finalParams
      }
      if (config.url.includes('server')) {
        config.headers[TOKEN_KEY] = Cookies.get(TOKEN_KEY)
        if (!config.params) {
          config.params = {}
        }
      }
      return config
    }, (error) => {
      Message.error('请求超时')
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      var data = res.data
      // this.destroy(url)
      if (data.status !== 200) {
        // 后端服务在个别情况下回报201，待确认 || data.status === 201
        var reg = /^(2\d{2})$/;
        if (reg.test(data.status)) {
          Cookies.remove(TOKEN_KEY)
          window.location.href = window.location.pathname + '#/login'
          Message.error(data.message)
        } else if (data.status === 207) {
          Cookies.remove(TOKEN_KEY)
          window.location.href = window.location.pathname + '#/login'
          Message.error('未登录，或登录失效，请登录')
        } else if (data.status == 206) {
          Cookies.remove(TOKEN_KEY)
          window.location.href = window.location.pathname + '#/login'
          Message.error('您的账号在其它地点登录,已失效')
        } else {
          Message.error(data.message)
        }
        return false
      }
      return data
    }, (error) => {
      Message.error('服务内部错误')
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create() {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  //创建自身api实例
  createApi() {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
        'content-type': 'application/json',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest(instances = []) {
    //
  }
  // 请求实例
  request(options) {
    var instance = this.createApi()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }

  // 请求自身api实例实例
  requestApi(options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }

}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
export default httpRequest
