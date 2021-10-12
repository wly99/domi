pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract MonthlyPaymentsCalculatorInterface {
  function calculatePayment(uint256 homeId, address renterAddress)
    external
    virtual
    returns (
      uint256,
      uint256,
      uint256
    );
}

abstract contract DistributorInterface {
  function transferStabilityFee(uint256 amount) external payable virtual;
}

abstract contract PrincipalInterface {
  function transferPrincipal(uint256 amount) external payable virtual;
}

abstract contract ReservesInterface {
  function transferBuffer(uint256 amount) external payable virtual;
}

contract Collector is Ownable {
  MonthlyPaymentsCalculatorInterface monthlyPaymentsCalculatorContract;
  DistributorInterface distributorContract;
  PrincipalInterface principalContract;
  ReservesInterface reservesContract;

  function setMonthlyPaymentsCalculatorContractAddress(address _address) external onlyOwner {
    monthlyPaymentsCalculatorContract = MonthlyPaymentsCalculatorInterface(_address);
  }

  function setDistributorContractAddress(address _address) external onlyOwner {
    distributorContract = DistributorInterface(_address);
  }

  function setPrincipalContractAddress(address _address) external onlyOwner {
    principalContract = PrincipalInterface(_address);
  }

  function setReservesContractAddress(address _address) external onlyOwner {
    reservesContract = ReservesInterface(_address);
  }

  struct PaymentHistory {
    uint256 timeStamp;
    uint256 amount;
  }

  struct MonthlyPayment {
    uint256 stabilityFee;
    uint256 principal;
    uint256 buffer;
  }

  mapping(address => uint256) public renterToHome; // maps renter's public address to homeId
  mapping(address => MonthlyPayment) public renterToMonthlyPayment; // monthly payment consisting of stabilityFee+principal+buffer that renter has to pay next
  mapping(address => PaymentHistory[]) public paymentsMade; // history of payments made by renter
  mapping(address => PaymentHistory[]) public paymentsMissed; // history of missed payments

  function getMonthlyPaymentAmount(uint256 homeId, address renterAddress) external {
    (
      uint256 stabilityFeePayment,
      uint256 principalPayment,
      uint256 bufferPayment
    ) = monthlyPaymentsCalculatorContract.calculatePayment(homeId, renterAddress);
    renterToMonthlyPayment[renterAddress] = MonthlyPayment(
      stabilityFeePayment,
      principalPayment,
      bufferPayment
    );
  }

  function payMonthlyPayments(address renterAddress, uint256 amount) external payable {
    uint256 totalPayable = renterToMonthlyPayment[renterAddress].stabilityFee +
      renterToMonthlyPayment[renterAddress].principal +
      renterToMonthlyPayment[renterAddress].buffer;
    require(amount >= totalPayable, 'Payment is insufficient');
    // TODO
    // If equal or more, inform HomeContract.sol of successful payment
    // If less, inform HomeContract.sol of unsuccessful payment
    distributorContract.transferStabilityFee(renterToMonthlyPayment[renterAddress].stabilityFee);
    principalContract.transferPrincipal(renterToMonthlyPayment[renterAddress].principal);
    reservesContract.transferBuffer(renterToMonthlyPayment[renterAddress].buffer);
    paymentsMade[renterAddress].push(PaymentHistory(block.timestamp, amount));
  }
}
