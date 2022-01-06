// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title CrowdFunding
 * @dev CrowdFunding is a contract that allows multiple parties to contribute to a single project.
 */
contract CrowdFunding {
    // struct type to represent a Request
    struct Request {
        string description; // description of request
        uint256 value; // amount requested in request
        address recipient; // address of vendor/recipient whom money will be sent
        bool complete; // True if request is completed
    }

    // array of requests
    Request[] public requests;

    // state variable of type address containing manager's address
    address public manager;

    //state variable of type uint contating minimum contribution amount
    uint256 public minContribution;

    // state variable of type array of addresses containing addresses of approvers
    address[] public approvers;

    // modifier onlyByManager is a modifier that checks if the sender is the manager
    modifier onlyByManager() {
        require(
            msg.sender == manager,
            "Only the manager can create new requests."
        );
        _;
    }

    // Contract constructor: set manager, set minimum contribution
    constructor(uint256 _minContribution) {
        manager = msg.sender;
        minContribution = _minContribution;
    }

    //function to set the approvers
    function contribute() public payable {
        // checking if the incoming contribution amount is greater than or equal to minimum contribution
        require(
            msg.value >= minContribution,
            "Contibution must be greater than or equal to minimum value"
        );

        // push the address of the contributor in approvers array
        approvers.push(msg.sender);
    }

    // function to create a request
    function createRequest(
        string memory _description,
        uint256 _value,
        address _recipient
    ) public onlyByManager {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            complete: false
        });

        requests.push(newRequest);
    }
}
