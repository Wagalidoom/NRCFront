import { MyNftContainer, ToolBar } from "./myNft.style";
import { Button } from "@mui/material";
import DotLight from "../../../assets/images/icon/three-dot-light.svg";
import DotDark from "../../../assets/images/icon/three-dot-dark.svg";
import { ThemeContext } from "../../../app/App";
import { useContext, useEffect, useRef, useState } from "react";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import filterDark from "../../../assets/images/icon/filterDark.png";
import filterLight from "../../../assets/images/icon/filterLight.png";
import sweepDark from "../../../assets/images/icon/balaisDark.png";
import sweepLight from "../../../assets/images/icon/balaisLight.png";
import searchDark from "../../../assets/images/icon/loupeDark.png";
import searchLight from "../../../assets/images/icon/loupeLight.png";
import ensvision from "../../../assets/images/icon/ensvision.png";
import arrowDown from "../../../assets/images/icon/arrow-down.png";
import arrowDownLight from "../../../assets/images/icon/arrow-down-light.png";
import {
    NRCsubgraph,
    ENSsubgraph,
    useEthereum,
    contractAddress,
} from "../../../context/ethereumProvider";
import { getNftType, nftTypeToString } from "../../../helper";
import { PriceSelector } from "../priceSelector/PriceSelector";
import Axios from "axios";
import { EnsSelector } from "../ensSelector/EnsSelector";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";
const namehash = require("eth-ens-namehash");

