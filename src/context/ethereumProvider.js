import { createContext, useContext, useState } from "react";
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
    "https://api.studio.thegraph.com/query/48701/nrctestnet/69";

export const ENSsubgraph =
    "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli";

export const contractAddress = "0x53442aAa2007528896893f4D1501a661Ec1cC41F";

const EthereumContext = createContext(null);

export function EthereumProvider({ children }) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isPriceSelectorOpen, setIsPriceSelectorOpen] = useState(false);
    const [isEnsSelectorOpen, setIsEnsSelectorOpen] = useState(false);
    const [selectId, setSelectId] = useState(0);
    const [ensList, setEnsList] = useState("");
    const [isMintOpen, setIsMintOpen] = useState(false);
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

    const { data: kingPrice, error: kingPriceError } = useContractRead(
        contract,
        "getCurrentPrice"
    );

    const { mutateAsync: mintCall, error: mintError } = useContractWrite(
        contract,
        "mint"
    );

    const { mutateAsync: stackCall, error: stackError } = useContractWrite(
        contract,
        "stack"
    );

    const { mutateAsync: unstackCall, error: unstackError } = useContractWrite(
        contract,
        "unstack"
    );

    const { mutateAsync: burnCall, error: burnError } = useContractWrite(
        contract,
        "burn"
    );

    const { mutateAsync: buyCall, error: buyError } = useContractWrite(
        contract,
        "buyNFT"
    );

    const { mutateAsync: listCall, error: listError } = useContractWrite(
        contract,
        "listNFT"
    );

    const { mutateAsync: unlistCall, error: unlistError } = useContractWrite(
        contract,
        "unlistNFT"
    );

    const { mutateAsync: buyKingCall, error: buyKingError } = useContractWrite(
        contract,
        "buyKing"
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
        await stackCall({
            args: [namehash.hash(_ens), ethers.utils.formatBytes32String(_ens), _id],
        });
    };

    const unstack = async (_id) => {
        await unstackCall({ args: [_id] });
    };

    const burn = async (_id) => {
        console.log(_id);
        await burnCall({ args: [_id] });
    };

    const buy = async (_id, price) => {
        await buyCall({
            args: [_id],
            overrides: {
                value: price,
            },
        });
    };

    const listNFT = async (_id, price) => {
        await approveCall({ args: [contractAddress, _id] });
        await listCall({ args: [_id, ethers.utils.parseEther(price.toString())] });
        setSelectId(null);
        setIsPriceSelectorOpen(false);
    };

    const unlistNFT = async (_id) => {
        await unlistCall({ args: [_id] });
    };

    const buyKing = async (_color) => {
        await buyKingCall({
            args: [_color],
            overrides: {
                value: kingPrice,
            },
        });
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

    const getEnsName = async () => {
        const name = await generalProvider.lookupAddress(address);
        return name;
    }

    const getEnsProfilePicture = async (ensName) => {
      const resolver = await generalProvider.getResolver(ensName);
      const imageUrl = await resolver.getText("avatar");
      return imageUrl;
    }

    const value = {
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
        getEnsName,
        getEnsProfilePicture,
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
