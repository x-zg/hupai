Page({
  data: {
    winner: '',
    scores: []
  },
  onLoad: function(options) {
    // 模拟获取结果数据
    this.setData({
      winner: '玩家B',
      scores: [
        {player: '玩家A', score: 10},
        {player: '玩家B', score: 120},
        {player: '玩家C', score: 110}
      ]
    })
  },
  backToHome: function() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
})
