// pages/result/result.js
var wxCharts = require('../../utils/wxcharts.js');
var common = require('../../common.js');
var sign = wx.getStorageSync("sign");
var columnChart = null;
var radarChart = null;
var pieChart = null;
var app = getApp();
var chartData = {
  main: {
    data: [15, 20, 45, 37,34,3,4,56,67,768],
    categories: ['完美型', '助人型', '成就型', '自我型', '理智型', '疑惑型', '活跃型', '领袖型', '和平型']
  }
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
          title:'直方图',
          icon:1,
          active:true,
          id:'columnCanvas',
          tap: 'touchHandler'
      },
      {
        title: '饼状图',
        icon: 2,
        active: false,
        id: 'pieCanvas',
        tap: 'touchHandler'
      },
      {
        title: '雷达图',
        icon: 3,
        active: false,
        id: 'radarCanvas',
        tap: 'touchHandler'
      }
    ],
    typeList:[
      {
          title:  '完美型',
          icon:"1",
          color:"#dbdddc"
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
  // 图表
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },
  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
           return val.toFixed(2) + '万';
        }
      }]
    });
  },
  touchHandler: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: chartData.sub[index].data,
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }]
      });

    }
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
    var that = this;
    var rank = wx.getStorageSync("rank");
    var shuju = wx.getStorageSync("shuju");
    var frist = wx.getStorageSync("frist");
    var typeList = wx.getStorageSync("typeList");
    var id = frist.id;
    var leixing = typeList[id].title;
    var renge = [];
    var arr =[];
    console.log(rank);
    console.log("shuju:", shuju);
    for (var i = 0; i < rank.length; i++) { //rank id
        console.log(rank[i].id);
        var a = rank[i].id-1;
        renge.push(a)
        var b = typeList[a];
        arr.push(b);
    }
    for (var i = 0; i < shuju.length; i++) { //rank id
      console.log(shuju[i],'shuju');
      // var a = rank[i].id - 1;
      // renge.push(a)
      // var b = typeList[a];
      // arr.push(b);
    }
    console.log(renge);
    console.log(arr);
    console.log(leixing);
    that.setData({
        rank: rank,
        shuju: shuju,
        frist: frist,
        leixing: typeList[id].title, //核心人格
        arr: arr  //主要人格
    })
  },
  onReady: function (e) {
    var windowWidth = 320;

    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    // data
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
    // 2
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['1', '2', '3', '4', '5', '6'],
      series: [{
        name: '成交量1',
        data: [90, 110, 125, 95, 87, 122]
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 150
        }
      }
    });
    //3['完美型', '助人型', '成就型', '自我型', '理智型', '疑惑型', '活跃型', '领袖型', '和平型']
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '完美型',
        data: 15,
      }, {
          name: '助人型',
        data: 35,
      }, {
          name: '成就型',
        data: 78,
      }, {
          name: '自我型',
        data: 63,
      }, {
          name: '理智型',
        data: 35,
      }, {
          name: '疑惑型',
        data: 78,
      }, {
          name: '活跃型',
        data: 63,
      }, 
      {
          name: '领袖型',
        data: 78,
      }, {
          name: '和平型',
        data: 78,
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      
  },
  keyword: function (e) {
    var that = this;
    var icon = e.currentTarget.dataset.index;
    var tab = that.data.tab;
    for (var i = 0; i < tab.length; i++) {
      tab[i].active = false;
      if (icon == tab[i].icon) {
        tab[i].active = true;
      }
    }
    that.setData({
      tab: tab
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})