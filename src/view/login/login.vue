<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录后台管理系统" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :loading="loading"></login-form>
          <p class="login-tip">请输入用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
//用到什么组件引入什么组件  
import { Card } from 'view-design' 
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    Card,
    LoginForm
  },
   data() {
     return {
      loading: false
     }
   },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      var params = {
        userName: userName,
        password: password
      }
      this.loading = true
      var _this = this 
      this.handleLogin({ userName, password }).then(res => {
        _this.loading = false
        if (res.status == 200) {
          _this.getUserInfo().then(res => {
          localStorage.tagNaveList = []
          _this.$router.push({
            name: 'home'
          })
        })
        }
      }).catch (res => {
        _this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
