<template>
  <div class="other">
    <div class="other-btn"><i class="icon-box"></i>联系商家</div>
    <div class="other-btn"><i class="icon-box"></i>拨打电话</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {
  },
  props: {
    contentInfo: {
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

<style scoped lang="stylus" rel="stylesheet/stylus">
.other{
  width: 100%;
  padding: 8px 0;
  background: #fff;
  display: flex;
  .other-btn{
    flex: 1;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.4rem;
    bg-image("images/call");
    color: #727272;
    .icon-box{
      width: 25px;
      height: 25px;
      /*background: #fff center no-repeat;*/
      margin-right: 5px;
      /*bg-image("images/call")*/
      background: url('images/call@2x.png') center no-repeat;;
      background-size: 25px auto;
    }
  }
  .other-btn:nth-child(1){
    border-right:1px solid #FDD7D7;
    .icon-box{
      /*bg-image("images/tel");*/
      background: url('images/tel@2x.png') center no-repeat;;
      background-size: 25px auto;
    }
  }
}
</style>
