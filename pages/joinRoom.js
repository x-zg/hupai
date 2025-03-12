const app = getApp();

Page({
    data: {
        roomId: '',
        password: ''
    },
    joinRoom: function () {
        const { roomId, password } = this.data;
        wx.request({
            url: `${app.globalData.serverUrl}/joinRoom`,
            method: 'POST',
            data: { roomId, password },
            success: (res) => {
                if (res.data.error) {
                    wx.showToast({
                        title: res.data.error,
                        icon: 'none'
                    });
                } else {
                    wx.showToast({
                        title: '加入房间成功',
                        icon: 'success'
                    });
                    // 可以跳转到房间页面
                    wx.navigateTo({
                        url: `/pages/room/room?roomId=${roomId}`
                    });
                }
            },
            fail: (err) => {
                wx.showToast({
                    title: '网络请求失败',
                    icon: 'none'
                });
            }
        });
    }
})