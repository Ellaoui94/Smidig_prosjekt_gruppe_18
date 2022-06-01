import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import imgThree from "./images/imgThree.png";
import { motion } from "framer-motion"


export default function PageThree({ setRegistered }) {
  return (
    <motion.div
      style={{ color: "white",
        background:"#3E6C8C",
        position: "fixed",
        top: 0}}
      className={"content"}
      initial={{ x: -window.innerWidth}}
      animate={{x: 0, transition: {duration: 1}}}
      exit={{x: -window.innerWidth, transition: {duration: 1}}}
    >
        <img src={imgThree} alt="imgThree" />
        <h1>Få kontroll i dag</h1>
        <Button component={Link} to="/login"
                onClick={() => setRegistered(false)}
                style={{
                  background: "#D5DACD",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#365F07",
                  borderRadius: "50px"
                }}>Kom i gang</Button>
    </motion.div>
  );
}