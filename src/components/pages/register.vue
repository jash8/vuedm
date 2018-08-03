<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"/>
    <div class="fieldWrp">
      <van-field label="用户名" icon="clear" v-model="username" type="text" @click-icon="username=''" :error-message="usernameErrMsg" placeholder="请输入用户名" required></van-field>
    </div>
    <div class="fieldWrp">
      <van-field label="密码" icon="clear" v-model="password" type="password" @click-icon="password=''" :error-message="passwordErrMsg" placeholder="请输入密码" required></van-field>
    </div>
    <div class="ButtonWrp">
      <van-button text="注册" type="primary" :loading="openLoading" @click="registAction" size="large"></van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/url.config.js";
export default {
  data() {
    return {
      password: "",
      username: "",
      openLoading: false, //注册的loading状态
      usernameErrMsg: "", //用户名错误时出现的提示信息
      passwordErrMsg: "" //密码错误时出现的提示信息
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registAction(){
      this.checkForm() && this.registerUser()
    },
    // 表单验证的方法
    checkForm() {
      let isOk = true;
      if (this.username.length < 4) {
        this.usernameErrMsg = "用户名不能小于4位";
        isOk = false;
      }else{
        this.usernameErrMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrMsg = "用户名不能小于6位";
        isOk = false;
      }else{
        this.passwordErrMsg = "";
      }

      return isOk
    },
    registerUser() {
      this.openLoading = true;
      axios
        .post(url.RegisterUser, {
          password: this.password,
          userName: this.username
        })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            this.openLoading = false;
            this.$toast.success("注册成功！");
            this.$router.push("/");
          } else {
            console.log(res.data);
            this.$toast.fail(res.data.message);
            this.openLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.openLoading = false;
          this.$toast.fail("操作失败！");
        });
    }
  }
};
</script>

<style scoped>
.fieldWrp,
.ButtonWrp {
  position: relative;
  width: 98%;
  margin: 0.5rem auto;
}
.fieldWrp::after {
  content: "";
  display: block;
  height: 0;
  width: 100%;
  position: absolute;
  border-bottom: 1px solid #f7f7f7;
  bottom: 0;
  right: 0;
}

.fieldWrp button {
  width: 90%;
  margin: 0 auto;
}
.ButtonWrp {
  margin-top: 1.5rem;
}
</style>