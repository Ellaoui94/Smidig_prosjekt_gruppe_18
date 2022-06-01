import { Helmet } from "react-helmet";
import imgTwo from "./images/imgTwo.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { motion } from "framer-motion"


export default function PageTwo({setRegistered}) {
  return (
    <motion.div
      style={{ color: "white",
        background:"#508B0A",
        position: "fixed",
        top: 0}}
      className={"content"}
      initial={{ x: -window.innerWidth}}
      animate={{x: 0, transition: {duration: 1}}}
      exit={{x: -window.innerWidth, transition: {duration: 1}}}
    >
      <div className={"content"} style={{color: "white"}}>
        <img width={"600px"} src={imgTwo} alt="imgTwo" />
        <h1>
        Samarbeid med
        andre studenter
      </h1>
      <p>
        Vi gjør det enklere for deg å få tak folk for
        arbeidet ditt
      </p>
        <Button component={Link} to="/intro/introThree"
                onClick={setRegistered(true)}
                style={{
                  background: "#D5DACD",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#365F07",
                  borderRadius: "50px"
                }}>-></Button>
      </div>
    </motion.div>
  );
}