import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Meeting from 'components/meeting/meeting'
import SureOrder from 'components/sure-order/sure-order'
import Order from 'components/order/order'
import OrderChildren from 'components/order/children/children'
import Login_pwd from 'components/login/login_pwd'
import Login_phonecode from 'components/login/login_phonecode'
import Mine from 'components/mine/mine'
import My_tracks from 'components/mine/children/my_tracks'
import My_collect from 'components/mine/children/my_collect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    { // 网站首页路由
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
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
    { // 网站首页路由
      path: '/sure-order',
      name: 'SureOrder',
      component: SureOrder,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站首页路由
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        noShowFooter: true
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
    { // 我的足迹
      path: '/my_tracks',
      name: 'My_tracks',
      component: My_tracks,
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
