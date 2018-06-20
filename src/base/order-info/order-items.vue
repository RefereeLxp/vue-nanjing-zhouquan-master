<template>
  <a class="sure-goods" v-if="JSON.stringify(this.orderInfo)!='{}'">
    <div class="img-box">
      <img :src="orderInfo.main_picture">
    </div>
    <div class="info-box">
      <h2 class="name">{{orderInfo.conference_name}}</h2>
      <div class="tips">数量：x{{orderInfo.counts}}&nbsp;&nbsp;票种：{{orderInfo.price_title}}</div>
      <div class="price">¥{{orderInfo.original_price*orderInfo.counts}}</div>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
export default {
  components: {
  },
  props: {
    orderInfo: {
      type: Object,
      dafault: {},
    }
  },
  data (){
    return {
    }
  },
  created () {
//    console.log(this.newsInfo)
  },
  methods: {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.sure-goods{
  height: 119px;
  display: flex;
  padding: 10px 0;
  background: #fff right 12px center/auto 12px no-repeat;
  bg-image("~common/images/goto");
  .img-box{
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    margin-right: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .info-box{
    flex: 1;
    width: 0;
    position: relative;
    .name{
      font-size: 16px;
      line-height: 1.7;
      letter-spacing: 0.5px;
      overflow: hidden;
    }
    .price{
      position: absolute;
      bottom: 4px;
      color: #ff3636;
      font-size: 14px;
      letter-spacing: .5px;
    }
    .tips{
      position: absolute;
      bottom: 24px;
      line-height: 1.4;
      letter-spacing: .5px;
      color: #adadad;
    }
  }
}
</style>
