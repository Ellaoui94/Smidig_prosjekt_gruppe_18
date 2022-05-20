import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import "./register.css";

const schools = [
  "Høyskolen Kristiania",
  "Oslo Met",
  "UIO",
  "Høyskolen Kristiania Bergen",
  "UIO Bergen",
];

export function NewProfile() {
  const [date, setDate] = useState(null);
  const [school, setSchool] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <IconButton
        component={Link}
        to="/"
        size="large"
        aria-label="menu"
        sx={{ mr: "auto" }}
      >
        <ArrowBackIosNew />
      </IconButton>

      <Container maxWidth="md">
        <h1 style={{ color: "#023F4A" }}>Registrer deg her</h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { width: "25ch" },
            select: { width: "55ch", display: "flex" },
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />
          <input
            style={{ background: "white" }}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
          <TextField
            style={{ background: "white" }}
            label={"Gjenta passord"}
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={"Fødselsdato"}
              onChange={(newValue) => setDate(newValue)}
              value={date}
              renderInput={(params) => (
                <TextField
                  style={{ background: "white" }}
                  margin={"normal"}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <label>
            <select onChange={(e) => setSchool(e.target.value)}>
              <option value="" selected>
                Skole
              </option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </label>
          {error && <div>{error}</div>}
          <Button
            type={"submit"}
            style={{
              top: "10px",
              background: "#3E989C",
              fontSize: "25px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px",
            }}
          >
            {" "}
            Logg inn
          </Button>{" "}
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
