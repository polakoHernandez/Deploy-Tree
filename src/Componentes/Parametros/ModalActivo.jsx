import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { listarUsuario } from "../../services/usuario/sevices";
import styles from "../../Estilos/Usuarios/MiPerfil";
import Avatar from "@mui/material/Avatar";
import img from "../../assets/alerta.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "400%", lg: "400px" },
  height: { xs: "400px", sm: "400px", md: "400px", lg: "400px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalActivo({ open, close }) {
  const [data, setData] = useState("");

  const catchDataUsuario = () => {
    listarUsuario().then((res) => {
      console.log(res);

      switch (res.status) {
        case 200:
          console.log(res);
          setData(res.respuesta.userID);
          return;

        case 401:
          return;

        case 500:
          return;
      }
    });
  };

  useEffect(() => {
    catchDataUsuario();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid
              container
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                  <IconButton onClick={() => close()}>
                    <Close></Close>
                  </IconButton>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={img}></img>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "25px",
                  }}
                >
                  Ya existe una asignación activa!
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const estilos = {
  titulo: {
    // backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "25px",
  },

  subtitle: {
    fontFamily: "'Nunito Sans', sans-serif",
    borderBottom: "2px solid rgb(0,164,228)",
  },
};
