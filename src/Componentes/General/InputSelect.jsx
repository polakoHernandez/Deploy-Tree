import React, { useState } from "react";
import { Box, TextField, InputLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";

function InputSelect({
  label,
  placeholder,
  icon,
  name,
  onChange,
  options,
  value,
  inputRef,
}) {
  const [see, setSee] = useState(false);
  const theme = createTheme({
    palette: {
      luva: {
        main: "rgb(0,164,228)",
      },
    },
  });

  return (
    <ThemeProvider theme={theme} sx={{ position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <InputLabel
          sx={{
            position: "absolute",
            top: "5px",
            left: { xs: "5%", sm: "5%", md: "5%" },
            fontFamily: "'Nunito Sans', sans-serif",
            color: "black",
          }}
        >
          {label}
        </InputLabel>
        <Autocomplete
          name={name}
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={onChange}
          value={value}
          ref={inputRef}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              variant="outlined"
              focused
              placeholder={placeholder}
              color="luva"
              // value={value}
              sx={{
                width: "90%",
                marginLeft: "5%",
                marginTop: "30px",
                borderRadius: "20px",
              }}
              InputProps={{
                ...params.InputProps,
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
                        marginLeft: "-20px",
                        marginRight: "10px",
                        borderRadius: "5px 0px 0px 5px",
                        "&:hover": {
                          backgroundColor: "rgb(0,164,228)",
                        },
                      }}
                    >
                      {icon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
    </ThemeProvider>
  );
}

export default InputSelect;
