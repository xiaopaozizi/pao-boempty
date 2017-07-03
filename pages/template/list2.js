
var list2 = {
  // 点击查看详情
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
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
}



export default list2
