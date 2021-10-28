// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Ownable.sol';
import './Homes.sol';
import './Reserves.sol';
import './HomePriceCalculator.sol';
import './Domi.sol';
import './Collector.sol';

contract Reserves{
    address ReservesContract;
    uint totalReserves;
    function addtoReserves(address collector, uint amount) returns (bool){
        bool added;
        try{
            Domi.transferTokens(address collector, address ReservesContract, uint amount)
            added=True;
        }
        catch{
            added=False;
        }
        return added
    }
    function withdrawfromReserves(address distributor) returns (bool){
          bool withdraw;
        try{
            Domi.transferTokens(address ReservesContract, address distributor, uint amount)
            withdraw=True;
        }
        catch{
            withdraw=False;
        }
        return withdraw;
    }

    function transferToBuyHomes(address buyHomes) returns (bool){
          bool transfered;
          threshold=6*getStabilityFee();
        if totalReserves>threshold{
            try{
                Domi.transferTokens(address ReservesContract, address distributor, uint amount)
                transfered=True;
            }
            catch{
                transfered=False;
            }
        }
        else{
            transfered=False;
        }
        return transfered;
    }
}
