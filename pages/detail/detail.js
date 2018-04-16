// pages/detail/detail.js

var moment = require('../../libs/moment-with-locales.js');
moment.locale('zh-cn');

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


    this.getNewsDetail()
    console.log('page detail. opt')
    console.log(opt)
    console.log(this.data.newsID)

  },
  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsID
      },
      success: res => {
        console.log(res.data.result.content)

        this.setArticleNodes(res.data.result.content)

        let articleNodes = [
          [{
            name: 'img',
            attrs: {
              src: 'http://inews.gtimg.com/newsapp_bt/0/3203388080/641',

            },
          }]
        ]
        let newsDetail = res.data.result
        newsDetail.time = moment(newsDetail.date).fromNow()
        this.setData({
          detail: newsDetail,
        })

      },
      fail: res => {
        console.log(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },


  // 设置新闻富文本
  setArticleNodes(content) {
    let nodes = []
    for (let i = 0; i < content.length; i += 1) {
      if (content[i].type === 'image') {
        nodes.push([{
          name: 'img',
          attrs: {
            // 设置图像属性
            // style: 'height: 600rpx; width: 400rpx;', 
            class: 'article-img',
            src: content[i].src
          }
        }])
      }
      else {
        nodes.push([{
          name: content[i].type,
          attrs: {
            class: 'article-text'
          },
          children: [{
            type: 'text',
            text: content[i].text
          }]
        }
        ])
      } // end if
    } // end for
    this.setData({
      articleNodes: nodes
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
  // 下拉刷新
  onPullDownRefresh() {
    console.log("refresh executed!")

    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
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