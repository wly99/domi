pragma solidity ^0.8.0;

import './HomePriceCalculator.sol';
import './Ownable.sol';

abstract contract DomiInterface {
  function transferTokens(
    address sender,
    address recipient,
    uint256 amount
  ) external payable virtual;

  function transferTokensToPrincipalContract(
    address renterAddress,
    address principalContractAddress,
    uint256 amount
  ) external virtual;

  function mintWithHome(
    address currentOwnerAddress,
    bytes32 homeId,
    uint256 price
  ) public virtual;
}

abstract contract HomePriceCalculatorInterface {
  function determineHomePrice(uint256 postalCode, string memory streetName)
    public
    virtual
    returns (uint256);
}

abstract contract CollectorInterface {
  function getMonthlyPaymentAmount(bytes32 homeId, address renterAddress)
    external
    virtual
    returns (
      uint256,
      uint256,
      uint256
    );

  function terminateMonthlyPayments(bytes32 homeId, address renterAddress) external virtual;
}

abstract contract PrincipalInterface {
  function transferToRenter(address renterAddress, uint256 penalty) external virtual;

  function paymentToReserve(address renterAddress) external virtual;
}

abstract contract MonthlyPaymentsCalculatorInterface {
  function calculatePayment(bytes32 homeId, address renterAddress) external virtual;
}

struct Home {
  bytes32 homeId;
  address renterAddress;
  address homeOwnerAddress;
  uint256 housePrice;
  string streetName;
  uint256 postalCode;
  uint256 lease;
  bool minted;
  bool rented;
}

contract Homes is Ownable {
  DomiInterface public domiContract;
  HomePriceCalculator public homePriceCalculator;
  CollectorInterface public collectorContract;
  MonthlyPaymentsCalculatorInterface public monthlyPmtCalculator;
  PrincipalInterface public principalContract;
  uint256 public confirmedHomeCount;
  uint256 public unconfirmedHomeCount;
  mapping(bytes32 => Home) public homes;
  mapping(bytes32 => Home) public unconfirmedHomes;
  bytes32[] public unconfirmedHomeIds;
  bytes32[] public unrentedHomeIds;
  address public buyHomeAddress;
  uint buyHomeReserves;
  constructor() public {
    // domi = new Domi();
    homePriceCalculator = new HomePriceCalculator();
  }

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
  }

  function getHousePrice(string memory streetName, uint256 postalCode) public returns (uint256) {
    return homePriceCalculator.determineHomePrice(postalCode, streetName);
  }

  function addHome(
    address currentOwnerAddress,
    string memory streetName,
    uint256 postalCode
  ) public {
    Home memory home;
    home.homeId = generateHomeId(streetName, postalCode);
    home.homeOwnerAddress = currentOwnerAddress;
    home.streetName = streetName;
    home.postalCode = postalCode;
    home.housePrice = getHousePrice(streetName, postalCode);
    home.minted = false;
    home.rented = false;
    unconfirmedHomes[home.homeId] = home;
    homes[home.homeId] = home;
    unconfirmedHomeCount += 1;
  }

  // TODO: checkUnconfirmedHomeExpire():

  function confirmHome(bytes32 homeId, address currentOwnerAddress) public {
    // TODO: Allow current owner sign
    if (homes[homeId].homeOwnerAddress != currentOwnerAddress)
      revert('Home owner address does not tally with owner address in contract');
    if (homes[homeId].minted == true) revert('Home already minted');
    delete unconfirmedHomes[homeId];
    for (uint256 i = 0; i < unconfirmedHomeCount; i++) {
      if (unconfirmedHomeIds[i] == homeId) {
        unconfirmedHomeIds[i] = unconfirmedHomeIds[unconfirmedHomeCount - 1];
        delete unconfirmedHomeIds[unconfirmedHomeCount - 1];
        // TODO: Test length of array, might need to remove last element
      }
    }
    homes[homeId].minted = true;
    confirmedHomeCount += 1;
    domiContract.mintWithHome(currentOwnerAddress, homeId, homes[homeId].housePrice);
  }

  function minted(bytes32 homeId) public view returns (bool) {
    return homes[homeId].minted;
  }

  function getHomeCount() public view returns (uint256) {
    return confirmedHomeCount;
  }

  function generateHomeId(string memory streetName, uint256 postalCode)
    public
    pure
    returns (bytes32)
  {
    return keccak256(abi.encodePacked(streetName, postalCode));
  }

  function renterSign(
    bytes32 homeId,
    address renterAddress,
    uint256 lease
  ) public {
    homes[homeId].rented = true;
    homes[homeId].lease = lease;
    homes[homeId].renterAddress = renterAddress;
    unrentedHomeIds.push(homeId);
  }

  function schedulePayments(bytes32 homeId, address renterAddress) public {
    uint256 savingsRatePayment;
    uint256 principalPayment;
    uint256 bufferPayment;
    (savingsRatePayment, principalPayment, bufferPayment) = collectorContract
      .getMonthlyPaymentAmount(homeId, renterAddress);
  }

  function terminateContract(
    bytes32 homeId,
    address renterAddress,
    uint256 penalty
  ) public {
    collectorContract.terminateMonthlyPayments(homeId, renterAddress);
    principalContract.transferToRenter(renterAddress, penalty);
  }

  function transferHome(bytes32 homeId, address renterAddress) public {
    // TODO: offchain transfer
    delete homes[homeId];
    confirmedHomeCount -= 1;
    principalContract.paymentToReserve(renterAddress);
  }

  function getDetails(bytes32 homeId) external view returns (uint256 homePrice, uint256 term) {
    return (homes[homeId].housePrice, homes[homeId].lease);
  }

  function buyHome(address buyer,address currentOwnerAddress, string memory streetName, uint256 postalCode) public returns (bool){
        uint housePrice;
        bool boughtHome;
        housePrice= getHousePrice( streetName, postalCode);
        if (buyHomeReserves>=housePrice){
            uint remainingReserves= buyHomeReserves-housePrice;
            addHome(currentOwnerAddress, streetName, postalCode);
            domiContract.transferTokens(buyer, currentOwnerAddress, housePrice);
            boughtHome=true;
        }
        else{
            boughtHome=false;
        }
        return boughtHome;
    }
}