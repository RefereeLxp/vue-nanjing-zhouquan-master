<template>
  <div class="class-info child-view">
    <div class="class-info-box">
      <header-pub :headerTitle="type_name"></header-pub>
      <div class="new-box">
        <news-items v-for="(item, index) in optionNewsList" :newsInfo="item" :key="index"></news-items>
      </div>
      <transition name="router-fade" mode="out-in">
        <load-bg v-if="!allLoadEnd"></load-bg>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import HeaderPub from 'base/header/header-pub'
import NewsItems from 'base/news-items/news-items'
import { getNewsList } from '@/api/api.js'
import LoadBg from 'base/load-bg/load-bg'
export default {
  mixins: [needMixin],
  components: {
    HeaderPub,
    NewsItems,
    LoadBg
  },
  data () {
    return {
      type_name:'', //当前类型名称
      optionUserInfo:{}, //用户信息
      optionNewsList:[],
      queryData: { // 查询文章数据
        page: 1 // 参数1
      },
      classDate:{},
      allLoadEnd: false // 全部加载完成
    }
  },
  created () {
    this._getAllData()
  },
  methods: {
    _getAllData () {
      this.classDate.class_id=this.$route.query.class_id
      this.type_name=this.$route.query.class_name
      this.queryData = Object.assign({}, { page: 1 })
      let query = Object.assign({}, this.queryData, this.classDate)
      let promise1 = new Promise((resolve, reject) => {
        getNewsList(query).then((res) => {
          if (res.result === true && res.dataList) {
            setTimeout(() => {
              this.optionNewsList = res.dataList
              if (res.dataList.length > 10) {
                this.loadType = 1
              }
              this.loading.close()
            }, 700)
          } else {
            setTimeout(() => {
              this.optionNewsList = []
              this.loadType = 2
              this.loading.close()
            }, 700)
          }
        })
        let promiseAll = Promise.all([promise1])
        promiseAll.then(() => {
          // 所有数据完成后执行
          console.log('所有加载完成')
          setTimeout(() => {
            this.allLoadEnd = true
          }, 20)
        })
      })
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.new-box{
  margin: 1.3rem 0 1.5rem;
}
</style>
