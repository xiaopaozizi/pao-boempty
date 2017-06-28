//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

    // 是否显示省份
    isShowProvince: false,
  },
  // 显示省份
  showProvince(e) {
    var that = this;
    this.setData({
      isShowProvince: true
    })
    console.log('ok')
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



