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

  // 抢单
  robHandle(e){
    let id = e.target.dataset.id;
    let that = this;
    wx.request({
      url: "http://192.168.16.166:8080/emptybox/weChat/grabOrder",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        id: id
      },
      success: function (res) {
        //console.log(res);
        let status = res.data.status;
        if ( status === 'success' ) {
          that.setData({
            message : '抢单成功！',
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
              console.log(page);
              if (page == undefined || page == null) return;
              page.onLoad();
            }  
          })
        }, 3000);
      }
    })
  },
  onLoad(options){
    let id = options.id;
    var that = this;
    wx.request({
      url: "http://192.168.16.166:8080/emptybox/weChat/getFlyById",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method : 'POST',
      data: {
        id : id
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          detailData: res.data.data,
          id : id
        });
      }
    })
  }
})
