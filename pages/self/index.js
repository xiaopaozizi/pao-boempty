//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lists : [
      { icon : '../../images/user-fill.png', text : '个人信息', url : 'info' },
      { icon: '../../images/chg-pass.png', text: '修改密码', url: 'mod-pass' },
      //{ icon: '../../images/chg-pass.png', text: '修改车牌', url: 'modify-lisence-plate-number' },
      { icon : '../../images/dir.png', text : '历史单子', url : 'his-list' },
      //{ icon : '../../images/camera.png', text : '历史预录入', url : 'his-pre-enter' },
      { icon : '../../images/service.png', text : '客服', url : 'about' },
    ]
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
