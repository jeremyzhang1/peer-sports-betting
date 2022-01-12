import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const TableUnit = (oneGame) => {
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

export default TableUnit;