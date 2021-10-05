import { expect } from "chai";
import { ethers } from "hardhat";
// NOTICE HERE: import autogenerated types
import { Greeter, Greeter__factory } from "@typechained";

describe("Greeter", function () {
  // NOTICE HERE: we can give our contract a `Greeter` type!! instead of an `any` type.
  let greeter: Greeter;
  let greeterFactory: Greeter__factory;

  beforeEach(async () => {
    greeterFactory = (await ethers.getContractFactory(
      "Greeter"
    )) as Greeter__factory;
    greeter = await greeterFactory.deploy("Hello, world!");
  });

  it("Should return the new greeting once it's changed", async function () {
    // NOTICE HERE: try type this yourself, your IDE's auto-completion should suggest available
    // functions of `greeter` as you type.
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});


// Wait so the reporter has time to fetch and return prices from APIs.
// https://github.com/cgewecke/eth-gas-reporter/issues/254
describe('eth-gas-reporter workaround', () => {
  it('should kill time', (done) => {
    setTimeout(done, 2000);
  });
});
