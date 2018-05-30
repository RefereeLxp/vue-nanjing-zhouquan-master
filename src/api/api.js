import axios from 'common/js/http.js'
import { URL_A,URL_B } from './config'
// var appData = require('../../jsonData/data.json') // 数据模拟
// import qs from 'qs'

/** 密码登录 **/
export function UserLogin (query) {
  const url = URL_A + '/InterfaceModule/Account/UserLogin'
  return axios.get(url, {
    params: query
  }).then((res) => {
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
  const url = URL_B + '/meeting_mall/conference/findConferenceInfoByClassID?RegionId=2'
  return axios.get(url, {
    params: query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 首页文章分页 **/
export function getConferenceInfoByConID (query) {
  const url = URL_B + '/meeting_mall/conference/findConferenceInfoByConID?user_id=1'
  return axios.get(url, {
    params: query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 我的 -- 我的足迹 **/
export function findFootprintByUserId (query) {
  const url = URL_B +'/meeting_mall/footprint/findFootprintByUserId'
  return axios.get(url, {
    params: query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
/** 我的 -- 我的收藏 **/
export function findCollectionByUserId (query) {
  const url =URL_B + '/meeting_mall/conference/findCollectionByUserId'
  return axios.get(url,{
    params: query
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
