import Vue from 'vue'

/**权限指令**/
const has = Vue.directive('has', {
  bind: function (el, binding, vnode) {
    // 获取页面按钮权限
   //let btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false;
  // 获取用户按钮权限
  let btnPermissionsStr = localStorage.getItem("btnPermissions")
  if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
    return false;
  }
  if (btnPermissionsStr.indexOf(value) > -1) {
    isExist = true;
  }
  return isExist;
};
export {has}