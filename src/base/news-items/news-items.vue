<template>
  <router-link :to="`/meeting?con_id=${newsInfo.conference_id}`" class="news-items">
    <div class="img-box">
      <img :src="newsInfo.main_picture">
      <div class="tips-live" v-if="Number(newsInfo.type_id) === 1"></div>
      <div class="tips-bot">
        <div class="le">{{newsInfo.conference_address}}</div>
        <div class="ri">{{newsInfo.end_time}}</div>
      </div>
    </div>
    <div class="info-box">
      <h3>{{newsInfo.conference_name}}</h3>
      <div class="eyes">{{newsInfo.browseNum}}</div>
      <div class="price">¥{{newsInfo.price}} 没参数 起</div>
      <div class="time">{{newsInfo.dataDif}}</div>
    </div>
  </router-link>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    newsInfo: {
      type: Object,
      dafault: {}
    }
  },
  created () {
    console.log(this.newsInfo)
  },
  methods: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.news-items
  display: block
  padding: 12px
  background: #fff
  display: flex
  .img-box
    width: 157px
    height: 105px
    position: relative
    img
      display: block
      width: 100%
      height: 100%
      background: #f5f5f5
    .tips-live
      position: absolute
      width: 35px
      height: 14px
      background: 50% 50%/100% 100% no-repeat
      bg-image("~common/images/live")
      top:4px
      left: 4px
    .tips-bot
      position: absolute
      bottom: 0
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.1)))
      color: #fff
      width: 100%
      padding: 3px
      .le
        float: left
      .ri
        float: right
  .info-box
    margin-left: 12px
    flex: 1
    width: 0
    position: relative
    h3
      letter-spacing: 1px
      font-size: 13px
      overflow: hidden
      line-height: 1.5
      padding-top: 2px
      color: #666
      need-wrap()
    .eyes
      position: absolute
      bottom: 27px
      left: 0
      color: #808080
      line-height: 1.4
      background: left 1px/14px auto no-repeat
      padding-left: 18px
      bg-image("~common/images/eyes")
    .price
      color: #de0015
      position: absolute
      bottom: 0
      left: 0
      line-height: 1.4
    .time
      position: absolute
      bottom: 0
      color: #f0303a
      right: 0
      line-height: 1.4
      padding-left: 16px
      background: left 2px/10px auto no-repeat
      bg-image("~common/images/33")
</style>
