import { Button, TextField } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { useState } from "react";
import { PriceSelectorStyleWrapper } from "./PriceSelector.style";

export const PriceSelector = () => {
  const { listNFT, saleId } = useEthereum();
  const [price, setPrice] = useState(1);

  const handleChange = (newValue) => {
    setPrice(Number(newValue.target.value));
  };

  return (
    <PriceSelectorStyleWrapper>
      <div className="content">
        <h2 style={{ marginBottom: "20px" }}>Set price for your NFT :</h2>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TextField style={{ marginBottom: "20px" }}
            type="number"
            inputProps={{ step: "any" }}
            defaultValue={1}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChange}
          />
          <Button style={{ marginBottom: "20px" }}
            variant="contained"
            onClick={() => {
              console.log(saleId, price);
              listNFT(saleId, price);
            }}
          >
            accept
          </Button>
        </div>
      </div>
    </PriceSelectorStyleWrapper>
  );
};
