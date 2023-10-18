import blackPawn from "../../../assets/images/icon/Icon_Pion_-_Noir_entier.png";
import whitePawn from "../../../assets/images/icon/Icon_Pion_-_Blanc_entier.png";
import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { ColorPickerStyleWrapper } from "./ColorPicker.style";
import { Button, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

export const ColorPicker = () => {
  const { chooseColor, setIsColorPickerOpen, chooseColorLoading } =
    useEthereum();
  const [state, setState] = useState("idle");
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
              padding: "15px 0px",
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
              <IconButton onClick={handleClose} style={{ padding: "0px" }}>
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
            <div style={{ margin: "10px 0" }}>Choose which color you want!</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "80%",
                margin: "15px 0px",
              }}
            >
              <div
                style={{ width: "120px", cursor: "pointer" }}
                onClick={() => {
                  setColor(1);
                }}
              >
                <img
                  alt=""
                  src={blackPawn}
                  style={{
                    borderRadius: "5px",
                    border:
                      color === 1 ? "4px solid rgb(29, 155, 240)" : "none",
                  }}
                />
              </div>
              <div
                style={{ width: "120px", cursor: "pointer" }}
                onClick={() => {
                  setColor(2);
                }}
              >
                <img
                  alt=""
                  src={whitePawn}
                  style={{
                    borderRadius: "5px",
                    border:
                      color === 2 ? "4px solid rgb(29, 155, 240)" : "none",
                  }}
                />
              </div>
            </div>
            <div style={{ margin: "10px 5px", textAlign: "center" }}>
              <i style={{ fontSize: "14px", textAlign: "center" }}>
                The color chosen will be linked to your address and cannot be
                change anymore. Choose wisely!
              </i>
            </div>
          </div>
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
                  await chooseColor(color);
                  setState("success");
                }
              }}
            >
              {chooseColorLoading ? (
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
                  Proceed
                </p>
              )}
            </Button>
          {/* <Button
            disabled={color === 0}
            style={{
              margin: "15px",
              width: "190px",
              height: "40px",
              backgroundColor:
                color === 0 ? "rgb(138 180 209)" : "rgb(29, 155, 240)",
            }}
            variant="contained"
            onClick={() => {
              chooseColor(color);
            }}
          >
            {" "}
            {chooseColorLoading ? (
              
            ) : color === 0 ? (
              <p>Choose a color</p>
            ) : (
              <p>Proceed</p>
            )}
          </Button> */}
        </div>
      </div>
    </ColorPickerStyleWrapper>
  );
};
