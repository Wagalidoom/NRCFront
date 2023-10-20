import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { RevealKingHandStyleWrapper } from "./RevealKingHand.style";
import { Button, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

export const RevealKingHand = (props) => {
  const [state, setState] = useState("");
  const { selectId, setIsKingHandOpen, isKingHand, revealKingHandLoading } =
    useEthereum();
  const componentRef = useRef(null);

  useEffect(() => {
    if (!revealKingHandLoading) {
      setState("success");
    }
  }, [revealKingHandLoading]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsKingHandOpen(false);
    }
  };

  const handleClose = () => {
    setIsKingHandOpen(false);
  };

  return (
    <RevealKingHandStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px 0px",
              justifyContent: "space-between",
            }}
          >
            Reveal : Number Runner #{selectId}
            <IconButton onClick={handleClose} style={{ padding: "0px" }}>
              <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {revealKingHandLoading ? (
              <div
                style={{
                  display: "flex",
                  margin: "25px 0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
              </div>
            ) : isKingHand === true ? (
              <p
                style={{
                  display: "flex",
                  textAlign: "center",
                  margin: "25px 0",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Congratulation, this nft is a King Hand!<br />
                It will be update when reach the end of the collection.
              </p>
            ) : (
              <p
                style={{
                  display: "flex",
                  textAlign: "center",
                  margin: "25px 0",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                This nft is not a King Hand...
                <br />
                Try again with another Pawn!
              </p>
            )}
            <Button
              disabled={state === "success" ? false : true}
              style={{
                width: "100px",
                height: "40px",
                backgroundColor:
                  state === "success"
                    ? "rgb(29, 155, 240)"
                    : "rgb(138 180 209)",
              }}
              variant="contained"
              onClick={async () => {
                if (state === "success") {
                  handleClose();
                }
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </RevealKingHandStyleWrapper>
  );
};
