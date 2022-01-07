// Jeremy code

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


// Can grab data from API for specific game with id via following code:

// import fetch from "node-fetch";
// const id = '474393'
// const url = 'https://www.balldontlie.io/api/v1/games/' + id
// fetch(url)
//   .then(data=>{return data.json()})
//   .then(res=>{console.log(res)})