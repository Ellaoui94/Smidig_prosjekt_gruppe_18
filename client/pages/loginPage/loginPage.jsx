import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import "./login.css";
import { motion } from "framer-motion";

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
      window.location = "/main-page";
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
    <motion.form
      initial={{ width: 0 }}
      animate={{ width: "100%", transition: { duration: 0.5 } }}
      exit={{ x: -window.innerWidth }}
      className={"loginForm"}
      onSubmit={handleSubmit}
    >
      <IconButton
        component={Link}
        to="/"
        size="large"
        aria-label="menu"
        sx={{ mr: "auto" }}
      >
        <ArrowBackIosNew />
      </IconButton>

      <h1 style={{ color: "#023F4A" }}>Logg In</h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          "& .MuiTextField-root": { width: "50ch" },
        }}
      >
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
            top: "10px",
            background: "#326683",
            fontSize: "60px",
            fontWeight: "bold",
            color: "white",
            borderRadius: "50px",
          }}
        >
          {" "}
          Logg inn
        </Button>
      </Box>
    </motion.form>
  );
}
