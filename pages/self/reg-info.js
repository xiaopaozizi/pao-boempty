//index.js
//获取应用实例
var app = getApp()
Page({
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
    // 司机用户名
    username : '',
    // 身份证
    IDCard : '',
    // 照片
    picture : '',
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
  // 验证身份证号
  checkID(e) {
    let str = e.detail.value;
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
    //this.isRegister();
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
    console.log(this.data.curProvince + this.data.lisence);
    //this.isRegister();
  },
  // 是否可以注册
  isRegister() {
    let idCode = this.data.checkIDResStr.code;
    let lisenceCode = this.data.checkLisenceResStr.code;

    if (idCode && lisenceCode) {
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
  // 获取参数
  onLoad(options){
    //console.log(options);
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
            value : item,
          });
        });
        that.setData({
          startProvinces: provinces
        });
        provinces[0].isShow = 'active';
        provinces.splice(11, 0, {
          value: '»',
          isMore : 'more'
        })

        that.setData({
          provinces: provinces.slice(0, 12)
        });
      }
    })
  },
  // 选择省份
  choiceProvice(e){
    var index = e.target.dataset.index;
    console.log(index);
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

    console.log(this.data.curProvince + this.data.lisence);
  },

  // 上传图片
  upload(){
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  }
})



