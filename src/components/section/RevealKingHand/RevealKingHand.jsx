import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { RevealKingHandStyleWrapper } from "./RevealKingHand.style";
import { Button, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import validate from "../../../assets/images/ValideWhite.png";
import ReactLoading from "react-loading";

export const RevealKingHand = () => {
  const {
    selectId,
    state,
    setState,
    setIsKingHandOpen,
    revealKingHand,
    revealKingHandLoading,
    revealKingHandResponse,
  } = useEthereum();
  const [isKingHand, setIsKingHand] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    if (revealKingHandResponse) {
      console.log(revealKingHandResponse.logs[0].data);
      if (
        revealKingHandResponse.logs[0].data ==
        0x0000000000000000000000000000000000000000000000000000000000000000
      ) {
        setIsKingHand(false);
      } else {
        setIsKingHand(true);
      }
    }
  }, [revealKingHandResponse]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsKingHandOpen(false);
      setState("");
    }
  };

  const handleClose = () => {
    setIsKingHandOpen(false);
    setState("");
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
                  height: "50px",
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
            ) : state === "success" ? (
              isKingHand === true ? (
                <p
                  style={{
                    display: "flex",
                    textAlign: "center",
                    margin: "25px 0",
                    height: "50px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Congratulation, this nft is a King Hand!
                  <br />
                  It will be update when reach the end of the collection.
                </p>
              ) : (
                <p
                  style={{
                    display: "flex",
                    textAlign: "center",
                    margin: "25px 0",
                    height: "50px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  This nft is not a King Hand...
                  <br />
                  Try again with another Pawn!
                </p>
              )
            ) : (
              <p
                style={{
                  display: "flex",
                  textAlign: "center",
                  margin: "25px 0",
                  height: "50px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Proceed the transaction in order to reveal your Pawn!
              </p>
            )}
            <Button
              style={{
                width: "100px",
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
                  revealKingHand();
                }
              }}
            >
              {state === "success" ? (
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
                  Reveal
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </RevealKingHandStyleWrapper>
  );
};
