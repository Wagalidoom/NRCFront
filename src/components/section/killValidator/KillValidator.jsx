import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { KillValidatorStyleWrapper } from "./KillValidator.style";
import validate from "../../../assets/images/ValideWhite.png";
import { Button, IconButton } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

export const KillValidator = () => {
  const { burnSweep, burnPrice, selectId, setIsKillOpen, multiKillLoading } =
    useEthereum();
  const [state, setState] = useState("");
  const componentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsKillOpen(false);
    }
  };

  const handleClose = () => {
    setIsKillOpen(false);
  };

  return (
    <KillValidatorStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px 0px",
              justifyContent: "space-between",
            }}
          >
            Burn : {state === "success" ? <></> : "Number Runner #"} {selectId}
            <IconButton onClick={handleClose} style={{ padding: "0px" }}>
              <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              padding: "15px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReportGmailerrorredIcon
              style={{
                margin: "10px 0 20px 0",
                width: "35px",
                height: "35px",
                color: "#cc5037",
              }}
            />
            This nft cannot be access anymore!
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            ></div>
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
                  await burnSweep(selectId, burnPrice);
                }
              }}
            >
              {multiKillLoading ? (
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
                  Proceed to burn
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </KillValidatorStyleWrapper>
  );
};
