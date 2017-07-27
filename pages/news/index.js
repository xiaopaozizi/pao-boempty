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
  onLoad(){
    // 消息列表
    var that = this;
    var url = getApp().globalData.url; 
    var driverInfo = wx.getStorageSync('driverInfo');
    console.log(driverInfo)
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
          // console.log(res.data);
          /*let data = res.data.data;
          data = data.map(item => {
            let date = item.startDate;
            item.startDate = date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8) + ' ' + date.substring(8,10) + ':00:00';
            return item;
          })*/
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
       // console.log(res.data);
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
