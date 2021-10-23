pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract DomiInterface {
  function getStabilityFee() public view virtual returns (uint256 stabilityFee);

  function getTotalSupply() public view virtual returns (uint256 totalSupply);

  function balanceOf(address whom) public view virtual returns (uint256);
}

contract Distributor is Ownable {
  uint256 public lastDistributed;
  address[] public domiHolders;
  DomiInterface public domiContract;
  mapping(address => uint256) public balances;

  constructor() {
    lastDistributed = block.timestamp;
  }

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
  }

  function isSufficient() external view returns (bool) {
    uint256 stabilityFee = domiContract.getStabilityFee();
    uint256 totalStabilityFeesOwed = domiContract.getTotalSupply() * stabilityFee;
    if (totalStabilityFeesOwed <= domiContract.balanceOf(address(this))) {
      return true;
    }
    return false;
  }

  function distribute() external onlyOwner {
    require(block.timestamp - 28 days >= lastDistributed, 'Wait at least 28 days');
    uint256 stabilityFee = domiContract.getStabilityFee();
    uint256 totalSupply = domiContract.getTotalSupply();
    uint256 totalStabilityFeesOwed = totalSupply * stabilityFee;
    require(
      totalStabilityFeesOwed <= domiContract.balanceOf(address(this)),
      'Insufficient stability fees'
    );
    // uint256 numDomiHolders = domiHolders.length;
    // for (uint256 i = 0; i < numDomiHolders; i++) {
    //   // TODO transfer(address(this), domiHolders[i], balances[domiHolders[i]] / totalSupply * totalStabilityFeesOwed);
    // }
  }

}
