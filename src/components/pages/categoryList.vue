<template>
  <div>
      <div class="nav_bar">
          <van-nav-bar title="类别列表"></van-nav-bar>
      </div>
      <div id="twrp">
        <van-row>
          <van-col span="6" class="colWrp">
            <div id="leftNav">
                <ul>
                  <li :class="categoryIndx==index?'active':''" v-for="(item , index ) in categoryList" :key="index" :id="index" @click="clickFunc(index,item.ID)">
                    {{item.MALL_CATEGORY_NAME}}
                  </li>
                </ul>
            </div>
          </van-col>
          <van-col span="18" class="colWrp">
            <van-tabs v-model="active"  @click="getCategorySubId">
              <van-tab v-for="(item, index) in categorySubList" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
            <div id="pullOur">        
              <van-pull-refresh  id="pullWrp" v-model="isrefresh" @refresh="onrefresh">              
                <van-list  id="listWrp" v-model="loading" :finished="finished" @load="onLoad">
                  <van-cell v-for="(item, index) in goodsList" :key="index" >
                    <van-row>
                      <router-link :to="'goods/'+item.ID">                     
                        <van-col span="6"> <img style="width:90%" :src="item.IMAGE1" :onerror="errImg" alt=""> </van-col>
                        <van-col span="18">
                          <div>{{item.NAME}}</div>
                          <div>¥ {{item.PRESENT_PRICE | formateMoney}} 元</div>
                        </van-col>
                       </router-link>
                    </van-row>
                  </van-cell>
                </van-list>
              </van-pull-refresh>
             </div>
          </van-col>
        </van-row>
      </div>
  </div>
</template>

<script>
  import url from '@/url.config'
  import axios from 'axios'
  import { formateMoney } from "../../filters/moneyFormate.js";

  export default {
    data(){
      return{
        errImg:'this.src="'+require('@/assets/image/errImg.png')+'"',
        active:0,
        categoryIndx:0,
        loading:false,
        finished:false,
        isrefresh:false,
        page:0,
        goodsList:[],
        categorySubId:0,
        categoryList:[],
        categorySubList:[]
      }
    },
    filters:{
      formateMoney
    },
    methods:{
      onrefresh(){
        setTimeout(() => {
          this.$toast('刷新成功')
          this.isrefresh= false
          this.finished = false
          this.goodsList=[]
          this.page=0;
          this.onLoad()
        }, 500);
      },
      onLoad(){
        setTimeout(()=>{  
          this.categorySubId = this.categorySubId || this.categorySubList[0]['ID']
          this.getGoodsList()
        },600)
      },
      getCategorySubId(index){
        this.categorySubId  = this.categorySubList[index]['ID']
        // console.log(this.categorySubList[index]['ID'])
        this.goodsList=[]
        this.finished = true
        this.page=0
        this.onLoad()
      },
      getGoodsList(){
        axios({
          url:url.getGoodsList,
          method:'post',
          data:{
            categorySubId:this.categorySubId,
            page:++this.page
          }
        }).then(res=>{
          let resp = res.data
          if(resp.code = 200 && resp.message.length>0){               
            this.finished = false                      
            this.goodsList=this.goodsList.concat(resp.message)            
            // console.log(resp.message)
            // console.log(this.page)                      
          }else{
            this.finished = true
          }
          this.loading=false
        }).catch(err=>{
          console.log(err)
        })
      },
      clickFunc:function (indx,id) { 
        this.categoryIndx=indx
        this.getSubCategoryList(id)
        
       },
      getSubCategoryList:function (id) {
          axios({
            url:url.getCategorySubList,
            method:'post',
            data:{
              categoryId:id
            }
          }).then(res=>{
            console.log(res.data)
            let resp = res.data
            if(resp.code ==200){
               this.categorySubList=resp.message;
               this.active=0
               this.getCategorySubId(0)
            }
          }).catch(err=>{
          console.log(err)
        })
        }
    },
    mounted:function () {
      var twrp = document.querySelector('#twrp')
      var listWrp = document.querySelector('#listWrp')
      var pullOur = document.querySelector('#pullOur')
      var clientHet = document.documentElement.clientHeight || document.body.clientHeight
      twrp.style.height = clientHet - 46 + 'px'
      pullOur.style.height = clientHet - 90 + 'px'
    },
    created:function () {
        axios({
          url:url.getCategoryList,
          methods:'get'
        }).then(res=>{
          console.log(res.data)
          let resp = res.data
          if(resp.code ==200){
            this.categoryList=resp.message
            this.getSubCategoryList(resp.message[0]['ID'])
          }
        }).catch(err=>{
          console.log(err)
        })
      }
  }
</script>

<style scoped>
  a{
    color: #333;
  }
  .van-tab span{
    font-size: .6rem
  }
  .van-ellipsis{
    font-size: .6rem!important
  }
  #pullOur{
    overflow: auto
  }
  ul li.active{
    background-color: #fdfdfd;
    color: #333
  }
  #leftNav{
    color: #fff;
    height: 100%;
    font-size: 14px;
    line-height: 40px;
    background-color: #666;
    overflow:auto;
  }
  .van-row,.van-col{
    height: 100%;
  }

</style>