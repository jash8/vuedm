<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click="goBack"/>
    <div class="fieldWrp">
      <van-field label="用户名" icon="clear" v-model="username" type="text" @click-icon="username=''" :error-message="usernameErrMsg" placeholder="请输入用户名" required></van-field>
    </div>
    <div class="fieldWrp">
      <van-field label="密码" icon="clear" v-model="password" type="password" @click-icon="password=''" :error-message="passwordErrMsg" placeholder="请输入密码" required></van-field>
    </div>
    <div class="ButtonWrp">
      <van-button text="登录" type="primary" :loading="openLoading" @click="loginAction" size="large"></van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/url.config.js";
export default {
  data() {
    return {
      password: "123456",
      username: "joker",
      openLoading: false, //注册的loading状态
      usernameErrMsg: "", //用户名错误时出现的提示信息
      passwordErrMsg: "" //密码错误时出现的提示信息
    };
  },
  created(){
    if(localStorage.getItem('userInfo')){
      this.$toast.success('您已经登录过来')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.loginUser();
    },
    // 表单验证的方法
    checkForm() {
      let isOk = true;
      if (this.username.length < 4) {
        this.usernameErrMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrMsg = "用户名不能小于6位";
        isOk = false;
      } else {
        this.passwordErrMsg = "";
      }

      return isOk;
    },
    loginUser() {
      this.openLoading = true;
      let _this = this;
      axios
        .post(url.loginUser, {
          password: this.password,
          userName: this.username
        })
        .then(res => {
          if (res.data.code == 200 && res.data.login == true) {
            this.$toast.success(res.data.message);
            new Promise((resolve, reject) => {
              localStorage.setItem("userInfo", _this.username
              );
              setTimeout(resolve(), 500);
            })
              .then(() => {
                this.$router.push("/");
              })
              .catch(err => {
                console.log("用户信息保存失败: ", err);
                this.$toast.fail("用户信息保存失败");
              });
          } else {
            let msg = res.data.message;
            this.$toast.fail(msg);
            this.openLoading = false;
          }
        })
        .catch(err => {
          this.$toast.fail("登录失败");
          this.openLoading = false;
          console.log(err);
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