const Betting = artifacts.require('Betting')

module.exports = async function(deployer) {
	await deployer.deploy(Betting);
	const betting = await Betting.deployed();

    // TODO: Change the game ids to be fetched from the basketball API
    let game_ids = [1, 2, 3];
    betting.populateGames(game_ids);
}