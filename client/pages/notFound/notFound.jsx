import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function NotFound({ id }) {
  return (
    <div>
      {id ? (
        <div>
          <h1>Du er allerede logget inn</h1>
          <Button
            component={Link}
            to="/main-page"
            style={{
              background: "#023F4A",
              fontSize: "25px",
              fontWeight: "bold",
              color: "#DCE5D1",
              borderRadius: "50px",
            }}
          >
            Til forsiden
          </Button>
        </div>
      ) : (
        <div>
          <h1>Siden finnes ikke, har du prøvd å logge inn?</h1>
          <Button
            component={Link}
            to="/register"
            style={{
              background: "#023F4A",
              fontSize: "25px",
              fontWeight: "bold",
              color: "#DCE5D1",
              borderRadius: "50px",
            }}
          >
            Registrer deg
          </Button>

          <Button
            component={Link}
            to="/login"
            style={{
              marginLeft: "10px",
              background: "#023F4A",
              fontSize: "25px",
              fontWeight: "bold",
              color: "#DCE5D1",
              borderRadius: "50px",
            }}
          >
            {" "}
            Logg inn
          </Button>
        </div>
      )}
    </div>
  );
}
