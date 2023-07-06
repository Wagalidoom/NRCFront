import { Button, Slider, TextField } from "@mui/material";
import { styled } from '@mui/system';
import { useEthereum } from "../../../context/ethereumProvider";
import { MintStyleWrapper } from "./Mint.style";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgb(0 0 0)',
    width: '50px'
  },
});

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
                    <div style={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center" }}>
                        Mint
                        <div style={{ display: "flex", width: "40%", justifyContent: "flex-end", alignItems: "center" }}>
                            Items
                            <CustomTextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue={1}
                                variant="filled"
                                size="small"
                                style={{margin: "0 15px"}}
                            />
                            <button>
                                <CloseIcon />                            
                            </button>
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
