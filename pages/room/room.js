const app = getApp();
Page({
    data: {
        players: [],
        currentPlayerIndex: 0,
        roomId: '', // 确保 roomId 初始化为空字符串
        roomNumber: '' // 新增房间号属性
    },
    onLoad: function (options) {
        const roomId = options.roomId;
        if (roomId) { // 检查 roomId 是否存在
            this.setData({ roomId });
            this.checkRoomPlayers();
            this.setData({
                players: app.globalData.players,
                currentPlayerIndex: app.globalData.currentPlayerIndex,
                roomNumber: options.roomId // 获取传递过来的房间号
            });
        } else {
            console.error('roomId 未正确传递');
        }
    },
    checkRoomPlayers: function () {
        const roomId = this.data.roomId;
        if (roomId) { // 再次检查 roomId 是否存在
            wx.request({
                url: `http://10.228.84.10:8000/roomPlayers/${roomId}`,
                method: 'GET',
                success: (res) => {
                    if (res.data.error) {
                        wx.showToast({
                            title: res.data.error,
                            icon: 'none'
                        });
                    } else {
                        const playerCount = res.data.playerCount;
                        if (playerCount < 3) {
                            wx.showToast({
                                title: '房间人数不足 3 人，无法开始游戏',
                                icon: 'none'
                            });
                        } else if (playerCount > 4) {
                            wx.showToast({
                                title: '房间人数超过 4 人，无法加入',
                                icon: 'none'
                            });
                        }
                    }
                },
                fail: (err) => {
                    wx.showToast({
                        title: '网络请求失败',
                        icon: 'none'
                    });
                }
            });
        } else {
            console.error('roomId 未正确设置');
        }
    },
    startGame: function () {
        wx.navigateTo({
            url: '/pages/game/game'
        });
    }
});