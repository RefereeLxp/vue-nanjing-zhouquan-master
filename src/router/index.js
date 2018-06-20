import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import CitySelection from 'components/home/city-selection'
import Meeting from 'components/meeting/meeting'
import SureOrder from 'components/sure-order/sure-order'
import Finish from 'components/sure-order/finish'
import Payment from 'components/payment/payment'
import Order from 'components/order/order'
import OrderInfo from 'components/order/order-info'
import OrderChildren from 'components/order/children/children'
import RefundState from 'components/order/refund/refund-state'
import Login_pwd from 'components/login/login_pwd'
import Login_phonecode from 'components/login/login_phonecode'
import Cart from 'components/cart/cart'
import Mine from 'components/mine/mine'
import Classify from 'components/classify/classify'
import Classinfo from 'components/classify/children/class-info'
import My_tracks from 'components/mine/children/my_tracks'
import My_collect from 'components/mine/children/my_collect'
import My_profile from 'components/mine/children/my_profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login_pwd'
    },
    { // 网站首页路由
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    { // 选择位置
      path: '/city_selection',
      name: 'CitySelection',
      component: CitySelection,
      meta: {
        keepAlive: true
      }
    },
    { // 购物车
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        noShowFooter: false
      }
    },
    { // 分类
      path: '/classify',
      name: 'classify',
      component: Classify,
      meta: {
        noShowFooter: false
      }
    },
    { // 分类-详情
      path: '/classinfo',
      name: 'classinfo',
      component: Classinfo,
      meta: {
        noShowFooter: false
      }
    },
    { // 我的足迹
      path: '/my_tracks',
      name: 'My_tracks',
      component: My_tracks,
      meta: {
        noShowFooter: false
      }
    },
    { // 我的收货地址
      path: '/my_profile',
      name: 'My_profile',
      component: My_profile,
      meta: {
        noShowFooter: false
      }
    },
    { // 网站首页路由
      path: '/meeting',
      name: 'Meeting',
      component: Meeting,
      meta: {
        noShowFooter: true
      }
    },
    { // 会议详情
      path: '/sure-order',
      name: 'SureOrder',
      component: SureOrder,
      meta: {
        noShowFooter: true
      }
    },
    { //订单完成
        path: '/finish',
        name: 'Finish',
        component: Finish,
        meta: {
        noShowFooter: true
      }
    },
    { //支付 payment
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        noShowFooter: true
      }
    },
    { // 订单分类
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        noShowFooter: true,
      },
      children: [
        {
          path: '/',
          component: OrderChildren,
          meta: {
            noShowFooter: true
          }
        }
      ]
    },
    {// 订单详情
      path: '/order-info',
      name: 'OrderInfo',
      component: OrderInfo,
      meta: {
        noShowFooter: true
      }
    },
    {// 退款进度
      path: '/refund-state',
      name: 'RefundState',
      component: RefundState,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站登录页--密码登录
      path: '/login_pwd',
      name: 'Login_pwd',
      component: Login_pwd,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站登录页--验证码登录
      path: '/login_phonecode',
      name: 'Login_phonecode',
      component: Login_phonecode,
      meta: {
        noShowFooter: true
      }
    },
    { // 我的
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {
        noShowFooter: false
      }
    },

    { // 我的收藏
      path: '/my_collect',
      name: 'My_collect',
      component: My_collect,
      meta: {
        noShowFooter: false
      }
    }
  ]
})
