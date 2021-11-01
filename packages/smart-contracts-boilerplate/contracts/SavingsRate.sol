// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Ownable.sol';
import './Domi.sol';
import '@openzeppelin/contracts/utils/math/Math.sol';

abstract contract DomiInterface {
  function setSavingsRate(
    uint _savingsRate
  ) external virtual;
  function getSavingsRate() public virtual returns (uint);
  function getDomiPrice(uint idx) public virtual returns (uint);
}
// tickSize: max change in stabilityFee per update 
// adjustStabilityFee(newPrice):
//  Check stabilityFee from Domi.sol
//  Get price of Domi
//   Now just hardcode a list of values, need above $1, below $1 and $1
//   Next time use 30 day moving average from various oracles
//  Calculate new stabilityFee demanded by Domi holders
//   newStabilityFee = stabilityFee / price of Domi
//   stabilityFee is max of newStabilityFee or tickSize(take note if it’s + or -)
//   Minimum stabilityFee is 0, can’t be negative so make a check
// Update stabilityFee in Domi.sol

contract SavingsRate{
    DomiInterface public domiContract;
    uint tickSize=1255;
    function adjustStabilityFee(uint idx) public returns (uint){
        uint savingsRate=domiContract.getSavingsRate();
        uint domiPrice=domiContract.getDomiPrice(idx);
        uint newSavingsRate=savingsRate/domiPrice;
        if (newSavingsRate>0){
            savingsRate=Math.max(newSavingsRate,tickSize);
        }
        else{
            savingsRate=Math.max(0,tickSize);
        }
        domiContract.setSavingsRate(savingsRate);
    }
}
