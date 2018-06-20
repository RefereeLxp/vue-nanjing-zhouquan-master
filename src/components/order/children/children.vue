<template>
  <div class="order-children">
    <div class="order-box" v-if="orderData.length >= 0 && firstLoading">
      <div class="order-list"  v-for="(item, index) in orderData">
        <div class="order-item">
          <div class="o-status">
            <p class="le" v-if="state==1">
              等待买家付款
            </p>
            <p class="ri" v-if="state==1">
              23时57分后取消订单
            </p>
            <p class="le"  v-if="state==2">
              审核中，请耐心等待
            </p>
            <p class="le"  v-if="state==3">
              请及时参会
            </p>
          </div>
          <div class="o-goods-box">
            <div class="img-box">
              <img :src="item.conference_img" alt="">
            </div>
            <div class="info-box">
              <h2>{{item.conference_name}}</h2>
              <div class="tips">数量：x{{item.conference_count}}&nbsp;&nbsp;票种：{{item.price_title}}</div>
              <div class="price">¥{{item.conference_price}}</div>
            </div>
          </div>
          <div class="o-btn">
            <a class="btn fl" @click="DeleteOrders(item.OrderId)" v-if="state==1">删除订单</a>
            <!--<a class="btn red fl">催单</a>-->
            <!-- <a class="btn red fl">再次购买</a> -->
            <!--<a class="btn red fr">评价</a>-->
            <!--<a class="btn red fr" @click="FindOrders(item.OrderId)  v-if="state==3||state==4">查看详情</a>-->
            <a class="btn red fr" @click="FindOrders(item.OrderId)"  v-if="state==3||state==4">查看详情</a>
            <a class="btn red fr"  @click="PayOrders(item.ForeignOrderCode,conference_price)" v-if="state==1">去支付</a>
          </div>
        </div>
      </div>
      <LoadScroll :loadType="loadType"></LoadScroll>
    </div>
    <div class="nothing" v-if="JSON.stringify(orderData)=='{}' && firstLoading">
      <!-- 空的情况 -->
      <div style="width: 100%;margin: 10px 0; text-align: center">您还没有相关的订单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LoadScroll from 'base/load-scroll/load-scroll'
import { MessageBox } from 'mint-ui';
import { FindOrdersByUserId,DeleteOrdersByOrderId,FindOrdersByOrderId } from '@/api/api.js'
export default {
  components: {
    LoadScroll,
    MessageBox,
    FindOrdersByUserId,
    DeleteOrdersByOrderId
  },
  data () {
    return {
      queryData: { // 默认查询首页数据
        page: 1 // 参数1
      },
      firstLoading: false, // 进入时页面是否加载完成
      loadType: 1, // 加载更多标签
      orderData: {}, // 订单
      state:0,
      statusText: '等待买家付款',
      delText:'确定删除该订单？'
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
      setTimeout(() => {
        let routeData = this.$route.query
        this.orderData={}
        this.state=(routeData.id==null?1:routeData.id);
        this.queryData = Object.assign({}, this.queryData, routeData)
        this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
        var query={orderStatus:routeData.id},token=this.optionUserInfo.user_token;
        FindOrdersByUserId(query,token).then((res) => {
          if (res.result === true && res.dataList) {
            this.orderData=res.dataList
            console.log(res.dataList)
          } else {
//          this.toast(res.dataList.massage)
//          setTimeout(() => {
////              this.$router.go(-1)
//          }, 2000)
          }
        })
        setTimeout(() => {
          this.firstLoading = true // 首屏幕数据加载完之后，改为true
          this.loading.close()
        }, 500)
      }, 100)

    },
    resetDataAct () { // 重置数据
      this.queryData = { // 默认查询首页数据
        page: 1 // 参数1
      }
      this.firstLoading = false // 进入时页面是否加载完成
      this.loadType = 1 // 加载更多标签
      this.orderData = [{}, {}] // 订单
    },
//    删除订单
    DeleteOrders(id) {
      MessageBox.confirm(this.delText).then(action => {
        var query={OrderId:id},token=this.optionUserInfo.user_token;
        DeleteOrdersByOrderId(query,token).then((res) => {
          if (res.result === true) {
            this.toast(res.message)
          } else {
            this.toast(res.massage)
//            setTimeout(() => {
//  //              this.$router.go(-1)
//            }, 2000)
          }
        })
      });
    },
//    未完成订单支付
    PayOrders(order_sn,money){
      var query={order_sn:order_sn,money:money}
      this.$router.push({path: '/payment',query:query})
    },
    FindOrders(id){
      var query={id:id}
      this.$router.push({path: '/order-info',query:query})
//      var query={orderStatus:routeData.id},token=this.optionUserInfo.user_token;
//      FindOrdersByUserId(query,token).then((res) => {
//        if (res.result === true && res.dataList) {
//          this.orderData=res.dataList
//          console.log(res.dataList)
//        } else {
////          this.toast(res.dataList.massage)
////          setTimeout(() => {
//////              this.$router.go(-1)
////          }, 2000)
//        }
//      })
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

  .img-box{
    align-items: center;
    display:flex;
    img{
      display: block;
      width: 100%;
      /*height: 100%;*/
      background: #f5f5f5;
    }
  }
</style>
