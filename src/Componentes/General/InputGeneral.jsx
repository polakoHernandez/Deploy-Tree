import React, { useState } from "react";
import { Box, TextField, InputLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function InputGeneral({
  label,
  placeholder,
  icon,
  name,
  type,
  onChange,
  inputRef,
  value,
  error,
  disabled,
  step,
}) {
  const [see, setSee] = useState(false);
  const theme = createTheme({
    palette: {
      luva: {
        main: "rgb(0,164,228)", // Cambia 'tu_color_personalizado' al color que desees
      },
    },
  });
  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <InputLabel
          sx={{
            // backgroundColor: "red",
            position: "absolute",
            top: "5px",
            left: { xs: "5%", sm: "5%", md: "5%" },
            fontFamily: "'Nunito Sans', sans-serif",
            color: "black",
          }}
        >
          {label}
        </InputLabel>
        <TextField
          disabled={disabled}
          error={error}
          value={value}
          inputRef={inputRef}
          onChange={onChange}
          name={name}
          variant="outlined"
          focused
          placeholder={placeholder}
          color="luva"
          type={type}
          // type={see ? "text" : "password"}
          sx={{
            width: "90%",
            marginLeft: "5%",
            marginTop: "30px",
            borderRadius: "20px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setSee(!see)}
                  edge="end"
                  sx={{
                    backgroundColor: "rgb(0,164,228)",
                    color: "white",
                    width: "50px",
                    height: "55px",
                    borderRadius: "5px 0px 0px 5px",
                    marginLeft: "-22px",
                    marginRight: "10px",
                    "&:hover": {
                      backgroundColor: "rgb(0,164,228)",
                    },
                  }}
                >
                  {icon}
                  {/* {see ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default InputGeneral;
