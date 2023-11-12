import { Button, IconButton, Slider, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useEthereum } from "../../../context/ethereumProvider";
import { MintStyleWrapper } from "./Mint.style";
import CloseIcon from "@mui/icons-material/Close";
import validate from "../../../assets/images/ValideWhite.png";
import eth from "../../../assets/images/eth.png";
import { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgb(21, 32, 43)",
    height: "35px",
    width: "150px",
  },

  "& .MuiInputBase-input": {
    paddingRight: "0px",
  },
});

export const Mint = () => {
  const { mint, setIsMintOpen, multiMintLoading } = useEthereum();
  const [mintCount, setMintCount] = useState(1);
  const [state, setState] = useState("");
  const componentRef = useRef(null);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsMintOpen(false);
    }
  };

  const handleClose = () => {
    setIsMintOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    if (isIOS && event.type === "mousedown") {
      return;
    }
    setMintCount(newValue);
  };

  const handleTextFieldChange = (event) => {
    setMintCount(Number(event.target.value));
  };

  return (
    <MintStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              paddingBottom: "25px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            Mint
            <div>
              <label htmlFor="items" style={{fontSize: "16px", marginRight: "12px"}}>Items</label>
              <input
                onChange={handleTextFieldChange}
                value={mintCount}
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
            <IconButton onClick={handleClose} style={{ padding: "0px" }}>
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
            Slide to mint more items!
            <Slider
            style={{marginTop: "15px"}}
              value={mintCount}
              onChange={handleSliderChange}
              min={1}
              max={20}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
          <div
            style={{
              display: "flex",
              padding: "20px 0",
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
              {(0.1 * mintCount).toFixed(2)}
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
                  await mint(mintCount);
                  setState("success");
                }
              }}
            >
              {multiMintLoading ? (
                <>
                  <ReactLoading
                    className="spin"
                    type={"spin"}
                    color={"rgba(255, 255, 255, 0.8)"}
                    height={22}
                    width={22}
                  />
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
                  <img style={{ width: "16px", marginRight: "8px" }} src={validate} />
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
                  Proceed to minting
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};
