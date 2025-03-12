const app = getApp()
Page({
   data: {
        currentPlayer: '',
        currentCard: null,
        players: [],
        gameState: 'waiting', // 'waiting', 'playing', 'result'
        roomId: ''
    },
  onLoad: function() {
    const roomId = options.roomId;
        this.setData({ roomId });
        const players = app.globalData.players;
        const currentPlayerIndex = app.globalData.currentPlayerIndex;
        this.setData({
            players: players,
            currentPlayer: players[currentPlayerIndex],
            gameState: 'playing'
        });
        this.drawCard();
  },
  drawCard: function() {
    // 模拟抽牌
    const cardNumber = Math.floor(Math.random() * 13) + 1
    const card = {
      number: cardNumber,
      suit: ['♠', '♥', '♣', '♦'][Math.floor(Math.random() * 4)],
      isJoker: cardNumber === 52 || cardNumber === 53
    }
    this.setData({
      currentCard: card
    })
  },
  playCard: function() {
    // 模拟出牌逻辑
    wx.showModal({
      title: '出牌',
      content: '你确定要出这张牌吗？',
      success: (res) => {
        if (res.confirm) {
          this.nextPlayer()
        }
      }
    })
  },
  nextPlayer: function() {
    const currentPlayerIndex = this.data.players.indexOf(this.data.currentPlayer)
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.data.players.length
    this.setData({
      currentPlayer: this.data.players[nextPlayerIndex]
    })
    this.drawCard()
  },
  restartGame: function() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
})
