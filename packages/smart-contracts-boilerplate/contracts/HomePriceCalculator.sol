// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HomePriceCalculator {
  event HomePriceReceived(uint256 housePrice);

  function determineHomePrice(uint256 postalCode, string memory streetName)
    public
    returns (uint256)
  {
    uint256 housePrice = 10000;
    if (compareStrings(streetName, 'Orchard')) {
      housePrice += 10000;
    }
    if (postalCode % 2 == 0) {
      housePrice += 1000;
    } // if even
    emit HomePriceReceived(housePrice);
    return housePrice;
  }

  function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }
}
