<template>
  <div>
      <van-nav-bar title="购物车"></van-nav-bar>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        cartInfos:[],
        isEmpty:false
      }
    },
    methods:{
      getCartInfos(){
        if(localStorage.cartInfos){
          this.cartInfos = JSON.parse(localStorage.cartInfos)
        }
        console.log(this.cartInfos.length)
        this.empty=this.cartInfos.length > 0?true:false
      }
    },
    created(){
      this.getCartInfos()
    }
  }
</script>

<style scoped>

</style>