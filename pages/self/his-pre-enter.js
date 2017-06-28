//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // 是否显示省份
    isShowProvince : false,

  },
  showProvince(){
    this.setData({
      isShowProvince: !this.data.isShowProvince
    });
  }
  
})
