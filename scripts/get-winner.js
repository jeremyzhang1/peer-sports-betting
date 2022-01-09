import axios from 'axios';

const Betting = artifacts.require('Betting')

module.exports = async function(callback) {
    let betting = await Betting.deployed()
    // make an API call
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 2)
    let start = yesterday.toISOString().split('T')[0]
    let url = 'https://www.balldontlie.io/api/v1/games/?seasons[]=2021&start_date=' + start + '&end_date=' + start
    const response = await axios(url);
    console.log(response.data);
    // create output dict
    const winnerArr = response.data
    let arrLen = winnerArr.length
    for (let i = 0; i < arrLen; i++) {
        let game_id = winnerArr[i]['id']
        let win_side = 1
        if (winnerArr[i]['visitor_team_score'] > winnerArr[i]['home_team_score']) {
            win_side = 2
        }
        await betting.distributePrizes(win_side, game_id)
        console.log("Winner of game " + game_id.toString() + " determined to be ", win_side)
        callback()
    }
}