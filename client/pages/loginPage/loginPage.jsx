import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import './login.css'

export function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/auth`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
    <form className={"loginForm"} onSubmit={handleSubmit}>
      <IconButton component={Link} to="/" size="large" aria-label="menu" sx={{mr: 'auto'}}>
    <ArrowBackIosNew/>
  </IconButton>


  <Container maxWidth="md">

    <h1 style={{color: "#023F4A"}}>Logg In</h1>

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': {width: '25ch'},
      }}
    >
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={data.email}
        required
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={data.password}
        required
      />

      {error && <div>{error}</div>}

      <Button type={"submit"} style={{
        top: "10px",
        background: "#3E989C",
        fontSize: "25px",
        fontWeight: "bold",
        color: "white",
        borderRadius: "50px"
      }} > Logg inn</Button>

    </Box>
  </Container>
      </form>
);
}