import { ChessboardContainer, ToolBar } from "./Chessboard.style";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import filterDark from "../../../assets/images/icon/filterDark.png";
import filterLight from "../../../assets/images/icon/filterLight.png";
import sweepRed from "../../../assets/images/icon/balaisRed.png";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import searchDark from "../../../assets/images/icon/loupeDark.png";
import searchLight from "../../../assets/images/icon/loupeLight.png";
import burn1 from "../../../assets/images/icon/burn1.png";
import burn2 from "../../../assets/images/icon/burn2.png";
import burn3 from "../../../assets/images/icon/burn3.png";

import {
  NRCsubgraph,
  useEthereum,
  contractAddress,
} from "../../../context/ethereumProvider";
import { getNftType, nftTypeToString } from "../../../helper";
import Axios from "axios";

export const Chessboard = (props) => {
  const [activeButton, setActiveButton] = useState({
    filter: false,
    sweep: false,
  });
  const [filter, setFilter] = useState({
    unstack: true,
    list: true,
    stack: true,
    pawn: true,
    bishop: true,
    knight: true,
    rook: true,
    queen: true,
    king: true,
  });

  const [open, setOpen] = useState(false);
  const { validateKill, userColor, setBurnSweep } = useEthereum();
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

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

  const today = new Date();

  useEffect(() => {
    const fetchChessboard = async () => {
      let NRCquery = `
              {
                nfts {
                  id
                  owner
                  listed
                  unclaimedRewards
                  share
                  price
                  ensName
                  lastTimeStacked
                }
              }
            `;

      let fetchChessboard;

      try {
        await Axios.post(NRCsubgraph, { query: NRCquery }).then((result) => {
          fetchChessboard = Object.values(result.data.data)[0];
        });
      } catch (error) {
        console.log(error);
      }

      fetchChessboard = fetchChessboard.slice(2);
      console.log(userColor);
      if (userColor === 1) {
        fetchChessboard = fetchChessboard.filter(
          (element) => element.id % 2 == 1
        );
      } else if (userColor === 2) {
        fetchChessboard = fetchChessboard.filter(
          (element) => element.id % 2 == 0
        );
        console.log(fetchChessboard);
      }
      fetchChessboard = fetchChessboard.filter(
        (element) =>
          element.owner !== "0x0000000000000000000000000000000000000000"
      );

      let collection = [];
      fetchChessboard.map((element) => {
        let ensName = element.ensName ? element.ensName : "";
        if (
          Math.round(
            (today.getTime() -
              new Date(element.lastTimeStacked * 1000).getTime()) /
              (1000 * 3600 * 24)
          ) >= 0 &&
          (ensName === "" || ensName.length === 5)
        ) {
          collection.push({
            id: Number(element.id),
            isStacked: element.ensName ? true : false,
            isListed: element.listed,
            ensName: element.ensName ? element.ensName : "",
            price: element.listed
              ? 0.02 + element.unclaimedRewards
              : element.ensName
              ? 0.03 + element.unclaimedRewards + element.share
              : 0.01 + element.unclaimedRewards,
            owner: element.owner,
            type: getNftType(element.id),
            color: element.id % 2 === 0 ? 1 : 2,
          });
        }
      });
      console.log(collection);
      setCollection(collection);
    };

    if (userColor !== 0) {
      fetchChessboard();
    }
  }, []);

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

              <button
                className="button sweep"
                onClick={() => {
                  setActiveButton({
                    ...activeButton,
                    sweep: activeButton.sweep ? false : true,
                  });
                  setBurnSweep(
                    collection.sort((a, b) => {
                      return a.price - b.price;
                    })
                  );
                }}
              >
                <img src={sweepRed} alt="" />
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
                  State :
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.unstack}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          unstack: filter.unstack ? false : true,
                        })
                      }
                      style={{
                        color: "#f4d249",
                      }}
                    />
                  }
                  label="Unstack"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.list}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          list: filter.list ? false : true,
                        })
                      }
                      style={{
                        color: "#f0870c",
                      }}
                    />
                  }
                  label="List"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.stack}
                      onChange={() =>
                        setFilter({
                          ...filter,
                          stack: filter.stack ? false : true,
                        })
                      }
                      style={{
                        color: "#f52425",
                      }}
                    />
                  }
                  label="Stacked"
                />
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
            return a.price - b.price;
          })
          .filter((element) => {
            if (filter === null) {
              return true;
            }

            // Check color
            let stateMatches =
              (filter.unstack && element.isListed === false) ||
              (filter.list && element.isListed === true) ||
              (filter.stack && element.isStacked === true);

            // Check type
            let typeMatches =
              (filter.pawn && element.type === 5) ||
              (filter.bishop && element.type === 4) ||
              (filter.knight && element.type === 3) ||
              (filter.rook && element.type === 2) ||
              (filter.queen && element.type === 1) ||
              (filter.king && element.type === 0);

            return typeMatches && stateMatches;
          })
          .map((element, index) => (
            <div className="myNft" key={index}>
              <img
                alt=""
                src={`https://ipfs.io/ipfs/QmR26tKkJqMjq1jQDZzvkKjWAiWVuYWvbzRexXAqSkgP1n/${element.id.toString()}.png`}
              />
              <ToolBar market={props.market}>
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
                  <div>
                    <Button
                      className="buy-action"
                      onClick={() =>
                        validateKill([element.id.toString()], element.price)
                      }
                    >
                      Burn
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2px 0",
                    boxShadow: "rgba(0, 0, 0, 0.54) 0px 3px 8px",
                  }}
                >
                  <img
                    src={
                      element.isListed
                        ? burn2
                        : element.isStacked
                        ? burn3
                        : burn1
                    }
                    style={{ width: "18px" }}
                  />
                  <p
                    style={{
                      fontWeight: "bold",
                      marginLeft: "4px",
                      color: element.isListed
                        ? "#f0870c"
                        : element.isStacked
                        ? "#f52425"
                        : "#f4d249",
                    }}
                  >
                    {Number(element.price).toFixed(2)}
                  </p>
                </div>
              </ToolBar>
            </div>
          ))}
      </div>
    </ChessboardContainer>
  );
};
