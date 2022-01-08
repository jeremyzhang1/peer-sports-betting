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

  componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          address: acc[0],
          web3: results.web3
        });
        console.log("blahf sdajsfdj");
      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Blockchain Basketball!</p>
      </header>
      <div>
          <p>Welcome to Blockchain Basketball! <br/>
          Your Eth Wallet address is {this.state.address}</p>
      </div>
    </div>
    )
  }
}

export default App;
