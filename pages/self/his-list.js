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
    // 搜索时间字段
    startDate : '开始时间',
    endDate : '结束时间',
    // 总金额
    totalMoney : 0,
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
  // 改变日期，今天，一周，一月
  changeDateHandle(e){
    let day = e.target.dataset.day;
    let d = new Date();
    let endDate = this.formatDate(d);
    let time = d.getTime();
    switch(day){
      case 'today':
          //time = time;
        break;
      case 'week':
        time -= 7 * 24 * 60 * 60 * 1000;
        break;
      case 'month':
        time -= 30 * 24 * 60 * 60 * 1000;
        break;
    }

    let startDate = this.formatDate(time);
    
    this.setData({
      startDate : startDate,
      endDate : endDate
    });
    this.getList();
  },
  formatDate(date) {
    if (date === '') {
      return date;
    } else {
      let start = new Date(date);
      let  y  =  start.getFullYear();
      let  m  =  start.getMonth()  +  1;
      m  =  m  <  10  ?  '0'  +  m  :  m;
      var  d  =  start.getDate();
      d  =  d  <  10  ?  ('0'  +  d)  :  d;
      return  y  +  '-'  +  m  +  '-'  +  d;
    }
  },

  bindPickerChange: function (e) {
    // 获取type类型，是开始时间还是结束时间
    let type = e.target.dataset.type;
    
    if(type === 'start') {
      this.setData({
        startDate: e.detail.value
      })
    } else if (type === 'end') {
      this.setData({
        endDate: e.detail.value
      })
    }
    this.getList();
  },
  toast: function () {
    wx.navigateTo({
      url: '../fly/dealing'
    })
  },
  getList(){
    var that = this;
    var url = getApp().globalData.url;
    var driverInfo = wx.getStorageSync('driverInfo');
    if(driverInfo){
      wx.request({
        url: url + "/emptybox/weChat/getMyFinish",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          pageNo: 1,
          pageSize: that.data.pageSize,
          startDate: that.data.startDate,
          endDate: that.data.endDate
        },
        success: function (res) {
          that.setData({
            historyList: res.data.data.rows,
            count: res.data.data.total
          });
        }
      })
      // 获取总金额
      wx.request({
        url: url + "/emptybox/weChat/getMyFinishMoney",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id,
          startDate: that.data.startDate,
          endDate: that.data.endDate
        },
        success: function (res) {
          that.setData({
            totalMoney: res.data.data
          });
        }
      })
    }
  },

  // 加载数据函数
  onReachBottom: function (event) {
    this.more();
  },
  onPullDownRefresh() {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onLoad(){
    // 设置当前刷新的页面
    this.setData({
      pageNo: 1,
      pageSize : 2,
      startDate : '',
      endDate : ''
    });
    this.getList();
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
    // 设置当前刷新的页面
    this.setData({
      pageSize: (++this.data.pageNo) * 2
    });
    this.getList();
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
