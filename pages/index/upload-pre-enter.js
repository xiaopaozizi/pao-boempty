//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imglist : []
  },
  // 选择图片
  chooseImage(){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
       // upload(that, tempFilePaths);
        that.setData({
          imglist: tempFilePaths
        })

        console.log(tempFilePaths)
       // return;
        wx.uploadFile({
          url: getApp().globalData.url + '/emptybox/weChat/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'file': tempFilePaths[0],

          },
          success: function (res) {
            var data = res.data
            console.log(res.data)
            //do something
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
        })
      }
    })
  },
})



function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  });
  
  //for ( var i = 0; i < path.length; i++ ) {
    wx.uploadFile({
      url: getApp().globalData.url + '/emptybox/UploadServlet',
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
       // 'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = res.data
        page.setData({  //上传成功修改显示头像
          src: path[0]
        })
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
 // }
}
