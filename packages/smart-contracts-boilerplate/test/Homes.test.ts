import chai, { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Homes, Homes__factory } from '@typechained';
const { solidity } = waffle;

chai.use(solidity);

describe('Homes', () => {
  let homes: Homes;
  let homesFactory: Homes__factory;

  beforeEach(async () => {
    homesFactory = (await ethers.getContractFactory('Homes')) as Homes__factory;
    homes = await homesFactory.deploy();
  });

  describe('1. Add new confirmed home', () => {
    it('Should return true when home is added', async () => {
      await homes.addHome(homes.address, "Orchard", 510212, 30, true);
      expect(await homes.minted(0)).to.equal(true);
    });

    it('Should return homeCount equal to 1', async () => {
      await homes.addHome(homes.address, "Orchard", 510212, 30, true);
      expect(await homes.getHomeCount()).to.equal(1);
    });
  });

  // describe('2. Adding new unconfirmed home', () => {
  //   it('Should return false when home is added', async () => {
  //     await homes.addHome(homes.address, "Orchard", 510212, 30, false);
  //     expect(await homes.minted(0)).to.equal(false);
  //   });

  //   it('Should return homeCount equal to 0', async () => {
  //     await homes.addHome(homes.address, "Orchard", 510212, 30, false);
  //     expect(await homes.getHomeCount()).to.equal(0);
  //   });
  // });

});
