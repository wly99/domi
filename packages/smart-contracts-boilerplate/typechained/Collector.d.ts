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
  Overrides,
  PayableOverrides,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import type { TypedEventFilter, TypedEvent, TypedListener } from './common';

interface CollectorInterface extends ethers.utils.Interface {
  functions: {
    'domiContract()': FunctionFragment;
    'getMonthlyPaymentAmount(uint256,address)': FunctionFragment;
    'isOwner()': FunctionFragment;
    'monthlyPaymentsCalculatorContract()': FunctionFragment;
    'owner()': FunctionFragment;
    'payMonthlyPayments(address,uint256)': FunctionFragment;
    'paymentsMade(address,uint256)': FunctionFragment;
    'paymentsMissed(address,uint256)': FunctionFragment;
    'principalContract()': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'renterToHome(address)': FunctionFragment;
    'renterToMonthlyPayment(address)': FunctionFragment;
    'reservesContract()': FunctionFragment;
    'setDomiContractAddress(address)': FunctionFragment;
    'setMonthlyPaymentsCalculatorContractAddress(address)': FunctionFragment;
    'setPrincipalContractAddress(address)': FunctionFragment;
    'setReservesContractAddress(address)': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'domiContract', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getMonthlyPaymentAmount', values: [BigNumberish, string]): string;
  encodeFunctionData(functionFragment: 'isOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'monthlyPaymentsCalculatorContract', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'payMonthlyPayments', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'paymentsMade', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'paymentsMissed', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'principalContract', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renterToHome', values: [string]): string;
  encodeFunctionData(functionFragment: 'renterToMonthlyPayment', values: [string]): string;
  encodeFunctionData(functionFragment: 'reservesContract', values?: undefined): string;
  encodeFunctionData(functionFragment: 'setDomiContractAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setMonthlyPaymentsCalculatorContractAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setPrincipalContractAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'setReservesContractAddress', values: [string]): string;
  encodeFunctionData(functionFragment: 'transferOwnership', values: [string]): string;

  decodeFunctionResult(functionFragment: 'domiContract', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMonthlyPaymentAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'monthlyPaymentsCalculatorContract', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'payMonthlyPayments', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paymentsMade', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'paymentsMissed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'principalContract', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renterToHome', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renterToMonthlyPayment', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'reservesContract', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDomiContractAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMonthlyPaymentsCalculatorContractAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPrincipalContractAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setReservesContractAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;

  events: {
    'OwnershipTransferred(address,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<[string, string] & { previousOwner: string; newOwner: string }>;

export class Collector extends BaseContract {
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
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>): this;

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

  interface: CollectorInterface;

  functions: {
    domiContract(overrides?: CallOverrides): Promise<[string]>;

    getMonthlyPaymentAmount(
      homeId: BigNumberish,
      renterAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isOwner(overrides?: CallOverrides): Promise<[boolean]>;

    monthlyPaymentsCalculatorContract(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    payMonthlyPayments(
      renterAddress: string,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    paymentsMade(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { timeStamp: BigNumber; amount: BigNumber }>;

    paymentsMissed(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { timeStamp: BigNumber; amount: BigNumber }>;

    principalContract(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    renterToHome(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    renterToMonthlyPayment(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        savingsRate: BigNumber;
        principal: BigNumber;
        buffer: BigNumber;
      }
    >;

    reservesContract(overrides?: CallOverrides): Promise<[string]>;

    setDomiContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    setMonthlyPaymentsCalculatorContractAddress(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPrincipalContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    setReservesContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    transferOwnership(newOwner: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;
  };

  domiContract(overrides?: CallOverrides): Promise<string>;

  getMonthlyPaymentAmount(
    homeId: BigNumberish,
    renterAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isOwner(overrides?: CallOverrides): Promise<boolean>;

  monthlyPaymentsCalculatorContract(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  payMonthlyPayments(
    renterAddress: string,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  paymentsMade(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { timeStamp: BigNumber; amount: BigNumber }>;

  paymentsMissed(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { timeStamp: BigNumber; amount: BigNumber }>;

  principalContract(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  renterToHome(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  renterToMonthlyPayment(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      savingsRate: BigNumber;
      principal: BigNumber;
      buffer: BigNumber;
    }
  >;

  reservesContract(overrides?: CallOverrides): Promise<string>;

  setDomiContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  setMonthlyPaymentsCalculatorContractAddress(
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPrincipalContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  setReservesContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  transferOwnership(newOwner: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  callStatic: {
    domiContract(overrides?: CallOverrides): Promise<string>;

    getMonthlyPaymentAmount(homeId: BigNumberish, renterAddress: string, overrides?: CallOverrides): Promise<void>;

    isOwner(overrides?: CallOverrides): Promise<boolean>;

    monthlyPaymentsCalculatorContract(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    payMonthlyPayments(renterAddress: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    paymentsMade(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { timeStamp: BigNumber; amount: BigNumber }>;

    paymentsMissed(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { timeStamp: BigNumber; amount: BigNumber }>;

    principalContract(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    renterToHome(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    renterToMonthlyPayment(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        savingsRate: BigNumber;
        principal: BigNumber;
        buffer: BigNumber;
      }
    >;

    reservesContract(overrides?: CallOverrides): Promise<string>;

    setDomiContractAddress(_address: string, overrides?: CallOverrides): Promise<void>;

    setMonthlyPaymentsCalculatorContractAddress(_address: string, overrides?: CallOverrides): Promise<void>;

    setPrincipalContractAddress(_address: string, overrides?: CallOverrides): Promise<void>;

    setReservesContractAddress(_address: string, overrides?: CallOverrides): Promise<void>;

    transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'OwnershipTransferred(address,address)'(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<[string, string], { previousOwner: string; newOwner: string }>;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<[string, string], { previousOwner: string; newOwner: string }>;
  };

  estimateGas: {
    domiContract(overrides?: CallOverrides): Promise<BigNumber>;

    getMonthlyPaymentAmount(
      homeId: BigNumberish,
      renterAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isOwner(overrides?: CallOverrides): Promise<BigNumber>;

    monthlyPaymentsCalculatorContract(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    payMonthlyPayments(
      renterAddress: string,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    paymentsMade(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    paymentsMissed(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    principalContract(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    renterToHome(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    renterToMonthlyPayment(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    reservesContract(overrides?: CallOverrides): Promise<BigNumber>;

    setDomiContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setMonthlyPaymentsCalculatorContractAddress(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPrincipalContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    setReservesContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    transferOwnership(newOwner: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    domiContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMonthlyPaymentAmount(
      homeId: BigNumberish,
      renterAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    monthlyPaymentsCalculatorContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payMonthlyPayments(
      renterAddress: string,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    paymentsMade(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paymentsMissed(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    principalContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    renterToHome(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renterToMonthlyPayment(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reservesContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setDomiContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    setMonthlyPaymentsCalculatorContractAddress(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPrincipalContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    setReservesContractAddress(_address: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    transferOwnership(newOwner: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;
  };
}
