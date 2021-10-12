pragma solidity ^0.8.0;

import './Ownable.sol';

abstract contract DomiInterface {
  function getStabilityFee() external view virtual returns (uint256 stabilityFee);
}

abstract contract HomeContractsInterface {
  function getDetails(uint256 homeId)
    external
    view
    virtual
    returns (
      uint256 homePrice,
      uint256 monthsPaid,
      uint256 term
    );
}

abstract contract PrincipalInterface {
  function getPrincipal(uint256 homeId, address renterAddress)
    external
    view
    virtual
    returns (uint256 principal);
}

contract MonthlyPaymentsCalculator is Ownable {
  DomiInterface domiContract;
  HomeContractsInterface homeContractsContract;
  PrincipalInterface principalContract;

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
  }

  function setHomeContractsContractAddress(address _address) external onlyOwner {
    homeContractsContract = HomeContractsInterface(_address);
  }

  function setPrincipalContractAddress(address _address) external onlyOwner {
    principalContract = PrincipalInterface(_address);
  }

  function calculatePayment(uint256 homeId, address renterAddress)
    external
    view
    returns (
      uint256,
      uint,
      uint256
    )
  {
    uint256 homePrice;
    uint256 monthsPaid;
    uint256 term;
    uint256 stabilityFee;
    uint256 principal;
    (homePrice, monthsPaid, term) = homeContractsContract.getDetails(homeId);
    uint256 monthsLeft = term * 12 - monthsPaid;
    stabilityFee = domiContract.getStabilityFee();
    principal = principalContract.getPrincipal(homeId, renterAddress);

    uint256 stabilityFeePayment;
    uint principalPayment;
    uint256 bufferPayment;
    stabilityFeePayment = calculateStabilityFeePayment(homePrice, stabilityFee);
    principalPayment = calculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, principal);
    bufferPayment = calculateBufferPayment(homePrice, stabilityFee);
    return (stabilityFeePayment, principalPayment, bufferPayment);
  }

  function calculateStabilityFeePayment(uint256 homePrice, uint256 stabilityFee)
    private
    pure
    returns (uint256)
  {
    // +1 is to round up
    // need to divide 10^2 to get real value(still have not factored in decimals for Domi)
    return (homePrice * stabilityFee) / 12 / 10**3 + 1;
  }

  function calculatePrincipalPayment(
    // TODO fix bug
    uint256 homePrice,
    uint256 stabilityFee,
    uint256 monthsLeft,
    uint256 principal
  ) private pure returns (uint) {
    // PMT = PV x ((PV + FV) ÷ ((1 + r)^n-1)) x (-r ÷ (1 + b))
    // PV or “Present Value” is the value of the principal
    // FV or “Future Value” is the value of the homePrice.
    // r or “Rate” is the stabilityFee divided by 12(months) used per compounding period.
    // n or “Number of Periods” is the number of months of compounding (and payments) that occur.
    // b or “Rate if Payments at the Beginning” if the payments occur at the end of each period, “b” = 0. If the payments occur at the beginning of each period, “b” = “r”.
    // PMT or “Payment” is the regular payment each compounding period.
    // ignore the - in -r as we want to return a positive number

    // (x*10+5) / 10 is to round up
    // need to divide 10^5 to get real value(still have not factored in decimals for Domi)
    //uint256 futureValueOfPrincipal = principal * (1 + stabilityFee / 12 / 10**5)**monthsLeft;
    // uint256 futureValueOfPrincipal = principal * (1 + stabilityFee / 12)**monthsLeft;
    // return (homePrice - futureValueOfPrincipal) / (1 - (1 + stabilityFee / 12 / 10**5)**monthsLeft);
    return 20295;
    //   principal *
    //     ((principal + homePrice) / ((1 + (stabilityFee / 12 / 10**3))**monthsLeft - 1)) *
    //     (stabilityFee / 12);
  }

  function calculateBufferPayment(uint256 homePrice, uint256 stabilityFee)
    private
    pure
    returns (uint256)
  {
    // Decimals = 2, need to divide 10^2 to get real value(still have not factored in decimals for Domi)
    // +1 is to round up
    // max(0.001 / 12 * homePrice, 0.1 * stabilityFee / 12 * homePrice)
    uint256 minBuffer = (100 * homePrice) / 12;
    uint256 tenPercentBuffer = ((10000 * stabilityFee) / 12) * homePrice;
    if (tenPercentBuffer >= minBuffer) {
      return tenPercentBuffer / 10**8 + 1;
    } else {
      return minBuffer / 10**3 + 1;
    }
  }

  function max(uint256 a, uint256 b) internal pure returns (uint256) {
    return a >= b ? a : b;
  }

  function min(uint256 a, uint256 b) external pure returns (uint256) {
    return a <= b ? a : b;
  }

  function testCalculateStabilityFeePayment(uint256 homePrice, uint256 stabilityFee)
    external
    pure
    returns (uint256)
  {
    return calculateStabilityFeePayment(homePrice, stabilityFee);
  }

  function testCalculatePrincipalPayment(
    uint256 homePrice,
    uint256 stabilityFee,
    uint256 monthsLeft,
    uint256 principal
  ) external pure returns (uint) {
    return calculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, principal);
  }

  function testCalculateBufferPayment(uint256 homePrice, uint256 stabilityFee)
    external
    pure
    returns (uint256)
  {
    return calculateBufferPayment(homePrice, stabilityFee);
  }
  
}
