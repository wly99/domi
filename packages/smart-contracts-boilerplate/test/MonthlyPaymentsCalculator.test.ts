import chai, { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { MonthlyPaymentsCalculator } from '@typechained';
const { solidity } = waffle;
import MonthlyPaymentsCalculatorABI from '../build/artifacts/contracts/MonthlyPaymentsCalculator.sol/MonthlyPaymentsCalculator.json';

chai.use(solidity);

describe('MonthlyPaymentsCalculatorABI', () => {
  let monthlyPaymentsCalculator: MonthlyPaymentsCalculator;
  let [_, bob] = waffle.provider.getWallets();
  const homePrice = 100000;
  const stabilityFee = 2000;
  const monthsLeft = 360;
  const principal = 0;

  const fixture = async () => {
    return (await waffle.deployContract(bob, MonthlyPaymentsCalculatorABI, [])) as MonthlyPaymentsCalculator;
  };

  beforeEach(async () => {
    monthlyPaymentsCalculator = await waffle.loadFixture(fixture);
  });

  it('Initalize with correct min value', async () => {
    expect(await monthlyPaymentsCalculator.min(1, 2)).to.equal(1);
  });

  describe('#calculate stability fee payment', () => {
    it('should return correct value', async () => {
      expect(await monthlyPaymentsCalculator.testCalculateStabilityFeePayment(homePrice, stabilityFee)).to.equal(16667);
    });

    it('should return 1 if stabilityFee is 0', async () => {
      expect(await monthlyPaymentsCalculator.testCalculateStabilityFeePayment(homePrice, 0)).to.equal(1);
    });
  });

  describe('#calculate principal payment', () => {
    it('should return correct value', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, 1000)).to.equal(20295000);
    });
  });

  describe('#calculate buffer payment', () => {
    it('should return correct value', async () => {
      expect(await monthlyPaymentsCalculator.testCalculateBufferPayment(homePrice, stabilityFee)).to.equal(1667);
    });

    it('should return 834 if stabilityFee is 0', async () => {
      expect(await monthlyPaymentsCalculator.testCalculateBufferPayment(homePrice, 0)).to.equal(834);
    });
  });
});
