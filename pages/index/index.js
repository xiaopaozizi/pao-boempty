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
    // 正在进行的单子
    doingList : [],
    // 市场单子----公共单子
    publicList : [],
    // 市场单子----飞单
    flyList : [],
    // 每页多少条
    pageSize : 5,
    // 是否可以加载更多
    hasMore : true,
    // 第几页
    pageNo : 1,
    // 窗口的高度
    windowHeight : 0,
    // 滚动条的位置
    scrollTop : 0
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

    getApp().getUserInfo();
    //return;


    var that = this;
    var driverInfo = wx.getStorageSync('driverInfo');

    // 正在进行的单子---doingList
    if(driverInfo){
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getMyList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          agree : 1
        },
        success: function (res) {
          let result = [];
          res.data.data.forEach(item => {
            result.push(item);
          });
          result.forEach(item => {
            if (item.barCodeImgUrl) {
              item.barCodeImgUrl = getApp().globalData.url + '' + item.barCodeImgUrl;
            }
          })
          that.setData({
            doingList: result
          });
        }
      })
    }
   

    // 广告----ads
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

    // 正在进行的单子

    // 公共单子----publicList
    if (driverInfo) {
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getMyList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          agree : 0
        },
        success: function (res) {
          console.log(res.data);
          if(res.data.status === 'success'){
            that.setData({
              publicList : res.data.data
            })
          }
        }
      })
    }


    // 飞单----flyList
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data : {
        pageNo : 1, 
        pageSize : that.data.pageSize
      },
      success: function (res) {

        that.setData({
          flyList: res.data.data.rows
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
  // 接单
  receiveListHandle(e){
    console.log('recive')
    var that = this;
    let listId = e.target.dataset.listid;
    let driverInfo = wx.getStorageSync('driverInfo');
    if (driverInfo) {
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/agree",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          arrangeId : listId
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.status === 'success') {
            console.log('success');
            wx.showToast({
              title: '接单成功',
              duration:3000
            })
          }
          that.onLoad();
        }
      })
    }
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

  // 上拉刷新
  more(){
    var that = this;
    var pageNo = that.data.pageNo;
    if(that.data.hasMore){

      that.setData({
        hasMore : false,
        pageNo: ++pageNo,
      })
      console.log(111,that.data.hasMore)
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getFlyList",
        header: {
          "Content-Type": "json"
        },
        data: {
          pageNo: 1,
          pageSize: that.data.pageNo * that.data.pageSize
         //pageSize : 2
        },
        success: function (res) {
          that.setData({
            flyList: res.data.data.rows,
            hasMore : true,
          });
          if (that.data.pageNo * 2 > res.data.data.length){
            that.setData({
              pageNo : --pageNo
            })
          }
        }
      })
    }
  },
  //   该方法绑定了页面滚动时的事件
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop,
      //scrollTop: that.data.windowHeight,
    });
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


