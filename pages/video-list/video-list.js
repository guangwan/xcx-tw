// pages/video-list/video-list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        videoList: []
    },
    getVideoList: function () {
        let page = this.data.page
        const _this = this
        wx.request({
            url: `https://api.apiopen.top/getJoke?page=${page}&count=6&type=video`,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                _this.setData({
                    videoList: _this.data.videoList.concat(res.data.result)
                })
            }
        })
    },
    playVideo: function (e) {
        const sid = e.currentTarget.dataset.sid
        wx.navigateTo({
            url: `/pages/video-play/video-play?sid=${sid}`,
        })
    },
    imgError: function (img) {
        // console.log(this.data.videoList)
        // console.log('errorerrorerrorerrorerror',img)
        // this.data.videoList.splice(img.currentTarget.dataset.errorimg,1)
        // this.setData({
        //     videoList:this.data.videoList
        // })
        // console.log(this.data.videoList)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVideoList()
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
        let page = this.data.page
        if(page == 13) return
        this.setData({
            page: page + 1
        },()=>{
            this.getVideoList()
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})