Page({
  data: {
    roomId: '',
    password: '',
    roomIdPlaceholder: '请输入房间号' // 新增输入框提示文字
  },
  createRoom: function () {
    // 生成随机 6 位数字作为房间号
    const roomId = Math.floor(100000 + Math.random() * 900000).toString();
    // 生成 6 位随机密码
    const password = Math.floor(100000 + Math.random() * 900000).toString(); 

    wx.request({
      url: 'http://10.228.84.10:8000/createRoom',
      method: 'POST',
      data: { roomId, password },
      success: (res) => {
        if (res.data.error) {
          wx.showToast({
            title: res.data.error,
            icon: 'none'
          });
        } else {
          // 仅显示房间号和密码给创建者
          wx.showModal({
            title: '房间创建成功',
            content: `房间号：${roomId}，密码：${password}，请将密码分享给其他玩家`,
            showCancel: false,
            confirmText: '知道了'
          });
          // 将房间号存储到本地，方便后续使用
          wx.setStorageSync('currentRoomId', roomId);
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
      url: 'http://10.228.84.10:8000/joinRoom',
      method: 'POST',
      data: { roomId, password },
      success: (res) => {
        if (res.data.error) {
          if (res.data.error === '房间不存在') {
            wx.showToast({
              title: '房间不存在，返回创建房间页面',
              icon: 'none'
            });
            wx.navigateBack(); // 返回上一页（通常是创建房间页面）
          } else {
            wx.showToast({
              title: res.data.error,
              icon: 'none'
            });
          }
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
      roomId: e.detail.value,
      roomIdPlaceholder: e.detail.value ? '' : '请输入房间号' // 输入时隐藏提示文字
    });
  },
  onPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  }
});