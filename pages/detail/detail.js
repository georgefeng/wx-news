// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsID: '',
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    this.setData({
      newsID: opt.id
    })


    this.getNewsDetail(this.data.newsID)
    console.log('page detail. opt')
    console.log(opt)
    console.log(this.data.newsID)

  },
  getNewsDetail(newsID) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: newsID
      },
      success: res => {
        console.log(res.data.result)
        let newsDetail = res.data.result
        this.setData({
          detail: newsDetail
        })

      },
      fail: res => {
        console.log(res)
      },
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})