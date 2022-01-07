const Betting = artifacts.require('Betting')

module.exports = async function(deployer) {
	let game_ids = [1, 2, 3];
	// game_ids is the parameter for the contract constructor, passed in like https://ethereum.stackexchange.com/questions/29812/truffle-migrate-how-to-deploy-a-contract-whose-constructor-takes-a-parameter/29856
	// TODO: for some reason the game_ids is passed in as a list of strings rather than uints, which is wrong and weird
	await deployer.deploy(Betting, game_ids);
	const betting = await Betting.deployed();
}