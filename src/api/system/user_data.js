import axios from '@/libs/api.request'

/**
 * 获取用户列表
 * 
 * @param {参数} params 
 */
export const getUserPageList = params => {
    return axios.request({
        url: 'api/sysUser/listPage',
        method: 'get',
        params: params
    })
}

/**
 * 保存用户信息
 * 
 * @param {参数} params 
 */
export const saveUser = params => {
    return axios.request({
        url: 'api/sysUser/saveUser',
        method: 'post',
        data: params
    })
}

/**
 * 更新用户信息
 * 
 * @param {参数} params 
 */
export const updateUser = params => {
    return axios.request({
        url: 'api/sysUser/updateUser',
        method: 'put',
        data: params
    })
}

/**
 * 删除用户
 * 
 * @param {参数} params 
 */
export const deleteUser = params => {
    return axios.request({
        url: 'api/sysUser/deleteUser',
        method: 'delete',
        params: params
    })
}


/**
 * 重置密码
 * 
 * @param {参数} params 
 */
export const resetPwd = params => {
    return axios.request({
        url: 'api/sysUser/resetPwd',
        method: 'put',
        params: params
    })
}

/**
 * 冻结用户
 * 
 * @param {参数} params 
 */
export const freezeUser = params => {
    return axios.request({
        url: 'api/sysUser/freezeUser',
        method: 'put',
        params: params
        
    })
}

/**
 * 解冻用户
 * 
 * @param {参数} params 
 */
export const unFreezeUser = params => {
    return axios.request({
        url: 'api/sysUser/unFreezeUser',
        method: 'put',
        params: params
    })
}
