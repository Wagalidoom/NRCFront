import { createContext, useContext, useState } from "react";
import { ethers, providers } from "ethers";
import { NUMBERRUNNERCLUB_ABI } from "../ressources/abi";
const namehash = require("eth-ens-namehash");

export const ETHEREUM_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/MGGlH-80oFX2RUjT-9F8pd6h6d3AG0hj";

export const NRCsubgraph =
  "https://api.studio.thegraph.com/query/48701/nrctestnet/0.1.10";

export const ENSsubgraph =
  "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli";

export const contractAddress = "0x1eD6e4C2EE04844c93Ff72C96071CD01285CCd81";

const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isPriceSelectorOpen, setIsPriceSelectorOpen] = useState(false);
  const [isEnsSelectorOpen, setIsEnsSelectorOpen] = useState(false);
  const [selectId, setSelectId] = useState(0);
  const [ensList, setEnsList] = useState("");
  const [isMintOpen, setIsMintOpen] = useState(false);
  const [ethereumState, setEthereumState] = useState({
    provider: null,
    contract: null,
    wallet: null,
  });
  const generalProvider = new providers.StaticJsonRpcProvider(ETHEREUM_RPC_URL);
  const generalContract = new ethers.Contract(
    contractAddress,
    NUMBERRUNNERCLUB_ABI,
    generalProvider
  );

  const chooseColor = async (_color) => {
    if (!ethereumState.contract) return;
    try {
      await ethereumState.contract.chooseColor(_color);
      setIsColorPickerOpen(false);
      const mint = await ethereumState.contract.mint(5, "0x0", {
        value: ethers.utils.parseEther("0.00002"),
      }); // mint a Pawn
      console.log(mint);
    } catch (error) {
      console.log(error);
    }
  };

  const setPrice = async (_id) => {
    if (!ethereumState.contract) return;
    setIsPriceSelectorOpen(true);
    setSelectId(_id);
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
          value: ethers.utils.parseEther("0.00002"),
        });

        // Wait for the transaction to be mined
        let receipt = await transactionResponse.wait();
        console.log(receipt);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setEns = async (_id, _list) => {
    if (!ethereumState.contract) return;
    setIsEnsSelectorOpen(true);
    setEnsList(_list);
    setSelectId(_id);
  };

  const stack = async (_ens, _id) => {
    if (!ethereumState.contract) return;
    await ethereumState.contract.approve(ethereumState.contract.address, _id);
    console.log(_ens, namehash.hash(_ens), _id);
    let tx = await ethereumState.contract.stack(
      namehash.hash(_ens),
      ethers.utils.formatBytes32String(_ens),
      _id
    );
    setSelectId(null);
    setIsEnsSelectorOpen(false);
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
    await ethereumState.contract.approve(ethereumState.contract.address, _id);
    await ethereumState.contract.listNFT(
      _id,
      ethers.utils.parseEther(price.toString())
    );
    setSelectId(null);
    setIsPriceSelectorOpen(false);
  };

  const unlistNFT = async (_id) => {
    if (!ethereumState.contract) return;
    await ethereumState.contract.unlistNFT(_id);
  };

  const buyKing = async (_color) => {
    if (!ethereumState.contract) return;
    const kingPrice = await ethereumState.contract.getCurrentPrice();
    console.log(kingPrice)
    await ethereumState.contract.buyKing(_color, {value: kingPrice});
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.alert("Please install MetaMask!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const wallet = await signer.getAddress();
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
    const hasColorChosen = await ethereumState.contract.getUserColor(address);
    if (hasColorChosen === 0) {
      setIsColorPickerOpen(true);
      console.log("display choose color component");
    } else {
      setIsMintOpen(true);
    }
  };

  const getTotalMinted = async () => {
    const total = await generalContract.getTotalMinted();
    return total;
  };

  const getCurrentSupply = async () => {
    const currentSupply = await generalContract.getCurrentSupply();
    return currentSupply;
  };

  const value = {
    ethereumState,
    connectWallet,
    mintPawn,
    chooseBlackColor,
    chooseWhiteColor,
    isColorPickerOpen,
    isPriceSelectorOpen,
    isEnsSelectorOpen,
    isMintOpen,
    selectId,
    ensList,
    mint,
    burn,
    stack,
    unstack,
    buy,
    buyKing,
    listNFT,
    unlistNFT,
    setPrice,
    setEns,
    getTotalMinted,
    getCurrentSupply,
  };

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
}

export function useEthereum() {
  const context = useContext(EthereumContext);
  if (context === undefined) {
    throw new Error("useEthereum must be used within a EthereumProvider");
  }
  return context;
}
