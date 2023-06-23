import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";
import { NUMBERRUNNERCLUB_ABI } from "../ressources/abi";

export const NRCsubgraph =
  "https://api.studio.thegraph.com/query/48701/nrctestnet/v0.0.12";
const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isPriceSelectorOpen, setIsPriceSelectorOpen] = useState(false);
  const [saleId, setSaleId] = useState(0);
  const [isMintOpen, setIsMintOpen] = useState(false);
  const [ethereumState, setEthereumState] = useState({
    provider: null,
    contract: null,
    wallet: null,
  });

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

  const setPrice = async (_id) => {
    if (!ethereumState.contract) return;
    setIsPriceSelectorOpen(true);
    setSaleId(_id);
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

    for (let i = 0; i < mintCount; i++) {
      try {
        let transactionResponse = await ethereumState.contract.mint(5, "0x0", {
          value: ethers.utils.parseEther("0.2"),
        });

        // Wait for the transaction to be mined
        let receipt = await transactionResponse.wait();
        console.log(receipt);
      } catch (error) {
        console.error(error);
      }
    }
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

  const buy = async (_id, price) => {
    if (!ethereumState.contract) return;
    console.log(_id, price);
    await ethereumState.contract.buyNFT(_id, { value: price });
  };

  const listNFT = async (_id, price) => {
    if (!ethereumState.contract) return;
    console.log(price);
    await ethereumState.contract.listNFT(_id, ethers.utils.parseEther(price.toString()));
    setSaleId(null);
    setIsPriceSelectorOpen(false);
  };

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
      const contractAddress = "0xf64203ab6f93cd61551ba7adb8bdc81b5027d08d";
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

      // const approve = await ethereumState.contract.approve(ethereumState.contract.address, 363);
      // const list = await ethereumState.contract.listNFT(363,  ethers.utils.parseEther("0.069")); // mint a Pawn
      // const unlist = await ethereumState.contract.unlistNFT(363); // mint a Pawn
      // const buy = await ethereumState.contract.buyNFT(364, {value: ethers.utils.parseEther("0.097")});
      // const unstack = await ethereumState.contract.unstack(363);
      console.log(await ethereumState.contract.getReward(365));
      // console.log(await ethereumState.contract.getReward(363));
      // console.log(await ethereumState.contract.getReward(364));

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
    isPriceSelectorOpen,
    isMintOpen,
    saleId,
    mint,
    burn,
    stack,
    unstack,
    buy,
    listNFT,
    setPrice,
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
