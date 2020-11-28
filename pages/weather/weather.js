Page({
    data: {
        region: ['湖北省', '武汉市', '洪山区'],
        currentCity: '',
        street: '',
        weatherDetail: '',
        forecastWeather: ''
    },
    bindRegionChange: function (e) {
        const city = e.detail.value
        this.setData({
            street: '',
            region: e.detail.value,
            currentCity: city[2]
        })
        this.getTodayWeather()
        this.getForecastWeather()
    },
    getLocation: function () {
        const _this = this
        wx.getLocation({
            type: 'wgs84', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
            success: function (res) {
                const longitude = res.longitude
                const latitude = res.latitude
                _this.loadCity(longitude, latitude)
            }
        })
    },
    loadCity: function (longitude, latitude) {
        const _this = this
        wx.request({
            url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=EfFGljv1S02Cq0Kfz3VDZoeOuHv6Pqkz&output=json' + '&location=' + latitude + ',' + longitude,
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                _this.setData({
                    currentCity: res.data.result.addressComponent.district,
                    street: res.data.result.addressComponent.district
                }, () => {
                    _this.getTodayWeather()
                    _this.getForecastWeather()
                });
            },
            fail: function () {
                wx.showToast({
                    title: '请选择城市',
                    icon: 'none',
                    duration: 2000
                })
            },

        })
    },
    getTodayWeather: function () {
        const _this = this
        const currentCity = _this.data.currentCity
        if (!currentCity) {
            setData({
                currentCity: _this.data.region[2]
            });
        }
        wx.request({
            url: `https://www.mxnzp.com/api/weather/current/${currentCity}`,
            header: {
                'content-type': 'application/json',
                'app_id': 'wlmcsqiwmtrrscrk',
                'app_secret': 'V0E5UHNVdUg4dnlITCtHNnorTG9PQT09'
            },
            success: function ({data}) {
                if (data) {
                    _this.setData({
                        weatherDetail: data.data
                    })
                }
            }
        })
    },
    getForecastWeather: function () {
        const _this = this
        const currentCity = _this.data.currentCity
        if (!currentCity) {
            setData({
                currentCity: _this.data.region[2]
            });
        }
        wx.request({
            url: `https://www.mxnzp.com/api/weather/forecast/${currentCity}`,
            header: {
                'content-type': 'application/json',
                'app_id': 'wlmcsqiwmtrrscrk',
                'app_secret': 'V0E5UHNVdUg4dnlITCtHNnorTG9PQT09'
            },
            success: function ({data}) {
                if (data.data.forecasts) {
                    _this.setData({
                        forecastWeather: data.data.forecasts
                    })
                }
                wx.hideLoading()
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            _this.getLocation()
                            wx.showLoading({
                                title: '加载中',
                            })
                        },
                        fail() {
                            wx.showToast({
                                title: '请选择城市',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                } else {
                    _this.getLocation()
                    wx.showLoading({
                        title: '加载中',
                    })
                }
            }
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