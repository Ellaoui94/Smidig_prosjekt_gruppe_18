import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Session() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/end-session");
  };
  return (
    <div>
      <h1>Aktiv økt</h1>
      <form onSubmit={handleSubmit}>
        <p>Her skal kart komme</p>
        <p>Velge arbeidsstatus</p>
        <p>legge til mål</p>

        <button>Vuder økten og avslutt</button>
      </form>
    </div>
  );
}
