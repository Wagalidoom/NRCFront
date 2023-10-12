import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { RevealKingHandStyleWrapper } from "./RevealKingHand.style";
import { Button, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";

export const RevealKingHand = (props) => {
  const { selectId, setIsKingHandOpen, isKingHand, revealKingHandLoading } = useEthereum();
  const componentRef = useRef(null);

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
            Reveal
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            { revealKingHandLoading ? <BeatLoader color="#ffff" loading={true} size={15} /> : isKingHand === true ? (
              <p>
                Congratulation, this nft is a King Hand ! It will be update when reach the end of the collection
              </p>
            ) : (
              <p>The nft is not a King Hand. Try again with another Pawn</p>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </RevealKingHandStyleWrapper>
  );
};
