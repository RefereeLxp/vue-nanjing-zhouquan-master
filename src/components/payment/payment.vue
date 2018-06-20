<template>
  <button >支付</button>
</template>

<script type="text/ecmascript-6">
  import { needMixin } from 'common/js/mixin'
  import { WxPayServer,GetPayConfig,GetCode,TenPayServer,GetOpenidAndAccessToken,GetJsapiTicket } from '@/api/api.js'
  import crypto from 'crypto'
  import wx from 'weixin-js-sdk'
  export default {
    mixins: [needMixin],
    components: {
      GetPayConfig,
      crypto,
      TenPayServer,
      WxPayServer
    },
    data () {
      return {
        optionUserInfo:{}, //用户信息
        orderInfo:{},//订单信息
        optionPay:{},
        query:{},
        userCode:'', //code
        accesstoken:'',
        ticket:'',
        openid:'',
        order_sn:'',//订单号
        money:'',
        startWxPay:{} //开始支付数据
      }
    },
    created(){
      this.query=this.$route.query
      if(this.query.order_sn!=''&&this.query.order_sn!=undefined){
        sessionStorage.setItem('order_sn',this.query.order_sn)
      }
      console.log(this.order_sn,this.money)
      this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
      this._getAllData()
    },
    methods: {
      _getAllData () {
        let promise1 = new Promise((resolve, reject) => {
          if(this.query.code==''||this.query.code==undefined){
            this.orderInfo=this.$route.query
            var url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa999b800b97187fc&redirect_uri=http%3a%2f%2fpay.yunxinran.com%2fOrderModule%2fConferenceOrder%2fTenPayServer&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            window.location.href = url
            return
          }
//        this.userCode= this.getmd5(this.query.code);
          this.userCode= this.query.code;
          let query={code:this.userCode}
//          alert('code');
//          alert(this.userCode);
          GetOpenidAndAccessToken(query).then((res) => {
              if (res.result === true) {
//                console.log('调用accesstokeng完成')
//                alert('GetOpenidAndAccessToken返回数据');
//                alert(JSON.stringify(res));
                this.accesstoken=res.dataList.access_token
                this.openid=res.dataList.openid
//                console.error(this.openid)
              } else {
                this.toast('accesstoken失败')
              }
            })
//            .then(() =>{
//              let query1={openid:this.openid,money:100}
//              console.error(query1)
//              WxPayServer(query1).then((res) => {
//                if (res.result === true) {
//                  console.log('调用WxPayServer完成')
////                  this.weixinPay(JSON.parse(res.dataList.data1));
////                this.accesstoken=res.dataList.access_token
////                this.openid=res.dataList.openid
//                } else {
//                  this.toast('WxPayServer失败')
//                }
//              })
//            })
            .then(() =>{
              console.log(this.order_sn)
              let query = Object.assign({},{openid:this.openid,order_sn:sessionStorage.getItem("order_sn")})
//              console.log('TenPayServer传入数据')
//              console.log(JSON.stringify(query))
              TenPayServer(query).then((res) => {
                 if (res.result === true) {
//                  console.log('调用WxPayServer完成')
//                   console.log('TenPayServer请求完成')
//                   console.log(JSON.stringify(res))
//                   alert('TenPayServer返回数据');
//                   alert(JSON.stringify(res));
                   this.weixinPay(res.dataList);
                   return
                }
                if(res.result === false){
                  alert('WxPayServer失败')
                }
              })
          })
        })
      },
      weixinPay:function(data){
        var vm= this;
        //    初始化支付环境
        console.log('weixinPay')
        console.log(data)
        if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
//          console.log('1-1')
//          alert('1-1');
          if( document.addEventListener ){
//            console.log('2-1')
//            alert('2-1');
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
          }else if (document.attachEvent){
//            console.log('2-2')
//            alert('2-2');
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
            document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
          }
        }else{
//          console.log('1-2')
          vm.onBridgeReady(data);
        }
      },
      //调用微信支付模块
      onBridgeReady:function(data){
        var  vm = this;
        console.log('onBridgeReady')
        console.log(data)
        alert('onBridgeReady');
        alert(data);
        alert('data.appId2');
        alert(data.appId);
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',{
            debug:true,
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.packageValue,
            "signType":'MD5', //微信签名方式：
            "paySign":data.paySign, //微信签名
            //这里的信息从后台返回的接口获得。
            jsApiList: [
              'chooseWXPay'
            ]
          },
          function(res){
            alert('res');
            var html=JSON.stringify(res)
            alert(html);
//            console.log('res')
//            console.log(res)
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              console.log('1.1')
              if(vm.fromRoute == 'personal'){
                console.log('1.2')
//                window.location.href = vm.BASE_URL + 'index.html#/depositResult'
              }else {
                console.log('1.3')
//                vm.confirmTry();
              }
            }else{
              console.log('1.4')
              alert(JSON.stringify(res));
              alert("取消支付！");
            }
          }
        );
      },
      startWxPay(){
        let query = Object.assign({},this.orderInfo,{token:this.optionUserInfo.user_token},{code:this.userCode})
        console.log('TenPayServer传入数据')
        console.log(JSON.stringify(query))
        TenPayServer(query).then((res) => {
          console.log('TenPayServer请求完成')
          console.log(JSON.stringify(res))
          if (res.result === true && res.dataList) {
            this.startWxPay=res.dataList
            wx.chooseWXPay({
              timestamp: this.startWxPay.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: this.startWxPay.nonceStr, // 支付签名随机串，不长于 32 位
              package: this.startWxPay.packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: this.getmd5(this.userCode), // 支付签名
              success: function(res) {
                console.log('调用chooseWXPay完成')
                console.log(res)
                // 支付成功后的回调函数
//                  cb(res);
              },
              fail:function(res){
                console.log('调用chooseWXPay失败')
                console.log(res)
//                  errorCb(res);
              }
            });
          } else {
          }
        })
      },
//    md5加密
      getmd5(str){
        var a;
        var md5 = crypto.createHash("md5");
        //update("中文", "utf8")
        md5.update(str);
        var a = md5.digest('hex');
//      console.log(a);
        //47bce5c74f589f4867dbd57e9ca9f808
        return a;
      },
    },
  }
</script>

<style rel="stylesheet/css">
</style>
