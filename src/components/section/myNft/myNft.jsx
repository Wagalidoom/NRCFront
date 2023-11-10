import { MyNftContainer, ToolBar } from "./myNft.style";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import DotLight from "../../../assets/images/icon/three-dot-light.svg";
import validate from "../../../assets/images/ValideWhite.png";
import DotDark from "../../../assets/images/icon/three-dot-dark.svg";
import { ThemeContext } from "../../../app/App";
import { useContext, useEffect, useRef, useState } from "react";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import filterDark from "../../../assets/images/icon/filterDark.png";
import filterLight from "../../../assets/images/icon/filterLight.png";
import sweepDark from "../../../assets/images/icon/balaisDark.png";
import sweepLight from "../../../assets/images/icon/balaisLight.png";
import searchDark from "../../../assets/images/icon/loupeDark.png";
import searchLight from "../../../assets/images/icon/loupeLight.png";
import ensvision from "../../../assets/images/icon/ensvision.png";
import arrowDown from "../../../assets/images/icon/arrow-down.png";
import arrowDownLight from "../../../assets/images/icon/arrow-down-light.png";
import tirelire from "../../../assets/images/icon/tirelire.png";
import tirelireDark from "../../../assets/images/icon/tirelireDark.png";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ReactLoading from "react-loading";
import BigNumber from "bignumber.js";

import {
  NRCsubgraph,
  ENSsubgraph,
  useEthereum,
  contractAddress,
} from "../../../context/ethereumProvider";
import { getNftType, nftTypeToString } from "../../../helper";
import Axios from "axios";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";
import { ethers } from "ethers";
const namehash = require("eth-ens-namehash");

