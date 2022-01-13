const Betting = artifacts.require('Betting')

module.exports = async function(callback) {
    let betting = await Betting.deployed()
    let winner = 1
    let gameid = 474027 // change this for the demo
    await betting.distributePrizes(winner, gameid)
    callback()
}