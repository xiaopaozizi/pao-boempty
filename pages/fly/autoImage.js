//index.js 
//获取应用实例
var imageUtil = require('../../utils/autoImg.js');
var app = getApp()
Page({
  data: {
    imagefirstsrc: 'http://bpic.588ku.com/back_pic/00/03/85/1656205138bbe2d.png',//图片链接
    imagesecondsrc: 'http://bpic.588ku.com/back_pic/04/07/63/28581203949ca9d.jpg!/fw/400/quality/90/unsharp/true/compress/true',//图片链接
    imagethirdsrc: 'http://img1.gtimg.com/ent/pics/hv1/13/71/2061/134034643.jpg',
    imagewidth: 0,//缩放后的宽
    imageheight: 0,//缩放后的高

  },
  onLoad: function () {
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
}) 