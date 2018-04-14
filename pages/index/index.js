//index.js

const categoryMap = {
    'gn': '国内',
    'gj': '国际',
    'cj': '财经',
    'yl': '娱乐',
    'js': '军事',
    'ty': '体育',
    'other': '其他',
}


Page({
    data: {
        newsList: [{
            id: '1523074607642',
            title: '(Beta)清明假期长三角铁路客流堪比春运',
            source: '(Beta)环球资讯',
            date: '2018-04-06T11:28:25.000Z',
            firstImage: 'http://inews.gtimg.com/newsapp_bt/0/3199649303/641'
        }],
        category: 'gn',
        categoryList: [
            '国内', '国际', '财经', '娱乐', '军事', '体育', '其他',
        ]
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
