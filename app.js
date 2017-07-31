//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    let url = getApp().globalData.url;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用微信登录接口  
      //1、调用微信登录接口，获取code
      wx.login({
        success: function (r) {
          var code = r.code;//登录凭证
          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                //3.请求自己的服务器，解密用户信息 获取unionId等加密信息        
                
                wx.request({
                  url: url + '/emptybox/weChat/decodeUserInfo',//自己的服务接口地址
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: { 
                    encryptedData: res.encryptedData, 
                    iv: res.iv, 
                    code: code 
                    },
                  success: function (data) {
                    //4.解密成功后 获取自己服务器返回的结果
                    if (data.data.status == 1) {
                      that.globalData.openid = data.data.userInfo.openid;
                    } else {
                      console.log('解密失败')
                    }

                  },
                  fail: function () {
                    console.log('系统错误')
                  }
                })
              },
              fail: function () {
                console.log('获取用户信息失败')
              }
            })

          } else {
            console.log('获取用户登录态失败！' + r.errMsg)
          }
        },
        fail: function () {
          console.log('登陆失败')
        }
      }) 
    }
  },
  
  globalData:{
    userInfo:null,
    openid : '',
    //url : 'http://127.0.0.1:8080',
    //url: 'http://120.55.188.15:8080',
    //url : 'http://192.168.10.127:8080',
    //url : 'http://192.168.1.101:8080',
    //url: 'http://192.168.16.166:8080',
    //url: 'http://10.16.20.210:8080',
    url: 'https://www.9entong.cn',
    //url: 'http://120.55.188.15:8080'
    //url: 'http://www.easy-mock.com/mock/596038ae9adc231f357bbb39'
  },
  // 判断是否登录了
  isLogin(){
    if(!wx.getStorageSync('driverInfo')){
      wx.navigateTo({
        url: '../self/login',
      })
    } else {

      return true;
    }
  }
})