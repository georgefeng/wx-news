// pages/detail/detail.js


// 使用moment库转换时间
var moment = require('../../libs/moment-with-locales.js');
moment.locale('zh-cn');

Page({
  data: {
    newsID: '',
    articleInfo: {}
  },

  // 首次加载
  onLoad(opt) {
    this.setData({
      newsID: opt.id
    })

    this.getArticle()

  },

  // 获取新闻详情
  getArticle(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsID
      },
      success: res => {
        console.log(res.data.result.content)

        // 设定文本概要信息
        let articleInfo = res.data.result
        articleInfo.time = moment(articleInfo.date).fromNow()
        this.setData({
          articleInfo: articleInfo,
        })

        // 设定正文富文本
        let nodes = this.convertArticleNodes(res.data.result.content)
        this.setData({
          articleNodes: nodes
        })
      },
      fail: res => {
        console.log(res)
      },
      complete: () => {
        callback && callback()
      }
    }) // end request
  },


  // 渲染新闻富文本
  convertArticleNodes(content) {
    let nodes = []
    for (let i = 0; i < content.length; i += 1) {
      if (content[i].type === 'image') {
        nodes.push([{
          name: 'img',
          attrs: {
            class: 'article-img', // 设定为图像类
            src: content[i].src
          }
        }])
      }
      else {
        nodes.push([{
          name: content[i].type,
          attrs: {
            class: 'article-text' // 设定为文本类
          },
          children: [{
            type: 'text',
            text: content[i].text
          }]
        }
        ])
      } // end if
    } // end for
    return nodes;
  },


  // 下拉刷新
  onPullDownRefresh() {
    console.log("refresh executed!")

    this.getArticle(() => {
      wx.stopPullDownRefresh()
    })
  },

})