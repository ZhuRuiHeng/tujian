// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
          title:'直方图',
          icon:1,
          active:true
      },
      {
        title: '饼状图',
        icon: 2,
        active: false
      },
      {
        title: '雷达图',
        icon: 3,
        active: false
      }
    ],
    typeList:[
      {
          title:  '完美型',
          icon:"1",
          color:"#dbdddc"
      },
      {
        title: '完美型',
        icon: "2",
        color: "#e5b8cd"
      },
      {
        title: '完美型',
        icon: "3",
        color: "#f0e275"
      },
      {
        title: '完美型',
        icon: "4",
        color: "#cd5c54"
      },
      {
        title: '完美型',
        icon: "5",
        color: "#9ecad5"
      },
      {
        title: '完美型',
        icon: "6",
        color: "#bfa072"
      },
      {
        title: '完美型',
        icon: "7",
        color: "#e4ba80"
      }
      ,
      {
        title: '完美型',
        icon: "8",
        color: "#c4a7c5"
      }
      ,
      {
        title: '完美型',
        icon: "9",
        color: "#a8c990"
      }
    ]
  },
  gotoPage: function (e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: '../charts/' + page + '/' + page
    });
  },
  /**
   * 生命周期函数--监听页面加载 c4a7c5  a8c990
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
  
  },


 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})