// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Owned {
    address payable owner;

    // Contract constructor: set owner
    constructor() {
        owner = msg.sender;
    }

    // Access control modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

contract Mortal is Owned {
    // Contract destructor
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}

contract Faucet is Mortal {

  // Accept any incoming amount
  receive() external payable {}

  // Give out ether to anyone who asks
  function withdraw(uint withdraw_amount) public {
      // Limit withdrawal amount
      require(withdraw_amount <= 0.1 ether);

      // Send the amount to the address that requested it
      msg.sender.transfer(withdraw_amount);
  }
}
