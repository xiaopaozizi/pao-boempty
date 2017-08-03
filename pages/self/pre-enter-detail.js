//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // 是否显示省份
    isShowProvince : false,

  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  showProvince(){
    this.setData({
      isShowProvince: !this.data.isShowProvince
    });
  }

  
})
