//index.js
//获取应用实例
var common = require('../../common.js');
const app = getApp()
var sign = wx.getStorageSync("sign");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    typeList: [
      {
        title: '完美型',
        icon: "1",
        color: "#dbdddc"
      },
      {
        title: '助人型',
        icon: "2",
        color: "#e5b8cd"
      },
      {
        title: '成就型',
        icon: "3",
        color: "#f0e275"
      },
      {
        title: '自我型',
        icon: "4",
        color: "#cd5c54"
      },
      {
        title: '理智型',
        icon: "5",
        color: "#9ecad5"
      },
      {
        title: '疑惑型',
        icon: "6",
        color: "#bfa072"
      },
      {
        title: '活跃型',
        icon: "7",
        color: "#e4ba80"
      }
      ,
      {
        title: '领袖型',
        icon: "8",
        color: "#c4a7c5"
      }
      ,
      {
        title: '和平型',
        icon: "9",
        color: "#a8c990"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
      // console.log('commonsign:', sign);
      that.setData({
        sign: sign
      })
    })
    wx.setStorageSync('typeList', that.data.typeList); //typeList
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tishi:function(){
    wx.navigateTo({
      url: '../text/text'
    })
  },
  come:function(){
    wx.navigateTo({
      url: '../info/info'
    })
  }
})
