import { MyNftContainer, ToolBar } from "./myNft.style";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import DotLight from "../../../assets/images/icon/three-dot-light.svg";
import DotDark from "../../../assets/images/icon/three-dot-dark.svg";
import { ThemeContext } from "../../../app/App";
import { useContext, useEffect, useRef, useState } from "react";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import nftDark from "../../../assets/images/icon/nftDark.png";
import nftLight from "../../../assets/images/icon/nftLight.png";
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
const namehash = require("eth-ens-namehash");

export const MyNft = (props) => {
  const currentTheme = useContext(ThemeContext);
  const [ensDomainsLoading, setEnsDomainsLoading] = useState(true);
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
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    mintPawn,
    validateBurn,
    unstack,
    unlistNFT,
    sweep,
    revealKingHand,
    setPrice,
    setEns,
    setSweep,
    address,
    mintLoading,
    multiMintLoading,
    burnLoading,
    stackLoading,
    unstackLoading,
    listLoading,
    unlistLoading,
  } = useEthereum();
  const [isMarketFetched, setIsMarketFetched] = useState(false);
  const [nftOwned, setNftOwned] = useState([]);
  const [fetchENSIndex, setFetchENSIndex] = useState(0);
  const [nftOnSale, setNftOnSale] = useState([]);
  const [collection, setCollection] = useState([]);
  const [ensList, setEnsList] = useState([]);
  const [node, setNode] = useState(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  const [ensDomains, setEnsDomains] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentEnsName, setCurrentEnsName] = useState(null);
  const [ensNameUsed, setEnsNameUsed] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [finishFetching, setFinishFetching] = useState(false);

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

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchNftOnSale = async () => {
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
      setNftOnSale(collection);
      setIsMarketFetched(true);
      if (props.market) {
        setCollection(collection);
      }
    };

    fetchNftOnSale();
  }, [props.market]);

  useEffect(() => {
    const fetchData = async () => {
      let NRCquery = `
            {
              nfts(where: {owner: "${address}"}) {
                id
                owner
              }
            }
          `;

      let fetchOwned;

      try {
        await Axios.post(NRCsubgraph, { query: NRCquery }).then((result) => {
          fetchOwned = Object.values(result.data.data)[0];
        });
      } catch (error) {
        console.log(error);
      }

      let collection = [];

      fetchOwned.map((element) => {
        let isListed = nftOnSale.some((e) => e.id === Number(element.id));
        collection.push({
          id: Number(element.id),
          isStacked: false,
          isListed: isListed,
          ensName: "",
          price: 0,
          owner: element.owner,
          type: getNftType(element.id),
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
        const domainNames = fetchENS.map((domain) => {
          return { hash: namehash.hash(domain.name), name: domain.name };
        });
        console.log(domainNames);
        const [currentDomain, ...rest] = domainNames;
        setNode(currentDomain.hash);
        setCurrentEnsName(currentDomain.name);
        setEnsDomains(rest);
      }

      setEnsList(fetchENS);
      setCollection(collection);
    };

    if (address && !props.market && isMarketFetched) {
      fetchData();
    }
  }, [mintLoading, multiMintLoading, isMarketFetched, burnLoading, stackLoading, unstackLoading, listLoading, unlistLoading]);

  useEffect(() => {
    if (isLoading === false) {
      console.log(ensList, currentEnsName);
      if (
        ensList.length > 0 &&
        currentEnsName === ensList[ensList.length - 1].name &&
        !finishFetching
      ) {
        if (tokenIdOfNode && Number(tokenIdOfNode) !== 0) {
          const updatedCollection = [
            ...collection,
            {
              id: Number(tokenIdOfNode),
              isStacked: true,
              isListed: false,
              ensName: currentEnsName,
              price: 0,
              owner: address,
              type: getNftType(Number(tokenIdOfNode)),
              color: Number(tokenIdOfNode) % 2 === 0 ? 1 : 2,
            },
          ];
          
          setCollection(updatedCollection);
        }
        console.log("update collection", currentEnsName);
        setFinishFetching(true);
      } else if (ensDomains.length > 0) {
        // console.log("update collection", currentEnsName);
        if (tokenIdOfNode && Number(tokenIdOfNode) !== 0) {
          const updatedCollection = [
            ...collection,
            {
              id: Number(tokenIdOfNode),
              isStacked: true,
              isListed: false,
              ensName: currentEnsName,
              price: 0,
              owner: address,
              type: getNftType(Number(tokenIdOfNode)),
              color: Number(tokenIdOfNode) % 2 === 0 ? 1 : 2,
            },
          ];
          setCollection(updatedCollection);
        }
        const [currentDomain, ...rest] = ensDomains;
        setNode(currentDomain.hash);
        setCurrentEnsName(currentDomain.name);
        setEnsDomains(rest);
      }
    }
  }, [tokenIdOfNode]);

  useEffect(() => {
    // comment faire apparaitre les rois
    const fetchShares = async (collection) => {
      const formattedIds = JSON.stringify(collection.map((e) => e.id));
      const ownedNftsQuery = `
          {
              nfts (where: {id_in: ${formattedIds}})  {
                id
                share
                unclaimedRewards
                owner
              }
          }
          `;

      const lastGlobalSharesQuery = `
          {
              globalSharesUpdateds (first: 1, orderBy: blockNumber, orderDirection: desc) {
                id
                shares
                blockNumber
              }
          }
          `;

      try {
        const responseNFT = await Axios.post(NRCsubgraph, {
          query: ownedNftsQuery,
        });
        const responseGlobalShares = await Axios.post(NRCsubgraph, {
          query: lastGlobalSharesQuery,
        });

        if (
          !responseNFT.data?.data?.nfts ||
          !responseGlobalShares.data?.data?.globalSharesUpdateds
        ) {
          console.log(responseNFT);
          console.log(ownedNftsQuery);
          throw new Error("Invalid API response");
        }

        const nfts = responseNFT.data.data.nfts;
        const nftsById = Object.fromEntries(nfts.map((nft) => [nft.id, nft]));

        const lastGlobalShares =
          responseGlobalShares.data.data.globalSharesUpdateds[0].shares;

        const collectionShares = collection.map((element) => {
          const nft = nftsById[element.id];
          if (!nft) return element;

          const nftType = getNftType(Number(nft.id));
          const unclaimedRewards = nft.unclaimedRewards
            ? new BigNumber(nft.unclaimedRewards)
            : new BigNumber(0);
          const nftShare = nft.share
            ? new BigNumber(nft.share)
            : new BigNumber(0);
          const newShare =
            nftShare.toNumber() > 0
              ? new BigNumber(lastGlobalShares[nftType]).minus(nftShare)
              : new BigNumber(0);

          return {
            ...element,
            share: newShare.toNumber(),
            type: nftType,
            rewards: newShare.plus(unclaimedRewards).toNumber() / 10 ** 18,
          };
        });

        setCollection(collectionShares);
      } catch (error) {
        console.error(error);
      }
    };

    if (finishFetching) {
      fetchShares(collection);
    }
  }, [finishFetching]);

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
              {/* <button className="button link-ens">
                <a target="blank" href="https://ens.vision/">
                  <img src={ensvision} alt="" />
                </a>
              </button> */}
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
              {/* <button className="button link-ens">
                <a target="blank" href="https://ens.vision/">
                  <img src={ensvision} alt="" />
                </a>
              </button> */}
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
                  {selected ? "Price High to Low" : "Price Low to High"}
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
                      setFilter({ ...filter, pawn: filter.pawn ? false : true })
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
                      setFilter({ ...filter, rook: filter.rook ? false : true })
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
                      setFilter({ ...filter, king: filter.king ? false : true })
                    }
                  />
                }
                label="King"
              />
            </div>
          </FormGroup>
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
          .map((element, index) => (
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
                <p
                  style={{
                    position: "absolute",
                    bottom: "110px",
                    left: "10px",
                    fontSize: "1.2em",
                  }}
                >
                  {element.ensName}
                </p>
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
                            onClick={() => unlistNFT(element.id.toString())}
                          >
                            Unlist
                          </Button>
                        ) : (
                          <Button
                            className="buy-action"
                            onClick={() =>
                              sweep([element.id.toString()], element.price)
                            }
                          >
                            Buy
                          </Button>
                        )
                      ) : (
                        <Button
                          className="buy-action"
                          onClick={() =>
                            sweep([element.id.toString()], element.price)
                          }
                        >
                          Buy
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
                    <div>
                      <img
                        alt=""
                        style={{ height: "18px", marginBottom: "2px" }}
                        src={props.theme === "Dark Theme" ? eth : ethDark}
                      />{" "}
                      <span style={{ marginLeft: "4px" }}>
                        {(element.price / 10 ** 18).toString()}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <img
                        style={{ height: "14px", marginBottom: "2px" }}
                        src={
                          props.theme === "Dark Theme" ? tirelire : tirelireDark
                        }
                      ></img>
                      <span style={{ marginLeft: "4px" }}>
                        {element.rewards}
                      </span>
                    </div>
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
          ))}
      </div>
    </MyNftContainer>
  );
};
