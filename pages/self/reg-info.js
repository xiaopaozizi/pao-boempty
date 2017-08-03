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
    // 是否显示省份
    isShow : false,
    // 省份
    provinces : [
    ],
    // 最开始的省份
    startProvinces : [],
    // 当前省份
    curProvince : '浙',
    // 车牌号码
    lisence: '',
    // 下一步是否可以注册
    isDisabledRegisterBtn: true,
    // 用户id
    userid : 24,
    // 司机用户名
    username : '',
    // 身份证
    IDCard : '',
    // 照片
    picture: '../../images/userinfo_pic@2x.png',
    pictureFlag : false,
    // 所属车队
    fleet : '',
    // 验证身份证---结果字符串
    checkIDResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      // 结果码
      code: false
    },
    // 验证车牌号---结果字符串
    checkLicenseResStr: {
      // 提示信息
      value: '',
      // 正确错误样式 error success
      cssStyle: '',
      // 是否显示输入框
      hidden: true,
      // 结果码
      code: false
    },
    
  },
  // 获取参数
  onLoad(options) {
    var userid = options.id ? options.id : 24;
    var that = this;
    // 我的单子
    var url = getApp().globalData.url;

    wx.request({
      url: url + "/emptybox/weChat/getProvinceCode",
      header: {
        "Content-Type": "json"
      },
      data: {

      },
      success: function (res) {
        let arr = res.data.data;
        let provinces = [];
        arr.forEach(item => {
          provinces.push({
            value: item,
          });
        });
        that.setData({
          startProvinces: provinces
        });
        provinces[0].isShow = 'active';
        provinces.splice(11, 0, {
          value: '»',
          isMore: 'more'
        })

        that.setData({
          provinces: provinces.slice(0, 12),
          userid: userid
        });
      }
    })
  },
  // 获取用户名
  checkUsername(e){
    this.setData({
      username : e.detail.value
    });
  },
  // 验证身份证号
  checkID(e) {
    let str = e.detail.value.toUpperCase();
    let value = '';
    let cssStyle = '';
    let hidden = false;
    let code = false;
    if (!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(str))) {
      value = '请输入18位有效身份证号';
      cssStyle = 'error';
      code = false;
    } else {
      value = '身份证号有效';
      cssStyle = 'success';
      code = true;
    }
    this.setData({
      'checkIDResStr.value': value,
      'checkIDResStr.cssStyle': cssStyle,
      'checkIDResStr.hidden': false,
      'checkIDResStr.code': code,
      IDCard: str
    });
    this.isRegister();
  },
  // 验证车牌号
  checkLisence(e) {
    let str = e.detail.value.toUpperCase();
    let value = '';
    let cssStyle = '';
    let hidden = false;
    let code = false;
    if (!(/^[A-Z][0-9,A-Z]{5}$/.test(str))) {
      value = '请输入有效车牌号';
      cssStyle = 'error';
      code = false;
    } else {
      value = '车牌号有效';
      cssStyle = 'success';
      code = true;
    }
    this.setData({
      'checkLicenseResStr.value': value,
      'checkLicenseResStr.cssStyle': cssStyle,
      'checkLicenseResStr.hidden': hidden,
      'checkLicenseResStr.code': code,
      lisence: str,
    });
    this.isRegister();
  },

  // 获取车队名称
  checkFleet(e) {
    this.setData({
      fleet: e.detail.value
    });
  },
  // 是否可以注册
  isRegister() {
    // 411524199406245611
    // b12345
    let idCode = this.data.checkIDResStr.code;
    let lisenceCode = this.data.checkLicenseResStr.code;
    if (idCode && lisenceCode && this.data.pictureFlag) {
      this.setData({
        isDisabledRegisterBtn: false
      });
      return true;
    } else {
      this.setData({
        isDisabledRegisterBtn: true
      });
      return false;
    }
  },
  // 显示省份
  showProvince() {
    this.setData({
      isShow: !this.data.isShow,
    })
  },
  // 选择省份
  choiceProvice(e){
    var index = e.target.dataset.index;
    // 点击更多
    if ( index === 11) {
      let startProvinces = this.data.startProvinces;
      startProvinces.forEach(item => {
        if ( item.value === this.data.curProvince ) {
          item.isShow = 'active';
        } else {
          item.isShow = '';
        }
      });

      this.setData({
        provinces: startProvinces
      });
      return;
    }
    var provinces = this.data.provinces;
    provinces.forEach(item => {
      item.isShow = '';
    });
    provinces[index].isShow = 'active';
    var curProvince = provinces[index].value;
    this.setData({
      provinces: provinces,
      curProvince: curProvince,
      isShow : false
    });

  },
  // 选择图片
  chooseImg(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (info) {
        that.setData({
          picture: info.tempFilePaths,
          pictureFlag : true,
        })
        //that.singleUpload(url, paths);
        that.isRegister();
      }
    });
  },
  // 提交注册
  registerHandle(){
    let that = this;
    let username = this.data.username;
    if (this.isRegister() && username){
      // 提交
      // 获取验证码
      
      var url = getApp().globalData.url + '/emptybox/weChat/weChatTruckRegister';
      

      this.singleUpload(url, that.data.picture);
      
    }
  },
  // 上传图片
  singleUpload(url, paths) {
    var that = this;
    wx.uploadFile({
      url: url,    //服务器上传地址
      filePath: paths[0],
      name: 'file',    //上传文件对应表单字段
      header: {   //请求头
        'content-type': 'application/x-www-form-urlencoded'
      },

      methods: 'POST',
      formData: {
        type: 'jpg',
        driverTelInfoId : wx.getStorageSync('driverTelInfoId'),
        driverId: that.data.userid,
        driverName: that.data.username,
        idCard: that.data.IDCard,
        truckCode: that.data.curProvince + that.data.lisence,
        remark: that.data.fleet
      },   //其他额外的表单字段
      success: function (res, code) {
        res = JSON.parse(res.data);
        if (res.status === 'success') {
          console.log(999999, res.data);
          wx.setStorageSync('driverInfo', res.data)
          wx.switchTab({
            url: '../index/index',
            success() {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        } else if ( res.status === 'fail') {
  
          that.setData({
            'checkLicenseResStr.value': res.message,
            'checkLicenseResStr.cssStyle': 'error',
            'checkLicenseResStr.hidden': false,
            'checkLicenseResStr.code': false,
          });
          that.isRegister();
        }
      }
    });
  },
  
})



