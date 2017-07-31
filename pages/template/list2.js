
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
      phoneNumber: e.target.dataset.phone, 
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
