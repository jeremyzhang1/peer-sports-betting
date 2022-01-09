// This is a small script that is used to release the money out of the contract while doing testing/demonstrations
const Betting = artifacts.require('Betting')

module.exports = async function(callback) {
  let betting = await Betting.deployed()
  let winner = 2
  await betting.distributePrizes(winner, 1)
  console.log("Winner determined to be ", winner)
  callback()
}