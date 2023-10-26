import { KingAuctionContainer } from "./kingAuction.style";
import ReactLoading from "react-loading";
import { Countdown } from "../../countdown/countdown";
import blackKing from "../../../assets/images/0.png";
import whiteKing from "../../../assets/images/1.png";
import tirelire from "../../../assets/images/icon/tirelire.png";
import tirelireDark from "../../../assets/images/icon/tirelireDark.png";
import eth from "../../../assets/images/eth.png";
import ethGrey from "../../../assets/images/ethGrey.png";
import ethDark from "../../../assets/images/ethDark.png";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BigNumber, ethers } from "ethers";
import {
  contractAddress,
  ETHEREUM_RPC_URL,
  NRCsubgraph,
  ENSsubgraph,
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
  const { buyKing, address } = useEthereum();
  const [whiteKingReward, setWhiteKingReward] = useState(0);
  const [blackKingReward, setBlackKingReward] = useState(0);
  const [ensList, setEnsList] = useState("");
  const [isLoadingInference, setIsLoadingInference] = useState(true);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const [value, setValue] = useState(null);

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
    const fetchData = async () => {
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

      setEnsList(fetchENS);
    };

    if (address) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!isLoadingInference && value) {
      setCalculatedDate(calculateDate(value));
    }
  }, [value, isLoadingInference, startTime]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoadingPrice(true);
      const provider = new ethers.providers.JsonRpcProvider(ETHEREUM_RPC_URL);
      const transaction = await provider.getTransaction(
        "0x5c701b641e0ffa580537b15fcfb7032dbf9f4a4c9799bdb255af2d2659e5da84"
      );
      const block = await provider.getBlock(transaction.blockNumber);
      setStartTime(new Date(block.timestamp * 1000));
      setEndTime(new Date(block.timestamp * 1000 + 30 * 24 * 60 * 60 * 1000));
      setIsLoadingInference(false);
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
      setIsLoadingPrice(false);
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
          BigNumber.from(lastGlobalShares[0]).toNumber() / 10 ** 18 * 100000;

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
        {<Countdown theme={props.theme} endTime={endTime} />}
      </div>
      <div className="container-nft">
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
            {isLoadingPrice ? (
              <ReactLoading
                type={"cylon"}
                color={"rgb(225, 222, 222)"}
                height={46}
                width={150}
                className="cylon"
              />
            ) : (
              <>
                <img
                  alt=""
                  src={props.theme === "Dark Theme" ? eth : ethDark}
                />
                <span>{price ? parseFloat(price).toFixed(2) : 0}</span>
              </>
            )}
          </div>
        </div>
        <div className="actions">
          <button
            className="action-btn"
            onClick={() => buyKing(ensList.map((element) => element.name))}
          >
            Buy Now
          </button>
        </div>
        <div className="data">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Target Time</p>
            <div
              style={{
                color: "black",
                backgroundColor: "white",
                height: "28px",
                border: "2px solid rgb(204, 204, 204)",
                margin: "14px 0",
                borderRadius: "0.5em",
                width: "200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {calculatedDate ? calculatedDate.toLocaleString() : "Loading..."}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Target Price</p>
            <label
              aria-label="Enter the amount in ETH"
              style={{ height: "28px", margin: "14px 0" }}
            >
              <img
                src={ethGrey}
                style={{
                  width: "14px",
                  zIndex: 30,
                  position: "absolute",
                  marginLeft: "5px",
                  marginTop: "2px",
                }}
              />
              <input type="tel" value={value} style={{paddingLeft: "4px"}} onChange={handleChange} />
            </label>
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
            most expected by community members. With such performances, needless
            to say, the competition will be tough. But to ensure fairness for
            all participants, the system has set up a specific operation.
            <br />
            <br />
            In order to ensure that all members of the community will go on an
            equal footing when it comes to mint a king, the auction will start
            at 20,000 ETH and will decrease exponentially over a period of 21
            days. In fact, when this period ends, the auction will reach the
            base of 2 ETH.
            <br />
            <br />
            There are several options available to you. If you feel like the
            heart of a bold, you can buy it at today’s price. The more foresight
            will be able to inform the amount they are ready to pay and quickly
            see when they will have to reconnect on the app and mint the King.
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
