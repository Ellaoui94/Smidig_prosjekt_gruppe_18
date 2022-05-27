import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const evaluation = ["Bra", "Helt ok", "Dårlig"];

export function EndSession({ emailInput }) {
  const [data, setData] = useState({
    email: "",
    evaluation: "",
    focus: "",
    other: "",
    finished: true,
  });

  console.log("inside startSession: " + emailInput);

  data.email = emailInput;

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("testing: " + data.evaluate);
      const url = `${window.location.origin}/api/session/update/${emailInput}`;
      const { data: res } = await axios.post(url, data);
      console.log("inside handelSubmit try: " + data.email);
      navigate("/main-page");
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
    <>
      <h1>Etter å ha trykket start på start siden kommer man hit</h1>
      <form onSubmit={handleSubmit}>
        <h2>Vurder økten</h2>
        {evaluation.map((evaluate) => (
          <div>
            {evaluate}
            <input
              type="checkbox"
              name="evaluation"
              label={"evaluation"}
              onChange={handleChange}
              value={evaluate}
            />
          </div>
        ))}

        <h2>Hvordan var fokuset under denne økten?</h2>
        {evaluation.map((evaluate) => (
          <div>
            {evaluate}
            <input
              type="checkbox"
              name="focus"
              label={"focus"}
              onChange={handleChange}
              value={evaluate}
            />
          </div>
        ))}

        <h2>Legg til kommentar</h2>
        <textarea
          name="other"
          label={"other"}
          onChange={handleChange}
          value={data.other}
        />
        <div>
          <button>Avslutt økt</button>
        </div>

        {error && <div>{error}</div>}
      </form>
    </>
  );
}
