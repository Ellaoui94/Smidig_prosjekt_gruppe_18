import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function PageThree() {
  return (
    <div>
      <h1>Få kontroll i dag</h1>
      <Button component={Link} to="/" style={{
        background: "#D5DACD",
        fontSize: "25px",
        fontWeight: "bold",
        color: "#365F07",
        borderRadius: "50px"
      }}>Kom i gang</Button>
    </div>
  );
}