//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "lists" : [
      // 历史单子
      
    ],
    count : 0,
    // 每页多少条
    pageSize : 2,
    // 第几页
    pageNo: 1,
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

  onLoad(){
    // 历史单子
    var that = this;
    var url = getApp().globalData.url;
    var driverInfo = wx.getStorageSync('driverInfo');
    if (getApp().isLogin()) {
      wx.request({
        url: url + "/emptybox/weChat/getMyFinish",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          pageNo: 1,
          pageSize: 2
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            lists: res.data.data.list,
            count : res.data.data.count
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
    //console.log(999);
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getMyFinish",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        driverId: driverInfo.id,
        pageNo: 1,
        pageSize: (that.data.pageNo++) * 2
      },
      success: function (res) {
        //console.log(res.data)


        that.setData({
          lists: res.data.data.list,
          count: res.data.data.count
        });
        // console.log(that.data.marketList)
      }
    })
  },
  // 点击显示图片
  showImage(e) {
    let src = getApp().globalData.url + '/emptybox/file' + e.target.dataset.imgsrc;
    this.setData({
      imageSrc: src,
      isHiddenModal: false
    })
  },
  // 点击图片modal，并且隐藏
  hideImageHandle() {
    console.log('dasfkljs')
    this.setData({
      isHiddenModal: true
    })
  },
  
})
