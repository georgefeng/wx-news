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

var moment = require('../../libs/moment-with-locales.js');
moment.locale('zh-cn');

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
            { 'en': 'gn', 'cn': '国内' }
        ],
        currentTab: 0

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
        for (let i = 0; i < result.length; i += 1) {
            let time = this.convertTime(result[i].date);
            newsList.push({
                id: result[i].id, //TODO: 值不存在的情况
                title: result[i].title, //TODO: 处理过长的标题
                time: time,
                source: result[i].source,
                firstImage: result[i].firstImage,
            })
        }
        this.setData({
            newsList: newsList
        })
        console.log(result)
    },

    setCategory() {
        let categoryList = []
        for (var key in categoryMap) {
            categoryList.push({
                en: key,
                cn: categoryMap[key]
            })
        }
        this.setData({
            categoryList: categoryList
        })
    },

    convertTime(date){
        let time=moment(date).fromNow()
        return time
    },

    onTapCategory(event) {
        this.setData({
            category: event.currentTarget.dataset.category
            
        })
        this.getNews()
    },

    navToDetail(newsID) {
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + newsID
        })
    },

    onTapNews(event) {
        let newsID = event.currentTarget.dataset.newsid
        console.log()
        this.navToDetail(newsID)
    },

    onLoad() {
        this.setCategory()
        this.getNews()
    },

    // 下拉刷新
    onPullDownRefresh() {
      console.log("refresh executed!")

      this.getNews(() => {
        wx.stopPullDownRefresh()
      })
    },


})
