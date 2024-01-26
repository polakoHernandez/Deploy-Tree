import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import alerta from "../../assets/alerta.png";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "400px",
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "2px 5px 2px rgb( 193, 193, 193 )",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function ModalGeneral({
  mensaje1,
  mensaje2,
  open,
  onClick,
  img,
}) {
  const navigate = useNavigate("");

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "60px",
              color: "rgb(0,164,228)",
            }}
          >
            {mensaje1}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "30px",
            }}
          >
            {mensaje2}
          </Typography>
          <Box>
            <img src={alerta} alt="" />
          </Box>
          <Button
            variant="contained"
            sx={{ width: "90%", marginLeft: "5%" }}
            onClick={() => navigate("/")}
          >
            ACEPTAR
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
