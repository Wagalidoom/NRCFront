import { Button, IconButton, TextField, styled } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import eth from "../../../assets/images/eth.png";
import { PriceSelectorStyleWrapper } from "./PriceSelector.style";
import { useRef } from "react";
import { useEffect } from "react";
import ReactLoading from "react-loading";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgb(0 0 0)",
    width: "90px",
  },

  "& .MuiInputBase-input": {
    paddingRight: "0px",
  },
});

export const PriceSelector = () => {
  const { listNFT, selectId, setIsPriceSelectorOpen, listLoading } =
    useEthereum();
  const [state, setState] = useState("");
  const [price, setPrice] = useState(1);

  const componentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsPriceSelectorOpen(false);
    }
  };

  const handleClose = () => {
    setIsPriceSelectorOpen(false);
  };

  const handleTextFieldChange = (event) => {
    const userInput = event.target.value;

    // Supprime les caractères non numériques ou non décimaux
    let cleanedInput = userInput.replace(/[^0-9\.]/g, "");

    // Vérifie s'il y a plus de 4 chiffres après la virgule
    if (cleanedInput.includes(".")) {
      const decimalPosition = cleanedInput.indexOf(".");
      if (cleanedInput.length - decimalPosition - 1 > 4) {
        cleanedInput = cleanedInput.slice(0, decimalPosition + 5);
      }
    }

    setPrice(cleanedInput);
  };

  return (
    <PriceSelectorStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px 0px",
              justifyContent: "space-between",
            }}
          >
            List
            <div
              style={{
                display: "flex",
                width: "70%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              Number Runner #{selectId}
              <IconButton onClick={handleClose} style={{ padding: "0px" }}>
                <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
              </IconButton>
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
            Set the price and sell your nft!
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                className="leftText"
                style={{ height: "20px", marginBottom: "2px" }}
                src={eth}
              />
              <CustomTextField
                hiddenLabel
                id="filled-hidden-label-small"
                onChange={handleTextFieldChange}
                value={price}
                variant="filled"
                size="small"
                style={{ margin: "0 15px 0 3px" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                margin: "15px",
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
                  await listNFT(selectId, price);
                  setState("success");
                }
              }}
            >
              {listLoading ? (
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
                <p
                  style={{
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Done
                </p>
              ) : (
                <p
                  style={{
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Proceed to listing
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </PriceSelectorStyleWrapper>
  );
};
