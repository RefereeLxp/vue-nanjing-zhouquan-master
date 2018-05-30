<template>
  <div class="sure-order child-view">
    <header-pub headerTitle="确认订单"></header-pub>
    <!-- 商品 -->
    <a class="sure-goods">
      <div class="img-box">
        <img src="http://img10.360buyimg.com/n7/jfs/t15772/297/2379608599/113987/f4771417/5ab0709fN7554e959.jpg">
      </div>
      <div class="info-box">
        <h2 class="name">2018区块链拥抱未来全球高峰论坛</h2>
        <div class="tips">数量：x2&nbsp;&nbsp;票种：A座</div>
        <div class="price">¥45.5</div>
      </div>
    </a>
    <!-- 收获地址 -->
    <div class="sure-address card-box">
      <div class="title">
        <h2>收获地址</h2>
      </div>
      <div class="adress-box info-box">
        <div class="address-1">
          <span class="name">杨刚</span>
          <span class="pho">13813007120</span>
          <div class="i-trans"><span class="trans">默认</span></div>
        </div>
        <div class="address-2">
          <i class="location"></i>
          <p>浙江省杭州市东方文化园金色大厅旁边的水世界二楼找叫王小星的人收</p>
        </div>
      </div>
    </div>
     <!-- 发票 -->
    <div class="sure-fp card-box">
      <div class="title">
        <h2>发票信息</h2>
        <div class="fp-need-btn">
          <mt-switch v-model="needFp"></mt-switch>
        </div>
      </div>
      <div class="info-fp" :class="{need: needFp}">
        <div class="fp-box info-box">
          <div class="fp-1">
            <span class="name">南京xx信息技术有限责任公司</span><div class="i-trans"><span class="trans">默认</span></div>
          </div>
          <div class="fp-2">
            <i class="email"></i>
            <p>995107408@qq.com</p>
          </div>
          <div class="fp-type fp-type-1"></div> <!-- fp-type-1 纸质 fp-type-2 电子 根据数据状态值获取 -->
        </div>
      </div>
    </div>
     <!-- 支付 -->
    <div class="sure-zf card-box">
      <div class="title">
        <h2>支付方式</h2>
      </div>
      <div class="zf-list" :class="`zf-type-${chooseZfType}`">
        <mt-radio
          v-model="chooseZfType"
          :max="1"
          align="right"
          :options="optionsZf">
        </mt-radio>
      </div>
    </div>
    <!-- 底部fix -->
    <div class="sure-btn">
      <div class="sum-box">总计：<span class="sum">¥3000.00</span></div>
      <div class="submit-btn">确认支付</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import HeaderPub from 'base/header/header-pub'
