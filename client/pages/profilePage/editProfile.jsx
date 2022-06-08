import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

/* Needs handleSubmit and handleInput to fully work. */
/* THIS CODE _DOES NOT WORK_ */

/*export function editUser() {
  const [user, setUser] = useState("");
  useEffect(() => {
    //Waiting on database
    try {
      //ye this doesnt work...
      const user = updateUserProfile();
      setUser(user.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <div>Edit user</div>;
}*/

/* This is taken from Johannes' repo, postJSON. Only thing I edited is "PUT", but doesnt know
 * if that will work. Probably not. */
/*async function updateJSON(url, object) {
  //doublecheck that this one makes updates!
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

async function updateUserProfile(user) {
  //doublecheck if url-endpoint-user_id and "user" is the same thing.
  return await updateJSON(`/api/profile/edit/${user_id}`, user);
}*/


export function EditProfile({ id }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/users/update/${id}`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/profile";
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
        to="/profile"
        size="large"
        aria-label="menu"
        sx={{ mr: "auto" }}
      >
        <ArrowBackIosNew />
      </IconButton>

        <h1 style={{ color: "#023F4A" }}>Endre informasjon om din bruker</h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": { width: "50ch" },
          }}
        >
          <TextField
            type="text"
            name="firstName"
            style={{ background: "white" }}
            InputLabelProps={{
              style: { fontSize: "1.5vh" }
            }}
            inputProps={{
              style: { height: "4vh", fontSize: "2vh" }
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
              style: { fontSize: "1.5vh" }
            }}
            inputProps={{
              style: { height: "4vh", fontSize: "2vh" }
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
              style: { fontSize: "1.5vh" }
            }}
            inputProps={{
              style: { height: "4vh", fontSize: "2vh" }
            }}
            label={"Email"}
            margin="normal"
            onChange={handleChange}
            value={data.email}
            required
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
    </form>
  );
}