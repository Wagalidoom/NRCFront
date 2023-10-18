import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { KillValidatorStyleWrapper } from "./KillValidator.style";
import { Button, IconButton } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

export const KillValidator = () => {
  const { burnSweep, burnPrice, selectId, setIsKillOpen, multiKillLoading } = useEthereum();
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
            Burn
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
              alignItems: "center",
            }}
          >
            <ReportGmailerrorredIcon style={{ marginRight: "5px" }} />
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
              style={{ margin: "0 15px", width: "190px", height: "40px" }}
              variant="contained"
              onClick={() => {
                burnSweep(selectId, burnPrice);
              }}
            >
              {multiKillLoading ? (
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
