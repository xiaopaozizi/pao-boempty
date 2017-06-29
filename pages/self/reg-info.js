//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

    // 是否显示省份
    isShow : false,
    // 省份
    provinces : [
      { value: '浙', isShow: 'active' },
      { value: '京', isShow: '' },
      { value: '苏', isShow: '' },
      { value: '疆', isShow: '' },
      { value: '粤', isShow: '' },
      { value: '皖', isShow: '' },
      { value: '晋', isShow: '' }
    ],
    // 当前省份
    curProvince : '浙',
    
  },
  // 显示省份
  showProvince() {
    this.setData({
      isShow: !this.data.isShow,
    })
   
  },
  // 获取参数
  onLoad(options){
    console.log(options);
  },
  // 选择省份
  choiceProvice(e){
    var index = e.target.dataset.index;
    var provinces = this.data.provinces;
    provinces.forEach(item => {
      item.isShow = '';
    });
    provinces[index].isShow = 'active';
    var curProvince = provinces[index].value;
    this.setData({
      provinces: provinces,
      curProvince: curProvince,
      isShow : false
    });
  },

  // 上传图片
  upload(){
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  }
})



