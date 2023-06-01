import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { NUMBERRUNNERCLUB_ABI } from '../ressources/abi';

// Contexte Ethereum
const EthereumContext = createContext(null);

// Fournisseur Ethereum
export function EthereumProvider({ children }) {
  const [ethereumState, setEthereumState] = useState({
    provider: null,
    contract: null,
  });

  // Connexion du portefeuille
  const connectWallet = async () => {
    if (!window.ethereum) {
      window.alert("Please install MetaMask!");
      return;
    }

    try {
      console.log(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x4653ab7bccFd9a45a3DA784136Ba3651712e6f48";
      // const contractProvider = new ethers.Contract(contractAddress, NUMBERRUNNERCLUB_ABI, provider);
      const contract = new ethers.Contract(contractAddress, NUMBERRUNNERCLUB_ABI, signer);


      setEthereumState({ provider, contract });
    } catch (error) {
      window.alert("Failed to connect wallet");
      console.error(error);
    }
  };

  const mintPawn = async () => {
    if (!ethereumState.provider || !ethereumState.contract) return;
    console.log("Mint Pawn");
    const color = await ethereumState.contract.chooseColor(1); // choose black color
    const mint = await ethereumState.contract.mint(5, {value: ethers.utils.parseEther("0.2")}); // mint a Pawn
    console.log(color, mint);
  }

  const value = {
    ethereumState,
    connectWallet,
    mintPawn,
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
