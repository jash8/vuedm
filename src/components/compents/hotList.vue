<template>
  <div class="list">
    <h5>{{listTit}}</h5>
    <van-list v-model="loading" :offset=900 :finished="finished" @load="onLoad">
      <van-row>
        <van-col span="12" v-for="(item, index) in list" :key="index">
          <img :src="item.image" alt="">
          <p>¥ {{item.mallPrice | formateMoney}}</p>
          <p>{{item.name}}</p>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import { formateMoney } from "../../filters/moneyFormate.js";

export default {
  props: ["goodsList"],
  data() {
    return {
      list: this.goodsList,
      listTit:"热卖商品",
      loading: false,
      finished: false
    };
  },
  filters: { formateMoney },
  watch:{
    list:function(){
      this.list=this.goodsList
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style scoped>
.list img{
  width:auto;
  height: 130px;
}
.list .van-col{
  padding: 6px 0;
  border: 1px solid #f1f1f1;
}
.list p{
  margin:3px auto;
  font-size: 14px;
  line-height: 26px;
}
.list p:nth-child(3){
  padding: 0 5px;
  font-size: 12px;
  height: 52px;
  overflow: hidden;
}
</style>