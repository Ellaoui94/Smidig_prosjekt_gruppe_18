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
    bio: ""
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.faceBook.length > 1 && data.faceBook.substring(0, 25) !== "https://www.facebook.com/") {
        setError("Dette er ikke en link til facebook profil");
      } else if (data.discord.length > 1 && data.discord.substring(0, 29) !== "https://discordapp.com/users/") {
        setError("Dette er ikke en discord link");
      } else {
        const url = `${window.location.origin}/api/contactInfo`;
        const { data: res } = await axios.post(url, data);
        localStorage.setItem("token", res.data);
        window.location = "/profile";
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
            alignItems: "center",
            "& .MuiTextField-root": { width: "50ch" }
          }}
        >
          <TextField
            type="text"
            name="faceBook"
            style={{ background: "white" }}
            InputLabelProps={{
              style: { fontSize: "1.5vh" }
            }}
            inputProps={{
              style: { height: "4vh", fontSize: "2vh" }
            }}
            label={"Facebook link"}
            margin="normal"
            onChange={handleChange}
            value={data.faceBook}
          />

          <TextField
            type="text"
            name="discord"
            style={{ background: "white" }}
            InputLabelProps={{
              style: { fontSize: "1.5vh" }
            }}
            inputProps={{
              style: { height: "4vh", fontSize: "2vh" }
            }}
            label={"Discord link"}
            margin="normal"
            onChange={handleChange}
            value={data.discord}
          />

          <TextField
            type="text"
            name="bio"
            style={{ background: "white" }}
            InputLabelProps={{
              style: { fontSize: "1.5vh" }
            }}
            inputProps={{
              style: { height: "4vh", fontSize: "1vh" }
            }}
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
              background: "#5D7C8D",
              fontSize: "60px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px",
              boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
            }}
          >
            Legg til
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