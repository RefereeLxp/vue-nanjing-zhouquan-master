import axios from 'common/js/http.js'
import qs from 'qs'
import { URL_A,URL_B,URL_C } from './config'
// var appData = require('../../jsonData/data.json') // 数据模拟
// import qs from 'qs'

/** 密码登录 **/
export function UserLogin (query) {
  const url = URL_A + '/AccountModule/Account/UserLogin'
  //const url = 'https://axzn.yunxinran.com/QRcodeModule/Scavenging/UserLogin?username=13851830826&password=4297F44B13955235245B2497399D7A93'
  // 通过qs.stringify()将对象解析成URL的形式
  return axios.post(url,qs.stringify(query)).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 首页轮播 **/
export function getHomeBanner () {
  const url = URL_B + '/meeting_mall/picture/showMeetingPicture'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 首页获取关键词 **/
export function getHomeKeyWords () {
  const url = URL_B + '/meeting_mall/hotwords/findHotwordsInfo'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 首页导航 **/
export function getHomeNav () {
  const url = URL_B + '/meeting_mall/meetingclass/findAllClassInfo'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 首页文章分页 **/
export function getNewsList (query) {
  const url = URL_B + '/meeting_mall/conference/findConferenceInfoByClassID'
  return axios.get(url, {
    params: query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 首页文章分页 **/
export function getConferenceInfoByConID (query,token) {
  const url = URL_B + '/meeting_mall/conference/findConferenceInfoByConID'
  return axios.get(url, {
    params: query,
    headers:{'Token':token},
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//
/** 添加收藏 **/
export function createConferenceCollection (query,token) {
  const url = URL_B +'/meeting_mall/conference/createConferenceCollection'
  return axios.get(url, {
    params: query,
    headers:token
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 取消收藏 **/
export function cancelCollection (query,token) {
  const url = URL_B +'/meeting_mall/conference/cancelCollection'
  return axios.get(url, {
    params: query,
    headers:token
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 我的 -- 我的足迹 **/
export function findFootprintByUserId (token) {
  const url = URL_B +'/meeting_mall/footprint/findFootprintByUserId'
  return axios.get(url, {
    headers:{'Token':token},
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 我的 -- 我的收藏 **/
export function findCollectionByUserId (token) {
  const url =URL_B + '/meeting_mall/conference/findCollectionByUserId'
  return axios.get(url,{
    headers:{'Token':token},
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 显示收货地址 **/
export function findShippingAddressByUserId (token) {
  const url =URL_B + '/meeting_mall/address/findShippingAddressByUserId'
  return axios.get(url,{
    headers:{'Token':token},
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//准备下单页面
export function ConfirmConferenceOrder (Token) {
  const url =URL_A + '/OrderModule/ConferenceOrder/ConfirmConferenceOrder'
  console.error(Token)
  return axios.post(url,qs.stringify({Token:Token})).then((res) => {
    return Promise.resolve(res.data)
  })
}
//创建订单
export function CreateOrder (query) {
  const url =URL_A + '/OrderModule/ConferenceOrder/CreateOrder'
  return axios.post(url,qs.stringify(query)).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 订单状态列表  **/
export function FindOrdersByUserId (query,token) {
  const url =URL_B + '/meeting_mall/orders/findOrdersByUserId'
  return axios.get(url, {
    headers:{'Token':token},
    params: query,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**删除订单**/
export function DeleteOrdersByOrderId (query,token) {
  const url =URL_B + '/meeting_mall/orders/deleteOrdersByOrderId'
  return axios.get(url, {
    headers:{'Token':token},
    params: query,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**查看订单详情**/
export function FindOrdersByOrderId (query,token) {
  const url =URL_B + '/meeting_mall/orders/findOrdersByOrderId'
  console.log(query,token)
  return axios.get(url, {
    headers:{'Token':token},
    params: query,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function GetPayConfig (query) {
  const url =URL_A + '/OrderModule/ConferenceOrder/GetPayConfig'
  console.log(query)
  return axios.post(url,qs.stringify(query)).then((res) => {
    return Promise.resolve(res.data)
  })
}
 /**获取code**/
export function GetCode () {
  const url =URL_A + '/OrderModule/ConferenceOrder/GetCode'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**根据code换取 openid 和 accesstoken**/
export function GetOpenidAndAccessToken (query) {
  const url =URL_A + '/OrderModule/ConferenceOrder/GetOpenidAndAccessToken'
  return axios.get(url,{
    params:query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**根据accesstoken换取jsapi_ticket**/
export function GetJsapiTicket (query) {
  const url =URL_A + '/OrderModule/ConferenceOrder/GetJsapiTicket'
  return axios.get(url,{
    params:query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function TenPayServer (query) {
  const url =URL_C + '/OrderModule/ConferenceOrder/TenPayServer'
  return axios.get(url,{
    params:query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 直接支付 **/
export function WxPayServer (query) {
  const url =URL_A + '/OrderModule/ConferenceOrder/WxPayServer'
  return axios.post(url,qs.stringify(query)).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 热门城市 **/
export function findHotCities () {
  const url =URL_B + '/meeting_mall/hotcity/findHotCities'
  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
