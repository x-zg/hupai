export default class Main {
  constructor() {
    // 必须通过this声明实例变量
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext('2d')
    this.init()
    this.bindEvent()
  }

  init() {
    this.ctx.fillStyle = '#07C160'
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawButton()
  }

  drawButton() {
    this.ctx.roundRect(50, 100, 200, 40, [8,8,8,8])
    this.ctx.fill()
  }

  bindEvent() {
    wx.onTouchStart((e) => {
      // 事件处理
    })
  }
}

// // 启动游戏
// new Main()