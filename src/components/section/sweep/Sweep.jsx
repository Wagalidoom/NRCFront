import { Button, IconButton, Slider } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { SweepStyleWrapper } from "./Sweep.style";
import CloseIcon from "@mui/icons-material/Close";
import validate from "../../../assets/images/ValideWhite.png";
import eth from "../../../assets/images/eth.png";
import { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";

export const Sweep = (props) => {
  const {
    collection,
    sweep,
    state,
    setState,
    burnSweep,
    setIsSweepOpen,
    setIsBurnSweepOpen,
    multiBuyLoading,
    multiKillLoading,
  } = useEthereum();
  const [sweepCount, setSweepCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [collectionId, setCollectionId] = useState([]);
  const componentRef = useRef(null);

  const marks = collection.map((item, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }));

  function iOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  const isIOS = iOS();

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsSweepOpen(false);
      setIsBurnSweepOpen(false);
      setState("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let price = 0;
    let collectionId = [];
    collection.slice(0, sweepCount).forEach((element) => {
      price += Number(element.price);
      collectionId.push(element.id);
    });
    setPrice(price);
    setCollectionId(collectionId);
  }, [sweepCount]);

  const handleClose = () => {
    setIsSweepOpen(false);
    setIsBurnSweepOpen(false);
    setState("");
  };

  const handleSliderChange = (event, newValue) => {
    if (isIOS && event.type === "mousedown") {
      return;
    }

    setSweepCount(newValue);
  };

  const handleTextFieldChange = (event) => {
    setSweepCount(Number(event.target.value));
  };

  return (
    <SweepStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px 0",
              justifyContent: "space-between",
            }}
          >
            Sweep
            <div>
              <label
                for="items"
                style={{ fontSize: "16px", marginRight: "12px" }}
              >
                Items
              </label>
              <input
                onChange={handleTextFieldChange}
                value={sweepCount}
                id="items"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  backgroundColor: "rgb(37 49 63)",
                  height: "30px",
                  width: "50px",
                  border: "none",
                  borderRadius: "5px",
                  paddingLeft: "15px",
                }}
              />
            </div>
            <IconButton onClick={handleClose} style={{ padding: 0 }}>
              <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
            </IconButton>
          </div>
          <div
            className="contractContainerRow"
            style={{
              padding: "25px 15px",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {props.market ? (
              <p>Slide to add more items to your cart!</p>
            ) : (
              <p>Slide to add more items to burn!</p>
            )}
            <Slider
              style={{ marginTop: "15px" }}
              value={sweepCount}
              onChange={handleSliderChange}
              min={1}
              max={20}
              step={null}
              marks={marks}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px",
              flexDirection: "column",
              height: "200px",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {collection.slice(0, sweepCount).map((element) => {
                return (
                  <div
                    onClick={() => {}}
                    style={{
                      display: "flex",
                      width: "100%",
                      padding: "5px",
                      borderBottom: "1px solid #f4f4f4",
                      paddingBottom: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    <img
                      style={{ width: "55px", borderRadius: "8px" }}
                      src={`https://ipfs.io/ipfs/QmR26tKkJqMjq1jQDZzvkKjWAiWVuYWvbzRexXAqSkgP1n/${element.id.toString()}.png`}
                    />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                      }}
                    >
                      <div style={{ marginLeft: "15px" }}>{element.id}</div>{" "}
                      <div>
                        <img
                          alt=""
                          className="leftText"
                          style={{ height: "20px", marginBottom: "2px" }}
                          src={eth}
                        />
                        {props.market
                          ? (Number(element.price) * 10 ** -18).toFixed(4)
                          : Number(element.price).toFixed(4)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "15px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Total Cost
            <div>
              <img
                alt=""
                className="leftText"
                style={{ height: "20px", marginBottom: "2px" }}
                src={eth}
              />
              {props.market ? (price * 10 ** -18).toFixed(4) : price.toFixed(4)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                marginTop: "15px",
                width: "190px",
                height: "40px",
                backgroundColor:
                  state === "success"
                    ? "rgb(138 180 209)"
                    : "rgb(29, 155, 240)",
              }}
              variant="contained"
              onClick={async () => {
                if (state === "success") {
                  handleClose();
                } else {
                  props.market
                    ? sweep(collectionId, price)
                    : burnSweep(collectionId, price);
                }
              }}
            >
              {multiBuyLoading || multiKillLoading ? (
                <>
                  <div style={{ position: "relative", top: "-2px" }}>
                    <ReactLoading
                      className="spin"
                      type={"spin"}
                      color={"rgba(255, 255, 255, 0.8)"}
                      height={22}
                      width={22}
                    />
                  </div>
                  <p
                    style={{
                      textTransform: "none",
                      marginLeft: "12px",
                      fontSize: "1rem",
                    }}
                  >
                    Loading...
                  </p>
                </>
              ) : state === "success" ? (
                <>
                  <img
                    style={{ width: "16px", marginRight: "8px" }}
                    src={validate}
                  />
                  <p
                    style={{
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Done
                  </p>
                </>
              ) : (
                <p
                  style={{
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Proceed to sweep
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </SweepStyleWrapper>
  );
};
