// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CampaignFactory {
    CrowdFunding[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        CrowdFunding newCampaign = new CrowdFunding(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns()
        public
        view
        returns (CrowdFunding[] memory)
    {
        return deployedCampaigns;
    }
}

/**
 * @title CrowdFunding
 * @dev CrowdFunding is a contract that allows multiple parties to contribute to a single project.
 */
contract CrowdFunding {
    // struct type to represent a Request
    struct Request {
        string description; // description of request
        uint256 value; // amount requested in request
        address payable recipient; // address of vendor/recipient whom money will be sent
        bool complete; // True if request is completed
        uint256 approvalCount; // number of approvals
        mapping(address => bool) approvals; // mapping of address to bool indicating if they approved
    }

    uint256 numRequests;

    mapping(uint256 => Request) public requests;

    // state variable of type address containing manager's address
    address public manager;

    //state variable of type uint contating minimum contribution amount
    uint256 public minContribution;

    // address to bool mapping for approvers
    mapping(address => bool) public approvers;

    // state variable to store number of approvers
    uint256 public approversCount;

    // modifier onlyByManager is a modifier that checks if the sender is the manager
    modifier onlyByManager() {
        require(
            msg.sender == manager,
            "Only the manager can create new requests."
        );
        _;
    }

    // Contract constructor: set manager, set minimum contribution
    constructor(uint256 _minContribution, address _manager) {
        manager = _manager;
        minContribution = _minContribution;
    }

    //function to set the approvers
    function contribute() public payable {
        // checking if the incoming contribution amount is greater than or equal to minimum contribution
        require(
            msg.value >= minContribution,
            "Contibution must be greater than or equal to minimum value"
        );

        approvers[msg.sender] = true;
        approversCount++;
    }

    // function to create a request
    function createRequest(
        string memory _description,
        uint256 _value,
        address payable _recipient
    ) public onlyByManager {
        Request storage newRequest = requests[numRequests++];
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    // function to approve a request
    function approveRequest(uint256 _requestIndex) public {
        Request storage request = requests[_requestIndex];

        require(
            approvers[msg.sender],
            "Only contributors can approve requests."
        );

        require(
            !request.approvals[msg.sender],
            "You have already voted for this request"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    // function to finalize a request
    function finalizeRequest(uint256 _requestIndex) public onlyByManager {
        Request storage request = requests[_requestIndex];

        require(
            request.approvalCount > (approversCount / 2),
            "More approvals needed to finalize request"
        );

        require(!(request.complete), "Request is already finalized");

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return numRequests;
    }
}
