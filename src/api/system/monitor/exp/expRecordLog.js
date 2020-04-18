import axios from '@/libs/api.request'

/**
 * 查询用户异常信息
 * 
 * @param {参数} params 
 */
export const getPageList = params => {
    return axios.request({
        url: 'api/expRecordLog/listPage',
        method: 'get',
        params: params
    })
}

export const getDetail = params => {
    return axios.request({
        url: 'api/expRecordLog/listDetail',
        method: 'get',
        params: params
    })
}

