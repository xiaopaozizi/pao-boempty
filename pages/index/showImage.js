//获取应用实例
var app = getApp()

Page({
  data: {
    imagesrc: '../../images/girl.jpg',
    screenWidth: 0,
    screenHeight: 0,
    imagewidth: 0,
    imageheight: 0, 
    isCrossScreen : false,
  },
  onLoad: function (e) {
    if (e.imagesrc) {
      this.setData({
        imagesrc : e.imagesrc
      })
    }
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });

  },  
  imageLoad: function (e) {
    var _this = this;
    let width = e.detail.width;
    let height = e.detail.height;
    let scale = width / height;
    // 图片宽度>高度
    if(scale > 1){
      this.setData({
        imagewidth: _this.data.screenHeight,
        imageheight: _this.data.screenHeight / width * height,
        isCrossScreen : true
      })
    } else {
      this.setData({
        imagewidth: _this.data.screenHeight / height * width,
        imageheight: _this.data.screenHeight
      })
    }

    
  }, 

})