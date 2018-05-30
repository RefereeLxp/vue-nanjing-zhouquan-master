export const needMixin = { // 主要防止一些带有swiper 在返回时，渲染bug 不带swiper 页面可以不用加
  created () {
    setTimeout(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 20)
  }
}
