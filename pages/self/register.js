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
    // 手机号
    telphone : '',
    // 验证码
    validateCode : '',
    // 密码
    password : '',
    // 重复密码
    repPass : '',
    // 下一步是否可以点击
    isDisabledRegisterBtn : true,
    // 验证手机号---结果字符串
    checkPhoneResStr : {
      // 提示信息
      value : '',
      // 正确错误样式 error success
      cssStyle : '',
      // 是否显示输入框
      hidden : true,
      // 结果码
      code : false
    },
    // 获取验证码--按钮的信息
    getCodeBtn : {
       value : '获取验证码',
       // 按钮变灰色，有loading
       disabled : false
    },
    // 验证码---结果字符串
    checkCodeResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      // 结果码
      code : false
    },
    // 密码
    checkPassResStr:{
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      // 结果码
      code : false
    },
    // 确认密码验证---结果字符串
    checkRepPassResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      code : false
    },
  },


  // 验证手机号
  checkPhone(e){
    let str = e.detail.value;
    let value = '';
    let cssStyle = '';
    let hidden = false;
    let code = false;
    if (!(/^1[34578]\d{9}$/.test(str))) {
      value = '请输入11位有效手机号码';
      cssStyle = 'error';
      code = false;
    } else {
      value = '手机号有效';
      cssStyle = 'success';
      code = true;
    }
    this.setData({
      'checkPhoneResStr.value': value,
      'checkPhoneResStr.cssStyle': cssStyle,
      'checkPhoneResStr.hidden': false,
      'checkPhoneResStr.code': code,
      telphone : str
    });
    this.isRegister();
  },
  // 获取验证码
  getCode(){
    if (this.data.telphone === '') return;
    var that = this;
    let num = 60;
    let value = '';
    let disabled = false;
    let timer = null;

    
    clearInterval(timer);

    timer = setInterval(function () {
      if (num <= 0) {
        clearInterval(timer);
        that.setData({
          'getCodeBtn.value': '获取验证码',
          'getCodeBtn.disabled': false,
        });
        return;
      }
      num--;
      value = num + '秒';
      disabled = true;
      that.setData({
        'getCodeBtn.value' : value,
        'getCodeBtn.disabled' : disabled
      });
    }, 1000);

    // 获取验证码
    var url = getApp().globalData.url;

    wx.request({
      url: url + "/emptybox/verifyCode/getCode",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data:{
        telphone : that.data.telphone
      },
      success: function (res) {
      }
    })

  },
  // 验证码
  checkCode(e) {
    let str = e.detail.value;
    let value = '';
    let cssStyle = '';
    let hidden = false;
    let code = false;
    if (str.length !== 6) {
      value = '请输入6位验证码';
      cssStyle = 'error';
      code = false;
    } else {
      value = '验证码有效';
      cssStyle = 'success';
      code = true;
    }
    this.setData({
      'checkCodeResStr.value': value,
      'checkCodeResStr.cssStyle': cssStyle,
      'checkCodeResStr.hidden': false,
      'checkCodeResStr.code': code,
      validateCode : str
    });
    this.isRegister();
  },
  // 获取密码
  checkPass(e){
   
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
      if (str !== this.data.repPass) {
        this.setData({
          'checkRepPassResStr.value': '密码不一致',
          'checkRepPassResStr.hidden': false,
          'checkRepPassResStr.cssStyle': 'error',
          'checkRepPassResStr.code': false,
        });
      } else {
        this.setData({
          'checkRepPassResStr.value': '密码一致',
          'checkRepPassResStr.hidden': false,
          'checkRepPassResStr.cssStyle': 'success',
          'checkRepPassResStr.code': true,
        });
      }
    }

    this.setData({
      'checkPassResStr.value': value,
      'checkPassResStr.cssStyle': cssStyle,
      'checkPassResStr.hidden': false,
      'checkPassResStr.code' : code,
      password : str
    });
    this.isRegister();
  },
  // 重复密码
  checkRepPass(e){
    let repPass = e.detail.value;
    let value = '';
    let cssStyle = '';
    let hidden = false;
    let code = false;
    if (repPass !== this.data.password ){
      value = '密码不一致';
      cssStyle = 'error';
      code = false;
    } else {
      value = '验证密码和密码一致';
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
    this.isRegister();
  },
  // 提交注册信息---手机号、验证码和密码
  registerInfo(){
    var that = this;
    if (this.isRegister()){
      // 个人信息
      var url = getApp().globalData.url;
      wx.request({
        url: url + "/emptybox/weChat/weChatDriverRegister",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data :{
          telphone: this.data.telphone,
          verifyCode : this.data.validateCode,
          password : this.data.password,
          openId: getApp().globalData.openid
        },
        success: function (res) {
          if(res.data.status === 'success'){
            wx.navigateTo({
              url: './reg-info?id=' + res.data.data,
            })
          } else {
            var message = res.data.message;
            if (message.indexOf('手机号') > -1){
              that.setData({
                'checkPhoneResStr.value': message,
                'checkPhoneResStr.cssStyle': 'error',
                'checkPhoneResStr.hidden': false,
                'checkPhoneResStr.code': false,
                isDisabledRegisterBtn: true
              });
            } else if ( message.indexOf('验证码') > -1){
              that.setData({
                'checkCodeResStr.value': message,
                'checkCodeResStr.cssStyle': 'error',
                'checkCodeResStr.hidden': false,
                'checkCodeResStr.code': false,
                isDisabledRegisterBtn: true
              });
            }
          }
        }
      })
    } else {
      console.log('error')
    }
  },
  // 是否可以下一步
  isRegister(){
    let phoneCode = this.data.checkPhoneResStr.code;
    let codeCode = this.data.checkCodeResStr.code;
    let passCode = this.data.checkPassResStr.code;
    let resPassCode = this.data.checkRepPassResStr.code;
   
    
    if (phoneCode && codeCode && passCode && resPassCode){
      this.setData({
        isDisabledRegisterBtn : false
      });
      return true;
    } else {
      this.setData({
        isDisabledRegisterBtn: true
      });
      return false;
    }
  }
})
