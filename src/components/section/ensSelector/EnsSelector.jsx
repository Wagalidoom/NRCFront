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
import { useRef, useEffect } from "react";

export const EnsSelector = () => {
  const { stack, ensList, selectId, setIsEnsSelectorOpen } = useEthereum();
  const [ensName, setEnsName] = useState("");
  const componentRef = useRef(null);

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
              padding: "10px",
              justifyContent: "space-between",
            }}
          >
            Stack
            <div
              style={{
                display: "flex",
                width: "40%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              NRC#{selectId}
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
              </IconButton>
            </div>
          </div>
          <div
            className="contractContainerRow"
            style={{
              padding: "15px",
              flexDirection: "column",
              maxHeight: "275px",
            }}
          >
            Choose a number to stack your NFT!
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
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "rgb(35, 45, 55)",
                        padding: "5px"
                      }}
                    >
                      {element.name}
                    </div>
                  );
                }
                else {
                  return (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "rgb(30, 40, 50)",
                        padding: "5px"
                      }}
                    >
                      {element.name}
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
            <div>
              {ensName}
            </div>
          </div>
          <Button
            style={{ margin: "15px" }}
            variant="contained"
            onClick={() => {
              stack(ensName, selectId);
            }}
          >
            Proceed to stacking
          </Button>
        </div>
      </div>
      <div className="content">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <InputLabel>ENS name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={ensName}
            label="Age"
            onChange={handleChange}
          >
            {ensList.map((element) => {
              return <MenuItem value={element.name}>{element.name}</MenuItem>;
            })}
          </Select>
        </div>
      </div>
    </EnsSelectorStyleWrapper>
  );
};
