const app = getApp();
Page({
    data: {
        players: [],
        currentPlayerIndex: 0,
        roomId: ''
    },
    onLoad: function (options) {
        const roomId = options.roomId;
        this.setData({ roomId });
        this.checkRoomPlayers();
        this.setData({
            players: app.globalData.players,
            currentPlayerIndex: app.globalData.currentPlayerIndex
        });
    },
    checkRoomPlayers: function () {
        const roomId = this.data.roomId;
        wx.request({
            url: `http://localhost:8000/roomPlayers/${roomId}`,
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
    },
    startGame: function () {
        wx.navigateTo({
            url: `/pages/game/game?roomId=${this.data.roomId}`
        });
    }
});
