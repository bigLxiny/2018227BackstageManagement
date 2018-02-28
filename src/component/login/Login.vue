<template>
  <div>
      {{msg}}
  <el-button round>圆形按钮</el-button>
  <el-button type="primary" round>主要按钮</el-button>
  <el-button type="success" round>成功按钮</el-button>
  <el-button type="info" round>信息按钮</el-button>
  <el-button type="warning" round>警告按钮</el-button>
  <el-button type="danger" round>危险按钮</el-button>

  <button @click="login">登陆</button>
        <button @click="isLogin">登陆检测</button>
  </div>
</template>


<script>
    export default {
        data() {
            return {
                user: {
                    uname: "admin",
                    upwd: "123456"
                },
                msg:'这是登录页面'
            };
        },

        methods: {
            // 登陆
            login() {
                this.$http.post(this.$api.login, this.user)
                    .then(rsp => alert(rsp.data.message.realname));
            },

            // 判断是否已登陆
            isLogin() {
                this.$http.get(this.$api.islogin)
                    .then(rsp => alert(rsp.data.code));
            }
        }
    }
</script>