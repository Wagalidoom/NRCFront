import { Button, IconButton } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { useState } from "react";
import { EnsSelectorStyleWrapper } from "./EnsSelector.style";
import CloseIcon from "@mui/icons-material/Close";
import validate from "../../../assets/images/ValideWhite.png";
import ReactLoading from "react-loading";
import { useRef, useEffect } from "react";

export const EnsSelector = (props) => {
  const {
    stack,
    king,
    ensList,
    state,
    setState,
    selectId,
    setIsEnsSelectorOpen,
    setIsKingEnsSelectorOpen,
    setAvatar,
    stackLoading,
    setTextLoading,
    buyKingLoading,
  } = useEthereum();
  const [ensName, setEnsName] = useState("");
  const componentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsEnsSelectorOpen(false);
      setIsKingEnsSelectorOpen(false);
      setState("");
    }
  };

  const handleClose = () => {
    setIsEnsSelectorOpen(false);
    setIsKingEnsSelectorOpen(false);
    setState("");
  };

  useEffect(() => {
    if (state == "successHalf") {
      if (props.king) {
        king(ensName);
      } else {
        stack(ensName, selectId);
      }
    }
  }, [state]);

  return (
    <EnsSelectorStyleWrapper>
      <div className="callContractContainer">
        <div className="mintContent" ref={componentRef}>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px 0px",
              justifyContent: "space-between",
            }}
          >
            <div>
              {props.king ? "Buy : " : "Stack : "}
              {state === "success" ? <></> : "Number Runner #"} {selectId}
            </div>
            <IconButton onClick={handleClose} style={{ padding: "0px" }}>
              <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
            </IconButton>
          </div>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px",
              flexDirection: "column",
              height: "200px",
            }}
          >
            <div style={{ marginBottom: "25px" }}>
              {props.king
                ? "Choose a number to stack your NFT!"
                : "Choose a number to stack your NFT!"}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {ensList.map((element, index) => {
                if (index % 2) {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setEnsName(element);
                      }}
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "rgb(35, 45, 55)",
                        padding: "5px",
                        border:
                          ensName === element
                            ? "1px solid rgb(29, 155, 240)"
                            : "none",
                      }}
                    >
                      {element}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setEnsName(element);
                      }}
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "rgb(30, 40, 50)",
                        padding: "5px",
                        border:
                          ensName === element
                            ? "1px solid rgb(29, 155, 240)"
                            : "none",
                      }}
                    >
                      {element}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "20px 0",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Digit selected
            <div>{ensName}</div>
          </div>
          <div
            style={{
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            If your number not appear, please unwrap it on :
            <br />
            <a
              href="https://ens.domains/"
              rel="noreferrer"
              target="_blank"
              style={{
                fontSize: "13px",
                margin: "8px 0",
                color: "rgb(29, 155, 240)",
              }}
            >
              https://ens.domains/
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                marginTop: "15px",
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
                  setAvatar(ensName, selectId);
                }
              }}
            >
              {stackLoading || buyKingLoading || setTextLoading ? (
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
              ) : state === "successHalf" ? (
                <p
                  style={{
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  1/2
                </p>
              ) : (
                <p
                  style={{
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  {props.king ? "Purchase" : "Stacking"}
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </EnsSelectorStyleWrapper>
  );
};
