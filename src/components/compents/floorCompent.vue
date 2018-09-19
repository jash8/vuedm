<template>
    <div class="floorWrp">
      <h5 class="floorTit">{{floorTitle}}</h5>
      <div v-for="(item , index) in floorData" :key="index">
        <router-link :to="'goods/'+item.goodsId">
            <img :src="item.image" width="100%" alt="">
        </router-link>
          
      </div>
  </div>
</template>
<script>
export default {
  props:['floorData','floorTitle']
};
</script>
<style scoped>
.floorTit{
  margin: 0 auto;
  background-color: #f1f1f1;
  line-height: 1.8rem;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.floorWrp::after {
  content: "";
  display: table;
  clear: both;
}
.floorWrp div {
  width: 50%;
  box-sizing: border-box;
  border: 1px solid #f7f7f7;
  float: left;
}
.floorWrp div:nth-child(3n + 1) {
  border-right: none;
}
.floorWrp div:nth-child(1) {
  width: 50%;
  border-bottom: none;
}
</style>
 
