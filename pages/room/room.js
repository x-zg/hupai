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
        this.setData({
            players: app.globalData.players,
            currentPlayerIndex: app.globalData.currentPlayerIndex
        });
    },
    startGame: function () {
        wx.navigateTo({
            url: `/pages/game/game?roomId=${this.data.roomId}`
        });
    }
});
