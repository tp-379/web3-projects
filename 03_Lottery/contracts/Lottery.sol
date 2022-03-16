// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Lottery
 * @dev Simulates a lottery where multiple users can enter and one lucky person wins.
 */
contract Lottery {
    address public manager;
    address payable[] public players;
    
    // constructor - setting manager
    constructor() {
        manager = msg.sender;
    }
    
    /**
     * @dev Function to enter the lottery.
     */
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }
    
    /**
     * @dev Function to generate a random uint.
     */
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    /**
     * @dev Function to pick a winner.
     */
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    // modifier to restrict function to manager
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    /**
     * @dev Function to get all players.
     */
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}   
