const getRandomCard = () => {
  const cardNumber = Math.floor(Math.random() * 13) + 1
  const suit = ['♠', '♥', '♣', '♦'][Math.floor(Math.random() * 4)]
  return {
    number: cardNumber,
    suit: suit,
    isJoker: cardNumber === 52 || cardNumber === 53
  }
}
const getGameResult = (players) => {
  // 模拟计算游戏结果
  const scores = players.map(player => ({
    player: player,
    score: Math.floor(Math.random() * 21) + 99
  }))
  scores.sort((a, b) => b.score - a.score)
  return {
    winner: scores[0].player,
    scores: scores
  }
}
module.exports = {
  getRandomCard: getRandomCard,
  getGameResult: getGameResult
}
