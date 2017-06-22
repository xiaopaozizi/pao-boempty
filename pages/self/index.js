//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lists : [
      { icon : '../../images/user-fill.png', text : '个人信息', url : 'info' },
      { icon : '../../images/chg-pass.png', text : '修改密码', url : 'mod-pass' },
      { icon : '../../images/dir.png', text : '历史单子', url : 'his-list' },
      { icon : '../../images/camera.png', text : '历史预录入', url : 'his-pre-enter' },
      { icon : '../../images/wallet.png', text : '账单', url : '' },
      { icon : '../../images/service.png', text : '客服', url : 'about' },
    ]
  },
  
})
