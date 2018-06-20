<template>
  <div class="refund-state child-view">
    <header-pub headerTitle="查看状态"></header-pub>
    <div class="refund-state-all">
      <div class="order-box">
        <order-items :orderInfo="orderOption" ></order-items>
      </div>
      <div class="state-box unfinish" v-if="!IsRefund">
        {{unfinish_massage}}
      </div>
      <div class="state-box finish" v-else-if="IsRefund">
        {{finish_massage}}
      </div>
      <div class="content-box">
        <footer-content></footer-content>
      </div>
    </div>
    <footer class="footer-box">
      <div class="footer-info">
        <div class="footer-btn cancel-btn">
          取消申请
        </div>
      </div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import HeaderPub from 'base/header/header-pub'
import OrderItems from 'base/order-info/order-items'
import FooterContent from 'base/footer-content/footer-content'

export default {
  mixins: [needMixin],
  components: {
    HeaderPub,
    OrderItems,
    FooterContent
  },
  data () {
    return {
      IsRefund:false,//是否退款完成
      unfinish_massage:'退款中 请耐心等待',
      finish_massage:'退款成功 费用已返回您的账户',
      orderOption:{
        price_id:21,
        original_price:0.01,
        price_title:'A票',
        conference_id:6,
        conference_name:'区块链大会',
        main_picture:'http://202.119.65.28:8080/meeting_mall/img/meeting/1.jpg',
        counts:1
      }
    }
  },
  created () {
    this._getAllData()
  },
  methods: {
    _getAllData () {
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
body{
  position: relative;
}
.refund-state-all{
  width: 100%;
  margin: 1.4rem 0 1.5rem;
  .order-box{
    width: 100%;
    .sure-goods{
      padding: 10px 0 ;
    }
  }
  .state-box{
    width: 100%;
    margin-top: 15px;
    height: 42px;
    font-size: 0.42rem;
    line-height: 42px;
    letter-spacing: 2px;
    text-align: center;
    color: #fff;
    &.finish{
       background: linear-gradient(left, #4A93B7 0%,#52B17E 100%);
     }
    &.unfinish{
       background: linear-gradient(left, #fc6868 0%,#f53e3e 100%);
     }
  }
  .content-box{
    margin-top: 10px;
  }
}
.footer-box{
  height: 42px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .footer-info{
    width: 100%;
    height: 100%;
    display: flex;
    line-height: 42px;
    align-items: center;
    justify-content: center;
    .footer-btn{
      font-size: 0.44rem;
      letter-spacing: 1px;
      color: #fff;
      flex: 1;
      text-align: center;
      height: 100%;
      &.cancel-btn{
         background: #F53E3E;
      }
    }
  }
}
</style>
