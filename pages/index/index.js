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
    // 我的任务单
    taskList : [],
    // 正在进行的单子
    doingList : [],
    // 市场单子----公共单子
    publicList : [],
    // 市场单子----飞单
    flyList : [],
    // 每页多少条
    pageSize : 2,
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
  showImage(e) {
    let src = getApp().globalData.url + '/upload/' + e.target.dataset.imgsrc;
    wx.navigateTo({
      url: '../index/showImage?imagesrc=' + src,
    })
  },
  // 点击图片modal，并且隐藏
  hideImageHandle(){
    this.setData({
      isHiddenModal : true
    })
  },
  // 刷新
  refreshHandle(){
    this.onLoad();
  },
  onShow(){
    this.onLoad();
  },
  //定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  // 加载数据函数
  onReachBottom: function (event) {
    console.log("滚到底了");
    this.more();
  },
  onPullDownRefresh(){
    console.log('我要刷新')
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
    this.getAd();
    // 设置当前刷新的页面
    this.setData({
      pageNo: 1,
      pageSize: 2,
    });
    this.getTaskList();
  },
  // 获取广告
  getAd(){
    // 广告----ads
    let that = this;
    var url = getApp().globalData.url;
    wx.request({
      url: url + "/emptybox/weChat/getAd",
      header: {
        "Content-Type": "json"
      },
      data: {
      },
      success: function (res) {
        let result = [];
        res.data.data.forEach(item => {
          result.push(url + '/upload/' + item.imgUrl);
        })
        that.setData({
          ads: result
        })
      }
    })
  },
  // 获取任务单子
  getTaskList() {
    var that = this;
    var url = getApp().globalData.url;
    var driverInfo = wx.getStorageSync('driverInfo');
    if (driverInfo) {
      wx.request({
        url: url + "/emptybox/weChat/getMyTask",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          pageNo: 1,
          pageSize: that.data.pageSize,
        },
        success: function (res) {
          that.setData({
            taskList: res.data.data.rows
          });
        }
      })
    }
  },

  // 取消单子
  cancelHandle(e){
    var that = this;
    let listId = e.target.dataset.listid;
    if(listId){
      wx.showModal({
        title: '',
        content: '确定取消单子？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: getApp().globalData.url + "/emptybox/weChat/cancel",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              data: {
                odiId: listId
              },
              success: function (res) {
                if (res.data.status === 'success') {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '取消失败',
                    icon: 'cancel',
                    duration: 2000
                  })
                }
                that.onLoad();
              }
            })
          }
        }
      })
     
    }
  },

  // 做
  doAgainHandle(e){

    var that = this;
    let listId = e.target.dataset.listid;
    let driverInfo = wx.getStorageSync('driverInfo');
    if (driverInfo) {
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/doAgain",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          arrangeId: listId
        },
        success: function (res) {
          if (res.data.status === 'success') {
            wx.showToast({
              title: '接单成功',
              duration: 3000
            })
          } else {
            wx.showToast({
              title: res.data.message,
              duration: 3000
            })
          }
          that.onLoad();
        }
      })
    }
  },
  // 接单
  receiveListHandle(e){
    var that = this;
    let listId = e.target.dataset.listid;
    let driverInfo = wx.getStorageSync('driverInfo');
    if (driverInfo) {
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/grabOrder",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          arrangeId : listId
        },
        success: function (res) {
          if (res.data.status === 'success') {
            wx.showToast({
              title: '接单成功',
              duration:3000
            })
          } else {
            wx.showToast({
              title: res.data.message,
              duration: 3000
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
    // 设置当前刷新的页面
    this.setData({
      pageSize: (++this.data.pageNo) * 2
    });
    this.getTaskList();
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


