import { Button, Slider } from "@mui/material";
import { useEthereum } from "../../../context/ethereumProvider";
import { MintStyleWrapper } from "./Mint.style";

export const Mint = () => {
    const { mint } = useEthereum();

    return (
        <MintStyleWrapper>
            <div className="content">
                <h2 style={{ marginBottom: "20px" }}>Choose how much Pawn you want to mint :</h2>
                <Slider defaultValue={1} aria-label="Default" valueLabelDisplay="auto" />
                <Button variant="contained" onClick={() => { mint() }}>accept</Button>
            </div>
        </MintStyleWrapper>
    );
};
