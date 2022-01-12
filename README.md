# Peer to Peer Sports Betting Dapp

To run the dapp on the web, go to https://blockchain-bball.web.app.

To view the video demo, go to LINK TBD.

You will need to connect a MetaMask wallet and connect it to the Harmony testnet. [Here](https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet) are some instructions from Harmony that can get you started.

## About
A project for the [Harmony University Hackathon](https://taikai.network/en/harmonyprotocol/hackathons/hackthefuture/overview).

Made with ❤ by Jeremy, Albert, Charles, and Ash

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

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
