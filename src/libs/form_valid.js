//test url : https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=6222005865412565805&cardBinCheck=true
//cardType:DC->储蓄卡,CC->信用卡
   
export const validateNumber =  (rule, value, callback) => {
  if (!value) {
      return callback(new Error('不能为空'));
  }
  // 模拟异步验证效果
  setTimeout(() => {
      if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
      } else {
          if (value < 18) {
              callback(new Error('Must be over 18 years of age'));
          } else {
              callback();
          }
      }
  }, 1000)
}
  