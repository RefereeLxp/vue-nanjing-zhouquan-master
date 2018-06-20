<template>
  <div class="my-site child-view">
    <div class="my-site-all">
      <header-pub class="white" headerTitle="收货地址">
        <a class="share-tip"></a>
      </header-pub>
      <!---->
      <div class="my-site-box">
        <div  v-if="optionAddress.length>0">
          <div class="my-site-info" v-for="(item, index) in optionAddress">
            <div class="user-info">
              <div>
                <span class="name">{{item.ShipName}}</span>
                <span class="tel">{{item.CelPhone}}</span>
              </div>
              <div>
                <div class="state">状态</div>
              </div>
            </div>
            <div class="site">
              <i>22</i>
              <span class="address">{{item.Address}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { needMixin } from 'common/js/mixin'
  import HeaderPub from 'base/header/header-pub'
  import { findShippingAddressByUserId } from '@/api/api.js' // 获取数据接口采用多条http请求
  export default {
    mixins: [needMixin],
    components: {
      HeaderPub ,
    },
    data () {
      return {
        optionAddress: [], //用户收货地址
        optionUserInfo:{} //用户信息
      }
    },
    created () {
      this._getAllData() // 所有数据获取 然后赋值给对象，页面填充即可 所有接口都统一封装到api.js中统一管理
    },
    methods: {
      _getAllData () {
        this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
        let promise1 = new Promise((resolve, reject) => {
          var token=this.optionUserInfo.user_token
          console.log(token)
          findShippingAddressByUserId(token).then((res) => {
            if (res.result === true) {
              this.optionAddress = res.dataList
            } else {
              console.error('数据加载失败')
            }
          })
        })
      }
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
.my-site-box{
  margin-top: 1.4rem;
  margin-bottom:1.5rem;
  width: 100%;
  .my-site-info{
    width: 100%;
    padding: 0 10px;
    margin: 10px 0;
    min-height: 60px;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px #ddd;
    display: flex;
    flex-direction: column;
    .user-info{
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
    .site{
      min-height: 30px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

