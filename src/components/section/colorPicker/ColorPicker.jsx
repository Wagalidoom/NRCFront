import blackKing from "../../../assets/images/icon/IconRoi-Noir.png";
import whiteKing from "../../../assets/images/icon/IconRoi-Blanc.png";
import { useEthereum } from "../../../context/ethereumProvider";

export const ColorPicker = () => {
  const { chooseColor } = useEthereum();

  return (
    <div style={{ zIndex: "999", position: "fixed", display: "flex", flexDirection: "column", bottom: "0", left: "0", width: "50vw", backgroundColor: "rgb(30, 39, 50)", borderTop: "2px solid rgb(48, 60, 67)", borderRight: "2px solid rgb(48, 60, 67)", padding: "1em", borderRadius: "0.5em" }}>
      <h2 style={{ marginBottom: "20px" }}>Choisissez votre couleur</h2>
      <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        <div style={{ width: "140px", cursor: "pointer", borderColor: "rgb(48, 60, 67)", borderWidth: "2px" }} onClick={chooseColor(1)} >
          <img alt="" src={blackKing} />
        </div>
        <div style={{ width: "140px", cursor: "pointer" }} onClick={chooseColor(2)} >
          <img alt="" src={whiteKing} />
        </div>
      </div>
    </div>
  );
};
