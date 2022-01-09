// SPDX-License-Identifier: MIT
pragma solidity =0.5.0;

contract Betting {
    string public name = "Peer to Peer Basketball Betting App";
    address public owner;
    uint256 public minimumBet;

    struct Player {
        // Amount bet by a player
        uint256 amountBet;
        // Team selected by the player (1 for home, 2 for away)
        uint256 teamSelected;
    }

    struct Game {
        // Total amount of bets placed on the home team
        uint256 totalBetsHome;
        // Total amount of bets placed on the away team
        uint256 totalBetsAway;
        // Has the game taken place yet?
        bool takenPlace;
        // List of payable addresses for the players
        address payable[] players;
        // Maps addresses to player information so that given an address, we can check how much money that player bet on a certain team
        mapping(address => Player) playerInfo;
    }

    // Mapping of games
    mapping(uint256 => Game) public games;

    constructor() public {
        // minimumBet is 1e14 wei corresponding to 0.0001 ether
        minimumBet = 1e14;
        owner = msg.sender;
    }

    function populateGames(uint256[] memory _new_game_ids) public {
        for (uint256 i = 0; i < _new_game_ids.length; i++) {
            // Leave playerInfo and players attributes empty by not including them in Game constructor
            games[_new_game_ids[i]] = Game({
                totalBetsHome: 0,
                totalBetsAway: 0,
                takenPlace: false,
                players: new address payable[](0)
            });
        }
    }

    function checkPlayerExists(address _player, uint256 _gameID)
        public
        view
        returns (bool)
    {
        for (uint256 i = 0; i < games[_gameID].players.length; i++) {
            if (games[_gameID].players[i] == _player) {
                return true;
            }
        }
        return false;
    }

    function bet(uint8 _teamSelected, uint256 _gameID) public payable {
        // Check that the player (person calling this contract) does not exist (meaning that person hasn't bet yet)
        require(!checkPlayerExists(msg.sender, _gameID));

        require(msg.value >= minimumBet);

        games[_gameID].playerInfo[msg.sender].amountBet = msg.value;
        games[_gameID].playerInfo[msg.sender].teamSelected = _teamSelected;

        games[_gameID].players.push(msg.sender); // VERSIONING: need payable(msg.sender) for newer versions of solidity

        // Bet on the home team, otherwise bet on the away team
        if (_teamSelected == 1) {
            games[_gameID].totalBetsHome += msg.value;
        } else {
            games[_gameID].totalBetsAway += msg.value;
        }
    }

    function distributePrizes(uint16 _teamWinner, uint256 _gameID) public {
        // Enforce only the deployer/owner of the contract can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Create a temporary in memory array with fixed size of 1000 to store the winners, so there can be at most 1000 winners
        address payable[1000] memory winners;

        uint256 count = 0; // This is the count for the number of winners
        uint256 LoserBet = 0; // This will be the sum of all the losing bets
        uint256 WinnerBet = 0; // This will be the sum of all the winning bets
        address add;
        uint256 HomeAmount = games[_gameID].totalBetsHome;
        uint256 AwayAmount = games[_gameID].totalBetsAway;

        /*check if there actually are any bets on this game, if there are no bets, just skip all of this and set game as "taken place"
        without needing to take any action */
        if (!(HomeAmount == 0 && AwayAmount == 0)) {

            if (HomeAmount == 0){
                _teamWinner = 2;
            }
            else if (AwayAmount == 0){
                _teamWinner = 1;
            }
            
            // We loop through the player array to find the players that correctly bet on the winning team
            for (uint256 i = 0; i < games[_gameID].players.length; i++) {
                address payable playerAddress = games[_gameID].players[i];

                // If the player bet on the winning team, we add that player's address to the winners array
                if (
                    games[_gameID].playerInfo[playerAddress].teamSelected ==
                    _teamWinner
                ) {
                    winners[count] = playerAddress;
                    count++;
                }
            }

            // Define which bet sum is the winner and which is the loser
            if (_teamWinner == 1) {
                LoserBet = games[_gameID].totalBetsAway;
                WinnerBet = games[_gameID].totalBetsHome;
            } else {
                LoserBet = games[_gameID].totalBetsHome;
                WinnerBet = games[_gameID].totalBetsAway;
            }

            // Loop through the array of winners and distribute eth (in units of wei) to each of them
            for (uint256 j = 0; j < count; j++) {
                // Check that we actually have a proper, valid address in this slot of the array
                if (winners[j] != address(0)) {
                    add = winners[j];
                    uint256 bet_amount = games[_gameID]
                        .playerInfo[add]
                        .amountBet;
                    // Distribute wei to the user based on the formula (pro rata distribution to the winners based on how much money they individually bet)
                    winners[j].transfer(
                        bet_amount * (1 + LoserBet / WinnerBet)
                    );
                }
            }
        }

        // Update game to have taken place
        games[_gameID].takenPlace = true;

        // delete playerInfo[playerAddress]; // Delete all the players
        // players.length = 0; // Delete all the players array
        // LoserBet = 0; // Reinitialize the bets
        // WinnerBet = 0; // Reset these values
        // totalBetsOne = 0; // Reset these values
        // totalBetsTwo = 0; // Reset these values
    }

    function AmountHome(uint256 _gameID) public view returns (uint256) {
        return games[_gameID].totalBetsHome;
    }

    function AmountAway(uint256 _gameID) public view returns (uint256) {
        return games[_gameID].totalBetsAway;
    }
}
