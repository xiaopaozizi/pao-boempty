//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imglist : [],
    remark : '',
  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  // 选择图片
  chooseImage(){
    let that = this;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
       // upload(that, tempFilePaths);
        that.setData({
          imglist: tempFilePaths
        })
      }
    })
  },
  // 备注
  remarkHandle(e){
    this.setData({
      remark : e.detail.value
    })
  },
  uploadimg() {//这里触发图片上传的方法
   
    var that = this;
    for (let i = 0; i < that.data.imglist.length; i++ ){
      (function(i){
        wx.uploadFile({
          url: getApp().globalData.url + '/FHSHGL/weixin/fileUpload',    //服务器上传地址
          filePath: that.data.imglist[i],
          name: 'upload',    //上传文件对应表单字段
          header: {   //请求头
            'content-type': 'application/x-www-form-urlencoded'
          },
          methods: 'POST',
          formData: {
            type: 'jpg',
            phone : '18957877424',
           // phone: wx.getStorageSync('driverInfo').phone,
            remark: that.data.remark
          },   //其他额外的表单字段
          success: function (res, code) {
            res = JSON.parse(res.data);
            if (res.status === 'success') {
              wx.navigateTo({
                url: 'login?telphone=' + res.data,
              })
            } else if (res.status === 'fail') {

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
      })(i);
    }
    

    
    
  },
})



