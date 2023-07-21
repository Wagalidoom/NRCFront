import { Button, IconButton, TextField, styled } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import eth from "../../../assets/images/eth.png";
import { PriceSelectorStyleWrapper } from "./PriceSelector.style";
import { useRef } from "react";
import { useEffect } from "react";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
      color: "rgba(255, 255, 255, 0.8)",
      backgroundColor: "rgb(0 0 0)",
      width: "50px",
  },

  "& .MuiInputBase-input": {
      paddingRight: "0px",
  },
});

export const PriceSelector = () => {
  const { listNFT, selectId, setIsPriceSelectorOpen } = useEthereum();
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
        setPrice(Number(event.target.value));
    };

  return (
    <PriceSelectorStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              padding: "10px",
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
              <IconButton onClick={handleClose}>
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
            <div style={{
              display: "flex",
              alignItems: "center",
            }}>
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
                variant="filled"
                size="small"
                style={{ margin: "0 15px" }}
              />
            </div>
          </div>
          <Button
            style={{ margin: "15px" }}
            variant="contained"
            onClick={() => {
              listNFT(selectId, price);
            }}
          >
            Proceed to listing
          </Button>
        </div>
      </div>
    </PriceSelectorStyleWrapper>
  );
};
