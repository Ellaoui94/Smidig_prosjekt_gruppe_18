import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "./register.css";

const schools = [
  "Høyskolen Kristiania",
  "Oslo Met",
  "UIO",
  "Høyskolen Kristiania Bergen",
  "UIO Bergen",
];

export function NewProfile({ setRegistered }) {
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
      const url = `${window.location.origin}/api/users`;
      const { data: res } = await axios.post(url, data);
      navigate("/intro/introOne");
      setRegistered(true);
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

      <h1 style={{ color: "#023F4A", fontSize: 60 }}>Registrer deg her</h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          "& .MuiTextField-root": { width: "50ch" },
        }}
      >
        <TextField
          type="text"
          name="firstName"
          style={{ background: "white" }}
          InputLabelProps={{
            style: { fontSize: "1.5vh" },
          }}
          inputProps={{
            style: { height: "4vh", fontSize: "2vh" },
          }}
          label={"Fornavn"}
          margin="normal"
          onChange={handleChange}
          value={data.firstName}
          required
        />

        <TextField
          type="text"
          name="lastName"
          style={{ background: "white" }}
          InputLabelProps={{
            style: { fontSize: "1.5vh" },
          }}
          inputProps={{
            style: { height: "4vh", fontSize: "2vh" },
          }}
          label={"Etternavn"}
          margin="normal"
          onChange={handleChange}
          value={data.lastName}
          required
        />

        <TextField
          type="email"
          name="email"
          style={{ background: "white" }}
          InputLabelProps={{
            style: { fontSize: "1.5vh" },
          }}
          inputProps={{
            style: { height: "4vh", fontSize: "2vh" },
          }}
          label={"Email"}
          margin="normal"
          onChange={handleChange}
          value={data.email}
          required
        />

        <TextField
          type="password"
          name="password"
          style={{ background: "white" }}
          InputLabelProps={{
            style: { fontSize: "1.5vh" },
          }}
          inputProps={{
            style: { height: "4vh", fontSize: "2vh" },
          }}
          label={"Passord"}
          margin="normal"
          onChange={handleChange}
          value={data.password}
          required
        />
        {error && <div>{error}</div>}
        <Button
          type={"submit"}
          style={{
            top: "60px",
            background: "#326683",
            fontSize: "60px",
            fontWeight: "bold",
            color: "white",
            borderRadius: "50px",
          }}
        >
          Registrer deg
        </Button>
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
    </form>
  );
}
