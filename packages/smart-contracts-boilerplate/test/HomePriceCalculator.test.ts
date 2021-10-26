import chai, { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { HomePriceCalculator, HomePriceCalculator__factory } from '@typechained';
const { solidity } = waffle;

chai.use(solidity);

describe('HomePriceCalculator', () => {
  let homePriceCalculator: HomePriceCalculator;
  let homePriceCalFactory: HomePriceCalculator__factory;

  beforeEach(async () => {
    homePriceCalFactory = (await ethers.getContractFactory('HomePriceCalculator')) as HomePriceCalculator__factory;
    homePriceCalculator = await homePriceCalFactory.deploy();
  });

  it('Should return 21000 when postal code is even and location is Orchard', async () => {
    expect(await homePriceCalculator.determineHomePrice(510212, 'Orchard')).to.equal(21000);
  });

  it('Should return 20000 when postal code is odd and location is Orchard', async () => {
    expect(await homePriceCalculator.determineHomePrice(510211, 'Orchard')).to.equal(20000);
  });

  it('Should return 11000 when postal code is even and location is not Orchard', async () => {
    expect(await homePriceCalculator.determineHomePrice(510212, 'Bishan')).to.equal(11000);
  });
});
