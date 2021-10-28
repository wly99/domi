pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract MonthlyPaymentsCalculatorInterface {
  function calculatePayment(bytes32 homeId, address renterAddress)
    external
    virtual
    returns (
      uint256,
      uint256,
      uint256
    );
}

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
}

abstract contract PrincipalInterface {
  function transferPrincipal(address renterAddress, uint256 amount) external payable virtual;
}

abstract contract ReservesInterface {
  function transferBuffer(uint256 amount) external payable virtual;
}

contract Collector is Ownable {
  MonthlyPaymentsCalculatorInterface public monthlyPaymentsCalculatorContract;
  DomiInterface public domiContract;
  PrincipalInterface public principalContract;
  ReservesInterface public reservesContract;

  function setMonthlyPaymentsCalculatorContractAddress(address _address) external onlyOwner {
    monthlyPaymentsCalculatorContract = MonthlyPaymentsCalculatorInterface(_address);
  }

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
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
    uint256 savingsRate;
    uint256 principal;
    uint256 buffer;
  }

  mapping(address => uint256) public renterToHome; // maps renter's public address to homeId
  mapping(address => MonthlyPayment) public renterToMonthlyPayment; // monthly payment consisting of savingsRate+principal+buffer that renter has to pay next
  mapping(address => PaymentHistory[]) public paymentsMade; // history of payments made by renter
  mapping(address => PaymentHistory[]) public paymentsMissed; // history of missed payments
  mapping(address => uint) public monthsPaid; // count of months paid by renter

  function getMonthlyPaymentAmount(bytes32 homeId, address renterAddress)
    external
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    (
      uint256 savingsRatePayment,
      uint256 principalPayment,
      uint256 bufferPayment
    ) = monthlyPaymentsCalculatorContract.calculatePayment(homeId, renterAddress);
    renterToMonthlyPayment[renterAddress] = MonthlyPayment(
      savingsRatePayment,
      principalPayment,
      bufferPayment
    );
    return (savingsRatePayment, principalPayment, bufferPayment);
  }

  function payMonthlyPayments(address renterAddress, uint256 amount) external payable {
    uint256 totalPayable = renterToMonthlyPayment[renterAddress].savingsRate +
      renterToMonthlyPayment[renterAddress].principal +
      renterToMonthlyPayment[renterAddress].buffer;
    require(amount >= totalPayable, 'Payment is insufficient');
    // TODO
    // If equal or more, inform HomeContract.sol of successful payment
    // If less, inform HomeContract.sol of unsuccessful payment
    domiContract.transferTokens(
      renterAddress,
      address(domiContract),
      renterToMonthlyPayment[renterAddress].savingsRate
    );
    principalContract.transferPrincipal(
      renterAddress,
      renterToMonthlyPayment[renterAddress].principal
    );
    domiContract.transferTokens(
      renterAddress,
      address(reservesContract),
      renterToMonthlyPayment[renterAddress].buffer
    );
    paymentsMade[renterAddress].push(PaymentHistory(block.timestamp, amount));
    monthsPaid[renterAddress] += 1;
  }

  // TODO check every month if renter has paid. If not paid within grace period add it as a missed payment

  function getMonthsPaid(address renterAddress) public view returns (uint256) {
    return monthsPaid[renterAddress];
  }
}
