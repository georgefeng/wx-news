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

// 使用moment库转换时间
var moment = require('../../libs/moment-cn.min.js'); // 精简压缩moment库, 压缩80%体积
moment.locale('zh-cn');

Page({
    data: {
        newsList: [], // list 新闻列表
        // newsList:[{
        //     id: '1523074607642',
        //     title: '(Beta)清明假期长三角铁路客流堪比春运',
        //     source: '(Beta)环球资讯',
        //     date: '2018-04-06T11:28:25.000Z',
        //     firstImage: 'http://inews.gtimg.com/newsapp_bt/0/3199649303/641'
        // }]
        category: 'gn', // str 当前类别
        categoryList: [
            { 'en': 'gn', 'cn': '国内' }
        ], // dict 类别字典
    },

    // 首次加载
    onLoad() {
        this.setCategory()
        this.getNews()
    },

    // 设定顶部导航栏
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

    // 获取新闻列表
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

    // 更新新闻概要列表
    setNewsList(result) {
        let newsList = []

        for (let i = 0; i < result.length; i += 1) {
            newsList.push({
                id: result[i].id, 
                title: result[i].title.slice(0,30), //处理过长的标题
                time: moment(result[i].date).fromNow(),
                source: result[i].source || '', //值不存在的情况
                firstImage: result[i].firstImage || "/images/news-img.png", //值不存在的情况
            })
        }
        this.setData({
            newsList: newsList
        })
    },

    // 变更当前栏目
    onTapCategory(event) {
        this.setData({
            category: event.currentTarget.dataset.category

        })
        this.getNews()
    },

    // 跳转到详情页面
    onTapNews(event) {
        let newsID = event.currentTarget.dataset.newsid
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + newsID
        })
    },


    // 下拉刷新
    onPullDownRefresh() {
        console.log("refresh executed!")

        this.getNews(() => {
            wx.stopPullDownRefresh()
        })
    },


})
