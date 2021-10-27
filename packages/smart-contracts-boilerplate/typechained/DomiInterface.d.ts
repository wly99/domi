/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface DomiInterfaceInterface extends ethers.utils.Interface {
  functions: {
    "balanceOf(address)": FunctionFragment;
    "getStabilityFee()": FunctionFragment;
    "getTotalSupply()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getStabilityFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSupply",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getStabilityFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSupply",
    data: BytesLike
  ): Result;

  events: {};
}

export class DomiInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: DomiInterfaceInterface;

  functions: {
    balanceOf(whom: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getStabilityFee(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { stabilityFee: BigNumber }>;

    getTotalSupply(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { totalSupply: BigNumber }>;
  };

  balanceOf(whom: string, overrides?: CallOverrides): Promise<BigNumber>;

  getStabilityFee(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    balanceOf(whom: string, overrides?: CallOverrides): Promise<BigNumber>;

    getStabilityFee(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    balanceOf(whom: string, overrides?: CallOverrides): Promise<BigNumber>;

    getStabilityFee(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      whom: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStabilityFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
