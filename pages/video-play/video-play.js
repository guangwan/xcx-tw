// pages/video-play/video-play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sid: '',
        videoDetail: {},
        danmuList: [],
        // cTime: 0
    },
    getVideoDetail: function () {
        const sid = this.data.sid
        const _this = this
        wx.request({
            url: `https://api.apiopen.top/getSingleJoke?sid=${sid}`,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                const text = res.data.result.top_comments_content ? res.data.result.top_comments_content : '666666'
                _this.setData({
                    videoDetail: res.data.result,
                    danmuList: [{
                        text: text,
                        color: '#ff0000',
                        time: 2
                    }]
                })
            }
        })
    },
    
    // timeUpdate: function(e){
    // const videoContext = wx.createVideoContext('myVideo')
    // let cTime = this.data.cTime
    // console.log(e.detail)
    // if(e.detail.duration - e.detail.currentTime + cTime <= 15){
    //     videoContext.stop()

    // }
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        this.setData({
            sid: e.sid
        }, () => {
            this.getVideoDetail()
        });

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