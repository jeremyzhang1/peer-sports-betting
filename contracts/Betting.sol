// SPDX-License-Identifier: MIT
pragma solidity = 0.5.0;

contract Betting {
    string public name = "Peer to Peer Basketball Betting App";
    address public owner;
    uint public minimumBet;
    uint public totalBetsOne;
    uint public totalBetsTwo;
    uint public numberOfBets;
    uint public maxAmountOfBets = 1000;

    // List of payable addresses for the players
    address payable[] public players;

    struct Player {
        uint amountBet;
        // Assume that the only two teams are team 1 and team 2
        uint16 teamSelected;
    }

    // Maps addresses to player information so that given an address, we can check how much money that player bet on a certain team
    mapping(address => Player) public playerInfo;

    constructor() public {
        // minimumBet is 1e14 wei corresponding to 0.0001 ether
        minimumBet = 1e14;
        owner = msg.sender;
    }

    function checkPlayerExists(address player) public view returns(bool) {
        for (uint i = 0; i < players.length; i++) {
            if (players[i] == player) {
                return true;
            }
        }
        return false;
    }

    function bet(uint8 _teamSelected) public payable {
        // Check that the player (person calling this contract) does not exist (meaning that person hasn't bet yet)
        require(!checkPlayerExists(msg.sender));

        require(msg.value >= minimumBet);

        playerInfo[msg.sender].amountBet = msg.value;
        playerInfo[msg.sender].teamSelected = _teamSelected;

        players.push(msg.sender); // VERSIONING: need payable(msg.sender) for newer versions of solidity

        // Assume that the only two teams are team 1 and team 2
        if (_teamSelected == 1) {
            totalBetsOne += msg.value;
        }
        else {
            totalBetsTwo += msg.value;
        }

    }

    function distributePrizes(uint16 teamWinner) public {
        // Create a temporary in memory array with fixed size of 1000 to store the winners, so there can be at most 1000 winners
        // TODO: We could try to use a dynamic array that doesn't have a limit for the number of winners, but I suspect that we're suppose to set a limit, like 1000, because of how the blockchain is immutable, so we want to use an array of fixed size. Not certain about this though.
        address payable[1000] memory winners;
        
        uint count = 0; // This is the count for the number of winners
        uint LoserBet = 0; // This will be the sum of all the losing bets
        uint WinnerBet = 0; // This will be the sum of all the winning bets
        address add;

        // We loop through the player array to find the players that correctly bet on the winning team
        for(uint i = 0; i < players.length; i++) {
            address payable playerAddress = players[i];

            // If the player bet on the winning team, we add that player's address to the winners array
            if (playerInfo[playerAddress].teamSelected == teamWinner) {
                winners[count] = playerAddress;
                count++;
            } 
        }

        // Define which bet sum is the winner and which is the loser
        if (teamWinner == 1) {
            LoserBet = totalBetsTwo;
            WinnerBet = totalBetsOne;
        }
        else {
            LoserBet = totalBetsOne;
            WinnerBet = totalBetsTwo;
        }        

        // Loop through the array of winners and distribute eth (in units of wei) to each of them
        for(uint j = 0; j < count; j++) {
            // Check that we actually have a proper, valid address in this slot of the array
            if (winners[j] != address(0)) {
                add = winners[j];
                uint bet_amount = playerInfo[add].amountBet;
                // Distribute wei to the user based on the formula (pro rata distribution to the winners based on how much money they individually bet)
                winners[j].transfer(bet_amount*(1 + LoserBet/WinnerBet));
            }
        }

        // delete playerInfo[playerAddress]; // Delete all the players
        players.length = 0; // Delete all the players array
        LoserBet = 0; // Reinitialize the bets
        WinnerBet = 0; // Reset these values
        totalBetsOne = 0; // Reset these values
        totalBetsTwo = 0; // Reset these values
    }

    function AmountOne() public view returns(uint) {
        return totalBetsOne;
    }

    function AmountTwo() public view returns(uint) {
        return totalBetsTwo;
    }
}