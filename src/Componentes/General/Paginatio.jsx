import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Box, Pagination } from "@mui/material";

function Paginations() {
  const [actual, setActual] = useState(1);

  const incrementar = () => {
    if (actual === 3) {
      return;
    }
    setActual(actual + 1);
  };

  const disminuir = () => {
    if (actual === 1) {
      return;
    }
    setActual(actual - 1);
  };

  const MyBox1 = styled(Box)({
    width: "100%",
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    display: actual === 1 ? "flex" : "none",
  });

  const MyBox2 = styled(Box)({
    width: "100%",
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    display: actual === 2 ? "flex" : "none",
  });

  const MyBox3 = styled(Box)({
    width: "100%",
    backgroundColor: "violet",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    display: actual === 3 ? "flex" : "none",
  });

  const MyButton = styled(Button)({
    width: "100%",
    backgroundColor: "violet",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    "&:hover": {
      backgroundColor: "violet",
      height: "10vh",
    },
  });

  return (
    <Box sx={{}}>
      <MyBox1>1</MyBox1>
      <MyBox2>2</MyBox2>
      <MyBox3>3</MyBox3>

      <MyButton onClick={() => incrementar()}>Aumentar {actual}</MyButton>
      <MyButton onClick={() => disminuir()}>Disminuir{actual}</MyButton>
    </Box>
  );
}

export default Paginations;
