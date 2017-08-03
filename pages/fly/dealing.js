//index.js
//获取应用实例




var app = getApp()
Page({
  data: {
    
   
  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
})
