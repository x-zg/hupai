Page({
    data: {
        roomId: '',
        password: ''
    },
    createRoom: function () {
        const roomId = Math.floor(100000 + Math.random() * 900000).toString();
        const password = '123456';  // 示例密码，实际可让用户输入
        wx.request({
            url: 'http://localhost:8000/createRoom',
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
                        title: '房间创建成功，房间号：' + roomId,
                        icon: 'success'
                    });
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
    },
    joinRoom: function () {
        const roomId = this.data.roomId;
        const password = this.data.password;
        wx.request({
            url: 'http://localhost:8000/joinRoom',
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
    },

      onRoomIdInput: function (e) {
        this.setData({
            roomId: e.detail.value
        });
    },
    onPasswordInput: function (e) {
        this.setData({
            password: e.detail.value
        });
    }


});
