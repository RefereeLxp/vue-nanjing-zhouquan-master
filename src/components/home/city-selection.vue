<template>
<div class="city-select child-view">
  <header-pub class="red" headerTitle="选择城市">
    <a class="share-tip"></a>
  </header-pub>
  <div class="city-select-all">
    <mt-search
      v-model="value"
      placeholder="输入城市名称或拼音"
    ></mt-search>
    <div class="city-box common-city">
      <span class="title">当前城市</span>
      <div class="city-btn city-active">南京</div>
    </div>
    <div class="city-box hot-city">
      <div class="title-box"><span class="title">热门城市</span></div>
      <div class="hot-city-box" v-if="cityOption.length>0">
        <div class="city-btn" v-for="(item, index) in cityOption" @click="Select_city(index)">{{item.city_name}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import HeaderPub from 'base/header/header-pub'
import { Search } from 'mint-ui';
import { findHotCities } from '@/api/api.js'
export default {
  mixins: [needMixin],
  components: {
    'mtSearch':Search,
    HeaderPub
  },
  data () {
    return {
      optionUserInfo:{}, //用户信息
      cityOption:{}, //城市信息
      value:''
    }
  },
  created(){
    this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
    this._getAllData()
  },
  methods: {
    _getAllData () {
      findHotCities().then((res) => {
        if (res.result === true && res.dataList) {
          this.cityOption = res.dataList
        } else {
          this.toast('您访问的内容不存在')
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        }
      })
    },
    Select_city (index) {
      console.log(this.cityOption[index])
    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  body{
    background: #fff;
  }
.mint-searchbar-cancel{
  color:#f86458;
}
.mint-searchbar{
  border: 1px solid #ffc2be;
  width: 96%;
  margin:10px auto;
  background: #FEFEFE;
  border-radius: 5px;
  padding: 0.2rem 10px;
  .mint-searchbar-inner .mintui-search{
    color: #ff787d;
    font-size: 0.5rem;
    margin-right: 3px;
  }
  .mint-searchbar-core,.mint-searchbar-cancel{
    font-size: 0.4rem;
  }
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
.city-select-all{
  margin: 1.4rem auto 1.5rem;
  background: #f1f1f1;
  width: 96%;
  .mint-search{
    height: auto;
  }

  .city-box{
    background: #fff;
    .title{
      font-size: 0.4rem;
      color: #7f7f7f;
      margin-right: 10px;
    }
    .city-btn{
      /*max-width: 100px;*/
      /*min-width: 60px;*/
      width: 23%;
      height: 32px;
      line-height: 30px;
      font-size: 0.4rem;
      text-align: center;
      border: 1px solid #DEDEDE;
      border-radius: 5px;
      padding: 0 15px;
      letter-spacing: 1px;
    }
  }
  .common-city{
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom:1px solid #e9e7e7;
    align-items: center;
    .city-btn{
      background: #F53E3F;
      border: 1px solid #F53E3F;
      color: #fff;
    }
  }
  .hot-city{
    .title-box{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
    }
    .hot-city-box{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .city-btn{
        margin: 8px 2% 8px 0;
      }
    }
  }
}
</style>
