/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  HomeContractsInterface,
  HomeContractsInterfaceInterface,
} from "../HomeContractsInterface";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "homeId",
        type: "uint256",
      },
    ],
    name: "getDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "homePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "monthsPaid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "term",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class HomeContractsInterface__factory {
  static readonly abi = _abi;
  static createInterface(): HomeContractsInterfaceInterface {
    return new utils.Interface(_abi) as HomeContractsInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HomeContractsInterface {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as HomeContractsInterface;
  }
}