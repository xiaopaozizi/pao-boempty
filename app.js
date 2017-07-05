//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    url: 'http://192.168.16.166:8080',
    //url: 'http://10.16.20.210:8080',
  },
  // 判断是否登录了
  isLogin(){
    console.log(wx.getStorageSync('driverInfo'))
    if(!wx.getStorageSync('driverInfo')){
      wx.navigateTo({
        url: '../self/login',
      })
    } else {

      return true;
    }
  }
})