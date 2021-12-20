// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

  address payable owner;

  // Initialize Faucet contract: set owner
  constructor() {
    owner = msg.sender;
  }

  // Access control modifier
  modifier onlyOwner {
      require(msg.sender == owner);
      _;
  }

  // Accept any incoming amount
  receive() external payable {}

  // Contract destructor
  function destroy() public onlyOwner {
      selfdestruct(owner);
  }

  // Give out ether to anyone who asks
  function withdraw(uint withdraw_amount) public {
      // Limit withdrawal amount
      require(withdraw_amount <= 100000000000000000);

      // Send the amount to the address that requested it
      msg.sender.transfer(withdraw_amount);
  }
}
