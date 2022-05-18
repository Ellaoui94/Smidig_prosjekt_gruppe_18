import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import './login.css'

export function LoginPage() {
  return (
    <form className={"loginForm"}>
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
      <TextField required style={{background: "white"}} label={'Email eller brukernavn'} type={"text"} margin="normal"/>

      <TextField required style={{background: "white"}} label={'Passord'} type={"password"} margin="normal"/>

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