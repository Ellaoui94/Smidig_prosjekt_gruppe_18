import { Button, IconButton, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

export default function AddSubject() {

  return (
  <div className={"bottomSheet"}>
    <h2 style={{paddingTop: "50px"}}> Legg til emne</h2>
    <form>
      <div>
        <TextField
          type="text"
          name="subjectName"
          style={{ background: "white" }}
          label={"Emne Navn"}
        />
      </div>

      <div>
        <TextField
          type="text"
          name="subjectCode"
          style={{ background: "white" }}
          label={"Emne kode"}
          margin="normal"
        />
      </div>


      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div>
          <DatePicker
            label={"Emne start"}
            renderInput={(params) => (
              <TextField
                style={{ background: "white" }}
                margin={"normal"}
                {...params}
              />
            )}
          />
        </div>

        <DatePicker
          label={"Emne slutt"}
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
            borderRadius: "50px",
          }}
        >Logg inn
        </Button>
      </div>
    </form>
  </div>
  );
}