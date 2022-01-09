// Can grab data from API for specific game with id via following code:
import fetch from "node-fetch";

function yestWinners() {
    // make an API call
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 2)
    let start = yesterday.toISOString().split('T')[0];

    let url = 'https://www.balldontlie.io/api/v1/games/?seasons[]=2021&start_date=' + start + '&end_date=' + start

    fetch(url).then(response => response.json()).then(response => {
        const winnerArr = response.data
        let arrLen = winnerArr.length
        let output = {}
        for (let i = 0; i < arrLen; i++) {
            let game_id = winnerArr[i]['id']
            let winner = 1
            if (winnerArr[i]['visitor_team_score'] > winnerArr[i]['home_team_score']) {
                winner = 2
            }
            output[game_id] = winner
        }    
        console.log(output)
    }).catch(console.log)
}
yestWinners()