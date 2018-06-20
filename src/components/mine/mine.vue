<template>
  <div class="mine child-view">
    <div class="mine-all" v-if="optionUserInfo">
      <!--用户基本信息+设置-->
      <div class="user-card">
        <div class="user-card-info">
          <div class="set">
            <div><i class="icon iconfont icon-shezhi1"></i><span>设置</span></div>
          </div>
          <div class="user-info">
            <div class="user-info-box">
              <div class="icon">
                <img :src="optionUserInfo.user_headimg" alt="">
              </div>
              <div class="txt">
                <p class="name" v-text="optionUserInfo.user_name"></p>
                <!--<p class="hint">随便说点什么<i class="icon iconfont icon-xiezi"></i></p>-->
              </div>
            </div>
          </div>
          <div class="bottom-btn">
            <router-link  to="/my_collect" class="type">
              <span>
                <i class="icon iconfont icon-xin1"></i>
                我的收藏
              </span>
            </router-link>
            <router-link  to="/my_tracks" class="type">
              <span>
                <i class="icon iconfont icon-zuji"></i>
                我的足迹
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <!--常用分组   我的票券 我的图书-->
      <div class="common-type">
        <div class="common-type-info">
          <span>
            <i class="icon iconfont icon-ticket"></i>
            我的票券
          </span>
        </div>
        <div class="common-type-info">
          <span>
            <i class="icon iconfont icon-dingdan1"></i>
            我的图书
          </span>
        </div>
      </div>
      <div class="group-box" v-if="groupList.length>0">
        <mt-cell v-for="(item, index) in groupList" class="group-box-info" :title="item.name" :to="item.url"  is-link>
          <i slot="icon" :class="item.icon" class="icon iconfont"></i>
        </mt-cell>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { needMixin } from 'common/js/mixin'
import { Cell } from 'mint-ui';

export default {
  mixins: [needMixin],
  components: {
    'mt-cell':Cell
  },
  data () {
    return {
//      用户菜单
      groupList:[
        {group_id:1,name:'全部订单',icon:'icon-evaluate-1-copy',url:'/order'},
        {group_id:2,name:'收获地址',icon:'icon-unie65c',url:'/my_profile'},
        {group_id:3,name:'发票管理',icon:'icon-piaowu',url:'/my_profile'},
        {group_id:4,name:'关于我们',icon:'icon-guanyuwomen',url:'/my_profile'},
        {group_id:5,name:'意见反馈',icon:'icon-yijian',url:'/my_profile'}
      ],
      optionUserInfo:[]
    }
  },
  created () {
    this._getAllData()
  },
  methods: {
    _getAllData () { // 数据获取
      this.optionUserInfo=JSON.parse(sessionStorage.getItem("user"))
      console.log(this.optionUserInfo);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
icon-h = 75px
.iconfont{
  font-size: 0.5rem;
}
body,html{
  color: #F7F7F7;
}
.mine-all{
  width: 100%;
  margin-bottom:1.5rem;
  .user-card{
    width: 100%;
    height: 200px;
    .user-card-info{
      width: 94%;
      margin: 3% auto;
      height: 94%;
      background: linear-gradient(to right, #ff5555 0%, #fa8b8a 100%);
      border-radius: 5px;
      box-shadow: 0px 2px 10px #fc9696;
      flex-direction: column;
      display: flex;
      .set {
        flex: 3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        color: #fff;
        div{
          display: flex;
          align-items: center;
          span{
            font-size: 0.38rem;
          }
          i{
            margin-right: 5px;
          }
        }
      }
      .user-info{
        flex: 8;
        padding: 0 10px;
        box-sizing: border-box;
        .user-info-box{
          width: 100%;
          height: icon-h;
          display: flex;
          .icon{
            width: icon-h;
            height: icon-h;
            border-radius: 50px;
            overflow: hidden;
            img{
              width: icon-h;
              height: icon-h;
            }
          }
          .txt{
            flex: 1;
            height: 100%;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color:#fff;
            .name{
              font-size: 0.48rem;
              line-height: 1rem;
              letter-spacing:1px;
            }
            .hint{
              font-size: 0.4rem;
              line-height: 0.6rem;
              letter-spacing:1px;
            }
          }
        }
      }
      .bottom-btn{
        flex: 4;
        background: rgba(255,255,255,0.25);
        display: flex;
        align-items: center;
        .type{
          flex: 1;
          color: #fff;
          line-height: 0.8rem;
          text-align: center;
          span{
            font-size: 0.4rem;
          }
        }
        .type:nth-child(1){
          border-right: 1px solid #f9c7c7;
        }
      }
    }
  }
  /*常用分组*/
  .common-type{
    width: 100%;
    height: 60px;
    background: #fff;
    display: flex;
    box-shadow: 0px -2px 4px #efefef;
    .common-type-info{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: #333;
      span{
        font-size: 0.42rem;
        display: flex;
        align-items: center;
        letter-spacing:0.5px;
        i{
          font-size: 0.65rem;
          color: #F53F3F;
          margin-right: 5px;
        }
      }
    }
    .common-type-info:nth-child(1):after{
      content: '';
      position: absolute;
      height: 60%;
      width: 1px;
      background: #D5D5D5;
      right: 0;
    }
  }
  /*分组*/
  .group-box{
    width: 100%;
    margin-top:10px;
    .group-box-info{
      margin-top: 3px;
      color: #383737;
      .mint-cell-title{
        display: flex;
        align-items: center;
      }
      .mint-cell-text{
        font-size: 0.43rem;
      }
      .icon{
        margin: 0 5px 0 10px;
        font-size: 0.5rem;
      }
    }
  }
}
</style>
