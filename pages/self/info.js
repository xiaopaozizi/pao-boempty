//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    info : [
      
    ]
  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    var that = this;

    // 个人信息
    var url = getApp().globalData.url;
    if(getApp().isLogin()){
      wx.request({
        url: url + "/emptybox/weChat/getDriver",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          'driverId': wx.getStorageSync('driverInfo').id
        },
        success: function (res) {
          that.setData({
            info: res.data.data
          });
        }
      })
    }
  }
  
})
