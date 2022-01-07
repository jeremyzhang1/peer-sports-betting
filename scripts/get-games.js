const Betting = artifacts.require('Betting');

module.exports = async function (callback) {
	let betting = await Betting.deployed();
	let game_ids = [5, 6, 7];
	await betting.setGameIds(game_ids);
	await betting.constructGames();
	console.log(`We set these game_ids: ${game_ids}`);
	callback();
};
