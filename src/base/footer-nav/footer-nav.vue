<template>
  <div class="footer-nav">
    <ul>
      <router-link to="/home" tag="li" class="nav-1"><i class="nav-1"></i><span>首页</span></router-link>
      <!--<router-link to="/site/index/sitemap" tag="li" class="nav-2"><i class="nav-2"></i><span>分类</span></router-link>-->
      <router-link to="/classify" tag="li" class="nav-2"><i class="nav-2"></i><span>分类</span></router-link>
      <router-link to="/cart" tag="li" class="nav-3"><i class="nav-3"></i><span>购物车</span></router-link>
      <!--<li class="nav-4"><a :href="addElHref('/ucenter/index')"><i class="nav-4"></i><span>我的</span></a></li>-->
      <router-link to="/mine" tag="li" class="nav-4"><i class="nav-4"></i><span>我的</span></router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    addElHref (href) {
      return `${href}`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .footer-nav
    height: 49px
    ul
      box-shadow: 0 0 2px rgba(0, 0, 0, .15)
      position: fixed
      bottom: 0
      background: RGB(255, 255, 255)
      z-index: 10
      height: 49px
      width: 100%
      max-width: 750px; /*no*/
      display: flex
      li
        width: 25%
        text-align: center
        padding-top: 6px
        a
          display: block
        i
          display: block
          width: 100%
          height: 22px
          background-size: auto 22px
          background-repeat: no-repeat
          background-position: 50%
          transition: all 0.3s
          &.nav-1
            bg-image("./images/nav1")
          &.nav-2
            bg-image("./images/nav2")
            background-size: auto 17px
          &.nav-3
            bg-image("./images/nav3")
          &.nav-4
            bg-image("./images/nav4")
        span
          display: block
          margin-top: 6px
          font-size: 10px
          color: #999999
          transition: all 0.3s
        &.router-link-active.router-link-exact-active
          span
            color: #ef2531
          i
            &.nav-1
              bg-image("./images/nav1c")
            &.nav-2
              bg-image("./images/nav2c")
            &.nav-3
              bg-image("./images/nav3c")
            &.nav-4
              bg-image("./images/nav4c")
</style>
