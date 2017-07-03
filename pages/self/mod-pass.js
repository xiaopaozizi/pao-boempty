//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // 密码
    password: '',
    // 新密码
    newPass : '',
    // 重复密码
    repPass: '', 
    // 旧的密码---字符串
    checkPassResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      // 结果码
      code: false
    },
    // 新密码---字符串
    checkNewPassResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      // 结果码
      code: false
    },
    // 确认密码验证---结果字符串
    checkRepPassResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      code: false
    },
  },
  // 获取旧密码
  checkPass(e) {

    let str = e.detail.value;
    let value = '';
    let cssStyle = '';
    let code = false;
    if (str.length < 6 || str.length > 20) {
      value = '密码6~20位之间';
      cssStyle = 'error';
      code = false;
    } else {
      value = '密码合法';
      cssStyle = 'success';
      code = true;
    }

    this.setData({
      'checkPassResStr.value': value,
      'checkPassResStr.cssStyle': cssStyle,
      'checkPassResStr.hidden': false,
      'checkPassResStr.code': code,
      password: str
    });
    //this.isRegister();
  },
  // 获取新密码
  checkNewPass(e) {

    let str = e.detail.value;
    let value = '';
    let cssStyle = '';
    let code = false;
    if (str.length < 6 || str.length > 20) {
      value = '密码6~20位之间';
      cssStyle = 'error';
      code = false;
    } else {
      value = '密码合法';
      cssStyle = 'success';
      code = true;
      console.log(str, this.data.password)
      if (str == this.data.password) {
        value = '新密码与当前密码一致，请修改';
        cssStyle = 'error';
        code = false;
      } 
      if ( str !== this.data.repPass ) {
        this.setData({
          'checkRepPassResStr.value': '密码不一致',
          'checkRepPassResStr.cssStyle': 'error',
          'checkRepPassResStr.hidden': false,
          'checkRepPassResStr.code': false,
        });
      } else {
        this.setData({
          'checkRepPassResStr.value': '验证密码和新密码一致',
          'checkRepPassResStr.cssStyle': 'success',
          'checkRepPassResStr.hidden': false,
          'checkRepPassResStr.code': true,
        });
      }
    }

    this.setData({
      'checkNewPassResStr.value': value,
      'checkNewPassResStr.cssStyle': cssStyle,
      'checkNewPassResStr.hidden': false,
      'checkNewPassResStr.code': code,
      newPass: str
    });
    //this.isRegister();
  },
  // 重复密码
  checkRepPass(e) {
    let repPass = e.detail.value;
    let value = '';
    let cssStyle = '';
    let hidden = false;
    let code = false;
    if (repPass !== this.data.newPass) {
      value = '密码不一致';
      cssStyle = 'error';
      code = false;
    } else {
      value = '验证密码和新密码一致';
      cssStyle = 'success';
      code = true;
      
    }
    this.setData({
      'checkRepPassResStr.value': value,
      'checkRepPassResStr.cssStyle': cssStyle,
      'checkRepPassResStr.hidden': false,
      'checkRepPassResStr.code': code,
      repPass: repPass
    });
    //this.isRegister();
  },
  //  修改密码
  changePassHandle(){
    var that = this;
    var driverInfo = wx.getStorageSync('driverInfo');
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/modPwd",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        driverId : driverInfo.id,
        oldPwd : that.data.password,
        newPwd : that.data.newPass
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status === 'success') {
          // 成功--跳转页面
          wx.showToast({
            title: '修改密码成功',
            duration: 3000,
            icon: 'success'
          });
          wx.switchTab({
            url: 'index',
          })
        } else if ( res.data.status === 'fail' ){
            wx.showToast({
              title: res.data.message,
              duration : 3000,
              icon : 'loading'
            });
            that.setData({
              'checkPassResStr.value': res.data.message,
              'checkPassResStr.cssStyle': 'error',
              'checkPassResStr.hidden': false,
              'checkPassResStr.code': false
            });
        }
      }
    })
  }
  
})
