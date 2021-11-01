// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Ownable.sol';
import './Reserves.sol';
import './HomePriceCalculator.sol';
import "hardhat/console.sol";

abstract contract DomiInterface {
  function transferTokens(
    address sender,
    address recipient,
    uint256 amount
  ) external payable virtual;
}

contract Reserves{
    DomiInterface public domiContract;
    mapping(address => uint256) public reservesContractAddress;

    constructor() {
        console.log("Deployed Reserves by '%s'", msg.sender);
    }
    address ReservesContract;
    uint totalReserves;
    function addtoReserves(address collector, uint amount) public {
        bool success;
        success = true;
        domiContract.transferTokens(collector, msg.sender, amount);
    }
    function withdrawfromReserves(address distributor, uint amount) public returns (bool){
          bool withdraw;
        try  domiContract.transferTokens(msg.sender, distributor, amount){
            withdraw=true;
        }
        catch{
            withdraw=false;
        }
        return withdraw;
    }

    function transferToBuyHomes(address buyHomes, uint amount) public returns (bool){
          bool transferred;
          uint threshold=10000;

        if (reservesContractAddress[msg.sender]>threshold){
            try domiContract.transferTokens(buyHomes, msg.sender, amount){
                transferred=true;
            }
            catch{
                transferred=false;
            }
        }
        else{
            transferred=false;
        }
        return transferred;
    }
}
