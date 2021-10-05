import * as dotenv from 'dotenv';
dotenv.config();
import { task, HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import { removeConsoleLog } from 'hardhat-preprocessor';
import 'hardhat-deploy';
import { nodeUrl, accounts } from './utils/network';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  paths: {
    sources: './contracts',
    tests: './test',
    artifacts: './build/artifacts',
    cache: './build/cache',
    deploy: './scripts/deploy',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 20000,
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    showMethodSig: true,
    onlyCalledMethods: false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  typechain: {
    outDir: 'typechained',
    target: 'ethers-v5',
  },
  preprocess: {
    eachLine: removeConsoleLog((hre) => hre.network.name !== 'hardhat' && hre.network.name !== 'localhost'),
  },
  networks: {
    hardhat: {
      chainId: 1337, // temporary for MetaMask support: https://github.com/MetaMask/metamask-extension/issues/10290
    },
    localhost: {
      url: nodeUrl('localhost'),
    },
    rinkeby: {
      url: nodeUrl('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    // can configure other networks, see examples:
    // https://github.com/wighawag/template-ethereum-contracts/blob/main/hardhat.config.ts
  },
  namedAccounts: {
    deployer: {
      default: 0, // by default, take the first account as deployer
      rinkeby: '0x428C7F55cF935909512d845e3740b1C81CB38632', // on rinkeby, use your account
    },
  },
};

export default config;
