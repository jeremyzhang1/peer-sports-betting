const axios = require("axios")
var _ = require('lodash');
const fs = require('fs');


module.exports = async function() {
    let url = "https://www.balldontlie.io/api/v1/games/?seasons[]=2021&per_page=100&start_date=2022-01-01&page="
    let game_ids = []

    // to store the games for web purposes
    let full_games = []
    // specifying which field we need for the website
    let keys_to_extract = ["id","home_team","visitor_team", "date"];


    for (let i = 0; i < 7; i++) {
        let page = i + 1
        let real_url = url + page.toString()
        const response = await axios(real_url);
        let gameArr = response.data.data
        let gameLen = gameArr.length
        for (let j = 0; j < gameLen; j++) {
            //take one game and extract specific data points
            let one_game = gameArr[j];
            let extracted_game = _.pick(one_game, keys_to_extract);
            full_games.push(extracted_game);

            //also get ids and put into another array for smart contract purposes
            let game_id = one_game['id']
            game_ids.push(game_id)
        }
    }
    const gameData = JSON.stringify(full_games, null, 4);
    fs.writeFile('migrations/../src/utils/gameData.json', gameData, (err) =>{
        if (err)
        throw err;
    });
    console.log("stringified successfully")
    console.log(game_ids);
}
