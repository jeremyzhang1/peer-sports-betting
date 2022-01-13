# Peer to Peer Sports Betting Dapp

![Landing Page](https://github.com/jeremyzhang1/peer-sports-betting/blob/main/src/utils/LandingPage.PNG?raw=true)

![App Page](https://github.com/jeremyzhang1/peer-sports-betting/blob/main/src/utils/AppPage.PNG?raw=true)

To run the dapp on the web, go to https://blockchain-bball.web.app.

To view the video demo, go to https://youtu.be/dYdrdbDB2s0.

To view slides, go to Blockchain Basketball Betting - Harmony Hackathon Presentation.pdf.

You will need to connect a MetaMask wallet and connect it to the Harmony testnet. [Here](https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet) are some instructions from Harmony that can get you started.

## About
Contract address: [0x8d3f00cabc107d969b09aac7373fced190f42510](https://explorer.pops.one/address/0x8d3f00cabc107d969b09aac7373fced190f42510)

A project for the [Harmony University Hackathon](https://taikai.network/en/harmonyprotocol/hackathons/hackthefuture/overview).

Made with ❤ by Jeremy ([@jeremyzhang01](https://twitter.com/jeremyzhang01)), Albert ([@AlbertWZhang](https://twitter.com/AlbertWZhang)), Charles ([@charlesma_20](https://twitter.com/charlesma_20)), and Ash ([@ashlan_ahmed](https://twitter.com/ashlan_ahmed))

## Testnet Deployment Setup
First, create a file called `.env` to store the mnemonic.

Then, run the command `npx mnemonic` in the terminal to generate a mnemonic. Copy and paste this into `.env`, so that it now has one line in the form
```
MNEMONIC = 'a lot of words go here'
```
Then, you want to figure out what the wallet addresses are based on your given mnemonic. To do so, run `truffle console --network harmony_testnet`

Once the truffle development console prompt displays, run `accounts`, which will display a list of accounts. Make note of the first account, and the fact that it begins with `0x`. Take this account address and put it in the search bar [here](https://explorer.pops.one/) to get the equivalent Harmony ONE address, which begins with `one1`. Go to the Harmony ONE faucet [here](https://faucet.pops.one/) and paste in the Harmony ONE address and request test tokens.

Now that your account has test tokens, you can deploy the smart contracts. To deploy the smart contracts, run `truffle migrate --reset --network harmony_testnet`

This project uses [Truffle](https://trufflesuite.com/truffle/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
