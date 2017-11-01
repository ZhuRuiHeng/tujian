//index.js
//获取应用实例
var common = require('../../common.js');
const app = getApp()
var sign = wx.getStorageSync("sign");
var typeList = wx.getStorageSync("typeList");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var rank = wx.getStorageSync("rank");
    var shuju = wx.getStorageSync("shuju");
    var frist = wx.getStorageSync("frist");
    var avatarUrl = wx.getStorageSync("avatarUrl");
    var nickName = wx.getStorageSync("nickName");
    var id = frist.id;
    console.log(id);
    var leixing = typeList[id].title;
    console.log(leixing);
    this.setData({
      leixing: typeList[id].title,
      avatarUrl: avatarUrl,
      nickName: nickName
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //结果
  result:function(){
    wx.navigateTo({
      url: '../result/result'
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    var avatarUrl = wx.getStorageSync("avatarUrl");
    var nickName = wx.getStorageSync("nickName");
    var that = this;
    // 列表
    wx.request({
      url: "https://friend-guess.playonwechat.com/nine/have-result?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res.data.data.have_result);
        that.setData({
          have_result:res.data.data.have_result,
          avatarUrl: avatarUrl,
          nickName: nickName
        })
      }
    })
    wx.hideLoading()
  }
})
