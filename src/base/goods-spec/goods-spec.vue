<template>
  <div class="po-box">
    <div class="po-header" @touchmove.prevent>
      <div class="img-box">
        <img src="http://img10.360buyimg.com/n7/jfs/t15772/297/2379608599/113987/f4771417/5ab0709fN7554e959.jpg">
      </div>
      <div class="info-box">
        <h2 class="name">2018区块链拥抱未来全球高峰论坛</h2>
        <div class="price">¥45.5</div>
        <div class="kucun">库存12334件</div>
      </div>
    </div>
    <div class="po-body">
      <div class="spec-item">
        <span class="name">商品</span>
        <div class="box">
          <a class="on">江南</a>
          <a>致青春</a>
          <a>致青春</a>
          <a>致青春</a>
          <a>致青春</a>
          <a>致青春</a>
          <a>致青春致青春致青春</a>
        </div>
      </div>
      <div class="spec-item">
        <span class="name">商品</span>
        <div class="box">
          <a>江南</a>
          <a>致青春</a>
        </div>
      </div>
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
export default {
  props: {
    headerTitle: {
      type: String,
      dafault: ''
    }
  },
  data () {
    return {
      choosedData: {}, // 购买的数量与规格合集
      counter: 1
    }
  },
  created () {
  },
  methods: {
    minNum () { // 数量操作
      this.counter = this.counter - 1
    },
    addNum () { // 数量操作
      this.counter = this.counter + 1
    },
    emitEvent () { // 传递事件给父组建 在父组建上进行购买数据交互 规格数据得根据后台如何设计来进行传值先空着
      this.choosedData = Object.assign({}, {'num': this.counter})
      this.$emit('emitEvent', this.choosedData)
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
        line-height: 26px
        margin-right: 12px
      .box
        flex: 1
        font-size: 0
        a
          color: #adadad
          display: inline-block
          min-width: 80px
          margin-right: 14px
          height: 26px
          border: 1px solid #dddddd; /* no */
          line-height: 24px
          font-size: 14px
          text-align: center
          border-radius: 3px
          padding: 0 15px
          margin-bottom: 9px
          &.on
            background: #ff3636
            color: #fff
            border-color: #ff3636
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
</style>
