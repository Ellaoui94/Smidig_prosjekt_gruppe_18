import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function AddSubject({id, handleNewSubject}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const [error, setError] = useState("");

  const subjectObj = {subjectName, subjectCode, startDate, endDate}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${window.location.origin}/api/users/subject/${id}/${encodeURIComponent(JSON.stringify(subjectObj))}`;
      const { data: res } = await axios.post(url, subjectObj);
      handleNewSubject(subjectObj)
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
            label={"Emne Navn"}
            onChange={(e) => setSubjectName(e.target.value) }
            value={subjectName}
          />
        </div>

        <div>
          <TextField
            type="text"
            name="subjectCode"
            style={{ background: "white" }}
            label={"Emne kode"}
            margin="normal"
            onChange={(e) => setSubjectCode(e.target.value)}
            value={subjectCode}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={"Emne start"}
            onChange={(newValue) => setStartDate(newValue)}
            value={startDate}
            renderInput={(params) => (
              <TextField
                style={{ background: "white" }}
                margin={"normal"}
                {...params}
              />
            )}
          />
          <DatePicker
            label={"Emne slutt"}
            onChange={(newValue) => setEndDate(newValue)}
            value={endDate}
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
          <Button
            type={"submit"}
            style={{
              top: "10px",
              background: "#3E989C",
              fontSize: "25px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "50px"
            }}
          >Logg inn
          </Button>
        </div>
      </form>
    </div>
  );
}