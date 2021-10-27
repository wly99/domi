/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MonthlyPaymentsCalculator,
  MonthlyPaymentsCalculatorInterface,
} from "../MonthlyPaymentsCalculator";

const _abi = [
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
    inputs: [
      {
        internalType: "uint256",
        name: "shortfall",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "monthsLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "savingsRate",
        type: "uint256",
      },
    ],
    name: "approximate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "homeId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "renterAddress",
        type: "address",
      },
    ],
    name: "calculatePayment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        internalType: "uint256",
        name: "principal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timePeriods",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "compound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "domiContract",
    outputs: [
      {
        internalType: "contract DomiInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "homeContractsContract",
    outputs: [
      {
        internalType: "contract HomeContractsInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setDomiContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setHomeContractsContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "homePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "savingsRate",
        type: "uint256",
      },
    ],
    name: "testCalculateBufferPayment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "homePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "savingsRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "monthsLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "principal",
        type: "uint256",
      },
    ],
    name: "testCalculatePrincipalPayment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "homePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "savingsRate",
        type: "uint256",
      },
    ],
    name: "testCalculatesavingsRatePayment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633178082556040516001600160a01b039190911691907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3610b4e806100696000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80638f32d59b11610097578063f2fde38b11610066578063f2fde38b146101e8578063f3c85eba146101fb578063f58750151461020e578063fa91ec0b1461022157610100565b80638f32d59b146101bb578063bda19161146101d0578063ca4f7ab3146101d8578063efe9dbab146101e057610100565b80635bca6ea7116100d35780635bca6ea714610178578063715018a61461018b5780638ab96090146101935780638da5cb5b146101a657610100565b8063091c5334146101055780632551f4ad1461013057806332b9669f146101505780634fcfacb514610165575b600080fd5b6101186101133660046108d1565b610234565b60405161012793929190610a63565b60405180910390f35b61014361013e366004610935565b61042e565b60405161012791906109dd565b61016361015e3660046108b7565b610517565b005b6101636101733660046108b7565b610566565b610143610186366004610914565b6105ac565b6101636105c1565b6101436101a1366004610914565b6105f1565b6101ae6105fd565b60405161012791906109be565b6101c361060c565b60405161012791906109d2565b6101ae61061d565b6101ae61062c565b6101ae61063b565b6101636101f63660046108b7565b61064a565b610143610209366004610935565b6106a0565b61014361021c36600461098d565b610712565b61016361022f3660046108b7565b610729565b60025460405162984bc760e81b815260009182918291829182918291829182916001600160a01b039091169063984bc70090610274908d906004016109dd565b60606040518083038186803b15801561028c57600080fd5b505afa1580156102a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c49190610960565b919650945092506000846102d985600c610ab1565b6102e39190610ad0565b9050600160009054906101000a90046001600160a01b03166001600160a01b0316636ecd067f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561033357600080fd5b505afa158015610347573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036b91906108fc565b60035460405163504e7bc360e11b81529194506001600160a01b03169063a09cf7869061039e908e908e906004016109e6565b60206040518083038186803b1580156103b657600080fd5b505afa1580156103ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ee91906108fc565b915060008060006103ff898761076f565b925061040d8987868861079f565b915061041989876107d3565b929e919d50919b509950505050505050505050565b600061043b600185610ab1565b935060006104498486610a91565b90506000805b606481101561050a576000915060005b868110156104b5576104718484610a79565b9250620186a0600c6104838886610ab1565b61048d9190610a91565b6104979190610a91565b6104a19084610a79565b9250806104ad81610ae7565b91505061045f565b50868211156104d0576104c9600984610ad0565b92506104f8565b868214156104e357829350505050610510565b6104ee83600a610a79565b9350505050610510565b8061050281610ae7565b91505061044f565b50909150505b9392505050565b61051f61060c565b6105445760405162461bcd60e51b815260040161053b90610a34565b60405180910390fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b61056e61060c565b61058a5760405162461bcd60e51b815260040161053b90610a34565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b60006105b8838361076f565b90505b92915050565b6105c961060c565b6105e55760405162461bcd60e51b815260040161053b90610a34565b6105ef600061084b565b565b60006105b883836107d3565b6000546001600160a01b031690565b6000546001600160a01b0316331490565b6001546001600160a01b031681565b6002546001600160a01b031681565b6003546001600160a01b031681565b61065261060c565b61066e5760405162461bcd60e51b815260040161053b90610a34565b6001600160a01b0381166106945760405162461bcd60e51b815260040161053b906109fd565b61069d8161084b565b50565b60006106ae6103e885610ab1565b935060005b838110156106fd57620186a0600c6106cb8588610ab1565b6106d59190610a91565b6106df9190610a91565b6106e99086610a79565b9450806106f581610ae7565b9150506106b3565b5061070a6103e885610a91565b949350505050565b60006107208585858561079f565b95945050505050565b61073161060c565b61074d5760405162461bcd60e51b815260040161053b90610a34565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b60006103e8600c6107808486610ab1565b61078a9190610a91565b6107949190610a91565b6105b8906001610a79565b6000806107ad8385876106a0565b905060006107bb8288610ad0565b90506107c881868861042e565b979650505050505050565b600080600c6107e3856064610ab1565b6107ed9190610a91565b9050600084600c61080086612710610ab1565b61080a9190610a91565b6108149190610ab1565b905081811061083f5761082b6305f5e10082610a91565b610836906001610a79565b925050506105bb565b61082b6103e883610a91565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b03811681146108b257600080fd5b919050565b6000602082840312156108c8578081fd5b6105b88261089b565b600080604083850312156108e3578081fd5b823591506108f36020840161089b565b90509250929050565b60006020828403121561090d578081fd5b5051919050565b60008060408385031215610926578182fd5b50508035926020909101359150565b600080600060608486031215610949578081fd5b505081359360208301359350604090920135919050565b600080600060608486031215610974578283fd5b8351925060208401519150604084015190509250925092565b600080600080608085870312156109a2578081fd5b5050823594602084013594506040840135936060013592509050565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b9182526001600160a01b0316602082015260400190565b6020808252601d908201527f4e6577206f776e657220697320746865207a65726f2061646472657373000000604082015260600190565b6020808252601590820152744f6e6c79206f776e65722063616e2061636365737360581b604082015260600190565b9283526020830191909152604082015260600190565b60008219821115610a8c57610a8c610b02565b500190565b600082610aac57634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615610acb57610acb610b02565b500290565b600082821015610ae257610ae2610b02565b500390565b6000600019821415610afb57610afb610b02565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212203a4fc8356d3039703cc0fe95484a12ef3e1067befe762d8505f1f0d39c6e5b7c64736f6c63430008000033";

export class MonthlyPaymentsCalculator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MonthlyPaymentsCalculator> {
    return super.deploy(overrides || {}) as Promise<MonthlyPaymentsCalculator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MonthlyPaymentsCalculator {
    return super.attach(address) as MonthlyPaymentsCalculator;
  }
  connect(signer: Signer): MonthlyPaymentsCalculator__factory {
    return super.connect(signer) as MonthlyPaymentsCalculator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MonthlyPaymentsCalculatorInterface {
    return new utils.Interface(_abi) as MonthlyPaymentsCalculatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MonthlyPaymentsCalculator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as MonthlyPaymentsCalculator;
  }
}
