<template>
  <div class="home child-view">
    <div class="box-all">
      <!-- header -->
      <div class="home-header">
        <div class="locat">{{curCity}}</div>
        <div class="model-input">
          <div class="search-swiper">
            <swiper :options="swiperOptionSearch" ref="searchSwiper" v-if="optionSearch.length>0">
              <swiper-slide v-for="(item, index) in optionSearch" :key="index">
                <a>{{item.hotwords_name}}</a>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <a class="dy">订阅</a>
      </div>
      <!-- banner -->
      <div class="home-banner">
        <div class="banner-swiper">
          <swiper :options="swiperOptionBanner" ref="bannerSwiper" v-if="optionBanner.length>0">
            <swiper-slide v-for="(item, index) in optionBanner" :key="index">
              <a :href="item.link"><img :src="item.picture_path"></a>
            </swiper-slide>
            <div class="home-swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <!-- 滚动标签 -->
      <div class="home-nav" v-if="optionNav.length>0">
        <div class="nav-scroll-box">
          <div class="nav-scroll">
            <div class="item" v-for="(item, index) in optionNav" :class="{on: navActive === index}" :key="index" @click="changeNewsList(index)">{{item.class_name}}</div>
          </div>
        </div>
      </div>
      <div class="home-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="load"
          infinite-scroll-immediate-check="false"
          infinite-scroll-distance="10"
          ref="homeList"
          :class="{scroll: needScroll}"
      >
        <news-items v-for="(item, index) in optionNewsList" :newsInfo="item" :key="index"></news-items>
        <LoadScroll :loadType="loadType"></LoadScroll>
      </div>
    </div>
    <transition name="router-fade" mode="out-in">
      <load-bg v-if="!allLoadEnd"></load-bg>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import NewsItems from 'base/news-items/news-items'
