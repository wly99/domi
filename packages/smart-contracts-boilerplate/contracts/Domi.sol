pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './Ownable.sol';

contract DomiToken is ERC20, Ownable {
  address private _owner;
  address[] private _domiHolders;
  mapping (address => bool) private _addressInitialized;
  address private _recipient;
  uint256 public savingsRate;
  uint256 public lastDistributed;
  uint256 public numOfHolders;

  constructor() public ERC20('DomiToken', 'Domi') {
    _mint(msg.sender, 100 * (10**uint256(decimals())));
    _owner = msg.sender;
    lastDistributed = block.timestamp;
    numOfHolders = 0;
  }

  function transferTokens(
    address sender,
    address recipient,
    uint256 amount
  ) external {
    if (_addressInitialized[recipient] == false) {
      _addressInitialized[recipient] = true;
      _domiHolders.push(recipient);
    }
    _transfer(msg.sender, recipient, amount);
  }

  function getTokenOwner() public view returns (address) {
    return _owner;
  }

  function isSufficient() external view returns (bool) {
    uint256 totalSavingsRateOwed = totalSupply() * savingsRate;
    if (totalSavingsRateOwed <= balanceOf(address(this))) {
      return true;
    } else {
      return false;
    }
  }

  function distribute() external onlyOwner {
    require(block.timestamp - 28 days >= lastDistributed, 'Wait at least 28 days');
    uint256 totalSavingsRateOwed = totalSupply() * savingsRate;
    require(totalSavingsRateOwed <= balanceOf(address(this)), 'Insufficient stability fees');
    uint256 numDomiHolders = _domiHolders.length;
    for (uint256 i = 0; i < numDomiHolders; i++) {
      _transfer(address(this), _domiHolders[i], balanceOf(_domiHolders[i]) * totalSavingsRateOwed / totalSupply());
    }
  }
}
