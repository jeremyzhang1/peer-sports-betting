import getWeb3 from './utils/getWeb3';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {

  constructor(){
    super();
    //define web3 and address in state so we can access and change through react app as needed
    this.state = {
      web3 : '',
      address: '',
    };
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Blockchain Basketball!</p>
      </header>
    </div>
    )
  }
}

export default App;
