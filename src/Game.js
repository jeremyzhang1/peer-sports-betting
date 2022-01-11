import React from 'react';
import gameData from './utils/gameData.json';
import { Button, Table } from 'react-bootstrap';


const Game = () => {

    //parse game data json and extract id, home_team, visitor_team, date
    let parsedData = gameData;
    var parsedGames = [];
    let today = new Date().toISOString()
    console.log(today);

    for (var i = 0, game, id, home_team, visitor_team, date, gameTime; i < parsedData.length; i++) {
        game = parsedData[i];
        if (game['status'] !== "Final"){
            id = game['id'];
            home_team = game["home_team"]["full_name"];
            visitor_team = game["visitor_team"]["full_name"];
            gameTime = game['status'];
            date = game["date"].slice(0,10);
            parsedGames.push([id, visitor_team, home_team, date, gameTime]);
        }
    }

    parsedGames.sort((a, b) => (a[0] > b[0]) ? 1 : -1);

    function singleGame (oneGame) {
        return (
            <tr>
                <td>{ oneGame[0] }</td>
                <td>{ oneGame[1] }</td>
                <td>{ oneGame[2] }</td>
                <td>{ oneGame[3] }</td>
                <td>{ oneGame [4] }</td>
            </tr>
        );
    
    };

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Away Team</th>
                    <th>Home Team</th>
                    <th>Date</th>
                    <th>Tipoff Time</th>
                </tr>
            </thead>
            <tbody>
                { parsedGames.map(singleGame) }
            </tbody>
        </Table>
    );
};

export default Game;