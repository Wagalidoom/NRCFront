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
              Choose which color you wan to mint!<sup>1</sup>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div
                style={{ width: "140px", cursor: "pointer" }}
                onClick={() => {
                  setColor(1);
                }}
              >
                <img alt="" src={blackPawn} style={{ borderRadius: "5px" }} />
              </div>
              <div
                style={{ width: "140px", cursor: "pointer" }}
                onClick={() => {
                  setColor(2);
                }}
              >
                <img alt="" src={whitePawn} style={{ borderRadius: "5px" }} />
              </div>
            </div>

            <p>
              Attention cette action est irreversible, une fois votre couleur
              choisie vous ne pourrez plus la modifier
            </p>
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
            disabled={color === 0 ? true : false}
            style={{ margin: "15px" }}
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
