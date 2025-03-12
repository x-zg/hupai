const app = getApp()
Page({
  data: {
    players: [],
    currentPlayerIndex: 0
  },
  onLoad: function() {
    this.setData({
      players: app.globalData.players,
      currentPlayerIndex: app.globalData.currentPlayerIndex
    })
  },
  startGame: function() {
    wx.navigateTo({
      url: '/pages/game/game'
    })
  }
})
