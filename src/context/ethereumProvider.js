import { createContext, useContext, useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import { NUMBERRUNNERCLUB_ABI, RESOLVER_ABI } from "../ressources/abi";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Axios from "axios";
import { isClub } from "../helper";
const namehash = require("eth-ens-namehash");

export const ETHEREUM_RPC_URL =
  // "https://eth-mainnet.g.alchemy.com/v2/vewv4I9vmHpc6yMtiIuZCywz2wpER6qj";
  "https://eth-goerli.g.alchemy.com/v2/MGGlH-80oFX2RUjT-9F8pd6h6d3AG0hj";

export const NRCsubgraph =
  "https://api.studio.thegraph.com/query/48701/nrctestnet/0.5.32";

export const ENSsubgraph =
  "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli";

export const contractAddress = "0xC6dBA6ae00C18472ad1b2fB3615C08231AF1c90a";

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
  const [isClaimOpen, setIsClaimOpen] = useState(false);
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
  const [ensNames, setEnsNames] = useState([]);
  const [has999, setHas999] = useState(false);
  const [has10k, setHas10k] = useState(false);
  const [id999, setId999] = useState(-1);
  const [id10k, setId10k] = useState(-1);

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

  const { data: claimCall, write: writeClaim } = useContractWrite({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "claimPrizePool",
  });

  const { isLoading: claimLoading } = useWaitForTransaction({
    confirmations: 1,
    hash: claimCall?.hash,
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

  const { data: revealKingHandResponse, isLoading: revealKingHandLoading } =
    useWaitForTransaction({
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

  const validateClaim = (_id) => {
    setSelectId(_id);
    setIsClaimOpen(true);
  };

  const mint = (mintCount) => {
    if (contractAddress) {
      writeMultiMint({
        args: [mintCount],
        value: ethers.utils.parseEther(
          Number(mintCount * 0.05 - freeMint)
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
      value: ethers.utils.parseEther(Number(_price).toFixed(5).toString()),
    });
    setSelectId(null);
  };

  const mintSpecial = async (type, stackedId) => {
    writeMint({
      args: [type, stackedId],
      value: ethers.utils.parseEther("0.05"),
    });
  };

  const king = async (_ens) => {
    writeBuyKing({
      args: [_ens.replace(".eth", "")],
      value: kingPrice,
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

  const claim = (_id) => {
    writeClaim({ args: [_id] });
  };

  const validateReveal = (_id) => {
    setIsKingHandOpen(true);
    setSelectId(_id);
  };

  const revealKingHand = () => {
    writeRevealKingHand({
      args: [selectId],
      value: ethers.utils.parseEther("0.01"),
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
    return volume;
  };

  const getPrizePool = async () => {
    let prizePool = 0;
    try {
      prizePool = await generalContract.getPrizePool();
    } catch (e) {
      console.log(e);
    }
    return prizePool;
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

  useEffect(() => {
    const fetchEnsName = async () => {
      let ENSquery = `
    {
      domains(where: {registrant: "${address.toLowerCase()}"}) {
        name
      }
    }
      `;

      let fetchENS;

      try {
        await Axios.post(ENSsubgraph, { query: ENSquery }).then((result) => {
          fetchENS = Object.values(result.data.data)[0];
        });
      } catch (error) {
        console.log(error);
      }

      if (fetchENS.length > 0) {
        let fetchOwned;
        let ensList = [];
        const promises = fetchENS.map(async (domain) => {
          let NRCquery = `
          {
            nfts(where: {ensName: "${domain.name.replace(".eth", "")}"}) {
              id
              ensName
            }
          }
        `;

          try {
            await Axios.post(NRCsubgraph, { query: NRCquery }).then(
              (result) => {
                fetchOwned = Object.values(result.data.data)[0];
              }
            );
          } catch (error) {
            console.log(error);
          }

          if (fetchOwned.length > 0) {
            ensList.push({
              id: fetchOwned[0].id,
              ensName: fetchOwned[0].ensName,
            });
          }
        });
        await Promise.all(promises);
        setEnsNames(ensList);
      }
    };

    if (address && contractAddress) {
      fetchEnsName();
    }
  }, [address]);

  useEffect(() => {
    let _has10k = false;
    let _has999 = false;
    ensNames.map((ensName) => {
      console.log(ensName, isClub(ensName.ensName, 3));
      if (!_has10k) {
        setHas10k(isClub(ensName.ensName, 4));
        setId10k(ensName.id);
        _has10k = true;
      }
      if (!_has999) {
        setHas999(isClub(ensName.ensName, 3));
        setId999(ensName.id);
        _has999 = true;
      }
    });
  }, [ensNames]);

  useEffect(() => {
    console.log(has999);
  }, [has999]);

  const value = {
    userColor,
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
    isClaimOpen,
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
    validateClaim,
    updateExpiration,
    mint,
    sweep,
    burnSweep,
    mintSpecial,
    mintLoading,
    multiMintLoading,
    burnLoading,
    claimLoading,
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
    setIsClaimOpen,
    setState,
    setShortState,
    burn,
    claim,
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
    has10k,
    has999,
    id10k,
    id999,
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
