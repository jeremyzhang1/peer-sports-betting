// SPDX-License-Identifier: MIT
pragma solidity = 0.5.0;

contract Betting {
    string public name = "Peer to Peer Basketball Betting App";
    address public owner;
    uint public minimumBet;
    uint public numberOfBets;
    uint public maxAmountOfBets = 1000;

    struct Player {
        // Amount bet by a player
        uint amountBet;

        // Team selected by the player (1 for home, 2 for away)
        uint teamSelected;
    }

    struct Game {
        // Total amount of bets placed on the home team
        uint totalBetsHome;

        // Total amount of bets placed on the away team
        uint totalBetsAway;

        // Has the game taken place yet?
        bool takenPlace;

        // Maps addresses to player information so that given an address, we can check how much money that player bet on a certain team
        mapping(address => Player) playerInfo;

        // List of payable addresses for the players
        address payable[] players;
    }

    // Mapping of games
    mapping(uint => Game) public games;
    uint[] game_ids;

    constructor() public {
        // minimumBet is 1e14 wei corresponding to 0.0001 ether
        minimumBet = 1e14;
        owner = msg.sender;

        // TODO: Populate the games mapping here
    }

    function setGames(uint[] memory new_game_ids) public {
        game_ids = new_game_ids;
    }

    function checkPlayerExists(address player, uint _gameID) public view returns(bool) {
        for (uint i = 0; i < games[_gameID].players.length; i++) {
            if (games[_gameID].players[i] == player) {
                return true;
            }
        }
        return false;
    }

    function bet(uint8 _teamSelected, uint _gameID) public payable {
        // Check that the player (person calling this contract) does not exist (meaning that person hasn't bet yet)
        require(!checkPlayerExists(msg.sender, _gameID));

        require(msg.value >= minimumBet);

        games[_gameID].playerInfo[msg.sender].amountBet = msg.value;
        games[_gameID].playerInfo[msg.sender].teamSelected = _teamSelected;

        games[_gameID].players.push(msg.sender); // VERSIONING: need payable(msg.sender) for newer versions of solidity

        // Bet on the home team, otherwise bet on the away team
        if (_teamSelected == 1) {
            games[_gameID].totalBetsHome += msg.value;
        }
        else {
            games[_gameID].totalBetsAway += msg.value;
        }

    }

    function distributePrizes(uint16 teamWinner, uint _gameID) public {
        // Enforce only the deployer/owner of the contract can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Create a temporary in memory array with fixed size of 1000 to store the winners, so there can be at most 1000 winners
        address payable[1000] memory winners;
        
        uint count = 0; // This is the count for the number of winners
        uint LoserBet = 0; // This will be the sum of all the losing bets
        uint WinnerBet = 0; // This will be the sum of all the winning bets
        address add;

        // We loop through the player array to find the players that correctly bet on the winning team
        for(uint i = 0; i < games[_gameID].players.length; i++) {
            address payable playerAddress = games[_gameID].players[i];

            // If the player bet on the winning team, we add that player's address to the winners array
            if (games[_gameID].playerInfo[playerAddress].teamSelected == teamWinner) {
                winners[count] = playerAddress;
                count++;
            } 
        }

        // Define which bet sum is the winner and which is the loser
        if (teamWinner == 1) {
            LoserBet = games[_gameID].totalBetsAway;
            WinnerBet = games[_gameID].totalBetsHome;
        }
        else {
            LoserBet = games[_gameID].totalBetsHome;
            WinnerBet = games[_gameID].totalBetsAway;
        }        

        // Loop through the array of winners and distribute eth (in units of wei) to each of them
        for(uint j = 0; j < count; j++) {
            // Check that we actually have a proper, valid address in this slot of the array
            if (winners[j] != address(0)) {
                add = winners[j];
                uint bet_amount = games[_gameID].playerInfo[add].amountBet;
                // Distribute wei to the user based on the formula (pro rata distribution to the winners based on how much money they individually bet)
                winners[j].transfer(bet_amount*(1 + LoserBet/WinnerBet));
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

    function AmountHome(uint _gameID) public view returns(uint) {
        return games[_gameID].totalBetsHome;
    }

    function AmountAway(uint _gameID) public view returns(uint) {
        return games[_gameID].totalBetsAway;
    }
}