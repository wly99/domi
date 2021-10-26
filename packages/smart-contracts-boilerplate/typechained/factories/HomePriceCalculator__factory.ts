/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  HomePriceCalculator,
  HomePriceCalculatorInterface,
} from "../HomePriceCalculator";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "housePrice",
        type: "uint256",
      },
    ],
    name: "HomePriceReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        internalType: "string",
        name: "b",
        type: "string",
      },
    ],
    name: "compareStrings",
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
    inputs: [
      {
        internalType: "uint256",
        name: "postalCode",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "streetName",
        type: "string",
      },
    ],
    name: "determineHomePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610378806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633c2647c71461003b578063bed34bba14610064575b600080fd5b61004e610049366004610260565b610084565b60405161005b91906102df565b60405180910390f35b6100776100723660046101ff565b610125565b60405161005b91906102d4565b60008061271090506100b5836040518060400160405280600781526020016613dc98da185c9960ca1b815250610125565b156100c9576100c6612710826102e8565b90505b6100d460028561030c565b6100e7576100e46103e8826102e8565b90505b7f5060902c38a911bfe25c0f9277a52318997246310c68854f1d836541dc51b5658160405161011691906102df565b60405180910390a19392505050565b600081604051602001610138919061029b565b604051602081830303815290604052805190602001208360405160200161015f919061029b565b6040516020818303038152906040528051906020012014905092915050565b600082601f83011261018e578081fd5b813567ffffffffffffffff808211156101a9576101a961032c565b604051601f8301601f1916810160200182811182821017156101cd576101cd61032c565b6040528281528483016020018610156101e4578384fd5b82602086016020830137918201602001929092529392505050565b60008060408385031215610211578182fd5b823567ffffffffffffffff80821115610228578384fd5b6102348683870161017e565b93506020850135915080821115610249578283fd5b506102568582860161017e565b9150509250929050565b60008060408385031215610272578182fd5b82359150602083013567ffffffffffffffff81111561028f578182fd5b6102568582860161017e565b60008251815b818110156102bb57602081860181015185830152016102a1565b818111156102c95782828501525b509190910192915050565b901515815260200190565b90815260200190565b6000821982111561030757634e487b7160e01b81526011600452602481fd5b500190565b60008261032757634e487b7160e01b81526012600452602481fd5b500690565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220ce429e0f687a3c10a98d9fd50a736fe449a459680155bb867f8bdbdf92cb901364736f6c63430008000033";

export class HomePriceCalculator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<HomePriceCalculator> {
    return super.deploy(overrides || {}) as Promise<HomePriceCalculator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): HomePriceCalculator {
    return super.attach(address) as HomePriceCalculator;
  }
  connect(signer: Signer): HomePriceCalculator__factory {
    return super.connect(signer) as HomePriceCalculator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HomePriceCalculatorInterface {
    return new utils.Interface(_abi) as HomePriceCalculatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HomePriceCalculator {
    return new Contract(address, _abi, signerOrProvider) as HomePriceCalculator;
  }
}