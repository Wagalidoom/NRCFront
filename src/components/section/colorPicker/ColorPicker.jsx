export const ColorPicker = () => {
  console.log("COLOOOR");

  // const handleChange = (event) => {
  //   setColor(event.target.value);
  // };

  return (
    <div style={{ zIndex: "999", position: "fixed", display: "flex", bottom: "0", left: "0", width: "50vw", backgroundColor: "rgba(21, 32, 70, 0.8)", padding: "1em", borderRadius: "0.5em" }}>
      <h2>Choisissez votre couleur</h2>
    </div>
  );
};
