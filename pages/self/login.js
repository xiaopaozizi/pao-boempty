//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    telphone : '',
    password : '',
  },
  onLoad(options){
    let telphone = options.telphone;
    this.setData({
      telphone : telphone
    })
  }
})
