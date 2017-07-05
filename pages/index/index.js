//index.js
//获取应用实例
var app = getApp()


var wxbarcode = require('../../utils/index.js');

var indexPage = {
  data: {
    ads: [],
    // 是否隐藏查看图片的modal
    isHiddenModal : true,
    // 图片路径
    imageSrc : '',
    "myList": [
      // 首页
    ],
    // 市场单子
    marketList: [
      // 正在进行的单子
    ],
    // 每页多少条
    pageSize : 2,
    // 第几页
    pageNo : 1,
    // 窗口的高度
    windowHeight : 0,
  },
  // 点击显示图片
  showImage(e){
    let src = getApp().globalData.url + '/emptybox/file' + e.target.dataset.imgsrc;
    this.setData({
      imageSrc : src,
      isHiddenModal : false
    })
  },
  // 点击图片modal，并且隐藏
  hideImageHandle(){
    console.log('dasfkljs')
    this.setData({
      isHiddenModal : true
    })
  },
  
  

  onLoad: function () {
    var that = this;
    var driverInfo = wx.getStorageSync('driverInfo');
    wxbarcode.barcode('barcode', '1234567890123456789', 500, 100)


    


    // 我的单子
    //var url = getApp().globalData.url;
    if(driverInfo){
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getMyList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          dataStatus : 1
        },
        success: function (res) {
          let result = [];
          res.data.data.forEach(item => {
            result.push(item);
          });
          result.forEach(item => {
            if (item.barCodeImgUrl) {
              item.barCodeImgUrl = getApp().globalData.url + '/emptybox/file' + item.barCodeImgUrl;
            }
          })
          that.setData({
            myList: result
          });
        }
      })
    }
   

    // 广告
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getAd",
      header: {
        "Content-Type": "json"
      },
      data: {
      },
      success: function (res) {
        let result= [];
        res.data.data.forEach(item => {
          result.push(getApp().globalData.url + '/emptybox/file' + item.imgUrl);
        })
        console.log(res.data);
        that.setData({
          ads: result
        })
      }
    })



    // 飞单
    //console.log(url + "/emptybox/weChat/getFlyList");
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data : {
        pageNo : 1, 
        pageSize : 2
      },
      success: function (res) {

        that.setData({
          marketList: res.data.data
        });
      }
    })

    // 设置高度
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  // 抢单
  robListHandle(e){
    let listId = e.target.dataset.listid;
    if(getApp().isLogin()){
      wx.navigateTo({
        url: '../fly/detail?id=' + listId,
      })
    }
  },

  // 下拉刷新
  more(){
    var that = this;
    console.log(999);
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data: {
        pageNo: 1,
        pageSize: (that.data.pageNo++) * 2
      },
      success: function (res) {
        //console.log(res.data)
        

        that.setData({
          marketList: res.data.data
        });
       // console.log(that.data.marketList)
      }
    })
  },
  // 上传
  uploadPicHandle(){
    wx.navigateTo({
      url: 'upload-pre-enter',
    })
  }
}

import list2Obj from '../template/list2'

indexPage['calling'] = list2Obj.calling;
indexPage['toast'] = list2Obj.coast;
Page(indexPage);


