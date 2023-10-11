import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { BurnValidatorStyleWrapper } from "./BurnValidator.style";
import { Button, IconButton } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

export const BurnValidator = () => {
  const { burn, selectId, setIsBurnOpen, burnLoading } = useEthereum();
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
      setIsBurnOpen(false);
    }
  };

  const handleClose = () => {
    setIsBurnOpen(false);
  };

  return (
    <BurnValidatorStyleWrapper>
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
                  await burn(selectId);
                  setState("success");
                }
              }}
            >
              {burnLoading ? (
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
                  Proceed to burning
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </BurnValidatorStyleWrapper>
  );
};
