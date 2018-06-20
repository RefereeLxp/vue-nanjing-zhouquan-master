<template>
  <div class="my-list child-view">
    <div class="my-list-all">
      <header-pub class="white" headerTitle="我的足迹">
        <a class="share-tip"></a>
      </header-pub>
      <div class="my-list-box" v-if="optionTracks.length>0">
        <div class="my-list-info" v-for="(item, index) in optionTracks">
          <div class="my-list-item">
            <div class="img-box">
              <img :src="item.conference_img" alt="">
            </div>
            <div class="info-box">
              <p class="m-tit">{{item.conference_name}}</p>
              <div>
                <p class="m-price">¥ {{item.conference_price}}</p>
                <p class="m-collect"><i class="icon iconfont icon-xin1"></i>收藏</p>
              </div>
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
import { findFootprintByUserId} from '@/api/api.js' // 获取数据接口采用多条http请求
export default {
  mixins: [needMixin],
  components: {
    HeaderPub,
  },
  data () {
    return {
      optionTracks: [],
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
        findFootprintByUserId(token).then((res) => {
//          console.log(res)
          if (res.result === true) {
            this.optionTracks = res.dataList
//            resolve(res.hotwords)
          } else {
            console.error('数据加载失败')
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.my-list-box{
  margin-top: 1.4rem;
  margin-bottom:1.5rem;
  width: 100%;
  .my-list-info{
    width: 100%;
    .my-list-item{
      width: 100%;
      display: flex;
      background: #fff;
      padding:10px;
      .img-box {
        width: 100px;
        height: 100px;
        border: 1px solid #f0f0f0;
        line-height: 100px;
        margin-right: 10px;
        img{
          width: 100%;
        }
      }
      .info-box{
        flex: 1;
        width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .m-tit{
          font-size: 0.4rem;
          line-height: 0.48rem;
          color:#575757;
        }
        .m-collect{
          font-size: 0.3rem;
          line-height: 0.48rem;
          display: flex;
          align-items: center;
          /*color: #F65858;*/
          i{
            font-size: 0.5rem ;
            color: #F65858;
          }
        }
        .m-price{
          font-size: 0.4rem;
          line-height: 0.48rem;
          padding: 10px 0;
          color: #F65858;
        }
      }
    }
  }
}
</style>
