<template>
  <div class="my-cart child-view">
    <div class="my-cart-all">
      <header-cart class="white" headerTitle="我的购物车">
        <a class="share-tip"></a>
      </header-cart>
      <div class="cart-list">
        <div class="cart-list-info">
          <div class="check">
            <span class="check-box"></span>
          </div>
          <div class="img">
            <img src="http://202.119.65.28:8080/meeting_mall/img/meeting/1.jpg" alt="">
          </div>
          <div class="txt">
            <p class="m-tit">第四届前端交流大会</p>
            <div>
              <p class="m-type">A等座</p>
              <p class="m-price">¥ 30.00</p>
              <div class="number">
                <div class="min" @touchmove.stop.prevent @click.stop.prevent="minNum" ref="minNum" :class="{disable: counter <= 1}">-</div>
                <div class="input">
                  <input name="pricenum" v-model="counter" type="tel">
                </div>
                <div class="add" @touchmove.stop.prevent @click.stop.prevent="addNum" ref="addNum" :class="{disable: counter >= 100}">+</div>
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
import HeaderCart from 'base/header/header-cart'
import { Checklist } from 'mint-ui'

export default {
  mixins: [needMixin],
  components: {
    HeaderCart,
    'mt-checklist':Checklist
  },
  data () {
    return {
      optionCarts: [],
      counter: 1,
      endTime:'2018-06-02 15:12:00'
    }
  },
  created () {
    this._getAllData() // 所有数据获取 然后赋值给对象，页面填充即可 所有接口都统一封装到api.js中统一管理
  },
  methods: {
    _getAllData () {
    },
    minNum () { // 数量操作
      this.counter = this.counter - 1
    },
    addNum () { // 数量操作
      this.counter = this.counter + 1
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.my-cart{
  width: 100%;
  .cart-list{
    margin-top: 50px;
    min-height: 100px;
    box-sizing: border-box;
    .cart-list-info{
      margin-top: 10px;
      height: 130px;
      display: flex;
      padding: 10px 15px;
      background: #fff;
      align-items: center;
      .check{
        height: 100%;
        display: flex;
        align-items: center;
        width: 30px;
        .check-box{
          display: flex;
          width: 20px;
          height: 20px;
          border-radius: 20px;
          border: 1px solid #c7c4c4;
        }
      }
      .img{
        height: 100%;
        width: 100px;
        display: flex;
        align-items: center;
        border: 1px solid #e2e3e4;
        img{
          width: 100px;
        }
      }
      .txt{
        flex: 1;
        height: 100%;
        width: 0;
        display: flex;
        margin-left: 10px;
        flex-direction: column;
        justify-content: space-between;
        .m-tit{
          font-size: 0.4rem;
          line-height: 0.48rem;
          color:#575757;
        }
        .m-type{
          font-size: 0.3rem;
          line-height: 0.3rem;
          color: #ABABAB;
        }
        .m-price{
          font-size: 0.38rem;
          line-height: 0.41rem;
          padding: 5px 0;
          color: #F65858;
        }
        .number{
          width: 78px;
          height: 25px;
          border-radius: 3px;
          border: 1px solid #e5e5e5; /* no */
          display: flex;
          .add {
            width: 24px;
            border-left: 1px solid #e5e5e5; /* no */
            text-align: center
            line-height: 24px
            extend-click();
          }
          .add.disable{
            color: #999;
          }
          .min{
             width: 24px;
             border-right: 1px solid #e5e5e5; /* no */
             text-align: center;
             line-height: 24px;
             extend-click();
          }
          .min.disable{
            color: #999;
          }
          .input{
            width: 0;
            flex: 1;
            padding-top: 2px;
            input{
              width: 100%;
              height: 20px;
              text-align: center;
              padding: 3px 0;
              line-height: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
