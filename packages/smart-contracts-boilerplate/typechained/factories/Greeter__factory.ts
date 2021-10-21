/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { Greeter, GreeterInterface } from '../Greeter';

const _abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_greeting',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: '_new',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'setter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'GreetingUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'greet',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'greeting',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_greeting',
        type: 'string',
      },
    ],
    name: 'setGreeting',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060405162000a3838038062000a38833981016040819052620000349162000199565b6200006460405180606001604052806022815260200162000a1660229139826200008160201b6200030f1760201c565b805162000079906000906020840190620000f3565b50506200032d565b620000ce82826040516024016200009a92919062000275565b60408051601f198184030181529190526020810180516001600160e01b03908116634b5c427760e01b17909152620000d216565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546200010190620002da565b90600052602060002090601f01602090048101928262000125576000855562000170565b82601f106200014057805160ff191683800117855562000170565b8280016001018555821562000170579182015b828111156200017057825182559160200191906001019062000153565b506200017e92915062000182565b5090565b5b808211156200017e576000815560010162000183565b600060208284031215620001ab578081fd5b81516001600160401b0380821115620001c2578283fd5b818401915084601f830112620001d6578283fd5b815181811115620001eb57620001eb62000317565b604051601f8201601f19168101602001838111828210171562000212576200021262000317565b6040528181528382016020018710156200022a578485fd5b6200023d826020830160208701620002a7565b9695505050505050565b6000815180845262000261816020860160208601620002a7565b601f01601f19169290920160200192915050565b6000604082526200028a604083018562000247565b82810360208401526200029e818562000247565b95945050505050565b60005b83811015620002c4578181015183820152602001620002aa565b83811115620002d4576000848401525b50505050565b600281046001821680620002ef57607f821691505b602082108114156200031157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6106d9806200033d6000396000f3fe6080604052600436106100345760003560e01c8063a413686214610039578063cfae32171461004e578063ef690cc014610079575b600080fd5b61004c610047366004610461565b61008e565b005b34801561005a57600080fd5b506100636101ef565b604051610070919061054d565b60405180910390f35b34801561008557600080fd5b50610063610281565b61016c604051806040016040528060168152602001754368616e67696e67206772656574696e672066726f6d60501b815250600080546100cd90610652565b80601f01602080910402602001604051908101604052809291908181526020018280546100f990610652565b80156101465780601f1061011b57610100808354040283529160200191610146565b820191906000526020600020905b81548152906001019060200180831161012957829003601f168201915b505050505060405180604001604052806002815260200161746f60f01b81525084610358565b670de0b6b3a764000034101561019d5760405162461bcd60e51b81526004016101949061061b565b60405180910390fd5b80516101b09060009060208401906103c8565b507f8e76f780213f415e70b1bf2ac0a60f3b65de93f90d2ad1f455c8ca258c1f92558133346040516101e493929190610567565b60405180910390a150565b6060600080546101fe90610652565b80601f016020809104026020016040519081016040528092919081815260200182805461022a90610652565b80156102775780601f1061024c57610100808354040283529160200191610277565b820191906000526020600020905b81548152906001019060200180831161025a57829003601f168201915b5050505050905090565b6000805461028e90610652565b80601f01602080910402602001604051908101604052809291908181526020018280546102ba90610652565b80156103075780601f106102dc57610100808354040283529160200191610307565b820191906000526020600020905b8154815290600101906020018083116102ea57829003601f168201915b505050505081565b6103548282604051602401610325929190610595565b60408051601f198184030181529190526020810180516001600160e01b0316634b5c427760e01b1790526103a7565b5050565b6103a18484848460405160240161037294939291906105c3565b60408051601f198184030181529190526020810180516001600160e01b0316636f34790560e11b1790526103a7565b50505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546103d490610652565b90600052602060002090601f0160209004810192826103f6576000855561043c565b82601f1061040f57805160ff191683800117855561043c565b8280016001018555821561043c579182015b8281111561043c578251825591602001919060010190610421565b5061044892915061044c565b5090565b5b80821115610448576000815560010161044d565b60006020808385031215610473578182fd5b823567ffffffffffffffff8082111561048a578384fd5b818501915085601f83011261049d578384fd5b8135818111156104af576104af61068d565b604051601f8201601f19168101850183811182821017156104d2576104d261068d565b60405281815283820185018810156104e8578586fd5b818585018683013790810190930193909352509392505050565b60008151808452815b818110156105275760208185018101518683018201520161050b565b818111156105385782602083870101525b50601f01601f19169290920160200192915050565b6000602082526105606020830184610502565b9392505050565b60006060825261057a6060830186610502565b6001600160a01b039490941660208301525060400152919050565b6000604082526105a86040830185610502565b82810360208401526105ba8185610502565b95945050505050565b6000608082526105d66080830187610502565b82810360208401526105e88187610502565b905082810360408401526105fc8186610502565b905082810360608401526106108185610502565b979650505050505050565b6020808252601b908201527f6d696e696d616c20646f6e6174696f6e20697320312065746865720000000000604082015260600190565b60028104600182168061066657607f821691505b6020821081141561068757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220565b240f521d7015f4c737da26f7d0bf79031509c0d36bd64a1ee32f24099ce564736f6c634300080000334465706c6f79696e67206120477265657465722077697468206772656574696e673a';

export class Greeter__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(_greeting: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<Greeter> {
    return super.deploy(_greeting, overrides || {}) as Promise<Greeter>;
  }
  getDeployTransaction(_greeting: string, overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
