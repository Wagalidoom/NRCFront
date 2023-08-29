import { KingAuctionContainer } from "./kingAuction.style";
import { Countdown } from "../../countdown/countdown";
import whiteKing from "../../../assets/images/1.png";
import blackKing from "../../../assets/images/2.png";
import tirelire from "../../../assets/images/icon/tirelire.png";
import tirelireDark from "../../../assets/images/icon/tirelireDark.png";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BigNumber, ethers } from "ethers";
import {
  contractAddress,
  ETHEREUM_RPC_URL,
  NRCsubgraph,
  useEthereum,
} from "../../../context/ethereumProvider";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";

const MAX_AUCTION_PRICE = 20000;
const MIN_AUCTION_PRICE = 2;

export const KingAuction = (props) => {
  const [calculatedDate, setCalculatedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [price, setPrice] = useState(0);
  const { buyKing } = useEthereum();
  const [whiteKingReward, setWhiteKingReward] = useState(0);
  const [blackKingReward, setBlackKingReward] = useState(0);

  const [value, setValue] = useState(10);

  const calculateDate = (priceInEth) => {
    if (startTime) {
      priceInEth = Number(priceInEth);
      const estimatedDays =
        -3 * (Math.log(priceInEth / 10000) / Math.log(2) - 1);
      console.log(estimatedDays);
      const date = new Date(
        startTime.getTime() + estimatedDays * 60 * 60 * 24 * 1000
      );
      return date;
    } else {
      return null;
    }
  };

  useEffect(() => {
    setCalculatedDate(calculateDate(value));
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const fetchPrice = async () => {
      const provider = new ethers.providers.JsonRpcProvider(ETHEREUM_RPC_URL);
      const transaction = await provider.getTransaction(
        "0xcfd68ac4d9700f5dee5d1af79b8c3b4c3ed198ce845490de71277fe0546b12ca"
      );
      const block = await provider.getBlock(transaction.blockNumber);
      setStartTime(new Date(block.timestamp * 1000));
      setEndTime(new Date(block.timestamp * 1000 + 30 * 24 * 60 * 60 * 1000));
      console.log("ts: ", block.timestamp);
      const contractInstance = new ethers.Contract(
        contractAddress,
        NUMBERRUNNERCLUB_ABI,
        provider
      );
      const priceToPayBigNumber = ethers.BigNumber.from(
        await contractInstance.getCurrentPrice()
      );

      const priceToPay = priceToPayBigNumber.toString();

      setPrice(priceToPay);
    };

    const interval = setInterval(() => {
      fetchPrice();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [contractAddress]);

  useEffect(() => {
    const fetchKingRewards = async () => {
      const GET_LAST_GLOBAL_SHARES = `
            {
                globalSharesUpdateds (first: 1, orderBy: blockNumber, orderDirection: desc) {
                    id
                    shares
                    blockNumber
                }
            }
            `;

      try {
        const response = await Axios.post(NRCsubgraph, {
          query: GET_LAST_GLOBAL_SHARES,
        });
        const lastGlobalShares =
          response.data.data.globalSharesUpdateds[0].shares;
        // Assuming kings share the same rewards
        const kingRewards =
          BigNumber.from(lastGlobalShares[0]).toNumber() / 10 ** 18;

        setWhiteKingReward(kingRewards);
        setBlackKingReward(kingRewards);
      } catch (error) {
        console.error(error);
      }
    };

    // Call function to get rewards
    fetchKingRewards();
  }, []);

  const checkboxChange = (e) => {
    // False is white
    console.log(checkboxValue ? 1 : 2);
    setCheckboxValue(checkboxValue ? false : true);
  };
  return (
    <KingAuctionContainer checkbox={checkboxValue}>
      <div className="countdown-container">
        <Countdown endTime={endTime} />
      </div>
      <div className="container-nft">
        <div className="myNft">
          <img alt="" src={whiteKing} />
          <div className="toolBar">
            <p
              className="nft-title"
              style={{
                fontWeight: "700",
                fontSize: "14px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Number Runner #0
            </p>

            <p
              style={{
                fontSize: "12px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              King
            </p>
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
              <img
                style={{ height: "14px", marginRight: "3px" }}
                alt=""
                src={props.theme === "Dark Theme" ? tirelire : tirelireDark}
              />{" "}
              <span>{blackKingReward.toFixed(6)}</span>
            </div>
          </div>
        </div>
        <div className="myNft">
          <img alt="" src={blackKing} />

          <div className="toolBar">
            <p
              className="nft-title"
              style={{
                fontWeight: "700",
                fontSize: "14px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Number Runner #1
            </p>
            <p
              style={{
                fontSize: "12px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              King
            </p>
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
              <img
                style={{ height: "14px", marginRight: "3px" }}
                alt=""
                src={props.theme === "Dark Theme" ? tirelire : tirelireDark}
              />{" "}
              <span>{whiteKingReward.toFixed(6)}</span>
            </div>
          </div>
        </div>

        <div className="king-actions">
          <div className="king-price">
            <img
              alt=""
              className="leftText"
              src={props.theme === "Dark Theme" ? eth : ethDark}
            />{" "}
            <span>{price ? parseFloat(price).toFixed(2) : 0}</span>
          </div>
          <div className="king-selector">
            <div
              className="king-option"
              style={
                !checkboxValue
                  ? {
                      borderLeftColor: "#1D9BF0",
                      borderBottomColor: "#1D9BF0",
                      borderTopColor: "#1D9BF0",
                    }
                  : null
              }
            >
              White King
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="input-switch"
                onChange={(e) => checkboxChange(e)}
              />
              <span className="slider"></span>
            </label>
            <div
              className="king-option"
              style={
                checkboxValue
                  ? {
                      borderRightColor: "#1D9BF0",
                      borderBottomColor: "#1D9BF0",
                      borderTopColor: "#1D9BF0",
                    }
                  : null
              }
            >
              Black King
            </div>
          </div>
        </div>
        <div className="actions">
          <button
            className="action-btn"
            onClick={() => buyKing(checkboxValue ? 1 : 2)}
          >
            Buy Now
          </button>
        </div>
        <div className="data">
        {calculatedDate ? calculatedDate.toLocaleString() : "Loading..."}
            <br />
            Local time
        </div>
        <div style={{ width: "100%", display: "flex", marginTop: "16px" }}>
          <div className="payment">
            <input
              type="text"
              style={{
                textAlign: "center",
                height: "100%",
                fontSize: "23px",
                border: "none",
              }}
              value={value}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <div
          className="title"
          style={{ marginBottom: "15px", marginTop: "32px" }}
        >
            <span>How does the auction on the King work?</span>
          
        </div>
        <div className="description">
            <div className="description">
              Between all the pieces in the project, the King is obviously the
              most important. Highly coveted, it offers the benefits and rewards
              most expected by community members. With such performances,
              needless to say, the competition will be tough. But to ensure
              fairness for all participants, the system has set up a specific
              operation.
              <br />
              <br />
              In order to ensure that all members of the community will go on an
              equal footing when it comes to mint a king, the auction will start
              at 20,000 ETH and will decrease exponentially over a period of 30
              days. In fact, when this period ends, the auction will reach the
              base of 2 ETH.
              <br />
              <br />
              There are several options available to you. If you feel like the
              heart of a bold, you can buy it at today’s price. The more
              foresight will be able to inform the amount they are ready to pay
              and quickly see when they will have to reconnect on the app and
              mint the King.
              <br />
              <br />
              But beware! Know that as soon as the mint is live, the king’s pool
              will start to grow. This even if he has not yet found a buyer!
            </div>
        </div>
      </div>
    </KingAuctionContainer>
  );
};
