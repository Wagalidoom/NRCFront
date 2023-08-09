import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { BurnValidatorStyleWrapper } from "./BurnValidator.style";
import { Button, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export const BurnValidator = () => {
  const { burn, selectId, setIsBurnOpen } = useEthereum();
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
              <IconButton onClick={handleClose} style={{padding: "0px"}}>
                <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
              </IconButton>
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
            The nft cannot be access anymore!
            <div style={{
              display: "flex",
              alignItems: "center",
            }}>
            </div>
          </div>
          <Button
            style={{ margin: "15px" }}
            variant="contained"
            onClick={() => {
              burn(selectId);
            }}
          >
            Proceed to burn
          </Button>
        </div>
      </div>
    </BurnValidatorStyleWrapper>
  );
};
