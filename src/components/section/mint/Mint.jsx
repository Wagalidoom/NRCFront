import { Button, Slider, TextField } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { MintStyleWrapper } from "./Mint.style";
import { useState } from "react";

export const Mint = () => {
    const { mint } = useEthereum();
    const [mintCount, setMintCount] = useState(1);

    const handleChange = (event, newValue) => {
        setMintCount(newValue);
    };

    return (
        <MintStyleWrapper>
            <div className="callContractContainer">
                <div className="mintContent">
                    <div style={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "end" }}>
                        Mint
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                            Items
                            <TextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue={1}
                                variant="filled"
                                size="small"
                            />
                        </div>
                    </div>
                    <Slider
                        defaultValue={1}
                        max={20}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            mint(mintCount);
                        }}
                    >
                        accept
                    </Button>
                </div>
            </div>
        </MintStyleWrapper>
    );
};
