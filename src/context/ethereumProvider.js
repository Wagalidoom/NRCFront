import { createContext, useContext, useState } from "react";
import { ethers, providers } from "ethers";
import { NUMBERRUNNERCLUB_ABI } from "../ressources/abi";

const ETHEREUM_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/MGGlH-80oFX2RUjT-9F8pd6h6d3AG0hj";

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
  const generalProvider = new providers.StaticJsonRpcProvider(ETHEREUM_RPC_URL);
  const contractAddress = "0xf64203ab6f93Cd61551Ba7aDB8bDC81b5027D08d";
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
    await ethereumState.contract.approve(ethereumState.contract.address, _id);
    await ethereumState.contract.listNFT(
      _id,
      ethers.utils.parseEther(price.toString())
    );
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
      const signer = provider.getSigner();
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
    const hasColorChosen = await ethereumState.contract.getUserColor(address);
    if (hasColorChosen === 0) {
      setIsColorPickerOpen(true);
      console.log("display choose color component");
    } else {
      setIsMintOpen(true);
    }
  };

  const getTotalMinted = async () => {
    return await generalContract.getTotalMinted();
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
    getTotalMinted,
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
