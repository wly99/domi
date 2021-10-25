/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DomiToken, DomiTokenInterface } from "../DomiToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "distribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isSufficient",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDistributed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "principalContract",
    outputs: [
      {
        internalType: "contract PrincipalInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "savingsRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setPrincipalContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060408051808201825260098152682237b6b4aa37b5b2b760b91b602080830191825283518085019094526004845263446f6d6960e01b9084015281519192916200005f9160039162000203565b5080516200007590600490602084019062000203565b5050600580546001600160a01b0319163317908190556040516001600160a01b039190911691506000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3620000f633620000d362000117565b620000e39060ff16600a62000351565b620000f090606462000446565b6200011c565b600680546001600160a01b0319163317905542600b556000600c55620004bb565b601290565b6001600160a01b0382166200014e5760405162461bcd60e51b81526004016200014590620002a9565b60405180910390fd5b6200015c60008383620001fe565b8060026000828254620001709190620002e9565b90915550506001600160a01b038216600090815260208190526040812080548392906200019f908490620002e9565b90915550506040516001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90620001e4908590620002e0565b60405180910390a3620001fa60008383620001fe565b5050565b505050565b828054620002119062000468565b90600052602060002090601f01602090048101928262000235576000855562000280565b82601f106200025057805160ff191683800117855562000280565b8280016001018555821562000280579182015b828111156200028057825182559160200191906001019062000263565b506200028e92915062000292565b5090565b5b808211156200028e576000815560010162000293565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b60008219821115620002ff57620002ff620004a5565b500190565b80825b600180861162000318575062000348565b8187048211156200032d576200032d620004a5565b808616156200033b57918102915b9490941c93800262000307565b94509492505050565b600062000362600019848462000369565b9392505050565b6000826200037a5750600162000362565b81620003895750600062000362565b8160018114620003a25760028114620003ad57620003e1565b600191505062000362565b60ff841115620003c157620003c1620004a5565b6001841b915084821115620003da57620003da620004a5565b5062000362565b5060208310610133831016604e8410600b841016171562000419575081810a83811115620004135762000413620004a5565b62000362565b62000428848484600162000304565b8086048211156200043d576200043d620004a5565b02949350505050565b6000816000190483118215151615620004635762000463620004a5565b500290565b6002810460018216806200047d57607f821691505b602082108114156200049f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b61114880620004cb6000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c80638f32d59b116100c3578063dd62ed3e1161007c578063dd62ed3e14610291578063ddf833f1146102a4578063e213b5e9146102ac578063e4fc6b6d146102b4578063efe9dbab146102bc578063f2fde38b146102c457610158565b80638f32d59b1461024057806395d89b4114610248578063a457c2d714610250578063a64b6e5f14610263578063a9059cbb14610276578063b7182b951461028957610158565b8063395093511161011557806339509351146101e05780634fcfacb5146101f35780636ecd067f1461020857806370a0823114610210578063715018a6146102235780638da5cb5b1461022b57610158565b806306fdde031461015d578063095ea7b31461017b57806318160ddd1461019b5780631fce07d5146101b057806323b872dd146101b8578063313ce567146101cb575b600080fd5b6101656102d7565b6040516101729190610d23565b60405180910390f35b61018e610189366004610cdb565b61036a565b6040516101729190610d18565b6101a3610387565b6040516101729190611021565b6101a361038d565b61018e6101c6366004610ca0565b610393565b6101d361042c565b604051610172919061102a565b61018e6101ee366004610cdb565b610431565b610206610201366004610c4d565b610485565b005b6101a36104cb565b6101a361021e366004610c4d565b6104d1565b6102066104f0565b610233610520565b6040516101729190610d04565b61018e61052f565b610165610540565b61018e61025e366004610cdb565b61054f565b610206610271366004610ca0565b6105c8565b61018e610284366004610cdb565b6106d7565b6102336106eb565b6101a361029f366004610c6e565b6106fa565b61018e610725565b6101a3610762565b610206610768565b61023361099d565b6102066102d2366004610c4d565b6109ac565b6060600380546102e6906110a6565b80601f0160208091040260200160405190810160405280929190818152602001828054610312906110a6565b801561035f5780601f106103345761010080835404028352916020019161035f565b820191906000526020600020905b81548152906001019060200180831161034257829003601f168201915b505050505090505b90565b600061037e610377610a02565b8484610a06565b50600192915050565b60025490565b600b5481565b60006103a0848484610aba565b6001600160a01b0384166000908152600160205260408120816103c1610a02565b6001600160a01b03166001600160a01b031681526020019081526020016000205490508281101561040d5760405162461bcd60e51b815260040161040490610e41565b60405180910390fd5b61042185610419610a02565b858403610a06565b506001949350505050565b601290565b600061037e61043e610a02565b84846001600061044c610a02565b6001600160a01b03908116825260208083019390935260409182016000908120918b16815292529020546104809190611038565b610a06565b61048d61052f565b6104a95760405162461bcd60e51b815260040161040490610f05565b600d80546001600160a01b0319166001600160a01b0392909216919091179055565b600a5481565b6001600160a01b0381166000908152602081905260409020545b919050565b6104f861052f565b6105145760405162461bcd60e51b815260040161040490610f05565b61051e6000610be4565b565b6005546001600160a01b031690565b6005546001600160a01b0316331490565b6060600480546102e6906110a6565b6000806001600061055e610a02565b6001600160a01b03908116825260208083019390935260409182016000908120918816815292529020549050828110156105aa5760405162461bcd60e51b815260040161040490610fdc565b6105be6105b5610a02565b85858403610a06565b5060019392505050565b6001600160a01b03821660009081526008602052604090205460ff1661064e576001600160a01b0382166000818152600860205260408120805460ff191660019081179091556007805491820181559091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880180546001600160a01b03191690911790555b600d546001600160a01b03838116911614156106c757600d5460405163d1acffa760e01b81526001600160a01b039091169063d1acffa790610694908490600401611021565b600060405180830381600087803b1580156106ae57600080fd5b505af11580156106c2573d6000803e3d6000fd5b505050505b6106d2838383610aba565b505050565b600061037e6106e4610a02565b8484610aba565b6006546001600160a01b031690565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600080600a54610733610387565b61073d9190611070565b9050610748306104d1565b8111610758576001915050610367565b6000915050610367565b600c5481565b61077061052f565b61078c5760405162461bcd60e51b815260040161040490610f05565b600b5461079c6224ea004261108f565b10156107ba5760405162461bcd60e51b815260040161040490610fad565b6000600a546107c7610387565b6107d19190611070565b90506107dc306104d1565b8111156107fb5760405162461bcd60e51b815260040161040490610f78565b60075460005b818110156106d257600d54600780546001600160a01b03909216918390811061083a57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b0316141561091057600d546001600160a01b031663d1acffa761086e610387565b856108ad6007868154811061089357634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b03166104d1565b6108b79190611070565b6108c19190611050565b6040518263ffffffff1660e01b81526004016108dd9190611021565b600060405180830381600087803b1580156108f757600080fd5b505af115801561090b573d6000803e3d6000fd5b505050505b61098b306007838154811061093557634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b0316610952610387565b866109776007878154811061089357634e487b7160e01b600052603260045260246000fd5b6109819190611070565b6102719190611050565b80610995816110e1565b915050610801565b600d546001600160a01b031681565b6109b461052f565b6109d05760405162461bcd60e51b815260040161040490610f05565b6001600160a01b0381166109f65760405162461bcd60e51b815260040161040490610e89565b6109ff81610be4565b50565b3390565b6001600160a01b038316610a2c5760405162461bcd60e51b815260040161040490610f34565b6001600160a01b038216610a525760405162461bcd60e51b815260040161040490610db9565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610aad908590611021565b60405180910390a3505050565b6001600160a01b038316610ae05760405162461bcd60e51b815260040161040490610ec0565b6001600160a01b038216610b065760405162461bcd60e51b815260040161040490610d76565b610b118383836106d2565b6001600160a01b03831660009081526020819052604090205481811015610b4a5760405162461bcd60e51b815260040161040490610dfb565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610b81908490611038565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bcb9190611021565b60405180910390a3610bde8484846106d2565b50505050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80356001600160a01b03811681146104eb57600080fd5b600060208284031215610c5e578081fd5b610c6782610c36565b9392505050565b60008060408385031215610c80578081fd5b610c8983610c36565b9150610c9760208401610c36565b90509250929050565b600080600060608486031215610cb4578081fd5b610cbd84610c36565b9250610ccb60208501610c36565b9150604084013590509250925092565b60008060408385031215610ced578182fd5b610cf683610c36565b946020939093013593505050565b6001600160a01b0391909116815260200190565b901515815260200190565b6000602080835283518082850152825b81811015610d4f57858101830151858201604001528201610d33565b81811115610d605783604083870101525b50601f01601f1916929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b60208082526026908201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604082015265616c616e636560d01b606082015260800190565b60208082526028908201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616040820152676c6c6f77616e636560c01b606082015260800190565b6020808252601d908201527f4e6577206f776e657220697320746865207a65726f2061646472657373000000604082015260600190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252601590820152744f6e6c79206f776e65722063616e2061636365737360581b604082015260600190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b6020808252818101527f496e73756666696369656e7420746f2070617920736176696e67732072617465604082015260600190565b60208082526015908201527457616974206174206c65617374203238206461797360581b604082015260600190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b606082015260800190565b90815260200190565b60ff91909116815260200190565b6000821982111561104b5761104b6110fc565b500190565b60008261106b57634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561108a5761108a6110fc565b500290565b6000828210156110a1576110a16110fc565b500390565b6002810460018216806110ba57607f821691505b602082108114156110db57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156110f5576110f56110fc565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212201d2c0713583165a12e2533c7869f1c9e963496ca8d026e2d4be804f03fb08e4164736f6c63430008000033";

export class DomiToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DomiToken> {
    return super.deploy(overrides || {}) as Promise<DomiToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DomiToken {
    return super.attach(address) as DomiToken;
  }
  connect(signer: Signer): DomiToken__factory {
    return super.connect(signer) as DomiToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DomiTokenInterface {
    return new utils.Interface(_abi) as DomiTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DomiToken {
    return new Contract(address, _abi, signerOrProvider) as DomiToken;
  }
}
