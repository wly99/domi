// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Domi.sol';
import './Ownable.sol';
import './Reserves.sol';
import './HomePriceCalculator.sol';
import 'hardhat/console.sol';


contract Reserves {
  DomiToken public domiContract;
  mapping(address => uint256) public reservesContractAddress;

  constructor() {
    console.log('Deployed Reserves by "%s"', msg.sender);
  }

  address ReservesContract;
  uint256 totalReserves;

  function addtoReserves(address collector, uint256 amount) public {
    bool success;
    success = true;
    domiContract.transferTokens(collector, msg.sender, amount);
  }

  function withdrawfromReserves(address distributor, uint256 amount) public returns (bool) {
    bool withdraw;
    try domiContract.transferTokens(msg.sender, distributor, amount) {
      withdraw = true;
    } catch {
      withdraw = false;
    }
    return withdraw;
  }

  function transferToBuyHomes(address buyHomes, uint256 amount) public returns (bool) {
    bool transferred;
    uint256 threshold = 10000;

    if (reservesContractAddress[msg.sender] > threshold) {
      try domiContract.transferTokens(buyHomes, msg.sender, amount) {
        transferred = true;
      } catch {
        transferred = false;
      }
    } else {
      transferred = false;
    }
    return transferred;
  }
}