export const MyNft = (props) => {
  const currentTheme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState({
    filter: false,
    sweep: false,
  });
  const [filter, setFilter] = useState({
    black: true,
    white: true,
    pawn: true,
    bishop: true,
    knight: true,
    rook: true,
    queen: true,
    king: true,
  });

  const modalRef = useRef(null);
  const selectRef = useRef(null);
  const [selected, setSelected] = useState(true);
  const [open, setOpen] = useState(false);
  const {
    validateBurn,
    unstack,
    unlistNFT,
    sweep,
    revealKingHand,
    setPrice,
    setEns,
    setSweep,
    updateExpiration,
    address,
    mintLoading,
    multiMintLoading,
    burnLoading,
    multiBuyLoading,
    stackLoading,
    unstackLoading,
    listLoading,
    unlistLoading,
  } = useEthereum();
  const [currentNFTId, setCurrentNFTId] = useState(null);
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [loadingNFTId, setLoadingNFTId] = useState(null);
  const [loadingFinishedNFTId, setLoadingFinishedNFTId] = useState(null);
  const [ensList, setEnsList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    if ((unlistLoading || multiBuyLoading) && currentNFTId) {
      console.log(currentNFTId);
      setLoadingNFTId(currentNFTId);
      setLoadingFinishedNFTId(null);
    } else if (loadingNFTId === currentNFTId) {
      setLoadingNFTId(null);
      setLoadingFinishedNFTId(currentNFTId);
      setTimeout(() => {
        if (loadingFinishedNFTId === currentNFTId) {
          setLoadingFinishedNFTId(null);
        }
      }, 3000);
    }
    console.log("LOADING FINISHED", loadingNFTId, loadingFinishedNFTId);
  }, [unlistLoading, multiBuyLoading, currentNFTId, loadingNFTId]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchDataMarket = async () => {
      let NRCquery = `
              {
                nfts(where: {listed: true}) {
                  id
                  owner
                  price
                }
              }
            `;

      let fetchSale;

      try {
        await Axios.post(NRCsubgraph, { query: NRCquery }).then((result) => {
          fetchSale = Object.values(result.data.data)[0];
        });
      } catch (error) {
        console.log(error);
      }

      let collection = [];
      fetchSale.map((element) => {
        collection.push({
          id: Number(element.id),
          isStacked: false,
          isListed: true,
          ensName: "",
          price: element.price,
          owner: element.owner,
          type: getNftType(element.id),
          color: element.id % 2 === 0 ? 1 : 2,
        });
      });
      if (props.market) {
        setCollection(collection);
      }
    };

    const fetchData = async () => {
      let NRCquery = `
            {
              nfts(where: {owner: "${address}"}) {
                id
                owner
                share
                unclaimedRewards
                listed
              }
            }
          `;

      let lastGlobalSharesQuery = `
          {
              globalSharesUpdateds (first: 1, orderBy: blockNumber, orderDirection: desc) {
                id
                shares
                blockNumber
              }
          }
          `;

      let fetchOwned;
      let responseGlobalShares;

      try {
        await Axios.post(NRCsubgraph, { query: NRCquery }).then((result) => {
          fetchOwned = Object.values(result.data.data)[0];
        });

        await Axios.post(NRCsubgraph, { query: lastGlobalSharesQuery }).then(
          (result) => {
            responseGlobalShares = Object.values(result.data.data)[0];
          }
        );
      } catch (error) {
        console.log(error);
      }

      const lastGlobalShares = responseGlobalShares[0].shares;

      let collection = [];

      fetchOwned.map((element) => {
        const nftType = getNftType(Number(element.id));
        const unclaimedRewards = element.unclaimedRewards
          ? new BigNumber(element.unclaimedRewards)
          : new BigNumber(0);
        const nftShare = element.share
          ? new BigNumber(element.share)
          : new BigNumber(0);
        const newShare =
          nftShare.toNumber() > 0
            ? new BigNumber(lastGlobalShares[nftType]).minus(nftShare)
            : new BigNumber(0);

        collection.push({
          id: Number(element.id),
          isStacked: false,
          isListed: element.listed,
          ensName: "",
          price: 0,
          share: newShare.toNumber(),
          rewards: newShare.plus(unclaimedRewards).toNumber() / 10 ** 18,
          owner: element.owner,
          type: nftType,
          color: element.id % 2 === 0 ? 1 : 2,
        });
      });

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
        const promises = fetchENS.map(async (domain) => {
          NRCquery = `
          {
            nfts(where: {ensName: "${domain.name.replace(".eth", "")}"}) {
              id
              owner
              ensName
              expiration
              share
              unclaimedRewards
              listed
            }
          }
        `;

          try {
            await Axios.post(NRCsubgraph, { query: NRCquery }).then(
              (result) => {
                fetchOwned = Object.values(result.data.data)[0];
              }
            );

            console.log(fetchOwned);
          } catch (error) {
            console.log(error);
          }

          if (fetchOwned.length > 0) {

            const nftType = getNftType(Number(fetchOwned[0].id));
            const unclaimedRewards = fetchOwned[0].unclaimedRewards
              ? new BigNumber(fetchOwned[0].unclaimedRewards)
              : new BigNumber(0);
            const nftShare = fetchOwned[0].share
              ? new BigNumber(fetchOwned[0].share)
              : new BigNumber(0);
            const newShare =
              nftShare.toNumber() > 0
                ? new BigNumber(lastGlobalShares[nftType]).minus(nftShare)
                : new BigNumber(0);

            collection.push({
              id: Number(fetchOwned[0].id),
              isStacked: true,
              isListed: false,
              ensName: domain.name,
              expiration: fetchOwned[0].expiration,
              price: 0,
              share: newShare.toNumber(),
              rewards:
                (newShare.plus(unclaimedRewards).toNumber() * 10000) / 10 ** 18,
              owner: fetchOwned[0].owner,
              type: nftType,
              color: fetchOwned[0].id % 2 === 0 ? 1 : 2,
            });
          }
        });
        await Promise.all(promises);
      }

      setEnsList(fetchENS);
      setCollection(collection);
    };

    if (address && !props.market) {
      fetchData();
    }

    if (props.market) {
      fetchDataMarket();
    }
  }, [
    mintLoading,
    multiMintLoading,
    burnLoading,
    stackLoading,
    unstackLoading,
    listLoading,
    unlistLoading,
  ]);

  useEffect(() => {
    if (searchValue) {
      const filtered = collection.filter((nft) =>
        String(nft.id).includes(searchValue)
      );
      setFilteredCollection(filtered);
    } else {
      setFilteredCollection(collection);
    }
  }, [searchValue, collection]);

  return (
    <MyNftContainer
      isFilterApplied={activeButton.filter}
      market={props.market}
      sweep={activeButton.sweep}
      openSelect={open}
    >
      <div className="filter-group">
        <div className="filter-search">
          {!props.market && (
            <div className="button-group">
              <button
                className="button filter"
                onClick={() => {
                  setActiveButton({
                    ...activeButton,
                    filter: activeButton.filter ? false : true,
                  });
                }}
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
            <input
              type="text"
              placeholder="search..."
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {props.market && (
          <div style={{ marginBottom: "20px" }}>
            <div className="button-group">
              <button
                className="button filter"
                onClick={() => {
                  setActiveButton({
                    ...activeButton,
                    filter: activeButton.filter ? false : true,
                  });
                }}
              >
                <img
                  src={props.theme === "Light Theme" ? filterDark : filterLight}
                  alt=""
                />
              </button>

              <button
                className="button sweep"
                onClick={() => {
                  const filteredCollection = collection.filter((item) =>
                    address ? address.toLowerCase() !== item.owner : true
                  );

                  setActiveButton({
                    ...activeButton,
                    sweep: activeButton.sweep ? false : true,
                  });
                  setSweep(
                    filteredCollection.sort((a, b) => {
                      return a.price - b.price;
                    })
                  );
                }}
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
                <span className="filter-selection">
                  {selected ? "Price Low to High" : "Price High to Low"}
                </span>
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
                    setSelected(true);
                    setOpen(false);
                  }}
                >
                  {" "}
                  Price Low to High
                </div>
                <div
                  onClick={(e) => {
                    setSelected(false);
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
      {activeButton.filter && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              setActiveButton({
                ...activeButton,
                filter: activeButton.filter ? false : true,
              });
            }}
            style={{ padding: 0 }}
          >
            <KeyboardArrowUpRoundedIcon
              style={{
                color: props.theme === "Dark Theme" ? "white" : "black",
              }}
            />
          </IconButton>
          <div className="filter-menu">
            <FormGroup style={{ width: "100%" }}>
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "16% 28% 28% 28%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Color :
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.black}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          black: filter.black ? false : true,
                        })
                      }
                    />
                  }
                  label="Black"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.white}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          white: filter.white ? false : true,
                        })
                      }
                    />
                  }
                  label="White"
                />
                <div></div>
              </div>
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "16% 28% 28% 28%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Type :
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.pawn}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          pawn: filter.pawn ? false : true,
                        })
                      }
                    />
                  }
                  label="Pawn"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.bishop}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          bishop: filter.bishop ? false : true,
                        })
                      }
                    />
                  }
                  label="Bishop"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.knight}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          knight: filter.knight ? false : true,
                        })
                      }
                    />
                  }
                  label="Knight"
                />
              </div>
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "16% 28% 28% 28%",
                }}
              >
                <div></div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.rook}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          rook: filter.rook ? false : true,
                        })
                      }
                    />
                  }
                  label="Rook"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.queen}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          queen: filter.queen ? false : true,
                        })
                      }
                    />
                  }
                  label="Queen"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.king}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          king: filter.king ? false : true,
                        })
                      }
                    />
                  }
                  label="King"
                />
              </div>
            </FormGroup>
          </div>
        </div>
      )}
      <div
        className="container-nft"
        style={{ padding: props.market ? "0px 10px" : "" }}
      >
        {filteredCollection.length === 0 ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            No NFT to be shown
          </div>
        ) : null}
        {filteredCollection
          .slice()
          .sort((a, b) => {
            if (selected === null) {
              return 0;
            }

            if (a.isStacked && !b.isStacked) return -1;
            if (!a.isStacked && b.isStacked) return 1;

            if (!a.price || !b.price) {
              return 0;
            }

            if (selected) {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          })
          .filter((element) => {
            if (filter === null) {
              return true;
            }

            // Check color
            let colorMatches =
              (filter.black && element.color === 1) ||
              (filter.white && element.color === 2);

            // Check type
            let typeMatches =
              (filter.pawn && element.type === 5) ||
              (filter.bishop && element.type === 4) ||
              (filter.knight && element.type === 3) ||
              (filter.rook && element.type === 2) ||
              (filter.queen && element.type === 1) ||
              (filter.king && element.type === 0);

            return colorMatches && typeMatches;
          })
          .map((element, index) => {
            const isLoading = loadingNFTId === element.id;
            const hasFinishedLoading = loadingFinishedNFTId === element.id;
            return (
              <div
                className="myNft"
                key={index}
                style={{
                  border: props.market
                    ? "none"
                    : element.isListed
                    ? "3px solid rgb(204, 80, 55)"
                    : element.isStacked
                    ? "3px solid rgb(29, 155, 240)"
                    : "none",
                  backgroundColor: props.market
                    ? "none"
                    : element.isListed
                    ? "rgb(204, 80, 55)"
                    : element.isStacked
                    ? "rgb(29, 155, 240)"
                    : "none",
                }}
              >
                <img
                  alt=""
                  src={`https://ipfs.io/ipfs/QmSFBCFdM6wrd7ZDoojNC8wUVxpXRYXvxTAqpiHPWudz1F/${element.id.toString()}.png`}
                />

                {element.isStacked ? (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        borderBottom: "3px solid rgb(36 135 201)",
                        backgroundColor: "rgb(29, 155, 240)",
                        borderBottomRightRadius: "8px",
                        padding: "5px 22px",
                        cursor: "pointer"
                      }}

                      onClick={() => {
                        updateExpiration(element.id.toString());
                      }}
                    >
                      <AccessAlarmIcon style={{ marginRight: "10px" }} />
                      {Math.round((new Date(element.expiration * 1000) - Date.now()) / (1000 * 60 * 60 * 24))} D
                    </div>
                    <p className="ensName">{element.ensName}</p>
                  </>
                ) : null}
                <ToolBar
                  market={props.market}
                  open={modalOpen === index + 1 && isOpen ? true : false}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    }}
                  >
                    Number Runner #{element.id.toString()}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "2px",
                      paddingBottom: "5px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {nftTypeToString(element.type)}
                    </p>
                    {props.market ? (
                      <div>
                        {address ? (
                          address.toLowerCase() === element.owner ? (
                            <Button
                              className="unlist-action"
                              onClick={() => {
                                setCurrentNFTId(element.id);
                                unlistNFT(element.id.toString());
                              }}
                            >
                              {isLoading ? (
                                <ReactLoading
                                  className="spin"
                                  type={"spin"}
                                  color={"rgba(255, 255, 255, 0.8)"}
                                  height={18}
                                  width={18}
                                />
                              ) : hasFinishedLoading ? (
                                <img style={{ width: "18px" }} src={validate} />
                              ) : (
                                <p>Unlist</p>
                              )}
                            </Button>
                          ) : (
                            <Button
                              className="buy-action"
                              onClick={() => {
                                setCurrentNFTId(element.id);
                                sweep([element.id.toString()], element.price);
                              }}
                            >
                              {isLoading ? (
                                <ReactLoading
                                  className="spin"
                                  type={"spin"}
                                  color={"rgba(255, 255, 255, 0.8)"}
                                  height={18}
                                  width={18}
                                />
                              ) : hasFinishedLoading ? (
                                <img style={{ width: "18px" }} src={validate} />
                              ) : (
                                <p>Buy</p>
                              )}
                            </Button>
                          )
                        ) : (
                          <Button
                            className="buy-action"
                            onClick={() => {
                              setCurrentNFTId(element.id);
                              sweep([element.id.toString()], element.price);
                            }}
                          >
                            {isLoading ? (
                              <ReactLoading
                                className="spin"
                                type={"spin"}
                                color={"rgba(255, 255, 255, 0.8)"}
                                height={18}
                                width={18}
                              />
                            ) : hasFinishedLoading ? (
                              <img style={{ width: "18px" }} src={validate} />
                            ) : (
                              <p>Buy</p>
                            )}
                          </Button>
                        )}
                      </div>
                    ) : (
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
                    )}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "3px 0",
                      boxShadow: "rgba(0, 0, 0, 0.54) 0px 3px 8px",
                    }}
                  >
                    {props.market ? (
                      <>
                        <img
                          alt=""
                          style={{ height: "18px", marginBottom: "2px" }}
                          src={props.theme === "Dark Theme" ? eth : ethDark}
                        />
                        <p
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {(element.price / 10 ** 18).toString()}
                        </p>
                      </>
                    ) : (
                      <>
                        <img
                          style={{ height: "14px", marginBottom: "2px" }}
                          src={
                            props.theme === "Dark Theme"
                              ? tirelire
                              : tirelireDark
                          }
                        ></img>
                        <span style={{ marginLeft: "4px" }}>
                          {element.rewards === 0
                            ? element.rewards
                            : element.rewards.toFixed(5)}
                        </span>
                      </>
                    )}
                  </div>
                  {modalOpen === index + 1 && isOpen && (
                    <div ref={modalRef} className="modal-option">
                      <ul>
                        {element.isStacked ? (
                          <li
                            className="option"
                            onClick={() => unstack(element.id)}
                          >
                            Unstack
                          </li>
                        ) : (
                          <li
                            className="option"
                            onClick={() => {
                              const ensNameUsed = collection
                                .map((element) => {
                                  if (element.isStacked === true) {
                                    return element.ensName;
                                  }
                                })
                                .filter((element) => element !== undefined);
                              const ensName = ensList.map(
                                (element) => element.name
                              );
                              setEns(
                                element.id,
                                ensName.filter(
                                  (element) => !ensNameUsed.includes(element)
                                )
                              );
                            }}
                          >
                            Stack
                          </li>
                        )}
                        {element.isStacked ? null : (
                          <>
                            {element.isListed ? (
                              <li
                                className="option"
                                onClick={() => unlistNFT(element.id.toString())}
                              >
                                Unlist
                              </li>
                            ) : (
                              <li
                                className="option"
                                onClick={() => setPrice(element.id)}
                              >
                                Sell
                              </li>
                            )}
                            <li
                              className="option"
                              onClick={() => validateBurn(element.id)}
                            >
                              Burn
                            </li>
                            {element.type === 5 && (
                              <li
                                className="option"
                                onClick={() => revealKingHand(element.id)}
                              >
                                Reveal
                              </li>
                            )}
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </ToolBar>
              </div>
            );
          })}
      </div>
    </MyNftContainer>
  );
};
