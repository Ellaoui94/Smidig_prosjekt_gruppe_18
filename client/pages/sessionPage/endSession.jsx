import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./session.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

/*
   Here is the code for when you want to end an active session
 */

const evaluation = ["Bra", "Helt ok", "Dårlig"];

export function EndSession({ emailInput }) {
  const [endDateSession, setEndDateSession] = useState(null);
  const { sessionId } = useParams();

  const [data, setData] = useState({
    email: "",
    evaluation: "",
    focus: "",
    comment: "",
    stage: "finished",
    endDate: null,
  });

  console.log("inside startSession: " + emailInput);

  data.email = emailInput;
  data.endDate = endDateSession;

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

      //change session stage from active to finished
      const setStageUrl = `${window.location.origin}/api/session/set-session-to-finished/${sessionId}`;
      const { data: result } = await axios.post(setStageUrl, {
        stage: "finished",
      });
      console.log(result.data);
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            name="endDate"
            label={"endDate"}
            onChange={(newValue) => setEndDateSession(newValue)}
            value={endDateSession}
            renderInput={(params) => (
              <TextField
                style={{ background: "white" }}
                margin={"normal"}
                {...params}
              />
            )}
          />
        </LocalizationProvider>

        <div>
          <button className={"end-session-btn"}>Avslutt økt</button>
        </div>

        {error && <div>{error}</div>}
      </form>
    </>
  );
}
