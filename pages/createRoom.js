const app = getApp();
app.globalData.serverUrl = 'http://10.228.84.10:8000';

Page({
    data: {
        roomId: '',
        password: ''
    },
    createRoom: function () {
        const { roomId, password } = this.data;
        wx.request({
            url: `${app.globalData.serverUrl}/createRoom`,
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
                        title: '房间创建成功',
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
