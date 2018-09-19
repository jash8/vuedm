<template>
  <div class="mainwrp">
      <div class="navbar">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="goback"/>
      </div>
      <div class="topimg">
        <img :src="goodInfos.IMAGE1" width="100%" alt="">
      </div>
      <div class="textabs">
        <p>{{goodInfos.NAME}}</p>
        <p>现价：&yen {{goodInfos.PRESENT_PRICE | formateMoney}}<span>&yen {{goodInfos.ORI_PRICE}}</span></p>
      </div>
      <div>
        <van-tabs swipeable sticky>
          <van-tab title="详情">
            <div v-html="goodInfos.DETAIL" class="goodsdetail"></div>
          </van-tab>
          <van-tab title="评论"></van-tab>
        </van-tabs>
      </div>
      <div class="btnsWrp">
        <van-button type="primary">购买</van-button>
        <van-button type="danger">加入购物车</van-button>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/url.config.js";
import { formateMoney } from "@/filters/moneyFormate.js";
export default {
  data() {
    return {
      goodInfos: {}
    };
  },
  created() {
    this.getInfos();
  },
  filters: {
    formateMoney
  },
  methods: {
    getInfos() {
      console.log(this.$route.params.id);
      axios
        .post(url.goodsDetail, { goodsId: this.$route.params.id })
        .then(res => {
          this.goodInfos = res.data.message;
          console.log(res.data);
        });
    },
    goback() {
      history.go(-1);
    },
    addGoodsToCart() {
      let cartInfos = localStorage.cartInfos
        ? JSON.parse(localStorage.cartInfos)
        : [];
      let isHaveGoods = cartInfos.find(cart => {
        cart.goodsId == this.goodsId;
      });
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodInfos.ID,
          name: this.goodInfos.name
        };
      }
    }
  }
};
</script>

<style scoped>
.mainwrp {
  padding-bottom: 60px;
}
.textabs p {
  margin: 0;
}
.textabs p:first-child {
  font-weight: bold;
  font-size: 16px;
}
.textabs span {
  padding-left: 10px;
  font-size: 12px;
  color: lightpink;
  text-decoration: line-through;
}
.textabs {
  text-align: left;
  padding: 2px 10px;
  font-size: 14px;
  line-height: 26px;
}
.goodsdetail {
  font-size: 0;
}
.btnsWrp {
  position: fixed;
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.78);
  flex-flow: row nowrap;
  justify-content: space-around;
  z-index: 9;
  left: 0;
  bottom: 0;
}
.btnsWrp button {
  flex: 1;
  margin: 5px 10px;
}
</style>