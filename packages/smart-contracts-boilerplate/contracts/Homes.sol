// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './HomePriceCalculator.sol';
// import './Domi.sol';

struct Home {
  bytes32 homeId;
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
  mapping(bytes32 => Home) public homes;
  mapping(bytes32 => Home) public unconfirmedHomes;

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
    Home memory home;
    home.homeId = generateHomeId(streetName, postalCode);
    home.homeOwnerAddress = currentOwnerAddress;
    home.streetName = streetName;
    home.postalCode = postalCode;
    home.lease = lease;
    if (confirmed) {
      // domi.mintWithHome(currentOwnerAddress, homeId, home.price);
      homeCount += 1;
      home.minted = true;
    } else {
      home.minted = false;
      unconfirmedHomes[home.homeId] = home;
    }
    homes[home.homeId] = home;
  }

  function confirmHome(bytes32 homeId, address currentOwnerAddress) public {
    if (homes[homeId].homeOwnerAddress != currentOwnerAddress)
      revert('Home owner address does not tally with owner address in contract');
    if (homes[homeId].minted == true) revert('Home already minted');
    // domi.mintWithHome(currentOwnerAddress, homeId, home.price);
    delete unconfirmedHomes[homeId];
    homes[homeId].minted = true;
    homeCount += 1;
  }

  function deleteHome(bytes32 homeId) public {
    if (homes[homeId].minted == false) revert('Home not minted yet');
    homeCount -= 1;
    delete homes[homeId];
  }

  function minted(bytes32 homeId) public view returns (bool) {
    return homes[homeId].minted;
  }

  function getHomeCount() public view returns (uint256) {
    return homeCount;
  }

  function generateHomeId(string memory streetName, uint256 postalCode)
    public
    pure
    returns (bytes32)
  {
    return keccak256(abi.encodePacked(streetName, postalCode));
  }
}
