/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { Principal, PrincipalInterface } from '../Principal';

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'renterAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'balanceOwed',
        type: 'uint256',
      },
    ],
    name: 'ClaimRestOfPenalty',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokens',
        type: 'uint256',
      },
    ],
    name: 'PenaltyPaid',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'totalAmount',
        type: 'uint256',
      },
    ],
    name: 'distributeSavingsRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'domiContract',
    outputs: [
      {
        internalType: 'contract DomiInterface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reservesContract',
    outputs: [
      {
        internalType: 'contract ReservesInterface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'savingsRateLastDistributed',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setDomiContractAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setReservesContractAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'renterAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferPrincipal',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

const _bytecode =
  '0x608060405234801561001057600080fd5b50600080546001600160a01b03191633178082556040516001600160a01b039190911691907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a36108cb806100696000396000f3fe60806040526004361061009c5760003560e01c80638f32d59b116100645780638f32d59b1461013a578063bda191611461015c578063d1acffa714610171578063e3740bd814610191578063f2fde38b146101a4578063fa91ec0b146101c45761009c565b80631c9c83a5146100a15780632ee8081d146100c35780633a68eaf6146100ee578063715018a6146101105780638da5cb5b14610125575b600080fd5b3480156100ad57600080fd5b506100c16100bc366004610693565b6101e4565b005b3480156100cf57600080fd5b506100d8610233565b6040516100e591906107ed565b60405180910390f35b3480156100fa57600080fd5b50610103610239565b6040516100e59190610715565b34801561011c57600080fd5b506100c1610248565b34801561013157600080fd5b50610103610278565b34801561014657600080fd5b5061014f610287565b6040516100e5919061074d565b34801561016857600080fd5b50610103610298565b34801561017d57600080fd5b506100c161018c3660046106fd565b6102a7565b6100c161019f3660046106b4565b610453565b3480156101b057600080fd5b506100c16101bf366004610693565b61058b565b3480156101d057600080fd5b506100c16101df366004610693565b6105e1565b6101ec610287565b6102115760405162461bcd60e51b81526004016102089061078f565b60405180910390fd5b600580546001600160a01b0319166001600160a01b0392909216919091179055565b60065481565b6005546001600160a01b031681565b610250610287565b61026c5760405162461bcd60e51b81526004016102089061078f565b6102766000610627565b565b6000546001600160a01b031690565b6000546001600160a01b0316331490565b6004546001600160a01b031681565b6102af610287565b6102cb5760405162461bcd60e51b81526004016102089061078f565b6006546102db6224ea004261084d565b10156102f95760405162461bcd60e51b8152600401610208906107be565b6000805b60035481101561036f57600160006003838154811061032c57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b0316835282019290925260400190205461035b90836107f6565b91508061036781610864565b9150506102fd565b5060005b60035481101561044e57818360016000600385815481106103a457634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b031683528201929092526040019020546103d3919061082e565b6103dd919061080e565b600160006003848154811061040257634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b03168352820192909252604001812080549091906104369084906107f6565b9091555081905061044681610864565b915050610373565b505050565b6001600160a01b03821660009081526002602052604090205460ff166104d9576001600160a01b0382166000818152600260205260408120805460ff191660019081179091556003805491820181559091527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0180546001600160a01b03191690911790555b6001600160a01b038216600090815260016020526040812080548392906105019084906107f6565b90915550506004805460405163a64b6e5f60e01b81526001600160a01b039091169163a64b6e5f916105399186913091879101610729565b602060405180830381600087803b15801561055357600080fd5b505af1158015610567573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044e91906106dd565b610593610287565b6105af5760405162461bcd60e51b81526004016102089061078f565b6001600160a01b0381166105d55760405162461bcd60e51b815260040161020890610758565b6105de81610627565b50565b6105e9610287565b6106055760405162461bcd60e51b81526004016102089061078f565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b038116811461068e57600080fd5b919050565b6000602082840312156106a4578081fd5b6106ad82610677565b9392505050565b600080604083850312156106c6578081fd5b6106cf83610677565b946020939093013593505050565b6000602082840312156106ee578081fd5b815180151581146106ad578182fd5b60006020828403121561070e578081fd5b5035919050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b901515815260200190565b6020808252601d908201527f4e6577206f776e657220697320746865207a65726f2061646472657373000000604082015260600190565b6020808252601590820152744f6e6c79206f776e65722063616e2061636365737360581b604082015260600190565b60208082526015908201527457616974206174206c65617374203238206461797360581b604082015260600190565b90815260200190565b600082198211156108095761080961087f565b500190565b60008261082957634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156108485761084861087f565b500290565b60008282101561085f5761085f61087f565b500390565b60006000198214156108785761087861087f565b5060010190565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220f5e0860a61995978a008bf8c11aa5ddbe900a83a52511710e5529b4a2dde6e1364736f6c63430008000033';

export class Principal__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<Principal> {
    return super.deploy(overrides || {}) as Promise<Principal>;
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Principal {
    return super.attach(address) as Principal;
  }
  connect(signer: Signer): Principal__factory {
    return super.connect(signer) as Principal__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PrincipalInterface {
    return new utils.Interface(_abi) as PrincipalInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Principal {
    return new Contract(address, _abi, signerOrProvider) as Principal;
  }
}