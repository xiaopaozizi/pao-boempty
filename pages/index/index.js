//index.js
//获取应用实例
var app = getApp()


var wxbarcode = require('../../utils/index.js');

var indexPage = {
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    "myList": [
      // 首页
      {
        "addrStart": "大榭招商（CMICT）",
        "addrEnd": "长胜货柜",
        "price": "100.00",
        "order": "31506444450",
        "boxType": "40GP",
        "ship": "KOTAGANDING/0044E",
        "time": "2017-12-12 18:00:00",
        "remark": "无",
        "page": 2,
      },
      {
        "publicImg": "../../images/public.png",
        "addrStart": "大榭招商（CMICT）",
        "addrEnd": "长胜货柜",
        "progress": 12,
        "order": "31506444450",
        "boxType": "40GP",
        "boxNum": 20,
        "ship": "KOTAGANDING/0044E",
        "time": "2017-12-12 18:00:00",
        "remark": "无",
        "page": 2,
      },






    ],

    // 市场单子
    marketList: [
      // 正在进行的单子
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
  },



  onLoad: function () {
    var that = this;
    wxbarcode.barcode('barcode', '1234567890123456789', 500, 100)



    wx.request({
      url: "http://10.16.20.210:8080/emptybox/weChat/getFlyList",
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          marketList: res.data.data
        });
        console.log(that.data.marketList)
      }
    })

  }

}

import list2Obj from '../template/list2'

indexPage['calling'] = list2Obj.calling;
indexPage['toast'] = list2Obj.coast;
Page(indexPage);


