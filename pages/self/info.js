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
          console.log(res.data);
          that.setData({
            info: res.data.data
          });
        }
      })
    }
  }
  
})