export default {
  mixins: [needMixin],
  components: {
    HeaderPub
  },
  data () {
    return {
      needFp: false, // 是否需要发票
      chooseZfType: '1', // 支付类型
      optionsZf: [ // 支付选择 图标固定死了
        {
          label: '微信支付',
          value: '1'
        },
        {
          label: '支付宝',
          value: '2'
        },
        {
          label: '对公转账',
          value: '3'
        }
      ]
    }
  },
  created () {
  },
  methods: {
  },
  watch: {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
// 对mint swich 改造
.mint-switch-input:checked + .mint-switch-core::before
  transform: none
.mint-switch-core::before
  content: ''
  text-align: left
  line-height: 32px
  color: #999
  text-indent: 65px
  background: 50% 50%/100% 100% no-repeat
  bg-image("~common/images/fp-swich")
.mint-switch-core,.mint-switch-core::before
  width: 100px
  border: none
  background-color: #f7f7f7
  height: 32px
.mint-switch-core::after
  height: 32px
  width: 50px
  border-radius: 16px
  box-shadow: none
  background: #999999
  transition: all .3s
.mint-switch-input:checked + .mint-switch-core::after
  transform: translateX(50px)
  background: #f53e3e
.mint-switch-input:checked + .mint-switch-core
  background-color: #f7f7f7
// 对按钮改造
.zf-list
  .mint-cell-wrapper
    background: #fff
    padding: 0 0
    .mint-radiolist-label
      padding: 0 10px 0 0
      .mint-radio-label
        display: block
        height: 40px
        padding-left: 40px
        line-height: 40px
        color: #808080
      .mint-radio
        margin-top: 10px
  .mint-cell:first-of-type
    .mint-radio-label
      background: url("~common/images/wx.png") left center/auto 30px no-repeat
  .mint-cell:nth-of-type(2)
    .mint-radio-label
      background: url("~common/images/zfb.png") 2px center/auto 28px no-repeat
  .mint-cell:nth-of-type(3)
    .mint-radio-label
      background: url("~common/images/gdg.png") 2px center/28px auto no-repeat
  .mint-radio-input:checked + .mint-radio-core
    background: #f53e3e
    border-color: #f53e3e
// 支付方式文字高亮无法通过自定义 想点办法解决了
.zf-type-1
  .mint-cell:first-of-type
    .mint-radio-label
      color: #333
.zf-type-2
  .mint-cell:nth-of-type(2)
    .mint-radio-label
      color: #333
.zf-type-3
  .mint-cell:nth-of-type(3)
    .mint-radio-label
      color: #333
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.sure-order
  padding-top: 52px
  padding-bottom: 52px
  .sure-goods
    height: 119px
    display: flex
    padding: 10px 12px
    background: #fff right 12px center/auto 12px no-repeat
    bg-image("~common/images/goto")
    .img-box
      width: 100px
      height: 100px
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
        font-size: 16px
        line-height: 1.7
        letter-spacing: 0.5px
        overflow: hidden
        no-wrap()
      .price
        position: absolute
        bottom: 4px
        color: #ff3636
        font-size: 14px
        letter-spacing: .5px
      .tips
        position: absolute
        bottom: 24px
        line-height: 1.4
        letter-spacing: .5px
        color: #adadad
  .card-box
    padding: 0 12px
    margin-top: 10px
    background: #fff
    .title
      height: 38px
      position: relative
      h2
        line-height: 38px
        font-size: 16px
    .info-box
      position: relative
      padding: 12px 0
      &:after
        line-scale()
        top: 0
        bottom: auto
      .i-trans
        width: 36px
        height: 16px
        display: inline-block
        position: relative
        background: #ff3636
        border-radius: 3px
        overflow: hidden
        margin-left: 5px
        vertical-align: middle
        margin-top: -1px
        span.trans
          line-height: 1
          display: block
          width: 72px
          height: 32px
          font-size: 24px
          text-align: center
          line-height: 32px
          transform: scale(.5)
          transform-origin: 0 0
          background: #ff3636
          color: #fff
  .sure-address
    .adress-box
      .address-1
        padding: 4px 0
        span
          line-height: 22px
          font-size: 16px
          vertical-align: middle
        .name
          margin-right: 25px
      .address-2
        display: flex
        margin-top: 10px
        .location
          width: 16px
          height: 16px
          margin-right: 5px
          color: #666
          background: url("~common/images/locat.png") 50% 50%/auto 16px no-repeat
        p
          flex: 1
          width: 0
          line-height: 1.5
  .sure-fp
    .title
      position: relative
      .fp-need-btn
        position: absolute
        right: 0
        top: 3px
    .info-fp
      position: relative
      height: 0px
      overflow: hidden
      transition: height 0.3s ease-out
      &.need
        height: 82px
    .fp-box
      .fp-1
        padding: 4px 0
        .name
          display: inline-block
          max-width: 300px
          line-height: 22px
          font-size: 16px
          vertical-align: middle
          no-wrap()
      .fp-2
        display: flex
        margin-top: 10px
        .email
          width: 16px
          height: 16px
          margin-right: 5px
          color: #666
          background: url("~common/images/locat.png") 50% 50%/auto 16px no-repeat
        p
          flex: 1
          width: 0
          line-height: 1.5
          no-wrap()
    .fp-type
      position: absolute
      right: 0
      bottom: 10px
      width: 50px
      height: 25px
      background: 50%/100% no-repeat
      &.fp-type-1
        bg-image("~common/images/fp-type-1")
      &.fp-type-2
        bg-image("~common/images/fp-type-2")
  .sure-btn
    position: fixed
    bottom: 0
    height: 42px
    width: 100%
    max-width: 750px; /*no*/ // 这个冒号必须要 不转rem
    z-index: 10
    display: flex
    background: #fff
    box-shadow: 0 0 5px #f7ebeb
    .sum-box
      flex: 1
      width: 0
      text-align: center
      line-height: 42px
      font-size: 14px
      white-space:nowrap
      .sum
        font-size: 16px
        color: #ff3636
    .submit-btn
      text-align: center
      background: #ff3636
      line-height: 42px
      color: #fff
      font-size: 16px
      letter-spacing: 0.5px
      width: 185px
</style>
