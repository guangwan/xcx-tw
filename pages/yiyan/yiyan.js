Page({

    data: {
        yiYan: '',
        menu: [{
                typeName: '动画',
                type: 'a'
            },
            {
                typeName: '漫画',
                type: 'b'
            },
            {
                typeName: '游戏',
                type: 'c'
            },
            {
                typeName: '文学',
                type: 'd'
            },
            {
                typeName: '原创',
                type: 'e'
            },
            {
                typeName: '网络',
                type: 'f'
            },
            {
                typeName: '影视',
                type: 'h'
            },
            {
                typeName: '诗词',
                type: 'i'
            },
            {
                typeName: '哲学',
                type: 'k'
            },
            {
                typeName: '舔狗日记',
                type: 'l'
            },
            {
                typeName: '其他',
                type: 'g'
            }
        ],
        type: 'a'

    },
    getYiYan: function () {
        let type = this.data.type
        const _this = this
        if (type != 'l') {
            wx.request({
                url: `https://v1.hitokoto.cn/?c=${type}&encode=json`,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    _this.setData({
                        yiYan: res.data
                    })
                }
            })
        } else {
            const timestamp = new Date().getTime()
            wx.request({
                url: `https://api.ixiaowai.cn/tgrj/index.php?timestamp=${timestamp}`,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    _this.setData({
                        yiYan: res.data
                    })
                }
            })
        }
    },
    chooseType: function (e) {
        if (this.data.type == e.target.dataset.type) return false
        this.setData({
            type: e.target.dataset.type
        }, () => {
            this.getYiYan()
        })
    },
    copy: function (e) {
        const data = this.data.yiYan.hitokoto ? this.data.yiYan.hitokoto : this.data.yiYan
        wx.setClipboardData({
            data: data,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        wx.showToast({
                            title: '复制成功'
                        })
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getYiYan()
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