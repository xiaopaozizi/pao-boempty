//index.js
//获取应用实例




var app = getApp()
Page({
  data: {
    // 单子详情
    detailData : '',
    // 单子id
    id : '',
    // 对话框信息
    message :　'',
    // 关闭对话框
    closeDialog : true
  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  // 抢单
  robHandle(e){
    let id = e.target.dataset.id;
    let that = this;
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/grabOrder",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        arrangeId: id,
        driverId : wx.getStorageSync('driverInfo').id
      },
      success: function (res) {
        let status = res.data.status;
        if ( status === 'success' ) {
          that.setData({
            message : '操作成功！',
            closeDialog : false
          });
        } else if (status === 'fail') {
          that.setData({
            message: res.data.message,
            closeDialog: false
          });
        }
        setTimeout(function () {
          that.setData({
            closeDialog : true
          });
          wx.switchTab({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }  
          })
        }, 2000);
      }
    })
  },
  onLoad(options){
    let id = options.id;
    var that = this;
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getFlyById",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method : 'POST',
      data: {
        id : id
      },
      success: function (res) {
        that.setData({
          detailData: res.data.data,
          id : id
        });
      }
    })
  }
})
