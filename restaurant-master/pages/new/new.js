// pages/new/new.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.request({
            url: 'http://localhost:8080/add',
            method: "GET",
            success: (res) => {
                console.log(res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    gotofirst: function () {
        // 1. 要加////
        // "pages": [

//  如果你要跳转的页面 上面没有写， 你就加一下，还有一个问题是啥我wj了hahhah
        wx.navigateTo({
            url: '/pages/home/home'
        })
    },
    gotosecond: function () {
        wx.navigateTo({
            url: '/pages/homec/homec'
        })
    },
    gotothird: function () {
        wx.navigateTo({
            url: '/pages/question/question'
        })
    }
});


