<template>
  <div class="header">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <span>你好,{{uname}}</span>
        <i class="el-icon-arrow-down el-icon-right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='a'>修改密码</el-dropdown-item>
        <el-dropdown-item command='b'>注销登录</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data(){
    return{
      uname:localStorage.getItem('uname')
    }
  },
  methods:{
    // 登出的方法
    logout(){
      //发送get请求给后台
      this.$http.get(this.$api.logout).then(res=>{
        if(res.data.status==0){
          localStorage.removeItem('uname');
          this.$router.push('/login');
        }
      })
    },
    handleCommand(command){
      if(command=='b'){
        this.logout()
      }
    }
  }
};
</script>

<style scoped lang="less">
.header{
  background-color: #cfc9c9b6;
  text-align: right;
}
</style>
