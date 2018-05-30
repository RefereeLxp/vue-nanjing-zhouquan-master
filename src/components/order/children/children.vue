<template>
  <div class="order-children">
    <div class="order-box" v-if="orderData.length >= 0 && firstLoading">
      <div class="order-list">
        <div class="order-item">
          <div class="o-status">
            <p class="le">
              等待买家付款
            </p>
            <p class="ri">
              23时57分后取消订单
            </p>
          </div>
          <div class="o-goods-box">
            <div class="img-box">
            </div>
            <div class="info-box">
              <h2>2018区块链拥抱未来全球高峰论坛入场票</h2>
              <div class="tips">数量：x2&nbsp;&nbsp;票种：A座</div>
              <div class="price">¥3000</div>
            </div>
          </div>
          <div class="o-btn">
            <a class="btn red fl">去支付</a>
            <a class="btn red fl">催单</a>
            <!-- <a class="btn red fl">再次购买</a> -->
            <a class="btn red fr">评价</a>
            <a class="btn fr">删除订单</a>
          </div>
        </div>
      </div>
      <LoadScroll :loadType="loadType"></LoadScroll>
    </div>
    <div class="nothing" v-if="orderData.length === 0 && firstLoading">
      <!-- 空的情况 -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LoadScroll from 'base/load-scroll/load-scroll'
export default {
  components: {
    LoadScroll
  },
  data () {
    return {
      queryData: { // 默认查询首页数据
        page: 1 // 参数1
      },
      firstLoading: false, // 进入时页面是否加载完成
      loadType: 1, // 加载更多标签
      orderData: [{}, {}], // 订单
      statusText: '等待买家付款'
    }
  },
  created () {
    this.loading.open({ // 添加等待
      spinnerType: 'snake'
    })
    this.getData()
  },
  beforeRouteUpdate (to, from, next) {
    this.resetDataAct()
    this.loading.open({ // 添加等待
      spinnerType: 'snake'
    })
    this.getData()
    next()
  },
  methods: {
    getData () {
      let routeData = this.$route.query
      this.queryData = Object.assign({}, this.queryData, routeData)
      console.log(this.queryData)
      setTimeout(() => {
        this.firstLoading = true // 首屏幕数据加载完之后，改为true
        this.loading.close()
      }, 500)
    },
    resetDataAct () { // 重置数据
      this.queryData = { // 默认查询首页数据
        page: 1 // 参数1
      }
      this.firstLoading = false // 进入时页面是否加载完成
      this.loadType = 1 // 加载更多标签
      this.orderData = [{}, {}] // 订单
    }
  },
  watch: {
    $route () {
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.order-children
  width: 100%
  position: relative
  padding-top: 10px
  .page-infinite-loading
    background: transparent
  .order-list
    .order-item
      background: #fff
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
      .o-status
        height: 26px
        line-height: 26px
        padding: 0 12px
        background: #ececec
        .le
          float: left
          color: #ff3636
        .ri
          float: right
          color: #666
      .o-goods-box
        display: flex
        padding: 12px 12px 0
        position: relative
        .img-box
          width: 100px
          height: 100px
          border: 1px solid #f0f0f0
          margin-right: 10px
        .info-box
          position: relative
          flex: 1
          width: 0
          h2
            height: 44px
            font-size: 16px
            line-height: 22px
            need-wrap()
          .tips
            margin-top: 14px
            color: #999
            no-wrap()
          .price
            font-size: 14px
            margin-top: 14px
            color: #ff3636
            letter-spacing: 0.5px
      .o-btn
        height: 50px
        font-size: 0
        padding: 12px
        .btn
          height: 26px
          padding: 0 12px
          line-height: 24px
          background: #fff
          color: #666
          border: 1px solid #f0f0f0
          border-radius: 2px
          display: block
          &.red
            color: #fff
            border-color: #ff3636
            background: #ff3636
          &.fl
            float: left
            margin-right: 10px
          &.fr
            float: right
            margin-left: 10px
</style>
