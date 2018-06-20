<template>
  <div class="finish child-view">
    <header-pub class="white" headerTitle="交易完成">
      <a class="share-tip"></a>
    </header-pub>
    <div class="state-box">
      <img src="../../common/images/finish.png" alt="">
    </div>
    <div class="btn-box">
      <div class="btn">
        <div>订单详情</div>
      </div>
      <div class="btn">
        <div>立即评价</div>
      </div>
    </div>
    <div class="show-other" v-if="optionOther.length>0">
      <p>再看看其他商品吧~</p>
      <div class="show-other-info">
        <div class="show-other-box"  v-for="(item, index) in optionOther">
          <div class="img">
            <img :src="item.url" alt="">
          </div>
          <div class="title">
            {{item.name}}
          </div>
          <div class="other">
            <div class="price">¥ {{item.price}} 起</div>
            <div class="add">
              <i class="icon iconfont icon-gouwuche4"></i>
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
export default {
  mixins: [needMixin],
  components: {
    needMixin,
    HeaderPub
  },
  data () {
    return {
      optionUserInfo:{},//用户信息
      optionOther:[
        {name:'四大皆空灰色空间发货速度快解放后上客服电话',price:'300.00',url:'http://202.119.65.28:8080/meeting_mall/img/meeting/5.png'},
        {name:'黄金时代可减肥会使肌肤哈萨克绝代风华',price:'300.00',url:'http://202.119.65.28:8080/meeting_mall/img/meeting/4.png'},
        {name:'市扶绥我五二五IE让我IE让我一会计师费会',price:'300.00',url:'http://202.119.65.28:8080/meeting_mall/img/meeting/4.png'},
        {name:'但是福建省地方海事局款到发货是否师粉红色的',price:'300.00',url:'http://202.119.65.28:8080/meeting_mall/img/meeting/5.png'}

      ]
    }
  },
  created () {
    this._getAllData()
  },
  methods: {
    _getAllData () {
      this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
    },
  },
  watch: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
  .finish{
    width: 100%;
    .state-box{
      padding: 10px;
      width: 100%;
      height: 200px;
      margin-top: 40px;
      background: #F6F5F5;
      img{
        width: 100%;
        /*bg-image("~common/images/finish")*/
      }
    }
    /*选择按钮*/
    .btn-box{
      width: 100%;
      height: 48px;
      background: #fff;
      display:flex;
      .btn{
        flex: 1;
        display:flex;
        align-items: center;
        justify-content: center;
        div{
          width: 110px;
          height: 26px;
          line-height: 25px;
          border-radius: 3px;
          text-align: center;
          font-size: 0.38rem;
          color: #F64242;
          box-shadow: inset 0px 0px 1px #f58c8c;
          border: 1px solid #FCA7A7;
        }
      }
    }
    .show-other{
      width: 100%;
      p{
        padding: 17px;
        font-size: 0.35rem;
        text-align: center;
        letter-spacing: 1px;
        color: #8F8E8E;
      }
      .show-other-info{
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        .show-other-box{
          width: 48%;
          min-width: 48%;
          height: 195px;
          background: #fff;
          display: flex;
          flex-direction: column;
          margin-bottom:20px;
          box-shadow:-1px 1px 4px #dcdcdc;
          .img{
            width: 100%;
            height: 125px;
            display: flex;
            line-height: 125px;
            background: #ececec;
            img{
              width: 100%;
            }
          }
          .title{
            height: 40px;
            font-size: 0.35rem;
            color: #8F8E8E;
            line-height: 20px;
            padding: 0 5px;
            margin-top: 3px;
          }
          .other{
            padding: 0 5px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price{
              color: #F53B3C;
              font-size: 0.30rem;
            }
            .add{
              width: 22px;
              height: 22px;
              border-radius: 3px;
              line-height: 22px;
              text-align: center;
              background: #F53B3C;
              i{
                font-size: 0.5rem;
                color: #fff;
              }
            }
          }
        }
        .show-other-box:nth-child(odd){
          margin-right: 4%;
          box-shadow:
            1px 1px 4px #dcdcdc;
        }
      }
    }
  }
</style>
