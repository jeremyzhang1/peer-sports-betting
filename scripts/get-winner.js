const Betting = artifacts.require('Betting')

module.exports = async function(callback) {
  let betting = await Betting.deployed()

  // TODO: Change the calling of distributePrizes to use data from the API
  let winner = 1
  await betting.distributePrizes(winner, 1)
  await betting.distributePrizes(winner, 2)
  await betting.distributePrizes(winner, 3)
  console.log("Winner determined to be ", winner)
  callback()
}