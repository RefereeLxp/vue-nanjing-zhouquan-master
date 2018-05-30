<template>
  <div class="login child-view">
    <header-login></header-login>
    <div class="logo-icon">
      <img src="../../common/images/logo.png" alt="">
    </div>
    <form id="signIn" class="input-box">
      <div class="input-line">
        <i class="icon iconfont icon-yonghu"></i>
        <input type="text" placeholder="请输入用户名" v-model="inputtext.username">
        <!--<span class="get-code">获取验证码</span>-->
      </div>
      <div class="input-line">
        <i class="icon iconfont icon-biyan"></i>
        <input type="text" placeholder="请输入密码" v-model="inputtext.password">
      </div>
      <div class="input-other">
        <div class="pwd-to-login" @click="Phonecode_login">验证码登录</div>
        <div class="pwd-forget">忘记密码？</div>
      </div>
    </form>
    <div class="login-box">
      <div class="login-btn" v-on:click="LoginVerifyCode()">
        登录
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { needMixin } from 'common/js/mixin'
import HeaderLogin from 'base/header/header-login'
import { Toast,Indicator } from 'mint-ui'
import { UserLogin,ConfirmConferenceOrder } from '@/api/api.js' // 获取数据接口采用多条http请求
export default {
  mixins: [needMixin],
  components: {
    HeaderLogin,
    Toast,
    Indicator
  },
  data () {
    return {
      inputtext:{}
    }
  },
  created () {
  },
  methods: {
    LoginVerifyCode () { // 点击执行数据刷新
      if (this.inputtext.username==''||this.inputtext.username == undefined){
        Toast({
          message: '请输入用户名',
          duration: 1000
        });
        return;
      }
      if (this.inputtext.password==''||this.inputtext.password == undefined){
        Toast({
          message: '请输入密码',
          duration: 1000
        });
        return;
      }
      let query = {
        username:this.inputtext.username,
        password:this.inputtext.password
      }
      UserLogin(query).then((res) => {
        if (res.result === true && res.dataList) {
          Indicator.open();
        } else {
          Toast({
            message: res.message,
            duration: 1000
          });
//          this.$router.push({ path: '/home'});
        }
      })
    },
//    点击进入页面登录页
    Phonecode_login (){
      this.$router.push({  path: '/Login_phonecode'});
    }
  },
  watch: {
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
  input-box-w = 60%
  .login{
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    background: #fff url('../../common/images/login-footer.png') no-repeat bottom ;
    background-size: 100% auto;
  }
  .login-box{
    width: input-box-w+4;
    margin: 40% auto 0;
    display:flex;
    .login-btn{
      height: 35px;
      line-height: 35px;
      width: 100%;
      background: transparent;
      border: 1px solid #fff;
      text-align: center;
      border-radius: 20px;
      font-size: 0.4rem;
      color: #fff;
    }
  }
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  input-box-w = 72%
  .logo-icon{
    height: 35%;
    margin-top: 14%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 50%;
    }
  }
  .input-box{
    min-height: 40%;
    margin-top: 14%;
    width: 100%;
    .input-line{
      width:input-box-w;
      height: 33px;
      border-bottom: 1px solid #A0A0A0;
      margin: 0 auto;
      display: flex;
      align-items: center;
      position: relative;
      display:flex;
      .icon{
        width: 13%;
        font-size: 0.7rem;
        color: #A0A0A0;
        /*margin-right: 2%;*/
      }
      input{
        width: 80%;
        height: 100%;
        font-size: 0.37rem;
        outline:none;
      }
    }
    .input-line:nth-child(2){
      margin-top: 4%;
    }
    .input-other{
      width: input-box-w;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2% auto 0;
      div{
        font-size: 0.38rem;
        color: #565656;
      }
    }
  }

</style>
