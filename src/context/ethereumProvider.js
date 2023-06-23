import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";
import Axios from "axios";
import { NUMBERRUNNERCLUB_ABI } from "../ressources/abi";

export const NRCsubgraph =
  "https://api.studio.thegraph.com/query/48701/nrctestnet/v0.0.8";
const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isMintOpen, setIsMintOpen] = useState(false);

  const chooseColor = async (_color) => {
    if (!ethereumState.contract) return;
    try {
      await ethereumState.contract.chooseColor(_color);
      setIsColorPickerOpen(false);
      const mint = await ethereumState.contract.mint(5, "0x0", {
        value: ethers.utils.parseEther("0.2"),
      }); // mint a Pawn
      console.log(mint);
    } catch (error) {
      console.log(error);
    }
  };

  const chooseBlackColor = async () => {
    await chooseColor(1);
  };

  const chooseWhiteColor = async () => {
    await chooseColor(2);
  };

  const mint = async (mintCount) => {
    setIsMintOpen(false);

    if (!ethereumState.contract) {
      throw new Error("Contract is not defined");
    }

    const multicall = new Multicall({
      ethersProvider: ethereumState.provider,
      tryAggregate: false,
    });

    for (let i = 0; i < mintCount; i++) {
      multicall.call("mint", 5, "0x0", {
        value: ethers.utils.parseEther("0.2"),
      });
    }

    try {
      const responses = await multicall.execute();
      console.log(responses);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfStacked = async (_id) => {
    if (!ethereumState.contract) return false;
    try {
      const result = await ethereumState.contract.getIsStacked(_id);
      return result;
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  const stack = async (_id) => {
    if (!ethereumState.contract) return;
    await ethereumState.contract.approve(ethereumState.contract.address, _id);
    let tx = await ethereumState.contract.stack(
      ethers.utils.formatBytes32String("121.eth"),
      _id
    );
    console.log(tx);
  };

  const unstack = async (_id) => {
    if (!ethereumState.contract) return;
    let tx = await ethereumState.contract.unstack(_id);
    console.log(tx);
  };

  const burn = async (_id) => {
    if (!ethereumState.contract) return;
    console.log(_id);
    await ethereumState.contract.burn(_id);
  };

  const [ethereumState, setEthereumState] = useState({
    provider: null,
    contract: null,
    wallet: null,
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.alert("Please install MetaMask!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const wallet = await signer.getAddress();
      const contractAddress = "0x56DFe0ca7c483aB7211699826d0216A47B3D351e";
      const contract = new ethers.Contract(
        contractAddress,
        NUMBERRUNNERCLUB_ABI,
        signer
      );
      setEthereumState({ provider, contract, wallet });
      console.log("Wallet Connected !");
    } catch (error) {
      window.alert("Failed to connect wallet");
      console.error(error);
    }
  };

  const mintPawn = async () => {
    console.log(ethereumState);
    if (!ethereumState.provider || !ethereumState.contract) return;
    console.log("Mint Pawn");
    const address = ethereumState.wallet;
    let query = `
    {
      colorChooseds(where: { user: "${address}" }) {
        id
        color
        user
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
        `;
    let hasColorChosen;
    try {
      await Axios.post(NRCsubgraph, { query: query }).then((result) => {
        hasColorChosen = Object.values(result.data.data);
      });
    } catch (error) {
      console.log(error);
    }
    if (hasColorChosen[0].length === 0) {
      setIsColorPickerOpen(true);
      console.log("display choose color component");
    } else {
      setIsMintOpen(true);
      // const mint = await ethereumState.contract.mint(5, "0x0", { value: ethers.utils.parseEther("0.2") }); // mint a Pawn
      // const list = await ethereumState.contract.listNFT(363,  ethers.utils.parseEther("69.6970")); // mint a Pawn
      // const unlist = await ethereumState.contract.unlistNFT(363); // mint a Pawn

      console.log(hasColorChosen[0]);
    }
  };

  const value = {
    ethereumState,
    connectWallet,
    mintPawn,
    chooseBlackColor,
    chooseWhiteColor,
    isColorPickerOpen,
    isMintOpen,
    mint,
    burn,
    stack,
    unstack,
    checkIfStacked,
  };

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte Ethereum
export function useEthereum() {
  const context = useContext(EthereumContext);
  if (context === undefined) {
    throw new Error("useEthereum must be used within a EthereumProvider");
  }
  return context;
}
