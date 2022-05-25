import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

const evaluation = ["Bra", "Helt ok", "Dårlig"];
export function StartSession() {
  return (
    <>
      <h1>Etter å ha trykket start på start siden kommer man hit</h1>
      <Link to={"/end-session"}>Vurder økten og avslutt</Link>

      <div>
        <h3>Vurder økten</h3>
        {evaluation.map((evaluate) => (
          <FormControlLabel control={<Checkbox />} label={evaluate} />
        ))}
      </div>

      <div>
        <h3>Hvordan var fokuset på denne økten?</h3>
        {evaluation.map((evaluate) => (
          <FormControlLabel control={<Checkbox />} label={evaluate} />
        ))}
      </div>
    </>
  );
}
