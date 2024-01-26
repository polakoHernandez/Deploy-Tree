import React from "react";
import "../../Estilos/General/texfiledGeneral.css";
import { Box, Icon, Typography } from "@mui/material";
import { Pool } from "@mui/icons-material";

function TexfieldGeneral({ type, onChange, iconname, name, label }) {
  return (
    <Box className="">
      <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
        {label}
      </Typography>
      <Box className="container-input">
        <input
          className="input"
          type={type}
          onChange={onChange}
          name={name}
        ></input>
        <Icon
          className="icon"
          sx={{
            width: "15%",
            height: "46px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "0px 5px 5px 0px",
            backgroundColor: "rgb(0,164,228)",
            "&:hover": { color: "white" },
          }}
        >
          <Pool></Pool>
        </Icon>
      </Box>
    </Box>
  );
}

export default TexfieldGeneral;
