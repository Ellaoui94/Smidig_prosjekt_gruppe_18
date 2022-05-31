import {Button} from "@mui/material";
import React from 'react'

function ButtonInfo({text, icon, click, href}) {
    return (
        <div>
            <Button  style={{
              background: "#D6DFE3",
                fontSize: "25px",
                fontWeight: "bold",
                color: "#1D4B65",
                borderRadius: "50px",
              borderColor: "#177C92"
            }} variant="contained" href={href} onClick={click} startIcon={icon}>{text}</Button>
        </div>
    )
}

export default ButtonInfo