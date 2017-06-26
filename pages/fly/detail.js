//index.js
//获取应用实例




var app = getApp()
Page({
  data: {
    detailData : '',
   
  },
  onLoad(options){
    //console.log(options);
    let id = options.id;
    var that = this;
    //console.log(999);
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
          detailData: res.data.data
        });
      }
    })
  }
})
