const Betting = artifacts.require('Betting')

module.exports = async function(callback) {
  let betting = await Betting.deployed()
  let winner = 1
  await betting.distributePrizes(winner, 3)
  console.log("Winner determined to be ", winner)
  callback()
}