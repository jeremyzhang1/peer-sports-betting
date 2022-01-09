const axios = require("axios")
const Betting = artifacts.require('Betting')

module.exports = async function(deployer) {
    await deployer.deploy(Betting);
    const betting = await Betting.deployed();

    // TODO: Change the game ids to be fetched from the basketball API
    let url = "https://www.balldontlie.io/api/v1/games/?seasons[]=2021&per_page=100&start_date=2022-01-01&page="
    let game_ids = []
    for (let i = 0; i < 7; i++) {
        let page = i + 1
        let real_url = url + page.toString()
        const response = await axios(real_url);
        let gameArr = response.data.data
        let gameLen = gameArr.length
        for (let j = 0; j < gameLen; j++) {
            let game_id = gameArr[j]['id']
            game_ids.push(game_id)
        }
    }
    betting.populateGames(game_ids);
}