import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { useState } from "react";
import { EnsSelectorStyleWrapper } from "./EnsSelector.style";

export const EnsSelector = () => {
  const { stack, ensList, selectId } = useEthereum();
  const [ensName, setEnsName] = useState("");

  const handleChange = (newValue) => {
    setEnsName(newValue.target.value);
  };

  return (
    <EnsSelectorStyleWrapper>
      <div className="content">
        <h2 style={{ marginBottom: "20px" }}>
          Choose an ENS name for stack your NFT :
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <InputLabel>ENS name</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              value={ensName}
              label="Age"
              onChange={handleChange}
            >
                {ensList.map((element) =>{
                    return (<MenuItem value={element.name}>{element.name}</MenuItem>)
                })}
            </Select>
          <Button
            style={{ marginBottom: "20px" }}
            variant="contained"
            onClick={() => {
              stack(ensName, selectId);
            }}
          >
            accept
          </Button>
        </div>
      </div>
    </EnsSelectorStyleWrapper>
  );
};
