<template>
<div class="classify child-view">
  <div class="my-classify-all">
    <header-pub class="red" headerTitle="分类">
      <a class="share-tip"></a>
    </header-pub>
    <div class="my-classify-box" v-if="optionClass.length>0">
      <div class="my-classify-info" v-for="(item, index) in optionClass" @click="ClassCheck(item.class_id,item.class_name)">
        <div class="box">
          <div class="icon">
            <img :src="item.class_picture" alt="">
          </div>
          <div class="name">{{item.class_name}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import HeaderPub from 'base/header/header-pub'
import { getHomeNav} from '@/api/api.js' // 获取数据接口采用多条http请求
export default {
  mixins: [needMixin],
  components: {
    HeaderPub,
    getHomeNav
  },
  data () {
    return {
      optionClass: [],
      optionUserInfo:{} //用户信息
    }
  },
  created () {
    this._getAllData() // 所有数据获取 然后赋值给对象，页面填充即可 所有接口都统一封装到api.js中统一管理
  },
  methods: {
    _getAllData () {
//      this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
      let promise1 = new Promise((resolve, reject) => {
        getHomeNav().then((res) => {
          if (res.result === true) {
            this.optionClass = res.dataList
          } else {
            console.error('数据加载失败')
          }
        })
      })
    },
    ClassCheck (id,name) {
      this.$router.push({path: '/classinfo', query: {class_id:id,class_name:name}})
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .classify{
    min-height: 100%;
    background: #fff;
  }
  .my-classify-box{
    margin: 1.4rem 0 1.5rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .my-classify-info{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 12px 0;
      min-width: 50%;
      .box{
        display: flex;
        height: 110px;
        width: 130px;
        flex-direction: column;
        .icon{
          width: 100%;
          height: 80px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .name{
          width: 100%;
          text-align: center;
          line-height: 30px;
          font-size: 0.35rem;
          color: #666;
        }
      }
    }
    /*.my-classify-info:nth-child(1),.my-classify-info:nth-child(2){*/

    /*}*/
  }
</style>
