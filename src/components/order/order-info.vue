<template>
  <div class="order-info child-view">
    <header-pub :class="IsAttend?'white':'red-txt'" headerTitle="订单详情"></header-pub>
    <div class="order-info-all">
      <div class="notice-box ":class="IsAttend?'attend':'unattend'" >
        {{massage}}
      </div>
      <div class="info">
        <!--v-if="JSON.stringify(this.goodsInfo)!='{}'"-->
        <order-items :orderInfo="orderOption" ></order-items>
        <p class="time">
          <b class="type-name">订单号:</b>
          <span class="type-val">{{orderAllOption.OrderCode}}</span>
        </p>
        <p class="time">
          <b class="type-name">参会信息:</b>
          <span class="type-val">{{orderAllOption.start_time}}</span>
        </p>
        <div class="QR_code">
          <p class="QR-code-txt">
            <b class="type-name">参会二维码:</b>
            <span class="type-val">2342423423</span>
          </p>
          <div class="QR-code-info">
            <img :src="orderAllOption.qrcode_img" alt="">
            <span class="type-val">扫描二维码完成会场签到</span>
          </div>
        </div>
        <div class="address">
          <b class="type-name">参会地址:</b>
          <span class="type-val">{{orderAllOption.conference_address}}</span>
          <a href="#" class="go-map">导航 <i class="icon iconfont icon-paper-airplane"></i></a>
        </div>
        <footer class="footer-border"></footer>
      </div>
    </div>
    <footer class="footer-box">
      <div class="order-bth-box">
        <button class="order-bth">申请退款</button>
        <button class="order-bth">再次购买</button>
      </div>
      <footer-content></footer-content>
      <!--<div class="other">-->
        <!--<div class="other-btn"><i class="icon-box"></i>联系商家</div>-->
        <!--<div class="other-btn"><i class="icon-box"></i>拨打电话</div>-->
      <!--</div>-->
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import HeaderPub from 'base/header/header-pub'
import OrderItems from 'base/order-info/order-items'
import FooterContent from 'base/footer-content/footer-content'
import { FindOrdersByOrderId } from '@/api/api.js'
export default {
  mixins: [needMixin],
  components: {
    HeaderPub,
    OrderItems,
    FooterContent,
    FindOrdersByOrderId
  },
  data () {
    return {
      IsAttend:false,//是否参加会议
      massage:'已在2018.05.02 上午8:00参加会议',
      orderOption:{
        price_id:21,
        original_price:0.01,
        price_title:'A票',
        conference_id:6,
        conference_name:'区块链大会',
        main_picture:'http://202.119.65.28:8080/meeting_mall/img/meeting/1.jpg',
        counts:1
      },
      orderAllOption:{}
    }
  },
  created () {
    this._getAllData()
  },
  methods: {
    _getAllData(){
      let routeData = this.$route.query
      this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
      var query={OrderId:routeData.id},token=this.optionUserInfo.user_token;
      FindOrdersByOrderId(query,token).then((res) => {
        if (res.result === true && res.dataList) {
          this.orderAllOption=res.dataList[0]
          var orderOption={};
          var list=res.dataList;
          for(var i=0;i<list.length;i++){
            orderOption={
              price_id:-1,
              original_price:list[i].conference_price,
              price_title:list[i].price_title,
              conference_id:-1,
              conference_name:list[i].conference_name,
              main_picture:list[i].conference_img,
              counts:list[i].conference_count
            }
          }
          this.orderOption=orderOption
          if(this.orderAllOption.OrderStatus==4){
            this.massage='已于'+this.orderAllOption.start_time+'参加会议'
            this.IsAttend=true
          }else{
            this.massage='请于'+this.orderAllOption.start_time+'参加会议'
            this.IsAttend=false
          }
//          console.log(res.dataList)
        } else {
          this.toast(res.message)
//          setTimeout(() => {
////              this.$router.go(-1)
//          }, 2000)
        }
      })
    }
  },
  watch: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
body{
  color:#EDEDED;
}
box-width=96%;
.sure-goods{
  border-bottom: 1px solid #DBDBDB;
}
.order-info{
  min-height: 100%;
  position: relative;
  .footer-box{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .order-bth-box{
      width: 100%;
      display: flex;
      padding: 10px 0;
      margin-bottom: 6px;
      background: #fff;
      justify-content: flex-end;
      .order-bth{
        height: 30px;
        color: #fff;
        font-size: 0.38rem;
        box-shadow: none;
        border: 1px solid #F53E3E;
        margin-right: 15px;
        padding: 0 10px;
        background: #F53E3E;
        border-radius: 5px;
      }
    }
  }
}
.order-info-all{
  margin: 1.4rem 0 1.5rem;
  .notice-box{
    width: box-width;
    margin: 2% auto 3%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-radius: 5px;
    font-size: 0.43rem;
    color: #fff;
    letter-spacing: 1px;
  }
  .notice-box.attend{
    background: linear-gradient(left,#647CA7 0%,#819DCD 100%);
  }
  .notice-box.unattend{
    background: linear-gradient(left,#F54040 0%,#FF7373 100%);
  }
  .info{
    width: box-width;
    margin: 0 auto;
    padding: 0 12px;
    border: 1px solid transparent;
    position: relative;
    box-shadow: 0px 1px 4px #e6e6e6;
    background: #fff;
    .footer-border{
      width: 100%;
      position: absolute;
      height: 10px;
      left: 0;
      bottom: -9px;
      background: url("../../common/images/footer-round.png") repeat;
      background-size: 20px 10px;
    }
  }
  .type-name{
    font-size: 0.38rem;
    margin-right: 8px;
    color: #333;
  }
  .type-val{
    font-size: 0.38rem;
    color: #c1bdbd;
  }
  .time{
    height:42px;
    border-bottom: 1px solid #DBDBDB;
    line-height: 42px;
  }
  .QR_code{
    border-bottom: 1px solid #DBDBDB;
    .QR-code-txt{
      height:42px;
      line-height: 42px;
    }
    .QR-code-info{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 130px;
        height: 130px;
      }
      span{
        font-size: 0.4rem;
        height:30px;
        line-height: 30px;
        letter-spacing: 1px;
      }
    }
  }
  .address{
    margin: 12px 0 10px;
    position: relative;
    display: flex;
    .type-name{
      line-height: 20px;
    }
    .type-val{
      flex: 1;
      font-size: 0.38rem;
      line-height: 20px;
      letter-spacing: 1px;
    }
    .go-map{
      height:28px;
      line-height: 26px;
      padding: 0 6px;
      font-size: 0.36rem;
      color:#F53E3E;
      border: 1px solid #FC9595;
      border-radius: 10px;
    }
    &:after,&:before{
      content:'';
      position: absolute;
      width: 20px;
      height:20px;
      background: #f5f5f5;
      border-radius: 10px;
    }
    &:after{
     top: -23px;
     left: -19px;
    }
    &:before{
     top: -23px;
     right: -19px;
    }
  }
}
</style>
