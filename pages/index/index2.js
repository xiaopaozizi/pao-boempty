//获取应用实例
var app = getApp()

Page({
  data: {
    // 当前页码
    page : 1,
    // 每页多少条数据
    size : 20,
    // 是否可以加载更多
    hasMore : false,
    // URL
    url: getApp().globalData.url + '/emptybox/weChat/getFlyList',
    // 飞单列表
    goodsList: [],
    // 滚动条的位置
    scrollTop: 0,
    // 组件的高度
    scrollHeight: 0,
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
  },
  onLoad: function () {
    var that = this;
    // 动态获取并设置组件的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    //首页商品
    wx.request({
      url: that.data.url,
      data: {
        pageNo : that.data.page,
        pageSize : that.data.size
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          goodsList: res.data.data,
        })
      },
    })

  },

  //   该方法绑定了页面滑动到底部的事件
  bindDownLoad: function () {
    var that = this;
    if(that.data.has_more){
      that.data.has_more = false;
      this.getLists();
    }
  },
  //   该方法绑定了页面滚动时的事件
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  //首页上拉加载功能函数
  getLists() {
    var that = this;
    wx.request({
      url: that.data.url,
      data: {
        pageNo: that.data.page,
        pageSize: that.data.size
      },
      success: function (res) {
        var goodsList = that.data.goodsList;
        for (var i = 0; i < res.data.data.length; i++) {
          goodsList.push(res.data.data[i]);
        }
        that.setData({
          goodsList: goodsList
        });
        thata.data.page++;
        that.setData({
          hasMore: true,
        });
      }
    });
  }
})