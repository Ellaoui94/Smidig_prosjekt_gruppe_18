import {Button} from "@mui/material";
import React from 'react'

function ButtonInfo({text, icon, click, href}) {
    return (
        <div>
            <Button  style={{background: "#F8F0D3",
                fontSize: "25px",
                fontWeight: "bold",
                color: "#CD5800",
                borderRadius: "50px"
            }} variant="contained" href={href} onClick={click} startIcon={icon}>{text}</Button>
        </div>
    )
}

export default ButtonInfo