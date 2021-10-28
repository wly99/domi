pragma solidity ^0.8.0;

import './Ownable.sol';

// import 'abdk-libraries-solidity/ABDKMath64x64.sol';

abstract contract DomiInterface {
  function savingsRate() external view virtual returns (uint256 savingsRate);
}

abstract contract HomeContractsInterface {
  function getDetails(bytes32 homeId)
    external
    view
    virtual
    returns (
      uint256 homePrice,
      uint256 term
    );
}

abstract contract PrincipalInterface {
  function getPrincipal(bytes32 homeId, address renterAddress)
    external
    view
    virtual
    returns (uint256 principal);
}

abstract contract CollectorInterface {
  function getMonthsPaid(address renterAddress)
    public
    view
    virtual
    returns (uint256);
}

contract MonthlyPaymentsCalculator is Ownable {
  DomiInterface public domiContract;
  HomeContractsInterface public homeContractsContract;
  PrincipalInterface public principalContract;
  CollectorInterface public collecterContract;

  function setDomiContractAddress(address _address) external onlyOwner {
    domiContract = DomiInterface(_address);
  }

  function setHomeContractsContractAddress(address _address) external onlyOwner {
    homeContractsContract = HomeContractsInterface(_address);
  }

  function setPrincipalContractAddress(address _address) external onlyOwner {
    principalContract = PrincipalInterface(_address);
  }

  function calculatePayment(bytes32 homeId, address renterAddress)
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
    uint256 savingsRate;
    uint256 principal;
    (homePrice, term) = homeContractsContract.getDetails(homeId);
    monthsPaid = collecterContract.getMonthsPaid(renterAddress);
    uint256 monthsLeft = term * 12 - monthsPaid;
    savingsRate = domiContract.savingsRate();
    principal = principalContract.getPrincipal(homeId, renterAddress);

    uint256 savingsRatePayment;
    uint256 principalPayment;
    uint256 bufferPayment;
    savingsRatePayment = _calculateSavingsRatePayment(homePrice, savingsRate);
    principalPayment = _calculatePrincipalPayment(homePrice, savingsRate, monthsLeft, principal);
    bufferPayment = _calculateBufferPayment(homePrice, savingsRate);
    return (savingsRatePayment, principalPayment, bufferPayment);
  }

  function _calculateSavingsRatePayment(uint256 homePrice, uint256 savingsRate)
    private
    pure
    returns (uint256)
  {
    // +1 is to round up
    // need to divide 10^2 to get real value(still have not factored in decimals for Domi)
    return (homePrice * savingsRate) / 12 / 10**3 + 1;
  }

  function _calculatePrincipalPayment(
    // TODO fix bug
    uint256 homePrice,
    uint256 savingsRate,
    uint256 monthsLeft,
    uint256 principal
  ) private pure returns (uint256) {
    uint256 futureValueOfPrincipal = compound(principal, monthsLeft, savingsRate);
    uint256 shortfall = homePrice - futureValueOfPrincipal;
    // uint256 payment = calculatePMT(savingsRate, monthsLeft, principal, shortfall);
    // return payment;
    // for now just naively divide shortfall by monthsLeft, will factor in future monthly principal compounding next time
    return approximate(shortfall, monthsLeft, savingsRate);
    // shortfall -= approximate(shortfall, monthsLeft, savingsRate);
    // return shortfall / monthsLeft;
  }

  function _calculateBufferPayment(uint256 homePrice, uint256 savingsRate)
    private
    pure
    returns (uint256)
  {
    // Decimals = 2, need to divide 10^2 to get real value(still have not factored in decimals for Domi)
    // +1 is to round up
    // max(0.001 / 12 * homePrice, 0.1 * savingsRate / 12 * homePrice)
    uint256 minBuffer = (100 * homePrice) / 12;
    uint256 tenPercentBuffer = ((10000 * savingsRate) / 12) * homePrice;
    if (tenPercentBuffer >= minBuffer) {
      return tenPercentBuffer / 10**8 + 1;
    } else {
      return minBuffer / 10**3 + 1;
    }
  }

  // assumes rate has 5 decimals. Rounds down.
  // returns in 2 decimals
  function compound(
    uint256 principal,
    uint256 timePeriods,
    uint256 rate
  ) public pure returns (uint256) {
    principal *= 10**3;
    for (uint256 i = 0; i < timePeriods; i++) {
      principal += (principal * rate) / 12 / 10**5;
    }
    return principal / 10**3;
  }

  function approximate(
    uint256 shortfall,
    uint256 monthsLeft,
    uint256 savingsRate
  ) public pure returns (uint256) {
    shortfall *= 1;
    uint256 approx = shortfall / monthsLeft;
    uint256 temp;
    for (uint256 i = 0; i < 100; i++) {
      temp = 0;
      for (uint256 j = 0; j < monthsLeft; j++) {
        temp += approx;
        temp += (temp * savingsRate) / 12 / 10**5;
      }
      if (temp > shortfall) {
        approx -= 9;
      } else if (temp == shortfall) {
        return approx;
      } else {
        return (approx + 10);
      }
    }
    return approx;
    // uint approximateMonthlyInterest = shortfall * savingsRate / 12 / 10**5;
    // return approximateMonthlyInterest * monthsLeft / 10**3;
  }

  // function calculatePMT(
  //   uint256 savingsRate,
  //   uint256 monthsLeft,
  //   uint256 principal,
  //   uint256 shortfall
  // ) public pure returns (uint256) {
  //   return
  //     ABDKMath64x64.toUInt(
  //       pmt(
  //         ABDKMath64x64.fromUInt(savingsRate),
  //         ABDKMath64x64.fromUInt(monthsLeft),
  //         ABDKMath64x64.fromUInt(principal),
  //         ABDKMath64x64.fromUInt(shortfall)
  //       )
  //     );
  // }

  // function pmt(
  //   int128 ratePerPeriod,
  //   int128 numberOfPayments,
  //   int128 presentValue,
  //   int128 futureValue
  // ) public pure returns (int128) {
  //   ratePerPeriod = ratePerPeriod / ABDKMath64x64.fromUInt(12 * 10**5);
  //   presentValue = ABDKMath64x64.neg(presentValue);

  //   // annuity formula shortfall = PMT((1+ratePerPeriod)**numberOfPayments - 1) / ratePerPeriod
  //   int128 firstPart = ABDKMath64x64.mul(futureValue, ratePerPeriod);
  //   int128 secondPart = ABDKMath64x64.add(ABDKMath64x64.fromUInt(1), ratePerPeriod);
  //   int128 thirdPart = ABDKMath64x64.pow(secondPart, ABDKMath64x64.toUInt(numberOfPayments));
  //   int128 fourthPart = ABDKMath64x64.sub(thirdPart, ABDKMath64x64.fromUInt(1));
  //   return ABDKMath64x64.div(firstPart, fourthPart);

  //   // int128 q =
  //   //   ABDKMath64x64.pow (
  //   //     ABDKMath64x64.add (
  //   //       0x10000000000000000,
  //   //       ratePerPeriod),
  //   //     ABDKMath64x64.toUInt (
  //   //       numberOfPayments));
  //   // return
  //   //   ABDKMath64x64.neg(ABDKMath64x64.div (
  //   //     ABDKMath64x64.mul (
  //   //       ratePerPeriod,
  //   //       ABDKMath64x64.add (
  //   //         futureValue,
  //   //         ABDKMath64x64.mul (
  //   //           q,
  //   //           presentValue))),
  //   //     ABDKMath64x64.mul (
  //   //       ABDKMath64x64.sub (
  //   //         q,
  //   //         0x10000000000000000),
  //   //       ABDKMath64x64.add (
  //   //         0x10000000000000000,
  //   //         ratePerPeriod))));
  // }

  function testCalculatesavingsRatePayment(uint256 homePrice, uint256 savingsRate)
    external
    pure
    returns (uint256)
  {
    return _calculateSavingsRatePayment(homePrice, savingsRate);
  }

  function testCalculatePrincipalPayment(
    uint256 homePrice,
    uint256 savingsRate,
    uint256 monthsLeft,
    uint256 principal
  ) external pure returns (uint256) {
    return _calculatePrincipalPayment(homePrice, savingsRate, monthsLeft, principal);
  }

  function testCalculateBufferPayment(uint256 homePrice, uint256 savingsRate)
    external
    pure
    returns (uint256)
  {
    return _calculateBufferPayment(homePrice, savingsRate);
  }
}
