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
        <input type="password" placeholder="请输入密码" v-model="inputtext.password">
      </div>
      <div class="input-other">
        <div class="pwd-to-login" @click="Phonecode_login">验证码登录</div>
        <div class="pwd-forget">忘记密码？</div>
      </div>
    </form>
    <div class="login-box">
      <div class="login-btn" v-on:click="LoginVerifyCode">
        登录
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { needMixin } from 'common/js/mixin'
import HeaderLogin from 'base/header/header-login'
import { Toast }  from 'mint-ui'
import { UserLogin } from '@/api/api.js' // 获取数据接口采用多条http请求
export default {
  mixins: [needMixin],
  components: {
    HeaderLogin,
    Toast
  },
  data () {
    return {
      inputtext:{
        username:'admin',
        password:'123123'
      }
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
//      this.$router.push({ path: '/home'});
//      var list = {
//        username:this.inputtext.username,
//        password:this.inputtext.password
//      }
//      let query =Object.assign({},list)
      let query={
        username:this.inputtext.username,
        password:this.inputtext.password
      }
      console.log(query)
      UserLogin(query).then((res) => {
        alert(JSON.stringify(res))
        if (res.result === true && res.dataList) {
          sessionStorage.setItem('user',JSON.stringify(res.dataList))
          Toast({
            message: '登录成功',
            duration: 500
          });
          this.$router.push({ path: '/home'});
        } else {
          Toast({
            message: '登录失败',
            duration: 500
          });
        }
      })
    },
//    点击进入验证码登录页
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
    box-sizing: border-box;
    width: 100%;
    background: #fff url('http://202.119.65.28:8080/meeting_mall/img/loginfooter.png') no-repeat bottom ;
    background-size: 100% 40vh;
  }
  .login-box{
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 20vh;*/
    width: input-box-w+4;
    margin: 10vh auto 0;
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
    height: 30vh;
    padding-top: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 50%;
      max-width: 180px;
    }
  }
  .input-box{
    min-height: 30vh;
    margin-top: 10vh;
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
