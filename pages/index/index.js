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
    windowHeight : '',
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
  // 读取屏幕高度，赋值给scroll-view
  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },

  onLoad: function () {
    var that = this;
    var driverInfo = wx.getStorageSync('driverInfo');
    wxbarcode.barcode('barcode', '1234567890123456789', 500, 100)


    


    // 我的单子
    var url = getApp().globalData.url;
    if(driverInfo){
      wx.request({
        url: url + "/emptybox/weChat/getMyList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          dataStatus : 1
        },
        success: function (res) {
          
          that.setData({
            myList: res.data.data
          });
        }
      })
    }
   

    // 广告
    wx.request({
      url: url + "/emptybox/weChat/getAd",
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
      url: url + "/emptybox/weChat/getFlyList",
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
    //console.log(999);
    wx.request({
      url: "http://192.168.16.166:8080/emptybox/weChat/getFlyList",
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
  }

}

import list2Obj from '../template/list2'

indexPage['calling'] = list2Obj.calling;
indexPage['toast'] = list2Obj.coast;
Page(indexPage);


