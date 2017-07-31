//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  onLoad() {
    var that = this;
    var url = getApp().globalData.url; 
    var driverInfo = wx.getStorageSync('driverInfo');
    if(driverInfo){
      wx.request({
        url: url + "/FHSHGL/weixin/getAll",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          phone: driverInfo.telphone
        },
        success: function (res) {
          that.setData({
            publicMsg: res.data.data
          })
        }
      })
    }
  }
  
})
