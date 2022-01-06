// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title CrowdFunding
 * @dev
 */
contract CrowdFunding {
    // state variable of type address containing manager's address
    address public manager;

    //state variable of type uint contating minimum contribution amount
    uint256 public minContribution;

    // Contract constructor: set manager, set minimum contribution
    constructor(uint256 _minContribution) {
        manager = msg.sender;
        minContribution = _minContribution;
    }
}
