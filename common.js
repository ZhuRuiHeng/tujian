//返回首页

function getSign(cb){
  var that = this;
  wx.login({
    success(res) {
      var kid = wx.getStorageSync("kid");
      if (res.code) {
        wx.request({
          url: 'https://friend-guess.playonwechat.com/api/auth-by-three?code=' + res.code + '&operator_id=' + kid,
          success(res) {
            //console.log("缓存:", res);
            var sign = res.data.data.sign;
            var mid = res.data.data.mid;
            //缓存
            wx.setStorageSync('sign', sign);
            wx.setStorageSync('mid', mid);
           
            typeof cb == "function" && cb();
          }
        })
      }
    }
  })
}

//通过module.exports暴露给其他问件引用
//模块化
module.exports = {
  getSign: getSign
}
