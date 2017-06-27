//index.js
//获取应用实例
var app = getApp()


var wxbarcode = require('../../utils/index.js');

var indexPage = {
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
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

  // 读取屏幕高度，赋值给scroll-view
  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.windowHeight)
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },

  onLoad: function () {
    var that = this;
    wxbarcode.barcode('barcode', '1234567890123456789', 500, 100)

    // 我的单子
    var url = getApp().globalData.url;

    wx.request({
      url: url + "/emptybox/weChat/getMyList",
      header: {
        "Content-Type": "json"
      },
      data: {

      },
      success: function (res) {
        console.log(res.data)

        that.setData({
          myList: res.data.data
        });
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
        console.log(res.data)

        that.setData({
          marketList: res.data.data
        });
      }
    })

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


