// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Owned {
    address payable owner;

    // Contract constructor: set owner
    constructor() {
        owner = payable(msg.sender);
    }

    // Access control modifier
    modifier onlyOwner {
        require(msg.sender == owner, "Only the contract owner can call this function");
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

  event Withdrawal(address indexed to, uint amount);
	event Deposit(address indexed from, uint amount);

  // Accept any incoming amount
  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }

  // Give out ether to anyone who asks
  function withdraw(address payable _to, uint _withdrawAmount) public payable {
      // Limit withdrawal amount
      require(_withdrawAmount <= 0.1 ether);

      require(
        address(this).balance >= _withdrawAmount,
        "Insufficient balance in faucet for withdrawal request"
      );

      // Send the amount to the address that requested it
      _to.transfer(_withdrawAmount);

      emit Withdrawal(msg.sender, _withdrawAmount);
  }
}
