//index.js




Page({
    data: {
        newsList: [{
            id: '1523074607642',
            title: '(Beta)清明假期长三角铁路客流堪比春运',
            source: '(Beta)环球资讯',
            date: '2018-04-06T11:28:25.000Z',
            firstImage: 'http://inews.gtimg.com/newsapp_bt/0/3199649303/641'
        }],
        category: 'gn'
    },

    getNews(callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',
            data: {
                type: this.data.category
            },
            success: res => {
                let result = res.data.result
                this.setNewsList(result)
            },
            fail: res => {
                console.log(res)
            },
            complete: () => {
                callback && callback()
            }

        })
    },
    setNewsList(result) {

        let newsList = []
        for (let i = 0; i < 9; i += 1) {
          newsList.push({
              id: result[i].id,
              title: result[i].title,
              date: result[i].date,
              source: result[i].source,
              firstImage: result[i].firstImage,
          })
        }
        this.setData({
            newsList: newsList
          })
        console.log(result)
    },


    onLoad() {
        this.getNews()
    }


})
