// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract DomiInterface {
  function savingsRate() public view virtual returns (uint256 savingsRate);

  function totalSupply() public view virtual returns (uint256 totalSupply);

  function balanceOf(address whom) public view virtual returns (uint256);

  function transferTokens(
    address sender,
    address recipient,
    uint256 numTokens
  ) public virtual returns (bool);
}

abstract contract ReservesInterface {
  function transferBuffer(uint256 amount) external payable virtual;
}

contract Principal is Ownable {
  mapping(address => uint256) private _principalBalances;
  mapping(address => bool) private _principalAddressInitialized;
  address[] private _addressesWithPrincipal;
  DomiInterface public domiContract;
  ReservesInterface public reservesContract;
  uint256 public savingsRateLastDistributed;
  address public buyHomesContract;

  event PenaltyPaid(address from, address to, uint256 tokens);
  event ClaimRestOfPenalty(address renterAddress, uint256 balanceOwed);

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
  }

  function setReservesContractAddress(address _address) external onlyOwner {
    reservesContract = ReservesInterface(_address);
  }

  function setBuyHomesContractAddress(address _address) external onlyOwner {
    buyHomesContract = _address;
  }

  // TODO when savingsRate paid to Principal Contract, distribute to holders proportionately
  function distributeSavingsRate(uint256 totalAmount) external onlyOwner {
    require(block.timestamp - 28 days >= savingsRateLastDistributed, 'Wait at least 28 days');
    uint256 totalPrincipal = 0;
    // TODO take a snapshot of the current state and use this data to do the following
    // or might pay the same entity twice? eg Person A owns first and last address in the
    // array, when distribute fn is called, A can transfer his tokens from first to last
    // address after the fn pays his first address but before reading the balance of his
    // last address. Then when fn reads the balance of his last address, he will get paid
    // again despite only having the same amount of tokens
    for (uint256 i = 0; i < _addressesWithPrincipal.length; i++) {
      totalPrincipal += _principalBalances[_addressesWithPrincipal[i]];
    }

    for (uint256 i = 0; i < _addressesWithPrincipal.length; i++) {
      _principalBalances[_addressesWithPrincipal[i]] +=
        (_principalBalances[_addressesWithPrincipal[i]] * totalAmount) /
        totalPrincipal;
    }
  }

  // Record principal from Collector.sol
  function transferPrincipal(address renterAddress, uint256 amount) external payable {
    if (_principalAddressInitialized[renterAddress] == false) {
      _principalAddressInitialized[renterAddress] = true;
      _addressesWithPrincipal.push(renterAddress);
    }
    _principalBalances[renterAddress] += amount;
    domiContract.transferTokens(renterAddress, address(this), amount);
  }

  // When the renter terminates their contract, release the principal back to the renterAddress minus penalties
  function transferToRenter(address renterAddress, uint256 penalty) external {
    uint256 renterPrincipal = _principalBalances[renterAddress];
    if (penalty > 0) {
      if (penalty <= renterPrincipal) {
        _principalBalances[renterAddress] = renterPrincipal - penalty;
        domiContract.transferTokens(address(this), address(reservesContract), penalty);
        emit PenaltyPaid(renterAddress, address(reservesContract), penalty);
      } else {
        _principalBalances[renterAddress] = 0;
        domiContract.transferTokens(address(this), address(reservesContract), renterPrincipal);
        emit PenaltyPaid(renterAddress, address(reservesContract), renterPrincipal);
        // TODO probably need function to inform real life ops team to collect rest of penalty owed
        emit ClaimRestOfPenalty(renterAddress, penalty - renterPrincipal);
      }
    }
    uint256 netPrincipal = renterPrincipal - penalty;
    if (netPrincipal > 0) {
      _principalBalances[renterAddress] = 0;
      domiContract.transferTokens(address(this), renterAddress, netPrincipal);
    }
  }

  // When the renter/homeowner pays their dues for the full length of the term (eg 30 years),
  // transfer the principal to BuyHomes.sol
  function transferToBuyHomes(address renterAddress) external {
    // TODO add a check that renterPrincipal >= homePrice
    uint256 renterPrincipal = _principalBalances[renterAddress];
    _principalBalances[renterAddress] = 0;
    domiContract.transferTokens(address(this), buyHomesContract, renterPrincipal);
  }
}
