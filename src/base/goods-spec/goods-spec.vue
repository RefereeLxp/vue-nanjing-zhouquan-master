<template>
  <div class="po-box">
    <div class="po-header" @touchmove.prevent>
      <div class="img-box">
        <img :src="goodInfo.main_picture">
      </div>
      <div class="info-box">
        <h2 class="name">{{goodInfo.conference_name}}</h2>
        <!--<div class="price">¥45.5</div>-->
        <div class="kucun">{{goodInfo.capacity_number}}</div>
      </div>
    </div>
    <div class="po-body">
      <div class="spec-item">
        <span class="name">票价类型</span>
        <div class="box">
          <div class="type-box" :class="chooseId==item.price_id ? 'on' : '' "
             @click="ChoosePrice(item.price_id,item.current_price,item.price_title,goodInfo.conference_id,goodInfo.conference_name,goodInfo.main_picture)"
             v-for="item in goodInfo.priceList"
          >
            <div class="price">
              <p>现价 ¥{{item.current_price}}</p>
              <p v-if="item.original_price!=item.current_price">原价 <i>¥{{item.original_price}}</i></p>
            </div>
            <div>{{item.price_title}}</div>
          </div>
        </div>
      </div>
      <!--<div class="spec-item">-->
        <!--<span class="name">商品</span>-->
        <!--<div class="box">-->
          <!--<a>江南</a>-->
          <!--<a>致青春</a>-->
        <!--</div>-->
      <!--</div>-->
      <div class="spec-item special">
        <span class="name">数量</span>
        <div class="box">
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
    <div class="po-btn" @click="emitEvent">
      确定
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast }  from 'mint-ui'
export default {
  props: {
    goodInfo: {
      type: Object,
      dafault:{}
    }
  },
  data () {
    return {
      choosedData: {}, // 购买的数量与规格合集
      counter: 1,
      chooseId:-1
    }
  },
  created () {
    console.log(this.goodInfo)
  },
  methods: {
    minNum () { // 数量操作
      this.counter = this.counter - 1
    },
    addNum () { // 数量操作
      this.counter = this.counter + 1
    },
    emitEvent () { // 传递事件给父组建 在父组建上进行购买数据交互 规格数据得根据后台如何设计来进行传值先空着
//      this.choosedData = Object.assign({}, {'num': this.counter})
      console.log()
      if(this.choosedData.price_id==''||this.chooseId==-1){
        Toast({
          message: '请选择你要购买的类型',
          duration: 1000
        });
        return
      }
      this.choosedData.counts=this.counter
      this.$emit('emitEvent', this.choosedData)
    },
    ChoosePrice (price_id,original_price,price_title,conference_id,conference_name,main_picture) { //选择产品类型
      this.chooseId=price_id
      this.choosedData={
        price_id:price_id,
        original_price:original_price,
        price_title:price_title,
        conference_id:conference_id,
        conference_name:conference_name,
        main_picture:main_picture
      }
    }
  },
  watch: {
    counter (N) {
      if (N <= 1) {
        this.counter = 1
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.po-box
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  padding: 10px 0 42px
  display: flex
  flex-direction: column
  .po-header
    height: 119px
    display: flex
    padding-bottom: 14px
    margin: 0 20px
    border-bottom: 1px solid #efefef
    margin-bottom: 10px
    .img-box
      width: 105px
      height: 105px
      border: 1px solid #e5e5e5
      margin-right: 10px
      img
        width: 100%
        height: 100%
    .info-box
      flex: 1
      width: 0
      position: relative
      .name
        font-size: 14px
        line-height: 1.5
        letter-spacing: 1px
        overflow: hidden
        need-wrap()
      .price
        position: absolute
        bottom: 20px
        color: #ff3636
        font-size: 14px
        letter-spacing: .5px
      .kucun
        position: absolute
        bottom: 3px
        letter-spacing: .5px
        color: #adadad
  .po-body
    height: 0
    flex: 1
    position: relative
    overflow-x: hidden
    overflow-y: auto
    padding: 0 20px
    .spec-item
      font-size: 0
      display: flex
      margin: 9px 0 0
      .name
        font-size: 14px
        color: #adadad
        line-height: 28px
        margin-right: 12px
      .box
        flex: 1
        font-size: 0
        .type-box
          color: #adadad
          width: 100%
          margin-right: 14px
          border: 1px solid #dddddd; /* no */
          font-size: 14px
          min-height:30px
          border-radius: 3px
          padding: 2px 15px
          margin-bottom: 9px
          display:flex
          justify-content: space-between
          align-items: center
          &.on
           background: #ff3636
           border-color: #ff3636
          .price
            p
              line-height: 18px
              height: 18px
              i
                font-style:normal
                text-decoration:line-through

      &.special
        padding-bottom: 20px
        .number
          width: 90px
          height: 26px
          border-radius: 3px
          border: 1px solid #e5e5e5; /* no */
          display: flex
          .add
            width: 27px
            border-left: 1px solid #e5e5e5; /* no */
            text-align: center
            line-height: 24px
            extend-click()
            &.disable
              color: #999
          .min
            width: 27px
            border-right: 1px solid #e5e5e5; /* no */
            text-align: center
            line-height: 24px
            extend-click()
            &.disable
              color: #999
          .input
            width: 0
            flex: 1
            padding-top: 2px
            input
              width: 100%
              height: 20px
              text-align: center
              padding: 3px 0
              line-height: 14px
  .po-btn
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 42px
    background: #f53e3f
    text-align: center
    line-height: 42px
    font-size: 16px
    font-weight: 500
    color: #fff

.type-box.on {
  div{
    color: #fff;
  }
  p{
      color: #fff;
    i{
      color: #fff;
    }
  }
}

</style>
