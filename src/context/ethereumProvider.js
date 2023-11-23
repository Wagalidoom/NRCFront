import { createContext, useContext, useState } from "react";
import { ethers, providers } from "ethers";
import { NUMBERRUNNERCLUB_ABI, RESOLVER_ABI } from "../ressources/abi";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
const namehash = require("eth-ens-namehash");

export const ETHEREUM_RPC_URL =
  // "https://eth-mainnet.g.alchemy.com/v2/vewv4I9vmHpc6yMtiIuZCywz2wpER6qj";
  "https://eth-goerli.g.alchemy.com/v2/MGGlH-80oFX2RUjT-9F8pd6h6d3AG0hj";

export const NRCsubgraph =
  "https://api.studio.thegraph.com/query/48701/nrctestnet/0.5.13";

export const ENSsubgraph =
  "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli";

export const contractAddress = "0x13A2DEAF12273C81348F513bf9B22d7971671Eb1";

const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
  const [isMintColorPickerOpen, setIsMintColorPickerOpen] = useState(false);
  const [isKingColorPickerOpen, setIsKingColorPickerOpen] = useState(false);
  const [isPriceSelectorOpen, setIsPriceSelectorOpen] = useState(false);
  const [isSweepOpen, setIsSweepOpen] = useState(false);
  const [isBurnSweepOpen, setIsBurnSweepOpen] = useState(false);
  const [isEnsSelectorOpen, setIsEnsSelectorOpen] = useState(false);
  const [isKingEnsSelectorOpen, setIsKingEnsSelectorOpen] = useState(false);
  const [isBurnOpen, setIsBurnOpen] = useState(false);
  const [isKillOpen, setIsKillOpen] = useState(false);
  const [selectId, setSelectId] = useState(0);
  const [freeMint, setFreeMint] = useState(0);
  const [burnPrice, setBurnPrice] = useState(0);
  const [ensList, setEnsList] = useState("");
  const [collection, setCollection] = useState([]);
  const [isMintOpen, setIsMintOpen] = useState(false);
  const [isKingHandOpen, setIsKingHandOpen] = useState(false);
  const [state, setState] = useState("");
  const [shortState, setShortState] = useState("");

  const generalProvider = new providers.StaticJsonRpcProvider(ETHEREUM_RPC_URL);
  const generalContract = contractAddress
    ? new ethers.Contract(
        contractAddress,
        NUMBERRUNNERCLUB_ABI,
        generalProvider
      )
    : null;

  const account = useAccount();
  const address = account.address;

  const { data: setTextCall, write: writeSetText } = useContractWrite({
    address: "0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750",
    abi: RESOLVER_ABI,
    functionName: "setText",
  });

  const { isLoading: setTextLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: setTextCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: userColor } = useContractRead({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "getUserColor",
    args: [account.address],
  });

  const { data: kingPrice } = useContractRead({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "getCurrentPrice",
  });

  const { data: mintCall, write: writeMint } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "mint",
  });

  const { isLoading: mintLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: mintCall?.hash,
    onSuccess() {
      setShortState("success");
    },
  });

  const { data: multiMintCall, write: writeMultiMint } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "multiMint",
  });

  const { isLoading: multiMintLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: multiMintCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: updateExpirationCall, write: writeUpdateExpiration } =
    useContractWrite({
      address: contractAddress,
      abi: NUMBERRUNNERCLUB_ABI,
      functionName: "updateExpiration",
    });

  const { isLoading: updateExpirationLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: updateExpirationCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: multiBuyCall, write: writeMultiBuy } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "multiBuy",
  });

  const { isLoading: multiBuyLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: multiBuyCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: multiKillCall, write: writeMultiKill } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "multiKill",
  });

  const { isLoading: multiKillLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: multiKillCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: stackCall, write: writeStack } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "stack",
  });

  const { isLoading: stackLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: stackCall?.hash,
    onSuccess() {
      setState("successHalf");
    },
  });

  const { data: unstackCall, write: writeUnstack } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "unstack",
  });

  const { isLoading: unstackLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: unstackCall?.hash,
  });

  const { data: burnCall, write: writeBurn } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "burn",
  });

  const { isLoading: burnLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: burnCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: listCall, write: writeList } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "listNFT",
  });

  const { isLoading: listLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: listCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: unlistCall, write: writeUnlist } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "unlistNFT",
  });

  const { isLoading: unlistLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: unlistCall?.hash,
  });

  const { data: buyKingCall, write: writeBuyKing } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "buyKing",
  });

  const { isLoading: buyKingLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: buyKingCall?.hash,
    onSuccess() {
      setState("successHalf");
    },
  });

  const { data: chooseColorCall, write: writeChooseColor } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "chooseColor",
  });

  const { isLoading: chooseColorLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: chooseColorCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const { data: revealKingHandCall, write: writeRevealKingHand } =
    useContractWrite({
      address: contractAddress,
      abi: NUMBERRUNNERCLUB_ABI,
      functionName: "revealKingHand",
    });

  const { data: revealKingHandResponse, isLoading: revealKingHandLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: revealKingHandCall?.hash,
    onSuccess() {
      setState("success");
    },
  });

  const chooseColor = (_color) => {
    try {
      writeChooseColor({ args: [_color] });
    } catch (error) {
      console.log(error);
    }
  };

  const validateKill = (_id, price) => {
    setSelectId(_id);
    setBurnPrice(price);
    setIsKillOpen(true);
  };

  const setPrice = (_id) => {
    setIsPriceSelectorOpen(true);
    setSelectId(_id);
  };

  const validateBurn = (_id) => {
    setSelectId(_id);
    setIsBurnOpen(true);
  };

  const mint = (mintCount) => {
    if (contractAddress) {
      writeMultiMint({
        args: [mintCount],
        value: ethers.utils.parseEther(
          Number(mintCount * 0.00001 - freeMint)
            .toFixed(5)
            .toString()
        ),
      });
      setFreeMint(0);
    }
  };

  const updateExpiration = (_id) => {
    if (contractAddress) {
      writeUpdateExpiration({ args: [_id] });
    }
  };

  const sweep = (_list, _price) => {
    writeMultiBuy({
      args: [_list],
      value: ethers.utils.parseEther(
        Number(_price * 10 ** -18)
          .toFixed(5)
          .toString()
      ),
    });
  };

  const burnSweep = (_list, _price) => {
    writeMultiKill({
      args: [_list],
      value: ethers.utils.parseEther(
        Number(_price * 10 ** -3)
          .toFixed(5)
          .toString()
      ),
    });
    setSelectId(null);
  };

  const mintSpecial = async (type, stackedId) => {
    writeMint({
      args: [type, stackedId],
      value: ethers.utils.parseEther("0.00001"),
    });
  };

  const king = async (_ens) => {
    writeBuyKing({
      args: [_ens.replace(".eth", "")],
      value: Number(kingPrice) + 10,
      gasLimit: 200000,
    });
  };

  const setEns = (_id, _list) => {
    setIsEnsSelectorOpen(true);
    setEnsList(_list);
    setSelectId(_id);
  };

  const setSweep = (_collection) => {
    setIsSweepOpen(true);
    setCollection(_collection);
  };

  const setBurnSweep = (_collection) => {
    setIsBurnSweepOpen(true);
    setCollection(_collection);
  };

  const stack = (_ens, _id) => {
    writeStack({
      args: [_ens.replace(".eth", ""), _id],
    });
  };

  const setAvatar = async (_ens, _id) => {
    const avatarRecord = `eip155:1/erc721:${contractAddress}/${selectId}`;
    const tokenURI = await getTokenURI(_id);
    console.log(tokenURI, _ens, _id);
    writeSetText({
      args: [namehash.hash(_ens), "avatar", avatarRecord],
    });
    setSelectId(null);
  };

  const unstack = async (_id) => {
    writeUnstack({ args: [_id] });
  };

  const burn = (_id) => {
    writeBurn({ args: [_id] });
  };

  const validateReveal = (_id) => {
    setIsKingHandOpen(true);
    setSelectId(_id);
  };

  const revealKingHand = () => {
    writeRevealKingHand({
      args: [selectId],
      value: ethers.utils.parseEther("0.000001"),
    });
  };

  const listNFT = (_id, price) => {
    writeList({ args: [_id, ethers.utils.parseEther(price.toString())] });
  };

  const unlistNFT = (_id) => {
    writeUnlist({ args: [_id] });
  };

  const buyKing = async (_list) => {
    if (contractAddress) {
      if (account.address) {
        setEnsList(_list);
        if (userColor === 0) {
          setIsKingColorPickerOpen(true);
        } else {
          if (userColor === 2) setSelectId(1);
          setIsKingEnsSelectorOpen(true);
        }
      }
    }
  };

  const mintPawn = async () => {
    if (contractAddress) {
      if (account.address) {
        if (userColor === 0) {
          setIsMintColorPickerOpen(true);
          console.log("display choose color component");
        } else {
          setIsMintOpen(true);
        }
      }
    }
  };

  const getTotalMinted = async () => {
    let total = 0;
    try {
      total = await generalContract.getTotalMinted();
    } catch (e) {
      console.log(e);
    }
    return total;
  };

  const getCurrentSupply = async () => {
    let currentSupply = 0;
    try {
      currentSupply = await generalContract.getCurrentSupply();
    } catch (e) {
      console.log(e);
    }
    return currentSupply;
  };

  const getVolume = async () => {
    const volume = contractAddress
      ? await generalProvider.getBalance(contractAddress)
      : 0;
    return volume * 10000;
  };

  const getPrizePool = async () => {
    let prizePool = 0;
    try {
      prizePool = await generalContract.getPrizePool();
    } catch (e) {
      console.log(e);
    }
    return prizePool * 10000;
  };

  const getTokenURI = async (_id) => {
    const tokenURI = await generalContract.tokenURI(_id);
    return tokenURI;
  };

  const getEnsName = async () => {
    const name = await generalProvider.lookupAddress(account.address);
    return name;
  };

  const getEnsProfilePicture = async (ensName) => {
    const resolver = await generalProvider.getResolver(ensName);
    const imageUrl = await resolver.getText("avatar");
    return imageUrl;
  };

  const getGasPrice = async () => {
    const gasPrice = await generalProvider.getGasPrice();
    return gasPrice;
  };

  const value = {
    mintPawn,
    chooseColor,
    isMintColorPickerOpen,
    isKingColorPickerOpen,
    isPriceSelectorOpen,
    isSweepOpen,
    isBurnSweepOpen,
    isEnsSelectorOpen,
    isKingEnsSelectorOpen,
    isMintOpen,
    isKillOpen,
    isBurnOpen,
    isKingHandOpen,
    selectId,
    burnPrice,
    freeMint,
    ensList,
    collection,
    state,
    shortState,
    validateKill,
    validateBurn,
    updateExpiration,
    mint,
    sweep,
    burnSweep,
    mintSpecial,
    mintLoading,
    multiMintLoading,
    burnLoading,
    stackLoading,
    setTextLoading,
    updateExpirationLoading,
    unstackLoading,
    listLoading,
    unlistLoading,
    chooseColorLoading,
    multiBuyLoading,
    buyKingLoading,
    multiKillLoading,
    revealKingHandLoading,
    revealKingHandResponse,
    setIsMintOpen,
    setIsPriceSelectorOpen,
    setIsEnsSelectorOpen,
    setIsKingEnsSelectorOpen,
    setIsMintColorPickerOpen,
    setIsKingColorPickerOpen,
    setIsSweepOpen,
    setIsBurnSweepOpen,
    setIsKingHandOpen,
    setIsKillOpen,
    setIsBurnOpen,
    setState,
    setShortState,
    burn,
    stack,
    king,
    setAvatar,
    unstack,
    validateReveal,
    revealKingHand,
    buyKing,
    listNFT,
    unlistNFT,
    setPrice,
    setFreeMint,
    setEns,
    setSweep,
    setBurnSweep,
    getTotalMinted,
    getCurrentSupply,
    getVolume,
    getPrizePool,
    getEnsName,
    getEnsProfilePicture,
    getGasPrice,
    address,
    account,
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
