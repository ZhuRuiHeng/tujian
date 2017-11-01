// pages/test/test.js
var common = require('../../common.js');
const app = getApp()
var sign = wx.getStorageSync("sign");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId:'',
    list:[],
    news:[],
    frist:{},
    page:1,
    finish: false//题目答完
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
 onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    // 列表
    wx.request({
      url: "https://friend-guess.playonwechat.com/nine/get-choice-list?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        console.log(res.data.data);
        that.setData({
          list: res.data.data,
          news: res.data.data.slice(0, 2)
        })
      }
    })
    wx.hideLoading()
  },
  // 下一题
 next:function(){
   var that = this;
   var oldPage = that.data.page;
   var reqPage = oldPage + 1;
   var page = reqPage;
   var length = that.data.list.length;
   console.log(length)
   var that = this;
   var num = 2;
   var oldGoodsList = that.data.list;
   var news = that.data.list.slice(oldPage * num, page * num);
   console.log(oldPage * num, page * num)
   console.log("news:", news);
   var Content = news;
   if (page * num > length) { //length
     console.log(page * num,length)
     that.setData({
       finish: true
     })
     return
   }
   that.setData({
     news: Content,
     page: reqPage
   })
 },
//  提交答案
 formSubmit: function (e) {
   var that = this;
   var answer ="1,2,3,1,2,2"
   var formId = e.detail.formId;
   var num = Math.random();
   console.log(formId); 
   wx.showLoading({
     title: '加载中',
   });
   // 列表
   wx.request({
     url: "https://friend-guess.playonwechat.com/nine/save-answer?sign=" + sign + '&operator_id=' + app.data.kid,
     data:{
       answer: answer,
       form_id: formId + num
     },
     header: {
       'content-type': 'application/json'
     },
     method: "GET",
     success: function (res) {
       console.log(res);
       var data = res.data;
       var status=res.data.status;
       if(status==1){
         wx.setStorageSync('rank', res.data.data.rank); //rank
         wx.setStorageSync('shuju', res.data.data.data); //shuju
         wx.setStorageSync('frist', res.data.data.frist); //frist
          wx.navigateTo({
            url: '../result/result'
          })
       }else{
         wx.showLoading({
           title: res.data.msg,
           duration: 800
         });
       }
      
     }
   })
   wx.hideLoading()
 },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})