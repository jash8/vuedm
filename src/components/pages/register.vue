<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"/>
    <div class="fieldWrp">
      <van-field label="用户名" icon="clear" v-model="username" @click-icon="username=''" placeholder="请输入用户名" required></van-field>
    </div>
    <div class="fieldWrp">
      <van-field label="密码" icon="clear" v-model="password" type="password" @click-icon="password=''" placeholder="请输入密码" required></van-field>
    </div>
    <div class="ButtonWrp">
      <van-button text="注册" type="primary" @click="registerUser" size="large"></van-button>
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
      username: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerUser() {
      axios
        .post(url.RegisterUser, {
          password: this.password,
          userName: this.username
        })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            this.$toast.success("注册成功！");
          } else {
            console.log(res.data);
            this.$toast.fail(res.data.message);
          }
        })
        .catch(err => {
          console.log(err.error);
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