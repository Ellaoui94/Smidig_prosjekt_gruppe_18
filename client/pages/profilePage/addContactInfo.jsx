import { SiDiscord, SiFacebook } from "react-icons/si";
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useState } from "react";

export default function AddContactInfo({ id }) {
  const [data, setData] = useState({
    _id: id,
    faceBook: "",
    discord: "",
    schoolMail: "",
    bio: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ( data.faceBook.length > 1 && data.faceBook.substring(0,25) !== "https://www.facebook.com/"){
    setError("Dette er ikke en link til facebook profil")
      }else if(data.discord.length > 1 && data.discord.substring(0,29) !== "https://discordapp.com/users/"){
        setError("Dette er ikke en discord link")
      }else {
        const url = `${window.location.origin}/api/contactInfo`;
        const { data: res } = await axios.post(url, data);
        localStorage.setItem("token", res.data);
        window.location = "/main-page";
      }
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
        <h1 style={{ color: "#023F4A" }}>Endre informasjon om din bruker</h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { width: "25ch" },
            select: { width: "55ch", display: "flex" },
          }}
        >
          <TextField
            type="text"
            name="faceBook"
            style={{ background: "white" }}
            label={"Facebook link"}
            margin="normal"
            onChange={handleChange}
            value={data.faceBook}
          />

          <TextField
            type="text"
            name="discord"
            style={{ background: "white" }}
            label={"Discord link"}
            margin="normal"
            onChange={handleChange}
            value={data.discord}
          />

          <TextField
            type="email"
            name="schoolMail"
            style={{ background: "white" }}
            label={"Skole mail"}
            margin="normal"
            onChange={handleChange}
            value={data.schoolMail}
          />

          <TextField
            type="text"
            name="bio"
            style={{ background: "white" }}
            label={"Selvbiografi"}
            margin="normal"
            onChange={handleChange}
            value={data.bio}
            multiline
            rows={10}
          />

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
            Endre bruker
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
      </Container>
    </form>
  );
}