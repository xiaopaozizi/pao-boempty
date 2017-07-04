//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lists : [
       
      ]
  },
  onLoad(){
    // 消息列表
    var that = this;
    var url = getApp().globalData.url;

    wx.request({
      url: url + "/emptybox/weChat/getMesInfo",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
      },
      success: function (res) {
       // console.log(res.data);
        that.setData({
          lists : res.data.data
        })
      }
    })
  }
  
})
