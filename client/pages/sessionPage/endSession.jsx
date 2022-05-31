import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./session.css";

const evaluation = ["Bra", "Helt ok", "Dårlig"];

export function EndSession({ emailInput }) {
  const [data, setData] = useState({
    email: "",
    evaluation: "",
    focus: "",
    comment: "",
    stage: "finished",
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
      <h1>Hvordan gikk studieøkten?</h1>
      <form onSubmit={handleSubmit}>
        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Vurder økten</h2>
          {evaluation.map((evaluate) => (
            <div className={"session-card-div"}>
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
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Hvordan var fokuset under denne økten?</h2>
          {evaluation.map((evaluate) => (
            <div className={"session-card-div"}>
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
        </div>

        <div className={"session-div"} style={{ backgroundColor: "white" }}>
          <h2>Legg til kommentar</h2>
          <textarea
            name="comment"
            label={"comment"}
            onChange={handleChange}
            value={data.comment}
          />
        </div>
        <div>
          <button className={"end-session-btn"}>Avslutt økt</button>
        </div>

        {error && <div>{error}</div>}
      </form>
    </>
  );
}
