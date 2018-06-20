<template>
  <!--:to="`/meeting?con_id=${newsInfo.conference_id}`"-->
  <div  @click="toNewsInfo(newsInfo.conference_id,newsInfo.type_id)" class="news-items">
    <div class="img-box">
      <img :src="newsInfo.main_picture">
      <div class="tips-live type1" v-if="Number(newsInfo.type_id) === 1||Number(newsInfo.type_id) === 3"></div>
      <div class="tips-live type2" v-if="Number(newsInfo.type_id) === 2"></div>
      <div class="tips-bot">
        <div class="le">{{newsInfo.hostCity}}</div>
        <div class="ri">{{newsInfo.startDate.split(" ")[0]}}</div>
      </div>
    </div>
    <div class="info-box">
      <h3>{{newsInfo.conference_name}}</h3>
      <div class="eyes">{{newsInfo.browseNum}}</div>
      <div class="price">¥ {{newsInfo.conference_price}}起</div>
      <!--<div class="time">{{newsInfo.dataDif}}</div>-->
      <div class="time" v-if="newsInfo.now_time < newsInfo.start_time"><time-down @time-end="message = '已开始'" :endTime='newsInfo.startDate'></time-down></div>
      <div class="time" v-else-if="newsInfo.now_time > newsInfo.start_time&&newsInfo.now_time < newsInfo.end_time">正在进行</div>
      <div class="time" v-else-if="newsInfo.now_time > newsInfo.end_time">已结束</div>
      <!--<div class="time">{{newsInfo.dataDif}}</div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TimeDown from 'base/time-down/time-down'
export default {
  components: {
    TimeDown
  },
  props: {
    newsInfo: {
      type: Object,
      dafault: {},
    }
  },
  data (){
    return {
      message : '正在倒计时',
      time:'2018-06-01 18:00:00'
    }
  },
  created () {
//    console.log(this.newsInfo)
  },
  methods: {
    toNewsInfo (conference_id,type_id) {
      console.log(conference_id,type_id)
      this.$router.push({ path: `/meeting`,query:{con_id:conference_id,type_id:type_id}});
    }
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
      top:4px
      left: 4px
    .tips-live.type1
      bg-image("~common/images/scene")
    .tips-live.type2
      bg-image("~common/images/live")
    .tips-bot
      position: absolute
      bottom: 0
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(144, 144, 144, 0.7)), to(rgba(131, 131, 131, 0.7)))
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
.time-txt{
  color: #f0303a;
}
.tips-bot div{
  color: #fff;
}
</style>

