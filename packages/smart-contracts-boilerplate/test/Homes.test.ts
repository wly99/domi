import chai, { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Homes, Homes__factory } from '@typechained';
import { BytesLike } from '@ethersproject/bytes';
const { solidity } = waffle;

chai.use(solidity);

describe('Homes', () => {
  let homes: Homes;
  let homesFactory: Homes__factory;
  const streetName = 'Orchard';
  const postalCode = '510212';
  let homeId: BytesLike;
  let randomHomeId: BytesLike;

  beforeEach(async () => {
    homesFactory = (await ethers.getContractFactory('Homes')) as Homes__factory;
    homes = await homesFactory.deploy();
    homeId = await homes.generateHomeId(streetName, postalCode);
    randomHomeId = await homes.generateHomeId('Bishan', 352002);
  });

  describe('1. Add new confirmed home', () => {
    it('Should return true when home at Orchard, 510212 is added', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, true);
      expect(await homes.minted(homeId)).to.equal(true);
    });

    it('Should return false when random homeId is queried', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, true);
      expect(await homes.minted(randomHomeId)).to.equal(false);
    });

    it('Should return homeCount equal to 1', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, true);
      expect(await homes.getHomeCount()).to.equal(1);
    });
  });

  describe('2. Adding new unconfirmed home', () => {
    it('Should return false when home is added', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, false);
      expect(await homes.minted(homeId)).to.equal(false);
    });

    it('Should return homeCount equal to 0', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, false);
      expect(await homes.getHomeCount()).to.equal(0);
    });
  });

  describe('3. Delete confirmed home with homeId #1', () => {
    it('Should return false after home is deleted', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, true);
      expect(await homes.minted(homeId)).to.equal(true);
      await homes.deleteHome(homeId);
      expect(await homes.minted(homeId)).to.equal(false);
    });
  });

  describe('4. Confirm unconfirmed home with homeId #1', () => {
    it('Should return true after home is confirmed', async () => {
      await homes.addHome(homes.address, 'Orchard', 510212, false);
      expect(await homes.minted(homeId)).to.equal(false);
      await homes.confirmHome(homeId, homes.address);
      expect(await homes.minted(homeId)).to.equal(true);
    });
  });
});
