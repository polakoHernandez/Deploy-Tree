import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "900px", lg: "900px" },
  height: { xs: "500px", sm: "500px", md: "00px", lg: "400px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "scroll",
};

export default function ModalDetalles({ data, open, close }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid xs={12}>
              <Box
                sx={{ width: "100%", display: "flex", justifyContent: "end" }}
              >
                <IconButton onClick={() => close()}>
                  <Close></Close>
                </IconButton>
              </Box>
            </Grid>
            <Typography sx={estilos.titulo}>
              Detalle ajuste dosificación
            </Typography>
            <Box
              sx={{
                // backgroundColor: "gray",
                height: "93%",
                overflowY: "scroll",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} mb={5}>
                  <Typography sx={estilos.subtitle}>Fecha</Typography>
                  <Typography>
                    {new Date(data.fecha).toLocaleDateString()}
                  </Typography>{" "}
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>Hora</Typography>
                  <Typography>
                    {" "}
                    {new Date(data.fecha).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>Responsable</Typography>
                  <Typography>
                    {`${data?.usuario} ${data?.apellido}`}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Nombre del parámetro
                  </Typography>
                  <Typography>{data.nombre}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} mb={5}>
                  <Typography sx={estilos.subtitle}>
                    Medición deseada mínimo
                  </Typography>
                  <Typography>{data.minimo}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Medición deseada maxíma
                  </Typography>
                  <Typography>{data.maximo}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Medición inicial
                  </Typography>
                  <Typography>{data.real}</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Producto químico
                  </Typography>
                  {/* <Typography>{data.description}</Typography> */}
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Cantidad dosificada
                  </Typography>
                  {/* <Typography>{data.description}</Typography> */}
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Medición ajustada
                  </Typography>
                  {/* <Typography>{data.description}</Typography> */}
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
    marginBottom: "30px",
  },

  subtitle: {
    fontFamily: "'Nunito Sans', sans-serif",
    borderBottom: "2px solid rgb(0,164,228)",
  },
};
