//index.js
//获取应用实例
var app = getApp()




Page({
  data: {
    "lists": [
      // 飞单
      {
        "addrStart": "大榭招商（CMICT）",
        "addrEnd": "长胜货柜",
        "price": "100.00",
        "boxType": "40GP",
        "statusImg": 'phone',
        "ship": "KOTAGANDING/0044E",
        "time": "2017-12-12 18:00:00",
        "remark": "无",
        "page": 3,
      },
      {
        "addrStart": "大榭招商（CMICT）",
        "addrEnd": "长胜货柜",
        "price": "100.00",
        "boxType": "40GP",
        "statusImg": 'phone',
        "ship": "KOTAGANDING/0044E",
        "time": "2017-12-12 18:00:00",
        "remark": "无",
        "page": 3,
      },

    ],
    // 是否显示联动器
    isShowAddress : false,
    // 联动显示的内容，提箱地/目的地
    addresses : [],
    // 提箱点
    take_addr: '选择提箱地',
    take_addr_all: [
      '提箱地1', '提箱地2', '提箱地3', '提箱地4',
      '提箱地5', '提箱地6', '提箱地7', '提箱地8',
      '提箱地9', '提箱地10', '提箱地11', '提箱地12',
    ],
    // 还箱点
    dest_addr: '选择目的地',
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

  },
  // 临时存储选择的按钮---提箱地、目的地
  temp_addr: '',

  // 联动选择器
  bindChange: function (e) {
    let that = this;
    const val = e.detail.value
    let temp_addr = this.data.temp_addr;
    //console.log(temp_addr);
    if (temp_addr === 'take_attr') {
      this.setData({
        take_addr: this.data.take_addr_all[val[0]],
        isShowAddress : false,
      })
    } else if (temp_addr === 'dest_attr') {
      this.setData({
        dest_addr: this.data.dest_addr_all[val[0]],
        isShowAddress : false,
      })
    } 
  },

  // 判断点击的是选择提箱地还是目的地
  choiceType(e) {
    let title = e.target.dataset.title;
    this.setData({
      temp_addr: title,
    });
    if( title === 'take_attr' ) {
      // 提箱地
      this.setData({
        addresses: this.data.take_addr_all,
        addr_types: [
          { text: '堆场', isActive: false },
          { text: '码头', isActive: true },
        ],
        isShowAddress: true
      });
    } else if (title === 'dest_attr') {
      // 目的
      this.setData({
        addresses: this.data.dest_addr_all, 
        addr_types: [
          { text: '堆场', isActive: true },
          { text: '码头', isActive: false },
        ],
        isShowAddress: true
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
