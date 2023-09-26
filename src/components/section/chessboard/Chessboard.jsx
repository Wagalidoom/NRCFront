import { ChessboardContainer, ToolBar } from "./Chessboard.style";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import DotLight from "../../../assets/images/icon/three-dot-light.svg";
import DotDark from "../../../assets/images/icon/three-dot-dark.svg";
import { ThemeContext } from "../../../app/App";
import { useContext, useEffect, useRef, useState } from "react";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import filterDark from "../../../assets/images/icon/filterDark.png";
import filterLight from "../../../assets/images/icon/filterLight.png";
import searchDark from "../../../assets/images/icon/loupeDark.png";
import searchLight from "../../../assets/images/icon/loupeLight.png";

import {
  NRCsubgraph,
  useEthereum,
  contractAddress,
} from "../../../context/ethereumProvider";
import { getNftType, nftTypeToString } from "../../../helper";
import Axios from "axios";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";
const namehash = require("eth-ens-namehash");

export const Chessboard = (props) => {
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
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    validateBurn,
    unstack,
    unlistNFT,
    sweep,
    revealKingHand,
    setPrice,
    setEns,
    address,
  } = useEthereum();
  const [collection, setCollection] = useState([]);
  const [ensList, setEnsList] = useState([]);
  const [node, setNode] = useState(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  const [ensDomains, setEnsDomains] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    const fetchChessboard = async () => {
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

    fetchChessboard();
  }, [props.market]);

  return (
    <ChessboardContainer
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
        {collection.length === 0 ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            No NFT to be shown
          </div>
        ) : null}
        {collection
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
                          onClick={() => {
                            const ensNameUsed = collection.map(element => {
                              if(element.isStacked === true) {
                                return element.ensName;
                              }
                            }).filter(element => element !== undefined);
                            const ensName = ensList.map(element => element.name);
                            setEns(element.id, ensName.filter(element => !ensNameUsed.includes(element)));
                          }}
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
    </ChessboardContainer>
  );
};
