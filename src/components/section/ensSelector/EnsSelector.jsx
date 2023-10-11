import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { useState } from "react";
import { EnsSelectorStyleWrapper } from "./EnsSelector.style";
import CloseIcon from "@mui/icons-material/Close";
import eth from "../../../assets/images/eth.png";
import ReactLoading from "react-loading";
import { useRef, useEffect } from "react";

export const EnsSelector = () => {
  const {
    stack,
    ensList,
    selectId,
    setIsEnsSelectorOpen,
    setAvatar,
    stackLoading,
  } = useEthereum();
  const [ensName, setEnsName] = useState("");
  const [state, setState] = useState("");
  const componentRef = useRef(null);

  console.log(ensList);

  const handleChange = (newValue) => {
    setEnsName(newValue.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsEnsSelectorOpen(false);
    }
  };

  const handleClose = () => {
    setIsEnsSelectorOpen(false);
  };

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
            Stack
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
            className="contractContainerRow"
            style={{
              padding: "15px",
              flexDirection: "column",
              height: "200px",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              Choose a number to stack your NFT!
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
                      onClick={() => {
                        setEnsName(element);
                      }}
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "rgb(30, 40, 50)",
                        padding: "5px",
                        border:
                          ensName === element.name
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
              padding: "15px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Digit selected
            <div>{ensName}</div>
          </div>
          <div style={{ fontSize: "12px", padding: "0px 15px" }}>
            If your number does not appear, please unwrap it on{" "}
            <a
              href="https://ens.domains/"
              rel="noreferrer"
              target="_blank"
              style={{ fontSize: "11px" }}
            >
              https://ens.domains/
            </a>
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
                  setAvatar(ensName, selectId);
                  await stack(ensName, selectId);
                  setState("success");
                }
              }}
            >
              {stackLoading ? (
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
                  Proceed to stacking
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </EnsSelectorStyleWrapper>
  );
};
