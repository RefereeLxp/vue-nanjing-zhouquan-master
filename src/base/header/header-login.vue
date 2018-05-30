<template>
  <div class="header-box">
    <div class="header-box-info">
      <!--@click="signIn"-->
      <div class="sign-btn sign-in" >
        <!--登录-->
      </div>
      <div class="sign-btn sign-up" @click="signUp">
        注册
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      signIn () {
        console.log('登录')
      },
      signUp () {
        console.log('注册')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .header-box{
    height: 42px;
    background: transparent;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 750px; /*no*/
    z-index: 10;
    &:after{
      display: none;
    }
    .header-box-info{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-content: center;
      line-height: 42px;
      .sign-btn{
        display: flex;
        align-content: center;
        margin: 0 10px;
        font-size: 0.48rem;
        color:#F53E3E;
      }
    }
  }
</style>
