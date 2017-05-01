//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    'address' : [
      { start : '大榭招商（CMICT）', end : '长胜货柜', price : "￥100"},
      { start : '大榭招商（CMICT）', end : '长胜货柜', icon : '../../images/public.png'}
    ],
    "content" : [
      { icon : '../../images/order.png', key : '预约号', value : '34567865' },
      { icon : '../../images/box.png', key : '箱型', value : '40GP' },
      { icon : '../../images/ship.png', key : '船名/航次', value : '  KDIEHI/9867' },
      { icon : '../../images/clock.png', key : '计划提箱时间', value : '2017-09-12 12:00:00' },
      { icon : '../../images/flag.png', key : '备注', value : '无' },
    ]
  },
  
})
