import React, { Component } from 'react';
import gameData from './utils/gameData';
import { Button, Table } from 'react-bootstrap';

const Game = () => {

    return (
        <Table bordered size='sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Date</th>
                    <th>Bet on game!</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Harmony Ones</td>
                    <td>Algorand Algos</td>
                    <td>12/25</td>
                    <td><Button variant="primary">Bet</Button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Harmony Ones</td>
                    <td>Algorand Algos</td>
                    <td>12/25</td>
                    <td><Button variant="primary">Bet</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Harmony Ones</td>
                    <td>Algorand Algos</td>
                    <td>12/25</td>
                    <td><Button variant="primary">Bet</Button></td>
                </tr>
            </tbody>
        </Table>
    );
};

export default Game;