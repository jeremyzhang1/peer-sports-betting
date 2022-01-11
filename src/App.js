import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './App.css';
import Web3 from 'web3';
import Betting from './contractCode/Betting.json';
import Game from './Game';
import HarmonyBasketball from './utils/HarmonyBasketball.mp4'
import HarmonyBasketballLogo from './utils/BasketballLogoLight.png'
import HarmonyBasketballLogoDark from './utils/BasketballLogo.png'

class App extends Component {

    constructor() {
        super();
        //define web3 and address in state so we can access and change through react app as needed
        this.state = {
            web3: '',
            address: '0x0',
            betting: {},
            games: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.loadWeb3();
        this.loadUserData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadUserData() {
        // find the metamask account
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts().then();
        this.setState({ address: accounts[0] });

        // find the network
        const networkId = await web3.eth.net.getId();

        // find the contract
        const bettingData = Betting.networks[networkId];
        if (bettingData) {
            const betting = new web3.eth.Contract(Betting.abi, bettingData.address);
            this.setState({ betting });
        } else {
            window.alert('Betting contract not deployed to detected network.')
        }

    }

    // javascript function to call the solidity bet function
    async bet(team, gameID, amount) {
        await this.state.betting.methods.bet(team, gameID).send({ from: this.state.address, value: window.web3.utils.toWei(amount, "ether") })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.bet(event.target.team.value, event.target.gameid.value, event.target.betamount.value)
        alert('Bet Submitted')
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/app" element={
                        <div id="background">
                            <div id="submission-form">
                                <img src={HarmonyBasketballLogoDark} alt="logo" height="50px" id="dark-logo"/>
                                <h1>Blockchain Basketball Betting</h1>
                                <p>Connected wallet address: {this.state.address}</p>
                                <form onSubmit={this.handleSubmit}>
                                    <label>Game ID</label>
                                    <br />
                                    <input type="number" name="form" className='formStyle'></input>
                                    <br />
                                    <label>Amount Bet (in Ether)</label>
                                    <br />
                                    <input type="number" step="0.000001" min="0" name="betamount" className='formStyle'></input>
                                    <br />
                                    <label>Which team? (1 for Home, 2 for Away)</label>
                                    <br />
                                    <input type="number" min="1" max="2" name="team" className='formStyle'></input>
                                    <br />
                                    <br />
                                    <p>
                                        Make sure all of the fields are filled out correctly before
                                        submitting. <br /> The form currently does not do error
                                        checking.
                                    </p>
                                    <button type="submit" id="submit-button">Submit Bet</button>
                                </form>
                            </div>
                            <br></br>
                            <Game />
                        </div>
                    } />
                    <Route path="/" element={
                        <div className="App">
                            <video id='backgroundVideo' autoPlay loop muted>
                                <source src={HarmonyBasketball} type='video/mp4' />
                            </video>
                            <div id="splash-items">
                                <img src={HarmonyBasketballLogo} alt="logo" width="30%" />
                                <h1 id="title-splash">Blockchain Basketball Betting</h1>
                                <br></br>
                                <button id="get-started-button">
                                    <Link to="/app">Launch the App</Link>
                                </button>
                            </div>
                        </div>
                    } />
                </Routes>
            </Router>
        );
    }
}

export default App;
