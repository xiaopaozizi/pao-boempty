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
      /**wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })**/
      //调用微信登录接口  
      wx.login({
        success: function (loginCode) {
          var appid = 'wx2f07d95223b7fc08'; //填写微信小程序appid  
          var secret = '8a95ea0324448eec8af7a85c8fcc03c2'; //填写微信小程序secret  

          //调用request请求api转换登录凭证  
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + loginCode.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              that.globalData.openid = res.data.openid;
              console.log(123123123,res.data.openid) //获取openid 
             // console.log(that.globalData.openid); 
            }
          })
        }
      })  
    }
  },
  globalData:{
    userInfo:null,
    openid : '',
    //url: 'http://120.55.188.15:8080',
    //url : 'http://192.168.10.127:8080',
    //url : 'http://192.168.1.101:8080',
    url: 'http://192.168.16.166:8080',
    //url: 'http://10.16.20.210:8080',
    //url: 'http://www.9entong.com:8080',
    //url: 'http://www.easy-mock.com/mock/596038ae9adc231f357bbb39'
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