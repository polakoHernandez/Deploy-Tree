import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "70%", lg: "50%" },
  height: { xs: "500px", sm: "300px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalData({ data, open, close }) {
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
            <Typography sx={estilos.titulo}>Datos del usuarios</Typography>
            <Box
              sx={{
                // backgroundColor: "gray",
                height: "93%",
                overflowY: "scroll",
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={estilos.subtitle}>Documento</Typography>
                  <Typography>{data.ID}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={estilos.subtitle}>Nombre</Typography>
                  <Typography>{data.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={estilos.subtitle}>Apellido</Typography>
                  <Typography>{data.lastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={estilos.subtitle}>Email</Typography>
                  <Typography>{data.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={estilos.subtitle}>Celular</Typography>
                  <Typography>{data.cellPhone}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={estilos.subtitle}>Rol</Typography>
                  <Typography>{data.role}</Typography>
                </Grid>
              </Grid>
            </Box>
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
