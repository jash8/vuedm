<template>
<div>
  <div class="search_bar">
    <van-row>
      <van-col class="locationIcon" span='3'><img :src="localtionIcon" alt="位置local"></van-col>
      <van-col span='16'><input type="text"></van-col>
      <van-col span='5'><van-button type='default' size='mini'>查找</van-button></van-col>
    </van-row>
  </div>
  <div class="swiperWrp">
    <van-swipe :autoplay='3000'>
      <van-swipe-item v-for="(image, index) in slides" :key="index">
        <img v-lazy="image.image" >
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="cateWrp">
    <div class="category">
        <div v-for="(cate,index) in category" :key="index">
          <img v-lazy="cate.image" width="70%">
          <p>{{cate.mallCategoryName}}</p>
        </div>
    </div>
  </div>
  <div>
    <img v-lazy="adBanner" width="100%" alt="">
  </div>
  <div class="recommend">
    <h5>商品推荐</h5>
    <div class="recommendWrp">
        <swiper :options="swiperOptions">
          <swiperSlide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommendItem">
              <img :src="item.image" width="80%" alt="">
              <p>¥{{item.price | formateMoney}}</p>
              <p>{{item.goodsName}}</p>
            </div>
          </swiperSlide>          
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
  </div>
  <floorComp :floorData="floorOne" :floorTitle="floorTits['floor1']"></floorComp>
  <floorComp :floorData="floorTwo" :floorTitle="floorTits['floor2']"></floorComp>
  <floorComp :floorData="floorThe" :floorTitle="floorTits['floor3']"></floorComp>
  <hotList :goodsList="hotGoods"></hotList>
</div>

</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import floorComp from "../compents/floorCompent";
import hotList from "../compents/hotList";
import { formateMoney } from "../../filters/moneyFormate.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      msg: "shopping mall page",
      localtionIcon: require("../../assets/image/local.png"),
      bannerPics: [
        require("../../assets/image/cat01.jpg"),
        require("../../assets/image/cat02.jpg"),
        require("../../assets/image/cat03.jpg")
      ],
      swiperOptions: {
        slidesPerView: 4
        // pagination: {
        //     el: '.swiper-pagination',
        //   }
      },
      slides: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floorOne: [],
      floorTwo: [],
      floorThe: [],
      floorTits: {},
      hotGoods: []
    };
  },
  filters: { formateMoney },
  components: { swiper, swiperSlide, floorComp, hotList },
  created() {
    axios({
      url:
        "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/index",
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          var resData = response.data.data;
          this.slides = resData.slides;
          this.category = resData.category;
          this.adBanner = resData.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = resData.recommend;
          this.floorOne = resData.floor1;
          this.floorTwo = resData.floor2;
          this.floorThe = resData.floor3;
          this.floorTits = resData.floorName;
          this.hotGoods = resData.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.recommendWrp {
  position: relative;
  font-size: 14px;
}
.recommendItem p {
  word-break: break-all;
  margin: 2px;
}
.recommend h5 {
  margin: 0.3rem auto;
  padding: 0.3rem 0;
  border-bottom: 1px solid #f7f7f7;
  text-align: left;
  padding-left: 6px;
  font-size: 15px;
}
.cateWrp {
  background-color: #f7f7f7;
  padding: 1px;
}
.category {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;
  margin: 0.3rem;
  text-align: center;
  border-radius: 6px;
  padding-top: 5px;
  border: 1px solid #f7f7f7;
  background-color: #fff;
}
.category div {
  width: 20%;
}
.category p {
  margin: 5px 0;
}

.swiperWrp {
  max-height: 14rem;
  overflow: hidden;
  width: 100%;
}
.swiperWrp img {
  width: 100%;
}
.search_bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: plum;
  text-align: center;
  color: #fff;
}
.search_bar input {
  background: none;
  border: none;
  color: #fff;
  width: 90%;
  font-size: 0.8rem;
  border-bottom: 1px solid #fff;
  height: 1.3rem;
  line-height: 1.3rem;
}
.search_bar button {
  height: 1.5rem;
  width: 80%;
}
.locationIcon img {
  width: 1.6rem;
  height: 1.6rem;
  vertical-align: middle;
}
</style>