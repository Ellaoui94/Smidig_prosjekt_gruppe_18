import { Link } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Container, IconButton, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import "./register.css";

const handleSubmit = (e) => {
  e.preventDefault();
};

const schools = ["Høyskolen Kristiania", "Oslo Met", "UIO", "Høyskolen Kristiania Bergen", "UIO Bergen"];

export function NewProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(null);
  const [school, setSchool] = useState("");

  console.log(date);

  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <IconButton component={Link} to="/" size="large" aria-label="menu" sx={{ mr: "auto" }}>
        <ArrowBackIosNew />
      </IconButton>

      <Container maxWidth="md">

        <h1 style={{ color: "#023F4A" }}>Registrer deg her</h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { width: "25ch" },
            "select": {width: "55ch", display: "flex"}
          }}
        >
          <TextField style={{ background: "white" }}
                     label={"Navn"}
                     margin="normal"
                     type="text"
                     onChange={(e) => setUserName(e.target.value)}
                     value={userName}
                     required
          />

          <TextField style={{ background: "white" }} label={"Etternavn"} margin="normal" required/>

          <TextField style={{ background: "white" }}
                     label={"E-post"}
                     margin="normal"
                     type="email"
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                     required
          />

          <TextField style={{ background: "white" }}
                     label={"Passord"}
                     margin="normal"
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
                     required
          />

          <TextField style={{ background: "white" }} label={"Gjenta passord"} margin="normal" required/>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={"Fødselsdato"} onChange={(newValue) => setDate(newValue)}
              value={date}
              renderInput={(params) => <TextField style={{ background: "white" }}
                                                  margin={"normal"} {...params} />} />
          </LocalizationProvider>

          <label>
            <select onChange={(e) => setSchool(e.target.value)}>
              <option value="" selected>
                Skole
              </option>
              {schools.map((school) => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
          </label>

          <button>yes</button>
          {/*    {!isPending && <Button style={{
              top: "10px",
              background: "#3E989C",
              fontSize: "25px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px"
            }} className={buttonStyle}>Registrer deg</Button>}
            {isPending && <button disabled>loading</button>}
            {error && <p>{error}</p>}*/}
        </Box>
      </Container>
    </form>
  );
}
