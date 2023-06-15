import blackPawn from "../../../assets/images/icon/Icon_Pion_-_Noir_entier.png";
import whitePawn from "../../../assets/images/icon/Icon_Pion_-_Blanc_entier.png";
import { useEthereum } from "../../../context/ethereumProvider";
import { ColorPickerStyleWrapper } from "./ColorPicker.style";

export const ColorPicker = () => {
    const { chooseBlackColor, chooseWhiteColor } = useEthereum();

    return (
        <ColorPickerStyleWrapper>
            <div className="content">
                <h2 style={{ marginBottom: "20px" }}>Choisissez votre couleur</h2>
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                    <div style={{ width: "140px", cursor: "pointer" }} onClick={chooseBlackColor} >
                        <img alt="" src={blackPawn} style={{ borderRadius: "5px" }} />
                    </div>
                    <div style={{ width: "140px", cursor: "pointer" }} onClick={chooseWhiteColor} >
                        <img alt="" src={whitePawn} style={{ borderRadius: "5px" }} />
                    </div>
                </div>
                <p>Attention cette action est irreversible, une fois votre couleur choisie vous ne pourrez plus la modifier</p>
            </div>
        </ColorPickerStyleWrapper>
    );
};
