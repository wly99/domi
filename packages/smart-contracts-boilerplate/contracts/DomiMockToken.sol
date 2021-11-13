//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DomiMockToken is ERC20 {
    address private _owner;
    uint256 public lastDistributed;
    uint256 public numOfHolders;
    mapping(address => bool) private _addressInitialized;
    address[] private _domiHolders;


    constructor() ERC20('DomiToken', 'Domi') {
      uint256 initialSupply = 100;
      _mint(msg.sender, initialSupply);
      _owner = msg.sender;
      lastDistributed = block.timestamp;
      numOfHolders = 0;
    }
}