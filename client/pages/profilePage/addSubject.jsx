import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteButton } from "./profile";

export default function AddSubject({ id, setNewSubject }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [error, setError] = useState("");

  const [ws, setWs] = useState("");

  const subjectObj = { subjectName, subjectCode, startDate, endDate };

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    setWs(ws);

    // get data from websockets
    ws.onmessage = (s) => {
      const { subjectName } = JSON.parse(s.data);
      setNewSubject((oldState) => [...oldState, { subjectName }]);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      ws.send(JSON.stringify(subjectObj));
      const url = `${
        window.location.origin
      }/api/users/subject/${id}/${encodeURIComponent(
        JSON.stringify(subjectObj)
      )}`;
      const { data: res } = await axios.post(url, subjectObj);
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
    <div className={"bottomSheet"}>
      <h2 style={{ paddingTop: "50px" }}> Legg til emne</h2>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
          <TextField
            type="text"
            name="subjectName"
            style={{ background: "white" }}
            InputLabelProps={{
              style: { fontSize: "1.5vh" },
            }}
            inputProps={{
              style: { height: "2vh", fontSize: "1.5vh" },
            }}
            label={"Emne Navn"}
            onChange={(e) => setSubjectName(e.target.value)}
            value={subjectName}
          />
        </div>

        <div>
          <TextField
            type="text"
            name="subjectCode"
            style={{ background: "white" }}
            InputLabelProps={{
              style: { fontSize: "1.5vh" },
            }}
            inputProps={{
              style: { height: "2vh", fontSize: "1.5vh" },
            }}
            label={"Emne kode"}
            margin="normal"
            onChange={(e) => setSubjectCode(e.target.value)}
            value={subjectCode}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label={"Emne start"}
            onChange={(newValue) => setStartDate(newValue)}
            value={startDate}
            renderInput={(params) => (
              <TextField
                style={{ background: "white" }}
                InputLabelProps={{
                  style: { fontSize: "1.1vh" },
                }}
                inputProps={{
                  style: { width: "2vh", fontSize: "2vh" },
                }}
                margin={"normal"}
                {...params}
              />
            )}
          />
          <DatePicker
            label={"Emne slutt"}
            inputFormat="dd/MM/yyyy"
            onChange={(newValue) => setEndDate(newValue)}
            value={endDate}
            renderInput={(params) => (
              <TextField
                style={{ background: "white" }}
                InputLabelProps={{
                  style: { fontSize: "1.1vh" },
                }}
                inputProps={{
                  style: { width: "2vh", fontSize: "2vh" },
                }}
                margin={"normal"}
                {...params}
              />
            )}
          />
        </LocalizationProvider>

        <div>
          <Button
            type={"submit"}
            style={{
              top: "10px",
              background: "#E0E4DA",
              fontSize: "30px",
              fontWeight: "bold",
              color: "#2E7713",
              borderRadius: "50px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            Start emne
          </Button>
        </div>
      </form>
      <div style={{ marginTop: 20 }}>
        <DeleteButton label={"Slett bruker"} id={id} />
      </div>
    </div>
  );
}
