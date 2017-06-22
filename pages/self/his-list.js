//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "lists" : [
      // 历史单子
      {
        "addrStart" : "大榭招商（CMICT）",
        "addrEnd" : "长胜货柜",
        "price" : "100.00",
        "order" : "31506444450",
        "boxType" : "40GP",
        "statusImg" : 'over',
        "ship" : "KOTAGANDING/0044E",
        "time" : "2017-12-12 18:00:00",
        "remark" : "无",
        "page" : 1,
      },
      {
        "publicImg" : "../../images/public.png",
        "addrStart" : "大榭招商（CMICT）",
        "addrEnd" : "长胜货柜",
        "order" : "31506444450",
        "boxType" : "40GP",
        "boxNum" : 20,
        "statusImg" : 'over',
        "ship" : "KOTAGANDING/0044E",
        "time" : "2017-12-12 18:00:00",
        "remark" : "无",
        "page" : 1,
      },
      
    ]
  },

  toast: function () {
    wx.navigateTo({
      url: '../fly/dealing'
    })
  }
  
})
