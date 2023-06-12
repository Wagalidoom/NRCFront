import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { NUMBERRUNNERCLUB_ABI } from '../ressources/abi';

const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const chooseColor = async (_color) => {
    if (!ethereumState.contract) return;
    try {
      await ethereumState.contract.chooseColor(_color);
      setIsColorPickerOpen(false);
      const mint = await ethereumState.contract.mint(5, { value: ethers.utils.parseEther("0.2") }); // mint a Pawn
      console.log(mint);
    }
    catch (error) {
      console.log(error)
    }
  };

  const chooseBlackColor = async () => {
    await chooseColor(1);
  }

  const chooseWhiteColor = async () => {
    await chooseColor(2);
  }

  const stack = async (_id) => {
    if (!ethereumState.contract) return;
    await ethereumState.contract.approve(ethereumState.contract.address, _id);
    console.log(ethers.utils.formatBytes32String("121.eth"));
    try {
      let tx = await ethereumState.contract._stake(ethers.utils.formatBytes32String("121.eth"), _id);
      console.log(tx.transactionHash);
    } catch (error) {
      console.error(error);
    }
  }

  const burn = async (_id) => {
    if (!ethereumState.contract) return;
    console.log(_id);
    await ethereumState.contract.burn(_id);
  }

  const [ethereumState, setEthereumState] = useState({
    provider: null,
    contract: null,
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.alert("Please install MetaMask!");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x7C6342EcD16fd8F00F3781dbf087B4Da2cf244a4";
      // const contractProvider = new ethers.Contract(contractAddress, NUMBERRUNNERCLUB_ABI, provider);
      const contract = new ethers.Contract(contractAddress, NUMBERRUNNERCLUB_ABI, signer);
      setEthereumState({ provider, contract });
      console.log(window.ethereum);
      console.log("Wallet Connected !");
      console.log(ethers.utils.formatBytes32String("12721.eth"));
    } catch (error) {
      window.alert("Failed to connect wallet");
      console.error(error);
    }
  };

  const mintPawn = async () => {
    if (!ethereumState.provider || !ethereumState.contract) return;
    console.log("Mint Pawn");
    const address = await ethereumState.provider.getSigner().getAddress();
    const hasColorChosen = await ethereumState.contract.getUserColor(address);
    if (hasColorChosen === 0) {
      setIsColorPickerOpen(true);
      console.log("display choose color component");
    }
    else {
      const mint = await ethereumState.contract.mint(5, { value: ethers.utils.parseEther("0.2") }); // mint a Pawn
      console.log(mint);
    }
  }

  const value = {
    ethereumState,
    connectWallet,
    mintPawn,
    chooseBlackColor,
    chooseWhiteColor,
    isColorPickerOpen,
    setIsColorPickerOpen,
    burn,
    stack
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
    throw new Error('useEthereum must be used within a EthereumProvider')
  }
  return context;
}
