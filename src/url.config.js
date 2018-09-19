const Base='http://localhost:3000'
const Url ={
  Home:Base+'/home',
  RegisterUser:Base+'/user/register',
  loginUser:Base+'/user/login',
  goodsDetail:Base+'/goods/getDetailGoodsInfo',
  getCategoryList:Base+ '/goods/getCategoryList',
  getCategorySubList:Base+ '/goods/getCategorySubList',
  getGoodsList:Base+ '/goods/getGoodsList',
}

module.exports=Url
