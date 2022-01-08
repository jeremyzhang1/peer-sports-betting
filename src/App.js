import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import Betting from './contractCode/Betting.json';
import Migrations from './contractCode/Migrations.json';



class App extends Component {

  constructor(){
    super();
    //define web3 and address in state so we can access and change through react app as needed
    this.state = {
      web3 : '',
      address: '',
      betting: {}
    };
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
    var accounts;
    const web3 = window.web3;
    accounts = await web3.eth.getAccounts().then();
    console.log("check account");
    console.log(typeof accounts);
    this.setState({ address : accounts });
    console.log("address state set");
    console.log(this.state.address);
    
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    const bettingData = Betting.networks[networkId];
    if (bettingData) {
      const betting = web3.eth.Contract(Betting.abi, bettingData.address);
      this.setState({ betting });
      // still a bit confused what to send as an arg into methods.bet in the line below
      // let bet = await betting.methods.bet()
      
    }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Blockchain Basketball! {this.state.address} blah</p>
        </header>
      </div>
    )
  }
}

export default App;
