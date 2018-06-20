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
        startWxPay:{} //开始支付数据
      }
    },
    created(){
      this.query=this.$route.query
      this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
      this._getAllData()
    },
    methods: {
      _getAllData () {
        let promise1 = new Promise((resolve, reject) => {
          if(this.query.code==''||this.query.code==undefined){
            this.orderInfo=this.$route.query
            var url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa999b800b97187fc&redirect_uri=https%3A%2F%2Faxzn.yunxinran.com%2Fgetcode.aspx&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            window.location.href = url
            return
          }
//        this.userCode= this.getmd5(this.query.code);
          this.userCode= this.query.code;
          let query={code:this.userCode}
          console.error('1')
          console.error(query)
          GetOpenidAndAccessToken(query).then((res) => {
              if (res.result === true) {
                console.log('调用accesstokeng完成')
                this.accesstoken=res.dataList.access_token
                this.openid=res.dataList.openid
                console.error(this.openid)
                this.fCharge()
              } else {
                this.toast('accesstoken失败')
              }
            })
            .then(() =>{
              let query1={openid:this.openid,money:100}
              console.error(query1)
              WxPayServer(query1).then((res) => {
                if (res.result === true) {
                  console.log('调用WxPayServer完成')
                  this.onBridgeReady(res.dataList.data1);
//                this.accesstoken=res.dataList.access_token
//                this.openid=res.dataList.openid
                } else {
                  this.toast('WxPayServer失败')
                }
              })
//            let query1={access_token:this.accesstoken,openid:this.openid}
//            console.log('2')
//            console.log(query1)
//            GetJsapiTicket(query1).then((res) => {
//              if (res.result === true) {
//                console.log('调用GetJsapiTicket完成')
//                console.log(res)
//                this.ticket=res.dataList
//                console.error(this.ticket)
//                console.log('执行完成')
//                var url = location.href.split('#').toString();
//                console.log(this.ticket)
//                var query={token:this.optionUserInfo.user_token,ticket:this.ticket,url:'http%3a%2f%2fhy.yunxinran.com%3a8080%2fdist%2f'};
//                console.log(query)
//                GetPayConfig(query).then((res) => {
//                  if (res.result === true && res.dataList) {
//                    this.optionPay=res.dataList
//                    console.log(this.optionPay)
////                    let appId = this.optionPay.appId;
////                    let timestamp = this.optionPay.timeStamp;
////                    let nonceStr = this.optionPay.nonceStr;
////                    let signature = this.optionPay.signature;
////                    let packages = this.optionPay.package;
////                    let paySign = this.optionPay.paySign;
////                    wx.config({
////                      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
////                      appId: appId, // 必填，公众号的唯一标识
////                      timestamp: timestamp, // 必填，生成签名的时间戳
////                      nonceStr: nonceStr, // 必填，生成签名的随机串
////                      signature: signature, // 必填，签名，见附录1
////                      jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
////                    });
////                    console.log('调用config完成')
//                  } else {
//                    this.toast('您访问的内容不存在')
////            setTimeout(() => {
////              this.$router.go(-1)
////            }, 2000)
//                  }
//                }).then(() =>{
////                  let wexinPay = (data,cb,errorCb) => {
////                    wx.ready(function(){
////                    });
////                    wx.error(function(res) {
////                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
////                      /*alert("config信息验证失败");*/
////                    });
////                  }
//                })
//              } else {
//                this.toast('GetJsapiTicket失败')
//              }
//            })
            })
        })
      },
//    初始化支付环境
      fCharge() {
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        } else {
          fPostCharge();
        }
      },
      //调用微信支付模块
      onBridgeReady(json) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": json.appId,     //公众号名称，由商户传入
            "timeStamp": json.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": json.nonceStr, //随机串
            "package": json.packageValue,
            "signType": "MD5",         //微信签名方式:
            "paySign": json.paySign //微信签名
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              //alert("支付成功,请稍后查询余额,如有疑问,请联系管理员.");
              fAlreadyPay();
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
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
      GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      }
    },
  }
</script>

<style rel="stylesheet/css">
</style>
