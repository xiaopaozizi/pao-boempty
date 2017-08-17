//index.js 
//获取应用实例
var imageUtil = require('../../utils/autoImg.js');
var app = getApp()
Page({
  data: {
    imgSrc : '../../images/4-box.png',
    imagewidth : 100,
    imageheight : 100,

  },
  onLoad: function () {
  },
  touchmoveHandle: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    
  }
}) 