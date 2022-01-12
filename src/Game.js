import React from 'react';
import { Button, Table } from 'react-bootstrap';


const Game = (parsedGames) => {
    parsedGames = parsedGames["parsedGames"];

    function singleGame(oneGame) {
        return (
            <tr>
                <td>{oneGame[0]}</td>
                <td>{oneGame[1]}</td>
                <td>{oneGame[2]}</td>
                <td>{oneGame[3]}</td>
                <td>{oneGame[4]}</td>
            </tr>
        );

    };

    return (
        <div id="table-container">
            <Table bordered hover variant="dark">
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
                    {parsedGames.map(singleGame)}
                </tbody>
            </Table>
        </div>
    );
};

export default Game;