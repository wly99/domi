pragma solidity ^0.8.0;

import "./Ownable.sol";

abstract contract DomiInterface {
    function getStabilityFee() virtual external view returns ( 
        uint stabilityFee
    );
}

abstract contract HomeContractsInterface {
    function getDetails(uint homeId) virtual external view returns ( 
        uint homePrice,
        uint monthsPaid,
        uint term
    );
}

abstract contract PrincipalInterface {
    function getPrincipal(uint homeId, uint renterAddress) virtual external view returns ( 
        uint principal
    );
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

    function calculatePayment(uint homeId, uint renterAddress) external view returns (uint, uint, uint) {
        uint homePrice;
        uint monthsPaid;
        uint term;
        uint stabilityFee;
        uint principal;
        (homePrice, monthsPaid, term) = homeContractsContract.getDetails(homeId);
        uint monthsLeft = term * 12 - monthsPaid;
        stabilityFee = domiContract.getStabilityFee();
        principal = principalContract.getPrincipal(homeId, renterAddress);

        uint stabilityFeePayment;
        uint principalPayment;
        uint bufferPayment;
        stabilityFeePayment = calculateStabilityFeePayment(homePrice, stabilityFee);
        principalPayment = calculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, principal);
        bufferPayment = calculateBufferPayment(homePrice, stabilityFee);
        return (stabilityFeePayment, principalPayment, bufferPayment);
    }

    function calculateStabilityFeePayment(uint homePrice, uint stabilityFee) private pure returns (uint) {
        // (x*10+5) / 10 is to round up
        // need to divide 10^5 to get real value(still have not factored in decimals for Domi)
        return ((homePrice * stabilityFee / 12) * 10 + 5) / 10;
    }

    function calculatePrincipalPayment(uint homePrice, uint stabilityFee, uint monthsLeft, uint principal) private pure returns (uint) {
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
        return (principal * ((principal+homePrice) / ((1+(stabilityFee/12)) ** monthsLeft - 1)) * (stabilityFee/12) * 10 + 5) / 10;
    }

    function calculateBufferPayment(uint homePrice, uint stabilityFee) private pure returns (uint) {
        // Decimals = 5, need to divide 10^5 to get real value(still have not factored in decimals for Domi)
        // (x*10+5) / 10 is to round up
        // max(0.001 / 12 * homePrice, 0.1 * stabilityFee / 12 * homePrice)
        return (max(100 * homePrice / 12, 10000 * stabilityFee / 12 * homePrice) * 10 + 5) / 10;
    }

    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    function min(uint256 a, uint256 b) external pure returns (uint256) {
        return a <= b ? a : b;
    }
}