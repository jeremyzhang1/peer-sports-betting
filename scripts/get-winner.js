// Can grab data from API for specific game with id via following code:

import fetch from "node-fetch";

// get yesterday date as string
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 2)
const start = yesterday.toISOString().split('T')[0];

const url = 'https://www.balldontlie.io/api/v1/games/?seasons[]=2021&start_date=' + start + '&end_date=' + start

let jsondata;    
fetch(url)
  .then(res => res.json())
  .then(data => jsondata = data)
  .then(() => console.log(jsondata),
              jsondata.data)


// const calculateReturn = (product) => {
//     // make an API call here for historical data
//     let formerPrice = 0;
//     let currentPrice = 0;
//     let url = 'https://api.coingecko.com/api/v3/coins/' + nameToId.get(product) + '/history?date=' + formatDate(date) + '&localization=false'
//     fetch(url).then(response => response.json()).then(response => {
//         console.log(response)
//         formerPrice = response.market_data.current_price.usd
//     }).then(() => {
//         //make an api call for current data
//         url = 'https://api.coingecko.com/api/v3/coins/' + nameToId.get(product) + '/history?date=' + formatDate(today) + '&localization=false'
//         fetch(url).then(response => response.json()).then(response => {
//             currentPrice = response.market_data.current_price.usd
//         }).then(() => {
//             //calculate the proportional return
//             console.log(currentPrice + " current")
//             console.log(formerPrice + " former")
//             setProdRet((currentPrice - formerPrice) / formerPrice * 100)
//         }).catch(console.log)
//     }).catch(console.log)
// }