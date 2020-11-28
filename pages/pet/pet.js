Page({

    data: {
        menu: [{
                typeName: '风景',
                type: 'b'
            },
            {
                typeName: '动漫',
                type: 'a'
            },
            {
                typeName: 'mc酱',
                type: 'c'
            },
            // {
            //     typeName: 'cosplay',
            //     type: 'd'
            // },
            {
                typeName: '美女',
                type: 'e'
            }
        ],
        type: 'b',
        imgUrl: ''
    },
    downloadImg: function (e) {
        wx.previewImage({
            urls: [e.target.dataset.url]
        })
    },
    toPic:function(){
        wx.navigateTo({
            url: '/pages/pic/pic',
        })
    },
    // getImgList:function () {
    //     const _this = this
    //     wx.request({
    //         url: `https://www.mxnzp.com/api/image/girl/list/random`,
    //         header: {
    //             'content-type': 'application/json',
    //             'app_id': 'wlmcsqiwmtrrscrk',
    //             'app_secret':'V0E5UHNVdUg4dnlITCtHNnorTG9PQT09'
    //         },
    //         success: function (res) {
    //             _this.setData({
    //                 imgList: _this.data.imgList.concat(res.data.data)
    //             })
    //         }
    //     })
    // },
    getImg: function () {
        const type = this.data.type
        const time = new Date().getTime()
        if (type == 'd') {
            this.setData({
                imgUrl: `https://uploadbeta.com/api/pictures/random/?key=动漫&time=${time}`
            })
        }else{
            let url
            if (type == 'a') {
                url = `https://api.ixiaowai.cn/api/api.php?return=json&time=${time}`
            } else if (type == 'b') {
                url = `https://api.ixiaowai.cn/gqapi/gqapi.php?return=json&time=${time}`
            } else if(type == 'c') {
                url = `https://api.ixiaowai.cn/mcapi/mcapi.php?return=json&time=${time}`
            }else if(type == 'e'){
                url = `https://www.mxnzp.com/api/image/girl/list/random?app_id=wlmcsqiwmtrrscrk&app_secret=V0E5UHNVdUg4dnlITCtHNnorTG9PQT09`
            }
            const _this = this
            wx.request({
                url: url,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if(res.data.imgurl){
                        _this.setData({
                            imgUrl: res.data.imgurl
                        })
                    }else{
                        if(res.data.data){
                            const randomNum = Math.floor((Math.random()*5)+1); 
                            _this.setData({
                                imgUrl: res.data.data[randomNum].imageUrl
                            })
                        }

                    }
                }
            })
        }

    },
    chooseType: function (e) {
        if(this.data.type == e.target.dataset.type) return false
        this.setData({
            type: e.target.dataset.type
        },()=>{
            this.getImg()
        })
    },
    imgerror: function () {
        this.setData({
            imgUrl: '../../assets/default.jpg'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.getImg()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})