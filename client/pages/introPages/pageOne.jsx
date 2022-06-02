import { Helmet } from "react-helmet";
import imgOne from "./images/imgOne.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"


export default function PageOne({ setRegistered }) {
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
        <img width={"600px"} src={imgOne} alt="imgOne" />
        <h1>
          Hold enkelt styr på
          arbeidet dit
        </h1>
        <p>
          Vi hjelper deg til å organisere
          arbeidet ditt
        </p>
        <Button component={Link} to="/intro/introTwo"
                onClick={setRegistered(true)}
                style={{
                  background: "#D5DACD",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#365F07",
                  borderRadius: "50px"
                }}>-></Button>
    </motion.div>
  );
}