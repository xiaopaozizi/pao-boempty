//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    info : [
      
    ]
  },

  onLoad: function () {
    var that = this;

    // 个人信息
    var url = getApp().globalData.url;

    wx.request({
      url: url + "/emptybox/weChat/getDriver",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          info: res.data.data
        });
      }
    })
  }
  
})
