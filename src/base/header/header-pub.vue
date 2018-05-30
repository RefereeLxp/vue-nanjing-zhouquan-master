<template>
  <div class="header-box">
    <div class="go-back" @click="goBack"></div>
    <div class="tit">{{headerTitle}}</div>
    <div class="right-btn">
      <slot></slot>
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
    }
  },
  created () {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.header-box
  height: 42px
  background: RGB(255, 255, 255)
  position: fixed
  top: 0
  width: 100%
  max-width: 750px; /*no*/
  z-index: 10
  &:after
    display: none
    line-scale()
  &.red
    background: url("~common/images/bg.png") 50% 50%/100% 100% no-repeat
    .go-back
      bg-image("~common/images/goback")
    .tit
      color: #fff
    &:after
      display: none
  .tit
    text-align: center
    width: 100%
    line-height: 42px
    font-size: 18px
    color: #f53e3e
  .go-back
    width: 42px
    height: 42px
    position: absolute
    left: 0
    top: 0
    background: 50% 50%/10px 18px no-repeat
    bg-image("~common/images/goback-normal")
  .right-btn
    position: absolute
    right: 12px
    top: 0
    height: 42px
  &.white
    background: #fff
    .go-back
      bg-image("~common/images/goback")
    .tit
      color: #333
</style>
