//index.js
//获取应用实例
var app = getApp()
Page({//定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  data: {
    infos : [
      { key : '姓名', value : '张三' },
      { key : '身份证', value : '330206555111112' },
      { key : '车牌号', value : '浙B：88888' },
      { key : '手机号码', value : '17882848584' },
    ]
  },
  
})
