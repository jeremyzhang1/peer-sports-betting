const Betting = artifacts.require('Betting')

module.exports = async function(deployer) {
    let game_ids = [1, 2, 3];
		await deployer.deploy(Betting, { arguments: [game_ids] });
    const betting = await Betting.deployed()
}