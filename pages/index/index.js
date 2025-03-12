Page({
    data: {},
    startGame: function () {
        wx.navigateTo({
             url: '/pages/room/room'
        });
    },
    
    createRoom: function() {
      // 这里可以添加创建房间的逻辑，例如向服务器发送请求创建房间
      // 创建成功后再导航到房间页面
      wx.navigateTo({
        url: '/pages/room/room'
      })
    },

    joinRoom: function() {
    // 弹出输入框，让用户输入房间号
    wx.showModal({
      title: '加入房间',
      content: '请输入房间号',
      editable: true, // 允许用户输入
      success: (res) => {
        if (res.confirm) {
          const roomNumber = res.content; // 获取用户输入的房间号
          // 这里可以添加验证房间号的逻辑，比如向服务器发送请求验证房间号是否存在
          // 假设验证通过，跳转到房间页面
          wx.navigateTo({
            url: `/pages/room/room?roomNumber=${roomNumber}`
          })
        }
      }
    })
  }


});
