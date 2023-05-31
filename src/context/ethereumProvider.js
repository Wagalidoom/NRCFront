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
      const contractAddress = "0x4653ab7bccFd9a45a3DA784136Ba3651712e6f48";
      const contract = new ethers.Contract(contractAddress, NUMBERRUNNERCLUB_ABI, provider);
      

      setEthereumState({ provider, contract });
    } catch (error) {
      window.alert("Failed to connect wallet");
      console.error(error);
    }
  };

  const value = {
    ethereumState,
    connectWallet,
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
