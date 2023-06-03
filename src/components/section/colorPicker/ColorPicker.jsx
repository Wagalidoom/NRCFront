import blackKing from "../../../assets/images/icon/IconRoi-Noir.png";
import whiteKing from "../../../assets/images/icon/IconRoi-Blanc.png";

export const ColorPicker = () => {
  console.log("COLOOOR");

  // const handleChange = (event) => {
  //   setColor(event.target.value);
  // };

  return (
    <div style={{ zIndex: "999", position: "fixed", display: "flex", flexDirection: "column", bottom: "0", left: "0", width: "50vw", backgroundColor: "rgb(30, 39, 50)", borderWidth: "2px", border: "rgb(48, 60, 67)", padding: "1em", borderRadius: "0.5em" }}>
      <h2 style={{marginBottom: "20px"}}>Choisissez votre couleur</h2>
      <div style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
        <div style={{ width: "140px" }}>
          <img alt="" src={blackKing} />
        </div>
        <div style={{ width: "140px" }}>
          <img alt="" src={whiteKing} />
        </div>
      </div>
    </div>
  );
};
