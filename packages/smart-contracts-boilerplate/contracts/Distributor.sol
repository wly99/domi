pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract DomiInterface {
  function getStabilityFee() public view virtual returns (uint256 stabilityFee);

  function getTotalSupply() public view virtual returns (uint256 totalSupply);

  function balanceOf(address whom) public view virtual returns (uint256);
}

contract Distributor is Ownable {
  DomiInterface domiContract;

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
}
