pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract DomiInterface {
  function getStabilityFee() public view virtual returns (uint256 stabilityFee);

  function getTotalSupply() public view virtual returns (uint256 totalSupply);

  function balanceOf(address whom) public view virtual returns (uint256);

  function transfer(address renterAddress, uint256 numTokens) public virtual returns (bool);
}

abstract contract ReservesInterface {
  function transferBuffer(uint256 amount) external payable virtual;
}

contract Principal is Ownable {
  mapping(address => uint256) public principalBalances;
  DomiInterface public domiContract;
  ReservesInterface public reservesContract;

  event PenaltyPaid(address from, address to, uint256 tokens);
  event ClaimRestOfPenalty(address renterAddress, uint256 balanceOwed);

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
  }

  function setReservesContractAddress(address _address) external onlyOwner {
    reservesContract = ReservesInterface(_address);
  }

  // TODO when stabilityFee paid to Principal Contract, distribute to holders proportionately

  // When the renter terminates their contract, release the principal back to the renterAddress minus penalties
  function _transferToRenter(address renterAddress, uint256 penalty) private {
    uint256 renterPrincipal = principalBalances[renterAddress];
    if (penalty > 0) {
      if (penalty <= renterPrincipal) {
        principalBalances[renterAddress] = renterPrincipal - penalty;
        domiContract.transfer(address(reservesContract), penalty);
        emit PenaltyPaid(renterAddress, address(reservesContract), penalty);
      } else {
        principalBalances[renterAddress] = 0;
        domiContract.transfer(address(reservesContract), renterPrincipal);
        emit PenaltyPaid(renterAddress, address(reservesContract), renterPrincipal);
        // TODO probably need function to inform real life ops team to collect rest of penalty owed
        emit ClaimRestOfPenalty(renterAddress, penalty - renterPrincipal);
      }
    }
    uint256 netPrincipal = renterPrincipal - penalty;
    if (netPrincipal > 0) {
      principalBalances[renterAddress] = 0;
      domiContract.transfer(renterAddress, netPrincipal);
    }
  }

  // TODO When the renter/homeowner pays their dues for the full length of the term (eg 30 years), transfer the principal to BuyHomes.sol
}
