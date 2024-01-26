import React from "react";
// import "../../Estilos/General/texfiledGeneral.css";
import { Box, Icon, Typography } from "@mui/material";
import { Pool } from "@mui/icons-material";

function TexfieldFiles({ type, onChange, iconname, name, label }) {
  return (
    <Box className="">
      <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
        {label}
      </Typography>
      <Box>
        <input type="file" onChange={onChange} name={name}></input>
      </Box>
    </Box>
  );
}

export default TexfieldFiles;
