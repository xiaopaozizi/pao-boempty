//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // 个人消息---有关车辆的
    selfCarMsg: [],
    // 公共消息
    publicMsg: [],

  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    console.log('我要刷新')
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onLoad(){
    // 消息列表
    var that = this;
    var url = getApp().globalData.url; 
    var driverInfo = wx.getStorageSync('driverInfo');
    // 自己的消息-----违章停车之类的
    if (driverInfo) {
      wx.request({
        url: url + "/emptybox/weChat/getTruckStop",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id
        },
        success: function (res) {
          that.setData({
            selfCarMsg: res.data.data
          })
        }
      })
    }
    // 自己的消息-----预录入消息

    // 公共消息-----剑军给的消息

    wx.request({
      url: url + "/emptybox/weChat/getMesInfo",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
      },
      success: function (res) {
        that.setData({
          publicMsg : res.data.data
        })
      }
    })

   
  },
  onShow(){
    this.onLoad();
  }
  
})
