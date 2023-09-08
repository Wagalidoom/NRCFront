import CloseIcon from "@mui/icons-material/Close";
import { useEthereum } from "../../../context/ethereumProvider";
import { BurnValidatorStyleWrapper } from "./BurnValidator.style";
import { Button, IconButton } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useState, useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";

export const BurnValidator = () => {
  const { burn, selectId, setIsBurnOpen, burnLoading } = useEthereum();
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
              style={{ margin: "0 15px", width: "190px", height: "40px" }}
              variant="contained"
              onClick={() => {
                burn(selectId);
              }}
            >
              {burnLoading ? (
                <BeatLoader color="#ffff" loading={true} size={15} />
              ) : (
                <p>Proceed to burn</p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </BurnValidatorStyleWrapper>
  );
};
