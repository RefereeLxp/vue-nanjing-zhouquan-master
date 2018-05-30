<template>
  <transition name="opacity">
    <div class="mint-indicator" @touchstart.stop.prevent @touchmove.stop.prevent @touchend.stop.prevent>
      <div class="mint-indicator-wrapper" :style='TopHeight' style="padding: 20px;">
        <span class="mint-indicator-spin">
          <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;">
          </div>
        </span>
      </div>
      <div class="mint-indicator-mask">
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  computed: {
    TopHeight () {
      return `top: ${document.documentElement.clientHeight / 2}px`
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"
  .mint-indicator
    z-index: 1001
    position: relative
  .mint-spinner-fading-circle-circle::before
    background: #999
  .opacity-enter-active,.opacity-leave-active
    transition: all 0.5s
  .opacity-enter,.opacity-leave-to
    opacity: 0
</style>
