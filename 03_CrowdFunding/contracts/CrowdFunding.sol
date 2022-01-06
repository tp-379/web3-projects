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

    // state variable of type array of addresses containing addresses of approvers
    address[] public approvers;

    // Contract constructor: set manager, set minimum contribution
    constructor(uint256 _minContribution) {
        manager = msg.sender;
        minContribution = _minContribution;
    }

    function contribute() public payable {
        // checking if the incoming contribution amount is greater than or equal to minimum contribution
        require(
            msg.value >= minContribution,
            "Contibution must be greater than or equal to minimum value"
        );

        // push the address of the contributor in approvers array
        approvers.push(msg.sender);
    }
}