export const MyNft = (props) => {
    const currentTheme = useContext(ThemeContext);
    const [modalOpen, setModalOpen] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState({
        filter: false,
        sweep: false,
    });
    const modalRef = useRef(null);
    const selectRef = useRef(null);
    const [addressLower, setAddressLower] = useState("");
    const [selected, setSelected] = useState("Price Low to High");
    const [open, setOpen] = useState(false);
    const {
        burn,
        unstack,
        unlistNFT,
        buy,
        isPriceSelectorOpen,
        isEnsSelectorOpen,
        setPrice,
        setEns,
        address,
    } = useEthereum();
    const [collection, setCollection] = useState([]);
    const [ensList, setEnsList] = useState([]);
    const [node, setNode] = useState(
        "0x9f5ff776abba477754c5d88fe9f0d82b1345407bfdd30d17c1a5f66c1627203f"
    );
    const { contract } = useContract(contractAddress, NUMBERRUNNERCLUB_ABI);
    const {
        data: tokenIdOfNode,
        isLoading,
        error: tokenIdOfNodeError,
    } = useContractRead(contract, "getTokenIdOfNode", [node]);
    const openModal = (e, current) => {
        setModalOpen((prevModal) => {
            if (prevModal === current) {
                return 0;
            }
            return current;
        });
    };
    const handleClickOutside = (event) => {
        setIsOpen((prevIsOpen) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                return false;
            }
            return prevIsOpen;
        });
        setOpen((prevOpen) => {
            if (
                prevOpen &&
                selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                return false;
            }
            return prevOpen;
        });
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (modalOpen > 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [modalOpen]);

    useEffect(() => {
        setCollection([]);
        setEnsList([]);
        // console.log(address);

        const fetchData = async () => {
            setAddressLower(address.toLowerCase());
            let NRCquery = props.market
                ? `
            {
              nfts(where: {listed: true}) {
                id
                owner
                price
              }
            }
          `
                : `
            {
              nfts(where: {owner: "${address}"}) {
                id
                owner
              }
            }
          `;

            let userOwnedNfts;

            try {
                await Axios.post(NRCsubgraph, { query: NRCquery }).then((result) => {
                    userOwnedNfts = Object.values(result.data.data)[0];
                    console.log(userOwnedNfts);
                });
            } catch (error) {
                console.log(error);
            }

            let fetchCollection = [];

            userOwnedNfts.map((element) => {
                fetchCollection.push({
                    id: Number(element.id),
                    isStacked: false,
                    ensName: "",
                    price: element.price,
                    owner: element.owner,
                });
            });

            if (!props.market) {
                let ENSquery = `
      {
        domains(where: {registrant: "${address.toLowerCase()}"}) {
          name
        }
      }
        `;

                let userOwnedENS;

                try {
                    await Axios.post(ENSsubgraph, { query: ENSquery }).then((result) => {
                        userOwnedENS = Object.values(result.data.data)[0];
                        console.log(userOwnedENS);
                    });
                } catch (error) {
                    console.log(error);
                }

                setEnsList(userOwnedENS);

                const fetchCollectionPromises = userOwnedENS.map(async (element) => {
                    if (!isLoading) {
                        setNode(namehash.hash(element.name));
                        console.log(node);
                    }
                    const tokenId = tokenIdOfNode;
                    console.log(tokenId, isLoading, tokenIdOfNodeError);
                    if (tokenId && tokenId.toNumber() !== 0) {
                        return {
                            id: tokenId.toNumber(),
                            isStacked: true,
                            ensName: element.name,
                            price: 0,
                            owner: element.owner,
                        };
                    }
                    return null;
                });

                const resolvedFetchCollection = await Promise.all(
                    fetchCollectionPromises
                );

                fetchCollection.push(...resolvedFetchCollection.filter(Boolean));
            }

            let sortedCollection = fetchCollection.sort(function (a, b) {
                return a.id - b.id;
            });

            setCollection(sortedCollection);
        };

        fetchData();
    }, [address, isLoading]);

    return (
        <MyNftContainer
            filter={activeButton.filter}
            market={props.market}
            sweep={activeButton.sweep}
            openSelect={open}
        >
            <div className="filter-group">
                <div className="filter-search">
                    {!props.market && (
                        <div className="button-group">
                            <button className="button link-ens">
                                <a target="blank" href="https://ens.vision/">
                                    <img src={ensvision} alt="" />
                                </a>
                            </button>
                            <button
                                className="button filter"
                                onClick={() =>
                                    setActiveButton({
                                        ...activeButton,
                                        filter: activeButton.filter ? false : true,
                                    })
                                }
                            >
                                <img
                                    src={props.theme === "Light Theme" ? filterDark : filterLight}
                                    alt=""
                                />
                            </button>
                        </div>
                    )}
                    <div className="search-contenair">
                        <img
                            src={props.theme === "Dark Theme" ? searchDark : searchLight}
                            alt=""
                        />
                        <input type="text" placeholder="search..." />
                    </div>
                </div>
                {props.market && (
                    <div style={{ marginBottom: "20px" }}>
                        <div className="button-group">
                            <button className="button link-ens">
                                <a target="blank" href="https://ens.vision/">
                                    <img src={ensvision} alt="" />
                                </a>
                            </button>
                            <button
                                className="button filter"
                                onClick={() =>
                                    setActiveButton({
                                        ...activeButton,
                                        filter: activeButton.filter ? false : true,
                                    })
                                }
                            >
                                <img
                                    src={props.theme === "Light Theme" ? filterDark : filterLight}
                                    alt=""
                                />
                            </button>
                            <button
                                className="button sweep"
                                onClick={() =>
                                    setActiveButton({
                                        ...activeButton,
                                        sweep: activeButton.sweep ? false : true,
                                    })
                                }
                            >
                                <img
                                    src={props.theme === "Light Theme" ? sweepDark : sweepLight}
                                    alt=""
                                />
                            </button>
                        </div>
                        <div
                            ref={selectRef}
                            className="filter-select"
                            onClick={() => setOpen(open ? false : true)}
                        >
                            <div className="visible">
                                <span className="filter-selection">{selected}</span>
                                <div className="icon">
                                    <img
                                        style={{ width: "15px" }}
                                        src={
                                            props.theme === "Dark Theme" ? arrowDownLight : arrowDown
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="filter-option">
                                <div
                                    onClick={(e) => {
                                        setSelected(e.target.innerText);
                                        setOpen(false);
                                    }}
                                >
                                    {" "}
                                    Price Low to High
                                </div>
                                <div
                                    onClick={(e) => {
                                        setSelected(e.target.innerText);
                                        setOpen(false);
                                    }}
                                >
                                    Price High to Low
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container-nft">
                {isPriceSelectorOpen ? <PriceSelector /> : null}
                {isEnsSelectorOpen ? <EnsSelector /> : null}
                {collection.length === 0 ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        No NFT to be shown
                    </div>
                ) : null}
                {collection.map((element, index) => (
                    <div className="myNft" key={index}>
                        <img alt="" src={props.img} />
                        {element.isStacked ? (
                            <p style={{ zIndex: 999 }}>{element.ensName}</p>
                        ) : null}
                        <ToolBar
                            market={props.market}
                            open={modalOpen === index + 1 && isOpen ? true : false}
                        >
                            <div>
                                <p>Number Runner #{element.id.toString()}</p>
                                <p>{nftTypeToString(getNftType(element.id.toString()))}</p>
                            </div>
                            <div className="price">
                                <img
                                    alt=""
                                    className="leftText"
                                    src={props.theme === "Dark Theme" ? eth : ethDark}
                                />{" "}
                                <span>{(element.price / 10 ** 18).toString()}</span>
                                {addressLower === element.owner ? (
                                    <Button
                                        className="unlist-action"
                                        onClick={() => unlistNFT(element.id.toString())}
                                    >
                                        UNLIST
                                    </Button>
                                ) : (
                                    <Button
                                        className="buy-action"
                                        onClick={() => buy(element.id.toString(), element.price)}
                                    >
                                        Buy
                                    </Button>
                                )}
                            </div>
                            <button className="modal-button">
                                <img
                                    alt=""
                                    onClick={(e) => openModal(e, index + 1)}
                                    src={
                                        currentTheme.theme.name === "Dark Theme"
                                            ? DotLight
                                            : DotDark
                                    }
                                />
                            </button>
                            {modalOpen === index + 1 && isOpen && (
                                <div ref={modalRef} className="modal-option">
                                    <ul>
                                        {element.isStacked ? (
                                            <li
                                                className="option"
                                                onClick={() => unstack(element.id)}
                                            >
                                                Unstacker
                                            </li>
                                        ) : (
                                            <li
                                                className="option"
                                                onClick={() => setEns(element.id, ensList)}
                                            >
                                                Stacker
                                            </li>
                                        )}
                                        <li className="option" onClick={() => setPrice(element.id)}>
                                            Sell
                                        </li>
                                        <li className="option" onClick={() => burn(element.id)}>
                                            Burn
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </ToolBar>
                    </div>
                ))}
            </div>
        </MyNftContainer>
    );
};
