//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "lists" : [
      // 历史单子
      
    ]
  },

  toast: function () {
    wx.navigateTo({
      url: '../fly/dealing'
    })
  },

  onLoad(){
    // 历史单子
    var that = this;
    var url = getApp().globalData.url;
    var driverInfo = wx.getStorageSync('driverInfo');
    if (driverInfo) {
      wx.request({
        url: url + "/emptybox/weChat/getMyFinish",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            lists: res.data.data
          });
        }
      })
    }
  }
  
})
