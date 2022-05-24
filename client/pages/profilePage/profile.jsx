import React, { useContext, useEffect, useState } from "react";
import { editUser } from "./editUser";
import { UserApiContext } from "../../userApiContext";
import { useLoading } from "../../useLoading";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";


async function getUser() {
  const res = await axios.get(`${window.location.origin}/api/auth/me`)

  const user = {firstName: res.data.firstName, lastName: res.data.lastName, email: res.data.email}

  return user
}

export function Logout() {
  const navigate = useNavigate();
  const { endSession } = useContext(UserApiContext);
  useEffect(async () => {
    await endSession();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function ProfileCard({ profile: { firstName, lastName } }) {
  return (
    <>
      <div className={"profile-card"}>
        <h3>
          {firstName}, {lastName}
        </h3>
      </div>
    </>
  );
}

function DeleteButton({ label, email }) {
  async function deleteUser() {
    await axios.delete(`${window.location.origin}/api/users/delete/${email}`)
  }

  return (
    <div>
      <button onClick={deleteUser}>{label}</button>
    </div>
  );
}

function EditUserButton({ label }) {
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
      const url = `${window.location.origin}/api/users/update`;
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
          <TextField
            type="text"
            name="firstName"
            style={{ background: "white" }}
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
            label={"Email"}
            margin="normal"
            onChange={handleChange}
            value={data.email}
            required
          />

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
            Ender bruker
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

export function Profile() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  useEffect(async () => {
    const user = await getUser()

    console.log(user)

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
  }, [])

const profile = {firstName, lastName}

  return (
    <>
      <h1>Profile</h1>
      <p>(Profile-photo + add new photo function in here)</p>


      <EditUserButton/>

      <DeleteButton label={"Slett bruker"} email={email}/>

      <ProfileCard profile={profile}/>

      <Link to={"/delete"}>Log out</Link>
    </>
  );
}
