import React from "react";
import { Button, Snackbar, Typography, Box } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function AlertaCalcular({
  open,
  severity,
  mensaje,
  cerrar,
  adicionar,
  render,
}) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={open} onClose={cerrar}>
      <Alert onClose={cerrar} severity={severity} sx={{ width: "100%" }}>
        <Box>
          <Typography>{mensaje}</Typography>
          <Button variant="contained" onClick={adicionar}>
            Adicionar
          </Button>
        </Box>
      </Alert>
    </Snackbar>
  );
}

export default AlertaCalcular;
