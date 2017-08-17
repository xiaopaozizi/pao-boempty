//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lists : [
      { icon : 'fa fa-user', text : '个人信息', url : 'info' },
      { icon: 'fa fa-lock', text: '修改密码', url: 'mod-pass' },
      { icon: 'fa fa-truck', text: '修改车牌', url: 'modify-lisence-plate-number' },
      { icon : 'fa fa-list', text : '历史单子', url : 'his-list' },
      //{ icon : '../../images/camera.png', text : '历史预录入', url : 'his-pre-enter' },
      { icon : 'fa fa-smile-o', text : '客服', url : 'about' },
    ]
  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  onLoad(){
    if (getApp().isLogin()) {}
  },
  logout(){
    wx.removeStorage({
      key: 'driverInfo',
      success: function (res) {
        wx.navigateTo({
          url: 'login',
        })
      } 

    })
  }
  
})
