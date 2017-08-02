//index.js
//获取应用实例
var app = getApp()




Page({
  data: {
    // 市场单子----公共单子
    publicList: [],
    // 市场单子----飞单
    flyList: [],
    hasMore : true,
    // 窗口的高度
    windowHeight: 0,
    // 滚动条的位置
    scrollTop: 0,
    // 是否显示联动器
    isShowAddress : false,
    // 联动显示的内容，提箱地/目的地
    addresses : [],
    // 提箱点
    take_addr: {
      display: '选择提箱地',
      value : '' 
    },
    take_addr_all: [ ],
    // 还箱点
    dest_addr: {
      display: '选择目的地',
      value: ''
    },
    dest_addr_all: [
    ],
    // 堆场或码头
    addr_types: [
      { text: '堆场', isActive: false },
      { text: '码头', isActive: true },
    ],
    // 选中的类型
    choiceType: '',
    // 延时器
    timer : null,
    // 每页多少条
    pageSize: 5,
    // 第几页
    pageNo: 1,

    // 临时存储选择的按钮---提箱地、目的地
    temp_addr: '',
  },
  onShow() {
    this.onLoad();
  },
  // 页面加载
  onLoad: function () {
    var that = this;
    var driverInfo = wx.getStorageSync('driverInfo');

    // 公共单子----publicList
   if (driverInfo) {
     
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getMyPublicList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          driverId: driverInfo.id
        },
        success: function (res) {
          if (res.data.status === 'success') {
            that.setData({
              publicList: res.data.data
            })
          }
        }
      })
   }


    // 飞单----flyList
    let take_addr = this.data.take_addr && this.data.take_addr.value != undefined ? this.data.take_addr.value : '';
    let dest_addr = this.data.dest_addr && this.data.dest_addr.value != undefined ? this.data.dest_addr.value : '';
    wx.request({
      url: getApp().globalData.url + "/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data: {
        pageNo: 1,
        pageSize: that.data.pageSize,
        addrStart: take_addr,
        addrEnd: dest_addr
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
  receiveListHandle(e) {
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
          id: listId,
        },
        success: function (res) {
          if (res.data.status === 'success') {
            wx.showToast({
              title: '接单成功',
              duration: 3000
            })
          }
          that.onLoad();
        }
      })
    }
  },

  // 抢单
  robListHandle(e) {
    let listId = e.target.dataset.listid;
    if (getApp().isLogin()) {
      wx.navigateTo({
        url: '../fly/detail?id=' + listId,
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


  // 上拉刷新
  more() {
    var that = this;
    var pageNo = that.data.pageNo;
    let take_addr = this.data.take_addr && this.data.take_addr.value != undefined ? this.data.take_addr.value : '';
    let dest_addr = this.data.dest_addr && this.data.dest_addr.value != undefined ? this.data.dest_addr.value : '';
    if (that.data.hasMore) {

      that.setData({
        hasMore: false,
        pageNo: ++pageNo,
      })
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getFlyList",
        header: {
          "Content-Type": "json"
        },
        data: {
          pageNo: 1,
          pageSize: that.data.pageNo * that.data.pageSize,
          addrStart: take_addr,
          addrEnd: dest_addr
          //pageSize : 2
        },
        success: function (res) {
          that.setData({
            flyList: res.data.data.rows,
            hasMore: true,
            addrStart: take_addr,
            addrEnd: dest_addr
          });
          if (that.data.pageNo * 2 > res.data.data.length) {
            that.setData({
              pageNo: --pageNo
            })
          }
        }
      })
    }
  },



  clear(e){
    let str = e.target.dataset.addr;
    if(str === 'take'){
      this.setData({
        take_addr: {
          display: '选择提箱地'
        },
      })
    } else if (str === 'dest') {
      this.setData({
        dest_addr: {
          display : '选择目的地'
        }
      });
    }
    this.hide();
  },




  // 联动选择器
  bindChange: function (e) {
    let that = this;
    const val = e.detail.value
    let temp_addr = this.data.temp_addr;
    if (temp_addr === 'take_attr') {
      this.setData({
        take_addr: this.data.addresses[val[0]],
      })
    } else if (temp_addr === 'dest_attr') {
      this.setData({
        dest_addr: this.data.addresses[val[0]],
      })
    } 
  },
  // 点击隐藏
  hide(){
    var that = this;
    var driverInfo = wx.getStorageSync('driverInfo');
    this.setData({
      isShowAddress : false
    })



    let take_addr = this.data.take_addr && this.data.take_addr.value != undefined ? this.data.take_addr.value : '';
    let dest_addr = this.data.dest_addr && this.data.dest_addr.value != undefined ? this.data.dest_addr.value : '';


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
          agree: 0,   // 0 未接   1已接
          //pageNo: 1,
          //pageSize: that.data.pageSize,
          addrStart: take_addr,
          addrEnd: dest_addr
        },
        success: function (res) {
          if (res.data.status === 'success') {
            that.setData({
              publicList: res.data.data
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
      data: {
        pageNo: 1,
        pageSize: that.data.pageSize,
        addrStart: take_addr,
        addrEnd: dest_addr
      },
      success: function (res) {
        that.setData({
          flyList: res.data.data.rows
        });
      }
    })



  },
  // 判断点击的是选择提箱地还是目的地
  choiceType(e) {
    let title = e.target.dataset.title;
    if (title === 'take_attr' || title === 'dest_attr'){
      this.setData({
        temp_addr: title,
      });
    }
    if( title === 'take_attr' ) {
      // 提箱地
      var that = this;
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getAddr",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          type : 1
        },
        success: function (res) {
          that.setData({

            addresses: res.data.data,
            addr_types: [
              { text: '堆场', isActive: false },
              { text: '码头', isActive: true },
            ],
            isShowAddress: true,
            take_addr : res.data.data[0]

          });
        }
      });      
    } else if (title === 'dest_attr') {
      // 目的
      var that = this;
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getAddr",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          type: 2
        },
        success: function (res) {
          that.setData({

            addresses: res.data.data,
            addr_types: [
              { text: '堆场', isActive: true },
              { text: '码头', isActive: false },
            ],
            isShowAddress: true,
            dest_addr: res.data.data[0]

          });
        }
      });
    } else if( title === '堆场'){
      // 提箱地
      var that = this;
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getAddr",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          type: 3
        },
        success: function (res) {
          that.setData({

            addresses: res.data.data,
            addr_types: [
              { text: '堆场', isActive: true },
              { text: '码头', isActive: false },
            ],
            isShowAddress: true,
            take_addr: res.data.data[0]

          });
        }
      });
    } else if ( title === '码头' ) {
      // 提箱地
      var that = this;
      wx.request({
        url: getApp().globalData.url + "/emptybox/weChat/getAddr",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          type: 4
        },
        success: function (res) {
          that.setData({

            addresses: res.data.data,
            addr_types: [
              { text: '堆场', isActive: false },
              { text: '码头', isActive: true },
            ],
            isShowAddress: true,
            dest_addr: res.data.data[0]

          });
        }
      });
    }
  },

  // 选择堆场还是码头，切换样式
  changeType: function (e) {
    let index = e.target.dataset.index;
    // 清除高亮
    this.data.addr_types.forEach(function (value) {
      value.isActive = false;
    });
    // 当前高亮
    this.data.addr_types[index].isActive = true;
    this.setData({
      addr_types: this.data.addr_types,
      choiceType: this.data.addr_types[index]
    });
    // 
   this.choiceType(e);
  },

  toast: function () {
    wx.navigateTo({
      url: '../fly/dealing'
    })
  },
  // 打电话
  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        //console.log("拨打电话成功！")
      },
      fail: function () {
        //console.log("拨打电话失败！")
      }
    })
  },

})
