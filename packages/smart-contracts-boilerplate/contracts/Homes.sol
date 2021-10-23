// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './HomePriceCalculator.sol';
// import './Domi.sol';

struct Home {
  uint256 homeId;
  address renterAddress;
  address homeOwnerAddress;
  string streetName;
  uint256 postalCode;
  uint256 lease;
  bool minted;
}

contract Homes {
  // Domi public domi;
  uint256 homeCount;
  mapping(uint256 => Home) public homes;
  mapping(uint256 => Home) public unconfirmedHomes;

  constructor() public {
    // domi = new Domi();
    HomePriceCalculator homePriceCalculator = new HomePriceCalculator();
  }

  function addHome(
    address currentOwnerAddress,
    string memory streetName,
    uint256 postalCode,
    uint256 lease,
    bool confirmed
  ) public {
    homeCount += 1;
    Home memory home;
    home.homeId = homeCount; // TODO: Add homeId logic (map to unique house address/postal & country)
    home.homeOwnerAddress = currentOwnerAddress;
    home.streetName = streetName;
    home.postalCode = postalCode;
    home.lease = lease;
    if (confirmed) {
      // domi.mintWithHome(currentOwnerAddress, homeId, home.price);
      home.minted = true;
      homes[home.homeId] = home;
    } else {
      home.minted = false;
      unconfirmedHomes[home.homeId] = home;
    }
  }

  // function currentOwnerSign(uint homeId, address currentOwnerAddress) public {
  //     // domi.mintWithHome(currentOwnerAddress, homeId, home.price);
  // }

  function deleteHome(uint homeId) public {
    homeCount -= 1;
    delete homes[homeId];
  }

  function minted(uint256 homeId) public view returns (bool) {
    return homes[homeId].minted;
  }

  function getHomeCount() public view returns (uint256) {
    return homeCount;
  }

  // function getHome(address currentOwnerAddress) public returns (Home memory) {
  //     return home;
  // }

  // function generateHomeId(string memory streetName, uint postalCode) internal returns (uint) {

  // }
}
