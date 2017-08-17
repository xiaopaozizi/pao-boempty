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
  showImage(e){
    let src = getApp().globalData.url + '/upload/' + e.target.dataset.imgsrc;
    this.setData({
      imageSrc : src,
      isHiddenModal : false
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

    getApp().getUserInfo();
    //return;
    // 设置当前刷新的页面
    this.setData({
      pageNo : 1
    });

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
              item.barCodeImgUrl = getApp().globalData.url + '/upload/' + item.barCodeImgUrl;
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
          result.push(getApp().globalData.url + '/upload/' + item.imgUrl);
        })
        that.setData({
          ads: result
        })
      }
    })

    // 正在进行的单子

    // 公共单子----publicList
    if (driverInfo) {
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getMyPublicList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          agree : 0
        },
        success: function (res) {
          if(res.data.status === 'success'){
            that.setData({
              publicList : res.data.data
            })
          }
        }
      })
    }
   // console.log(typeof this.data.publicList.length)

    return;
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
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
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
    var that = this;
    var pageNo = that.data.pageNo;
    if(that.data.hasMore){

      that.setData({
        hasMore : false,
        pageNo: ++pageNo,
      })
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


