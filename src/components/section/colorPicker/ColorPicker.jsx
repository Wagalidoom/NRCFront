import blackPawn from "../../../assets/images/icon/Icon_Pion_-_Noir_entier.png";
import whitePawn from "../../../assets/images/icon/Icon_Pion_-_Blanc_entier.png";
import CloseIcon from "@mui/icons-material/Close";
import eth from "../../../assets/images/eth.png";
import { useEthereum } from "../../../context/ethereumProvider";
import { ColorPickerStyleWrapper } from "./ColorPicker.style";
import { Button, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export const ColorPicker = () => {
  const { chooseColor, setIsColorPickerOpen } = useEthereum();
  const [color, setColor] = useState(0);
  const componentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsColorPickerOpen(false);
    }
  };

  const handleClose = () => {
    setIsColorPickerOpen(false);
  };

  return (
    <ColorPickerStyleWrapper>
      <div className="callContractContainer">
        <div className="contractContent" ref={componentRef}>
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
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
              </IconButton>
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
            <div>
              Choose which color you want to mint!<sup>1</sup>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                marginTop: "15px"
              }}
            >
              <div
                style={{ width: "140px", cursor: "pointer" }}
                onClick={() => {
                  setColor(1);
                }}
              >
                <img alt="" src={blackPawn} style={{ borderRadius: "5px", border: color === 1 ? "4px solid rgb(29, 155, 240)" : "none" }} />
              </div>
              <div
                style={{ width: "140px", cursor: "pointer" }}
                onClick={() => {
                  setColor(2);
                }}
              >
                <img alt="" src={whitePawn} style={{ borderRadius: "5px", border: color === 2 ? "4px solid rgb(29, 155, 240)" : "none" }} />
              </div>
            </div>
            <div style={{marginTop: "15px"}}>
              <sup>1</sup>{" "}
              <i style={{ fontSize: "14px" }}>
                The color chosen will be linked to your address and cannot be
                change anymore. Choose wisely!
              </i>
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
              0.2
            </div>
          </div>
          <Button
            disabled={color === 0}
            style={{ margin: "15px", backgroundColor: color === 0 ? "rgb(138 180 209)" : "rgb(29, 155, 240)" }}
            variant="contained"
            onClick={() => {
              chooseColor(color);
            }}
          >
            {" "}
            {color === 0 ? <p>Choose a color</p> : <p>Proceed to minting</p>}
          </Button>
        </div>
      </div>
    </ColorPickerStyleWrapper>
  );
};
