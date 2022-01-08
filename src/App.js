import getWeb3 from './utils/getWeb3';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';



class App extends Component {

  constructor(){
    super();
    //define web3 and address in state so we can access and change through react app as needed
    this.state = {
      web3 : '',
      address: '',
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
    const accounts = await Web3.eth.getAccounts();
    console.log("check account");
    this.setState({ address: accounts[0] });
    console.log("address state set");
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
