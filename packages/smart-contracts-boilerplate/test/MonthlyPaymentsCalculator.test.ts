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

  describe('#calculate stability fee payment', () => {
    it('should return correct value', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatesavingsRatePayment(homePrice, stabilityFee)).to.equal(16667);
    });

    it('should return 1 if stabilityFee is 0', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatesavingsRatePayment(homePrice, 0)).to.equal(1);
    });
  });

  describe('#calculate principal payment', () => {
    it('should return correct value for 100K home', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(homePrice, stabilityFee, monthsLeft, principal)).to.equal(20295);
    });

    it('should return correct value for 100K home and 10 years', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(homePrice, stabilityFee, 120, principal)).to.equal(75347);
    });

    it('should return correct value for 100K home, 10 years and 5K principal', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(homePrice, stabilityFee, 120, 5000)).to.equal(70746);
    });

    it('should return correct value for 100K home, 10 years, 5K principal and 3.25% stabilityFee', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(homePrice, 3250, 120, 5000)).to.equal(65750);
    });

    it('should return correct value for 1M home', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(1000000, stabilityFee, monthsLeft, principal)).to.equal(202953);
    });

    it('should return correct value for 10M home', async () => {
      expect(await monthlyPaymentsCalculator.testCalculatePrincipalPayment(10000000, stabilityFee, monthsLeft, principal)).to.equal(2029528);
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

  describe('#calculate future value', () => {
    it('should return correct value for small principal', async () => {
      expect(await monthlyPaymentsCalculator.compound(100 * 10 ** 5, 30, stabilityFee)).to.equal(10512);
    });

    it('should return correct value for big principal', async () => {
      expect(await monthlyPaymentsCalculator.compound(1000000 * 10 ** 5, 30, stabilityFee)).to.equal(105122734);
    });

    it('should return correct value for big principal and long time period', async () => {
      expect(await monthlyPaymentsCalculator.compound(1000000 * 10 ** 5, 360, stabilityFee)).to.equal(182120897);
    });
  });
});
