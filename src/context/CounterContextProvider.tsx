import { COUNTER_CONTRACT_ADDRESS } from "@/services/constants";
import { chainGrpcWasmApi, msgBroadcastClient } from "@/services/services";
import { getAddresses } from "@/services/wallet";
import {
  MsgExecuteContractCompat,
  fromBase64,
  getInjectiveAddress,
  toBase64,
} from "@injectivelabs/sdk-ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletStore } from "./WalletContextProvider";
import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import { MsgSend } from '@injectivelabs/sdk-ts'
import { BigNumberInBase } from '@injectivelabs/utils'
import { WalletStrategy } from '@injectivelabs/wallet-ts'
import { EthereumChainId } from '@injectivelabs/ts-types'
import {
  MsgExecuteContract,
  MsgBroadcasterWithPk,
} from "@injectivelabs/sdk-ts";
import { ChainId } from "@injectivelabs/ts-types";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";


// export const walletStrategy = new WalletStrategy({
  // chainId: ChainId.Testnet,
  // ethereumOptions: {
  //   ethereumChainId: EthereumChainId.Mainnet,
  //   rpcUrl: alchemyRpcEndpoint
  // }
// })


// Usage Example
// (async () => {
//   const signer = 'inj1...'
  
//   const msg = MsgSend.fromJSON({
//     amount: {
//         denom: 'inj',
//         amount: new BigNumberInBase(0.01).toWei().toFixed()
//     },
//     srcInjectiveAddress: signer,
//     dstInjectiveAddress: 'inj1...',
//   });


const contractAddress = "inj1afqczhsp9a09teazxfe7p3vy5n6p9rwqjpjmnc"
const privateKey = "AqO1pGokZXy2KUWVRzdmKarg7bZY048L78Hwam2biUHF"
const recipientAddress = "inj1afqczhsp9a09teazxfe7p3vy5n6p9rwqjpjmnc"

enum Status {
  Idle = "idle",
  Loading = "loading",
}

type StoreState = {
  count: number;
  isLoading: boolean;
  incrementCount: () => void;
  setContractCounter: (number: string) => void;
};

const CounterContext = createContext<StoreState>({
  count: 0,
  isLoading: true,
  incrementCount: () => {},
  setContractCounter: (number) => {},
});

export const useCounterStore = () => useContext(CounterContext);

type Props = {
  children?: React.ReactNode;
};

const CounterContextProvider = (props: Props) => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const isLoading = status == Status.Loading;
  const { injectiveAddress } = useWalletStore();

  useEffect(() => {
    fetchCount();
  }, []);

  async function fetchCount() {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        "inj1afqczhsp9a09teazxfe7p3vy5n6p9rwqjpjmnc",
        toBase64({ get_count: {} })
      )) as { data: string };

      const { count } = fromBase64(response.data) as { count: number };
      setCount(count);
    } catch (e) {
      alert((e as any).message);
    }
  }

  async function incrementCount() {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    setStatus(Status.Loading);

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: COUNTER_CONTRACT_ADDRESS,
        sender: injectiveAddress,
        msg: {
          increment: {},
        },
      });

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress,
      });
      fetchCount();
    } catch (e) {
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function setContractCounter(number: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    if (Number(number) > 100 || Number(number) < -100) {
      alert("Number must we within -100 and 100");
      return;
    }



    setStatus(Status.Loading);

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: COUNTER_CONTRACT_ADDRESS,
        sender: injectiveAddress,
        msg: {
          reset: {
            count: parseInt(number, 10),
          },
        },
      });

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress,
      });

      fetchCount();
    } catch (e) {
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }


  const msg = MsgExecuteContract.fromJSON({
    contractAddress,
    sender: injectiveAddress,
    exec: {
      action: "transfer",
      msg: {
        recipient: recipientAddress,
        amount: 1000,
      },
    },
  });
  
  const endpointsForNetwork = getNetworkEndpoints(Network.Mainnet);


//   const sendTokens = async () => {
//   const txHash = await new MsgBroadcasterWithPk({
//     privateKey,
//     chainId: "injective-888",
//     endpoints: endpointsForNetwork,
//   }).broadcast({
//     msgs: msg,
//     injectiveAddress,
//   });
  
//   console.log(txHash);
// }

  return (
    <CounterContext.Provider
      value={{
        count,
        isLoading,
        incrementCount,
        setContractCounter,
        
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
