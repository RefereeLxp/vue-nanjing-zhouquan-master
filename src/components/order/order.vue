<template>
  <div class="order child-view">
    <header-pub headerTitle="全部订单"></header-pub>
    <div class="order-nav">
      <a v-for="(item, index) in navArray" :key="index" @click="addPath(item)" :class="{on: item.id === navActive}" class="item">{{item.name}}</a>
    </div>
    <!-- 订单列表 -->
    <router-view></router-view>
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
      navArray: [{'id': 1, 'name': '全部'}, {'id': 2, 'name': '待支付'}, {'id': 3, 'name': '审核中'}, {'id': 4, 'name': '待发货'}, {'id': 5, 'name': '待收货'}], // 导航选项
      navActive: 1 // 默认导航的id
    }
  },
  created () {
  },
  methods: {
    addPath (item) {
      this.navActive = item.id
      this.$router.push({path: '/order', query: item}) // 在根据后台需要传递参数在子路由中数据处理 这边可以不用动
    }
  },
  watch: {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.order
  .header-box
    .tit
      &:after
        content: ' '
        display: inline-block
        width: 0
        height: 3px
        margin-top: 4px
        margin-left: 5px
        border-style: solid
        border-width: 5px
        border-color: #ff3636 transparent transparent
        vertical-align: middle
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.order
  padding-top: 82px
  .order-nav
    width: 100%
    max-width: 750px; /*no*/
    background: #fff
    height: 40px
    position: fixed
    display: flex
    top: 42px
    line-height: 42px
    &:after
      line-scale()
      top: 0
      bottom: auto
    .item
      flex: 1
      text-align: center
      &.on
        color: #ff3636
</style>
