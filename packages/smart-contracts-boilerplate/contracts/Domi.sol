pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './Ownable.sol';

contract DomiToken is ERC20, Ownable {
  address private _owner;
  address private _recipient;
  uint256 public stabilityFee;
  uint256 public lastDistributed;

  constructor() public ERC20('DomiToken', 'Domi') {
    _mint(msg.sender, 100 * (10**uint256(decimals())));
    _owner = msg.sender;
    lastDistributed = block.timestamp;
  }

  function transferTokens(
    address sender,
    address recipient,
    uint256 amount
  ) external {
    _transfer(msg.sender, recipient, amount);
  }

  function getTokenOwner() public view returns (address) {
    return _owner;
  }

  function isSufficient() external view returns (bool) {
    uint256 totalStabilityFeesOwed = totalSupply() * stabilityFee;
    if (totalStabilityFeesOwed <= balanceOf(address(this))) {
      return true;
    } else {
      return false;
    }
  }

  function distribute() external onlyOwner {
    require(block.timestamp - 28 days >= lastDistributed, 'Wait at least 28 days');
    uint256 totalStabilityFeesOwed = totalSupply() * stabilityFee;
    require(totalStabilityFeesOwed <= balanceOf(address(this)), 'Insufficient stability fees');
    // uint256 numDomiHolders = domiHolders.length;
    // for (uint256 i = 0; i < numDomiHolders; i++) {
    //   // TODO transfer(address(this), domiHolders[i], balances[domiHolders[i]] / totalSupply * totalStabilityFeesOwed);
    // }
  }
}
