//index.js
//获取应用实例
var app = getApp()
Page({
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  data: {
    detail : { 
      title : '预录入成功', 
      icon : '../../images/pen.png', 
      content : '您在2017年1月1号拍照上传成功，数据已预录入IDE系统，请点击查看具体信息', 
      time : '2017-01-01 10:00:00' 
    },
    listData:[
      {"key":"text1","value":"xxxxxxxxxxxx"},
      {"key":"text2","value":"xxxxxxxxxxxx"},
      {"key":"text3","value":"xxxxxxxxxxxx"},
      {"key":"text4","value":"xxxxxxxxxxxx"},
      {"key":"text5","value":"xxxxxxxxxxxx"},
      {"key":"text6","value":"xxxxxxxxxxxx"},
      {"key":"text7","value":"xxxxxxxxxxxx"},
    ]
  },
  
})
