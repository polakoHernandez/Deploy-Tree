import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function Alertas({ open, severity, mensaje, cerrar }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={open} onClose={cerrar}>
      <Alert onClose={cerrar} severity={severity} sx={{ width: "100%" }}>
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

export default Alertas;
