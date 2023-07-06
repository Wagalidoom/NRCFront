import { Button, Slider } from "@mui/material";
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
            <div className="content">
                <h2 style={{ marginBottom: "20px" }}>
                    Choose how much Pawn you want to mint :
                </h2>
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
        </MintStyleWrapper>
    );
};
