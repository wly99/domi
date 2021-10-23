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
  DomiInterface public domiContract;
  HomeContractsInterface public homeContractsContract;
  PrincipalInterface public principalContract;

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
      uint256,
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
    uint256 principalPayment;
    uint256 bufferPayment;
    stabilityFeePayment = _calculateStabilityFeePayment(homePrice, stabilityFee);
    principalPayment = _calculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, principal);
    bufferPayment = _calculateBufferPayment(homePrice, stabilityFee);
    return (stabilityFeePayment, principalPayment, bufferPayment);
  }

  function _calculateStabilityFeePayment(uint256 homePrice, uint256 stabilityFee)
    private
    pure
    returns (uint256)
  {
    // +1 is to round up
    // need to divide 10^2 to get real value(still have not factored in decimals for Domi)
    return (homePrice * stabilityFee) / 12 / 10**3 + 1;
  }

  function _calculatePrincipalPayment(
    // TODO fix bug
    uint256 homePrice,
    uint256 stabilityFee,
    uint256 monthsLeft,
    uint256 principal
  ) private pure returns (uint256) {
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
    uint256 futureValueOfPrincipal = compound(principal, monthsLeft, stabilityFee);
    uint256 shortfall = homePrice - futureValueOfPrincipal;
    uint256 pmt = (shortfall * stabilityFee) /
      12 /
      (1 - 1 / (1 + stabilityFee / 12)**(monthsLeft));
    return pmt;
  }

  function _calculateBufferPayment(uint256 homePrice, uint256 stabilityFee)
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

  function _max(uint256 a, uint256 b) internal pure returns (uint256) {
    return a >= b ? a : b;
  }

  function min(uint256 a, uint256 b) external pure returns (uint256) {
    return a <= b ? a : b;
  }

  // assumes principal has 10 decimals, rate has 5 decimals. Rounds down.
  // returns in 2 decimals
  function compound(
    uint256 principal,
    uint256 timePeriods,
    uint256 rate
  ) public pure returns (uint256) {
    for (uint256 i = 0; i < timePeriods; i++) {
      principal += (principal * rate) / 12 / 10**5;
    }
    return principal / 10**3;
  }

  function testCalculateStabilityFeePayment(uint256 homePrice, uint256 stabilityFee)
    external
    pure
    returns (uint256)
  {
    return _calculateStabilityFeePayment(homePrice, stabilityFee);
  }

  function testCalculatePrincipalPayment(
    uint256 homePrice,
    uint256 stabilityFee,
    uint256 monthsLeft,
    uint256 principal
  ) external pure returns (uint256) {
    return _calculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, principal);
  }

  function testCalculateBufferPayment(uint256 homePrice, uint256 stabilityFee)
    external
    pure
    returns (uint256)
  {
    return _calculateBufferPayment(homePrice, stabilityFee);
  }
}
