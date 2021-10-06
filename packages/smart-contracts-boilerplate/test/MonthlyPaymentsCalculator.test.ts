import chai, { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { MonthlyPaymentsCalculator } from "@typechained";
const { solidity } = waffle;
import MonthlyPaymentsCalculatorABI from "../build/artifacts/contracts/MonthlyPaymentsCalculator.sol/MonthlyPaymentsCalculator.json";

chai.use(solidity);

describe("MonthlyPaymentsCalculatorABI", () => {
    let monthlyPaymentsCalculator: MonthlyPaymentsCalculator;
    // this is the same list as `ethers.getSigners()`
    let [_, bob] = waffle.provider.getWallets();
    const initGreeting = 1;
  
    const fixture = async () => {
      return (await waffle.deployContract(bob, MonthlyPaymentsCalculatorABI, [
      ])) as MonthlyPaymentsCalculator;
    };

    beforeEach(async () => {
        monthlyPaymentsCalculator = await waffle.loadFixture(fixture);
      });
    
      it("Initalize with correct min value", async () => {
        expect(await monthlyPaymentsCalculator.min(1, 2)).to.equal(initGreeting);
      });
  });