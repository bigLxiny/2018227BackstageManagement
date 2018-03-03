<template>
  <div class="login">
    <!-- 居中的模态框 -->
    <section>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="uname">
          账号:
          <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="upwd">
          密码:
          <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>

  </div>
</template>


<script>
export default {
  data() {
    return {
      ruleForm2: {
        upwd: "",
        uname: ""
      },
      //添加校验规则
      rules2: {
        uname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    //   登录方法
    login() {
      //   this.$http.post(this.$api.login, this.user).then(rsp => alert(rsp.data.message.realname));

      // console.log(this.ruleForm2);
      this.$http.post(this.$api.login, this.ruleForm2).then(res => {
        //   console.log(res);
        if (res.data.status == 0) {
          //   this.$alert("登陆成功");
          //登录成功跳转
          this.$alert("登录成功", "提示", {
            callback: () => {
              //    保存用户信息
              localStorage.setItem("uname", res.data.message.uname);
              //路由跳转
              this.$router.push({ name: "admin" });
            }
          });
        } else {
          this.$alert(res.data.message);
        }
      });
    },
    //点击登录按钮登录处理
    //  this.$refs用来获取页面中的元素或组件, 这里通过它拿到form表单组件, 调用validate方法, 给所有表单进行校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$alert("账号或密码不合格!");
        }
      });
    },

    //重置按钮处理
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang='less'>
.login {
  height: 100%;
  background-color: rgb(58, 96, 153);
  section {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    padding-right: 100px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #fff;
    border-radius: 10px;
  }
}
</style>
