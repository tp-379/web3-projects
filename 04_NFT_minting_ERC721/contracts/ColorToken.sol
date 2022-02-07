// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract ColorToken is ERC721 {

  // to find out who owns the NFT
  address public owner;

  // increase the value with each token minted
  uint256 tokenId = 1;

  // properties of each token
  struct Color {
    uint tokenId;
    string tokenName;
    address owner;
  }

  // list to keep track of all the tokens
  Color[] public allTokens;

  // mapping to find out all tokens owned by an address
  mapping(address => Color[]) public tokenAddress;

  // mapping to check if a token already exists
  mapping(string => bool) public tokenExists;

  // constructor for ERC721
  constructor() ERC721('ColorToken', 'CLT') {
    // message sender is the owner
    owner = msg.sender;
  }

  // function to get all tokens
  function getAllTokens() public view returns (Color[] memory) {
    return allTokens;
  }

  // returns tokens of a specific address
  function getMyTokens() public view returns (Color[] memory) {
    return tokenAddress[msg.sender];
  }

  // function to mint tokens
  function mintToken(string calldata _tokenName) public payable {
    // check if token already exists
    require(!tokenExists[_tokenName], "Token already exists");

    // create a new token, comes from ERC721 contract
    _safeMint(msg.sender, tokenId);

    // add the token to the list
    allTokens.push(Color(tokenId, _tokenName, msg.sender));

    // add the token to the mapping
    tokenAddress[msg.sender].push(Color(tokenId, _tokenName, msg.sender));

    // update token exists to true
    tokenExists[_tokenName] = true;

    // update token id
    tokenId++;

  }

}
