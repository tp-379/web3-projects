// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title HelloWorld
 * @dev Store & retrieve value in a variable
 */
contract HelloWorld {

  // defining a state variable
  string public message;

  // Defining an event
  event onMessageUpdate(string updatedMessage);

  // initializes the state variable with a default value
  constructor() {
    message = "Hello World";
  }

  /**
   * @dev Store value in variable
   * @param _message value to store
   */
  function store(string memory _message) public {
      message = _message;
      emit onMessageUpdate(_message);
  }

  /**
   * @dev Return value 
   * @return value of 'message'
   */
  function retrieve() public view returns (string memory){
      return message;
  }
}
