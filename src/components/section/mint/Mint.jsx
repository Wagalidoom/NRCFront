import { Button, Slider, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useEthereum } from "../../../context/ethereumProvider";
import { MintStyleWrapper } from "./Mint.style";
import CloseIcon from "@mui/icons-material/Close";
import eth from "../../../assets/images/eth.png";
import { useState } from "react";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgb(0 0 0)",
    width: "50px",
  },
});

export const Mint = () => {
  const { mint } = useEthereum();
  const [mintCount, setMintCount] = useState(1);

  const handleSliderChange = (event, newValue) => {
    setMintCount(newValue);
  };

  const handleTextFieldChange = (event) => {
    setMintCount(Number(event.target.value));
  };

  return (
    <MintStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent">
          <div
            className="contractContainerRow"
            style={{
              padding: "10px",
              justifyContent: "space-between",
            }}
          >
            Mint
            <div
              style={{
                display: "flex",
                width: "40%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              Items
              <CustomTextField
                type="number"
                hiddenLabel
                id="filled-hidden-label-small"
                value={mintCount}
                onChange={handleTextFieldChange}
                variant="filled"
                size="small"
                style={{ margin: "0 15px" }}
              />
              <button>
                <CloseIcon />
              </button>
            </div>
          </div>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            Slide to mint more items!
            <Slider
              value={mintCount}
              onChange={handleSliderChange}
              max={20}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
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
              {(0.2 * mintCount).toFixed(2)}
            </div>
          </div>
          <Button
            style={{ margin: "15px" }}
            variant="contained"
            onClick={() => {
              mint(mintCount);
            }}
          >
            Proceed to minting
          </Button>
        </div>
      </div>
    </MintStyleWrapper>
  );
};
