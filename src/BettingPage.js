import React, { Component } from 'react'
import axios from 'axios';
import Web3 from 'web3';
import Game from './Game';
import Betting from './contractCode/Betting.json';
import HarmonyBasketballLogoDark from './utils/BasketballLogo.png'
import './App.css';

class BettingPage extends Component {
    constructor() {
        super()
        this.state = {
            web3: '',
            address: 'Not Connected',
            betting: {},
            games: [],
            gameRange: []
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.loadMetaMask = this.loadMetaMask.bind(this)
    }

    componentDidMount() {
        this.loadWeb3();
        this.loadUserData();
        this.determineGames();
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
        const web3 = window.web3;
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

    async loadMetaMask() {
        const web3 = window.web3;
        // find the metamask account
        let accounts = await web3.eth.getAccounts().then();
        this.setState({ address: accounts[0] });
    }

    // javascript function to call the solidity bet function
    async bet(team, gameID, amount) {
        await this.state.betting.methods.bet(team, gameID).send({ from: this.state.address, value: window.web3.utils.toWei(amount, "ether") })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.bet(event.target.team.value, event.target.gameid.value, event.target.betamount.value)
        alert('Bet Submitted -- A MetaMask window will appear. Please verify the contract address and approve the transation.')
    }

    async determineGames() {
        let url = "https://www.balldontlie.io/api/v1/games/?seasons[]=2021&per_page=100&start_date=2022-01-01&page="
        // to store the games for web purposes
        let parsedGames = []

        for (let i = 0; i < 7; i++) {
            let page = i + 1
            let real_url = url + page.toString()
            const response = await axios(real_url);
            let gameArr = response.data.data
            let gameLen = gameArr.length
            for (let j = 0; j < gameLen; j++) {
                //take one game and extract specific data points
                let one_game = gameArr[j];
                if (one_game["status"] !== "Final") {
                    let extracted_game = [one_game['id'], one_game['home_team']['full_name'], one_game['visitor_team']['full_name'], one_game["date"].slice(0, 10), one_game['status']];
                    parsedGames.push(extracted_game);
                }
            }
        }

        parsedGames.sort((a, b) => (a[0] > b[0]) ? 1 : -1);
        this.setState({ games: parsedGames });
        this.setState({ gameRange: [parsedGames[0][0], parsedGames[parsedGames.length - 1][0]] });
    }

    render() {
        return (
            <div id="background">
                <div id="submission-form">
                    <img src={HarmonyBasketballLogoDark} alt="" height="32px" className='title-banner'/>
                    <h1>Blockchain Basketball Betting</h1>
                    <button id="wallet-button" onClick={this.loadMetaMask}>Connect/Switch Wallet</button>
                    <p>Connected wallet address: {this.state.address}</p>
                    <p>Contract address: <a id="contract-link" href="https://explorer.pops.one/address/0x8d3f00cabc107d969b09aac7373fced190f42510" target="_blank" rel='noreferrer'>0x8d3f00cabc107d969b09aac7373fced190f42510</a></p>
                    <p>Github link: <a id="github-link" href="https://github.com/jeremyzhang1/peer-sports-betting" target="_blank" rel='noreferrer'>https://github.com/jeremyzhang1/peer-sports-betting</a></p>
                    <form onSubmit={this.handleSubmit}>
                        <label>Game ID</label>
                        <br />
                        <input type="number" name="gameid" min={this.state.gameRange[0]} max={this.state.gameRange[1]} className='formStyle'></input>
                        <br />
                        <label>Amount Bet (in ONE)</label>
                        <br />
                        <input type="number" step="0.000001" min="0" name="betamount" className='formStyle'></input>
                        <br />
                        <label>Which team? (1 for Home, 2 for Away)</label>
                        <br />
                        <input type="number" min="1" max="2" name="team" className='formStyle'></input>
                        <br />
                        <br />
                        <button type="submit" id="submit-button">Submit Bet</button>
                    </form>
                </div>
                <br />
                <Game parsedGames={this.state.games} />
            </div>
        )
    }
}

export default BettingPage
