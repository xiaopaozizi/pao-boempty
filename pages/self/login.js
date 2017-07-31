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
  },
  // 获取手机号
  phoneHandle(e){
    this.setData({
      telphone : e.detail.value
    })
  },
  // 获取密码
  passHandle(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录
  loginHandle(){

    // 获取验证码
    var url = getApp().globalData.url;
    var that = this;

    wx.request({
      url: url + "/emptybox/weChat/login",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        telphone: that.data.telphone,
        password : that.data.password,
        openId : getApp().globalData.openid
      },
      success: function (res) {
        if(res.data.status === 'success'){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duratioin:2000
          })
          wx.setStorageSync(
            "driverInfo", res.data.data
          )
          wx.switchTab({
            url: '../index/index',
            success(){
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        } else if ( res.data.status === 'fail'){
          wx.showToast({
            title: res.data.message,
            icon: 'loading'
          })
        }
      }
    })


  }
})
