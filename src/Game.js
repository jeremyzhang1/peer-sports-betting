import React from 'react';
import gameData from './utils/gameData.json';
import { Button, Table } from 'react-bootstrap';


const Game = () => {

    //parse game data json and extract id, home_team, visitor_team, date
    let parsedData = gameData;
    var parsedGames = [];

    for (var i = 0, game, id, home_team, visitor_team, date; i < parsedData.length; i++) {
        game = parsedData[i];
        id = game['id'];
        home_team = game["home_team"]["full_name"];
        visitor_team = game["visitor_team"]["full_name"];
        date = game["date"];
        parsedGames.push([id, visitor_team, home_team, date]);
    }

    parsedGames.sort((a, b) => (a[0] > b[0]) ? 1 : -1)

    function singleGame (oneGame) {
        return (
            <tr>
                <td>{ oneGame[0] }</td>
                <td>{ oneGame[1] }</td>
                <td>{ oneGame[2] }</td>
                <td>{ oneGame[3] }</td>
                <td><Button variant="primary">Bet</Button></td>
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
                    <th>Bet on game!</th>
                </tr>
            </thead>
            <tbody>
                { parsedGames.map(singleGame) }
            </tbody>
        </Table>
    );
};

export default Game;