import LoadScroll from 'base/load-scroll/load-scroll'
import LoadBg from 'base/load-bg/load-bg'
import { getHomeBanner, getHomeNav, getNewsList, getHomeKeyWords } from '@/api/api.js' // 获取数据接口采用多条http请求
export default {
  mixins: [needMixin],
  components: {
    NewsItems,
    LoadScroll,
    LoadBg
  },
  data () {
    return {
      swiperOptionBanner: {
        loop: true,
        speed: 600,
        pagination: '.home-swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        autoplay: 3000,
        autoHeight: true,
        autoplayDisableOnInteraction: false
      },
      swiperOptionSearch: {
        direction: 'vertical',
        speed: 300,
        autoplay: 5000,
        autoplayDisableOnInteraction: false
      },
      curCity: '全国', // 当前城市
      optionSearch: [],
      optionBanner: [], // 轮播数据
      optionNav: [], // NAV数据
      optionNewsList: [], // 列表数据
      navActive: 0, // 当前导航
      loadType: 1, // 加载更多标签
      load: true,
      queryData: { // 查询文章数据
        page: 1 // 参数1
      },
      needScroll: true,
      allLoadEnd: false // 全部加载完成
    }
  },
  created () {
    this._getAllData()
  },
  methods: {
    changeNewsList (index) { // 点击执行数据刷新
      this.loading.open({
        spinnerType: 'snake'
      })
      this.needScroll = false
      this.navActive = index
      // 初始化列表数据
      this.queryData = Object.assign({}, { page: 1 })
      let query = Object.assign({}, this.queryData, this.optionNav[this.navActive])
      getNewsList(query).then((res) => {
        if (res.result === true && res.dataList) {
          setTimeout(() => {
            this.needScroll = true
            this.optionNewsList = res.dataList
            if (res.dataList.length > 10) {
              this.loadType = 1
            }
            this.$refs.homeList.scrollTop = 0
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
    },
    _getAllData () { // 数据获取
      let promise1 = new Promise((resolve, reject) => {
        // 获取轮播数据
        getHomeBanner().then((res) => {
          if (res.result === true) { // 后台规范 写的什么玩意儿后台 跨域都跨不过去
            this.optionBanner = res.pic_info
            resolve(res.pic_info)
          } else {
            console.error('数据加载失败')
          }
        })
      })
      let promise2 = new Promise((resolve, reject) => {
        // 获取首屏底部文章数据
        getHomeNav().then((res) => {
          // 获取首屏底部文章导航数据
          if (res.result === true) {
            this.optionNav = res.dataList
            let query = Object.assign({}, this.queryData, this.optionNav[0]) // 参数不高兴筛选
            getNewsList(query).then((resc) => {
              if (res.result === true && resc.dataList) {
                this.optionNewsList = resc.dataList
                if (resc.dataList.length < 10) {
                  this.loadType = 2
                }
                resolve(resc.dataList)
              } else {
                console.error('数据加载失败')
              }
            })
          } else {
            console.error('数据加载失败')
          }
        })
      })
      let promise3 = new Promise((resolve, reject) => {
        // 获取首屏关键词数据
        getHomeKeyWords().then((res) => {
          if (res.result === true) {
            this.optionSearch = res.dataList
            resolve(res.hotwords)
          } else {
            console.error('数据加载失败')
          }
        })
      })
      let promiseAll = Promise.all([promise1, promise2, promise3])
      promiseAll.then(() => {
        // 所有数据完成后执行
        setTimeout(() => {
          this.allLoadEnd = true
          this.load = false // 允许滚动
        }, 20)
      })
    },
    loadMore () {
      this.load = true
      this.queryData.page = this.queryData.page + 1
      let query = Object.assign({}, this.queryData, this.optionNav[this.navActive])
      getNewsList(query).then((res) => {
        this.optionNewsList = this.optionNewsList.concat(res.data)
        if (res.data.length < 10) { // 数据每页10条
          this.load = true
          this.loadType = 2
        } else {
          this.load = false
          this.loadType = 1
        }
      })
    }
  },
  deactivated () {
    if (this.$refs.bannerSwiper) { // 优化路由跳转轮播定时器bug
      this.$refs.bannerSwiper.swiper.stopAutoplay()
    }
    if (this.$refs.searchSwiper) { // 优化路由跳转轮播定时器bug
      this.$refs.searchSwiper.swiper.stopAutoplay()
    }
  },
  activated () {
    if (this.$refs.bannerSwiper) { // 优化路由跳转轮播定时器bug
      this.$refs.bannerSwiper.swiper.startAutoplay()
    }
    if (this.$refs.searchSwiper) { // 优化路由跳转轮播定时器bug
      this.$refs.searchSwiper.swiper.startAutoplay()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home
  .swiper-container-horizontal
    .home-swiper-pagination
      position: absolute
      z-index: 1
      text-align: center
      bottom: 6px !important
      .swiper-pagination-bullet
        margin: 0 3px
        width: 6px
        height: 6px
        opacity: 1
        background: RGB(204, 204, 204)
        transition: all 0.3s
        &.swiper-pagination-bullet-active
          background: RGB(255, 255, 255)
          width: 12px
          border-radius: 5px
  .swiper-container-vertical
    .swiper-wrapper
      height: 30px
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
.router-fade-leave-active
  transition: opacity .3s
.router-fade-enter, .router-fade-leave-active
  opacity: 0
@import "~common/stylus/mixin"
.home
  background: #f5f5f5
  width: 100%
  bottom: 50px
  .box-all
    width: 100%
    height: 100%
    position: relative
  .home-header
    position: fixed
    z-index: 100
    height: 44px
    width: 100%
    max-width: 750px; /*no*/
    display: flex
    padding-top: 6px
    padding-bottom: 6px
    .locat
      margin-left: 16px
      font-size: 16px
      color: #fff
      line-height: 0
      padding: 15px 20px 15px 0
      letter-spacing: 1px
      background: right center/12px auto no-repeat
      max-width: 90px
      overflow: hidden
      bg-image("~common/images/scraqe")
    .dy
      margin-left: 16px
      margin-right: 16px
      font-size: 16px
      color: #fff
      line-height: 0
      padding: 15px 0 15px 0
      letter-spacing: 1px
    .model-input
      margin-left: 10px
      flex: 1
      width: 0
      background: rgba(255, 255, 255, .7)
      height: 30px
      border-radius: 30px
      padding-right: 30px
      background: rgba(255, 255, 255, .7) right 10px center/14px auto no-repeat
      bg-image("~common/images/search")
      .search-swiper
        width: 100%
        overflow: hidden
        position: relative
        .swiper-slide
          height: 30px
          width: 100%
          a
            text-indent: 30px
            display: block
            height: 30px
            width: 100%
            text-align: center
            color: #999
            line-height: 30px
            font-size: 14px
            letter-spacing: 1px
            no-wrap()
  .home-banner
    height: 157px
    width: 100%
    background: #fff
    overflow: hidden
    position: relative
    z-index: 1
    .banner-swiper
      .swiper-slide
        img
          width: 100%
          height: 157px
  .home-nav
    position: relative
    -webkit-overflow-scrolling: touch
    overflow: hidden
    z-index: 0
    height: 48px
    background: #fff
    box-shadow: 0 0 5px 0 #fdf9f9
    .nav-scroll-box
      position: relative
      overflow-x: auto
      overflow-y: hidden
      height: 70px
      .nav-scroll
        display: block
        width: 10000px
        .item
          font-size: 14px
          color: #999
          line-height: 48px
          float: left
          padding: 0 17px
          text-align: center
          position: relative
          letter-spacing: 1px
          &.on
            color: #ef011d
            &:after
              content: ' '
              position: absolute
              height: 2px
              bottom: 0
              left: 19px
              right: 19px
              background: #ef011d
  .home-list
    position: absolute
    top: 211px
    bottom: 0
    background: #fff
    width: 100%
    overflow-x: hidden
    overflow-y: auto
    -webkit-overflow-scrolling: auto
    &.scroll
      -webkit-overflow-scrolling: touch
    .news-items
      border-bottom: 1px solid #ededed
      &:last-child
        border-bottom: none
</style>
