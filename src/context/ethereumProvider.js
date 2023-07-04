import { createContext, useContext, useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import { NUMBERRUNNERCLUB_ABI } from "../ressources/abi";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react-core";
const namehash = require("eth-ens-namehash");

export const ETHEREUM_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/MGGlH-80oFX2RUjT-9F8pd6h6d3AG0hj";

export const NRCsubgraph =
  "https://api.studio.thegraph.com/query/48701/nrctestnet/0.1.15";

export const ENSsubgraph =
  "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli";

export const contractAddress = "0x316a3ca98803b13f19F48cA29358dbc054AE2511";

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
  const { contract } = useContract(contractAddress, NUMBERRUNNERCLUB_ABI);
  const address = useAddress();
  const { data: userColor, error: userColorError } = useContractRead(
    contract,
    "getUserColor",
    [address]
  );
  const { mutateAsync: mintCall, error: mintError } = useContractWrite(
    contract,
    "mint"
  );

  const { mutateAsync: stackCall, error: stackError } = useContractWrite(
    contract,
    "stack"
  );

  const { mutateAsync: approveCall, error: approveError } = useContractWrite(
    contract,
    "approve"
  );

  const { mutateAsync: chooseColorCall, error: chooseColorError } =
    useContractWrite(contract, "chooseColor");

  const chooseColor = async (_color) => {
    setIsColorPickerOpen(false);
    try {
      await chooseColorCall({ args: [_color] });
      await mintCall({
        args: [5, "0x0"],
        overrides: {
          value: ethers.utils.parseEther("0.00002"),
        },
      });
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

    for (let i = 0; i < mintCount; i++) {
      try {
        mintCall({
          args: [5, "0x0"],
          overrides: {
            value: ethers.utils.parseEther("0.00002"),
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setEns = async (_id, _list) => {
    setIsEnsSelectorOpen(true);
    setEnsList(_list);
    setSelectId(_id);
  };

  const stack = async (_ens, _id) => {
    setSelectId(null);
    setIsEnsSelectorOpen(false);
    await approveCall({ args: [contractAddress, _id] });
    await stackCall({args: [namehash.hash(_ens), ethers.utils.formatBytes32String(_ens), _id]});
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
    console.log(kingPrice);
    await ethereumState.contract.buyKing(_color, { value: kingPrice });
  };

  const mintPawn = async () => {
    if (userColor === 0) {
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
    address,
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
