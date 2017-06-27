//index.js
//获取应用实例
var app = getApp()




Page({
  data: {
    "marketList": [
      

    ],
    // 是否显示联动器
    isShowAddress : false,
    // 联动显示的内容，提箱地/目的地
    addresses : [],
    // 提箱点
    take_addr: {
      display: '选择提箱地',
      value : '' 
    },
    take_addr_all: [
      '提箱地1', '提箱地2', '提箱地3', '提箱地4',
      '提箱地5', '提箱地6', '提箱地7', '提箱地8',
      '提箱地9', '提箱地10', '提箱地11', '提箱地12',
    ],
    // 还箱点
    dest_addr: {
      display: '选择目的地',
      value: ''
    },
    dest_addr_all: [
      '目的地1', '目的地2', '目的地3', '目的地4',
      '目的地5', '目的地6', '目的地7', '目的地8',
      '目的地9', '目的地10', '目的地11', '目的地12',
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
    pageSize: 2,
    // 第几页
    pageNo: 1,

    // 临时存储选择的按钮---提箱地、目的地
    temp_addr: '',
  },

  // 页面加载
  onLoad(){
    var that = this;
    var url = getApp().globalData.url;
    wx.request({
      url: url + "/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data: {
        pageNo: 1,
        pageSize: 2
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          marketList: res.data.data
        });
      }
    })
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
  },

  // 下拉刷新
  more() {
    var that = this;

    let take_addr = this.data.take_addr && this.data.take_addr.value != undefined ? this.data.take_addr.value : '';
    let dest_addr = this.data.dest_addr && this.data.dest_addr.value != undefined ? this.data.dest_addr.value : '';

  

    wx.request({
      url: "http://192.168.16.166:8080/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data: {
        pageNo: 1,
        pageSize: (that.data.pageNo++) * 2,
        addrStart: take_addr,
        addrEnd: dest_addr
      },
      success: function (res) {
        that.setData({
          marketList: res.data.data
        });
      }
    })
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
    this.setData({
      isShowAddress : false
    })


    var url = getApp().globalData.url;

    let take_addr = this.data.take_addr && this.data.take_addr.value != undefined ? this.data.take_addr.value : '';
    let dest_addr = this.data.dest_addr && this.data.dest_addr.value != undefined ? this.data.dest_addr.value : '';

    wx.request({
      url: url + "/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      data: {
        pageNo: 1,
        pageSize: 2,
        addrStart: take_addr,
        addrEnd: dest_addr
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          marketList: res.data.data
        });
      }
    })



  },
  // 判断点击的是选择提箱地还是目的地
  choiceType(e) {
    let title = e.target.dataset.title;
    this.setData({
      temp_addr: title,
    });
    if( title === 'take_attr' ) {
      // 提箱地
      var that = this;
      //console.log(999);
      wx.request({
        url: "http://192.168.16.166:8080/emptybox/weChat/getAddr",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          type : 1
        },
        success: function (res) {
          console.log(res.data.data);
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
        url: "http://192.168.16.166:8080/emptybox/weChat/getAddr",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          type: 2
        },
        success: function (res) {
          console.log(res.data.data);
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
    //console.log(this.data.choiceType);
  },

  toast: function () {
    wx.navigateTo({
      url: '../fly/dealing'
    })
  }

})
