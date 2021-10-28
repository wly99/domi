// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Ownable.sol';
import './Homes.sol';
import './Reserves.sol';
import './HomePriceCalculator.sol';
import './Domi.sol';

contract BuyHome is Ownable{
    bool boughtHome;
    mapping(bytes32 => Home) public homes;
    address buyer;
    address buyHomes;
    uint buyHomeReserves;
    function buyHome(address buyer,address currentOwnerAddress, string memory streetName, uint256 postalCode) returns (bool){
        housePrice= determineHomePrice(uint postalCode, string memory streetName)
        if (buyHomeReserves>=housePrice){
            remainingReserves= reserveAmount-housePrice;
            try{
                Homes.addHome(currentOwnerAddress, streetName, postalCode);
                Domi.transferTokens(address buyer, address currentOwnerAddress, uint256 housePrice);
                boughtHome=True;
            }
            except{
                boughtHome=False;
            }
        }
        else{
            boughtHome=False;
        }
        return boughtHome
    }
}
