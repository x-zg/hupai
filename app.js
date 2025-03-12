App({
    onLaunch: function () {
        console.log('App launched');
    },
    globalData: {
        players: ['玩家A', '玩家B', '玩家C'],
        currentPlayerIndex: 0,
        serverUrl: 'http://localhost:8085' // FastAPI 服务默认端口为 8000
    }
})
