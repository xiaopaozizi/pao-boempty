//index.js
//获取应用实例
var app = getApp()
Page({//定义分享
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.shareMsg,
      path: '/pages/index/index'
    }
  },
  data: {
    count : 0,
    // 每页多少条
    pageSize : 2,
    // 第几页
    pageNo: 1,
    // 历史单子
    historyList : [],
    // 窗口的高度
    windowHeight: '',
    // 是否隐藏查看图片的modal
    isHiddenModal: true,
    // 图片路径
    imageSrc: '',
  },

  toast: function () {
    wx.navigateTo({
      url: '../fly/dealing'
    })
  },
  // 加载数据函数
  onReachBottom: function (event) {
    console.log("滚到底了");
    this.more();
  },
  onPullDownRefresh() {
    console.log('我要刷新')
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onLoad(){
    // 历史单子
    var that = this;
    var url = getApp().globalData.url;
    var driverInfo = wx.getStorageSync('driverInfo');
    // 设置当前刷新的页面
    this.setData({
      pageNo: 1
    });


    if (getApp().isLogin()) {
      wx.request({
        url: url + "/emptybox/weChat/getMyFinish",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          pageNo: that.data.pageNo,
          pageSize: that.data.pageSize
        },
        success: function (res) {
          that.setData({
            historyList: res.data.data.rows,
            count: res.data.data.total
          });
        }
      })
    } 
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
  // 下拉刷新
  more() {
    var driverInfo = wx.getStorageSync('driverInfo');
    var that = this;
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getMyFinish",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        driverId: driverInfo.id,
        pageNo: 1,
        pageSize: (that.data.pageNo++) * that.data.pageSize
      },
      success: function (res) {


        that.setData({
          historyList: res.data.data.rows,
          total: res.data.data.total
        });
      }
    })
  },
  // 点击显示图片
  showImage(e) {
    let src = getApp().globalData.url + '/upload/' + e.target.dataset.imgsrc;
    this.setData({
      imageSrc: src,
      isHiddenModal: false
    })
  },
  // 点击图片modal，并且隐藏
  hideImageHandle() {
    this.setData({
      isHiddenModal: true
    })
  },
  
})
