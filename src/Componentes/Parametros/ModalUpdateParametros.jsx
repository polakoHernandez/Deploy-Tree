import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton } from "@mui/material";
import InputGeneral from "../General/InputGeneral";
import { Close, Poll, Pool } from "@mui/icons-material";
import { useState, useEffect } from "react";
import InputSelect from "../General/InputSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "70%", lg: "70%" },
  height: { xs: "500px", sm: "400px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalUpdateParametros({ data, open, close }) {
  const [dataUpdata, setDataUpdate] = useState({
    nombre: data?.normativityId?.nameNormativity,
    responsable: data?.name,
    piscina: data?.poolId?.[0]?.name,
  });

  useEffect(() => {
    // Actualizar el estado cuando las props (data) cambien
    setDataUpdate({
      nombre: data?.normativityId?.nameNormativity,
      responsable: data?.name,
      piscina: data?.poolId?.[0]?.name,
      fecha: data?.createAt,
    });
  }, [data]);

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
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Grid>
                <IconButton onClick={() => close()}>
                  <Close></Close>
                </IconButton>
              </Grid>
            </Box>

            <Typography sx={estilos.titulo}>Actualizar </Typography>
            <Box
              sx={{
                // backgroundColor: "gray",
                height: "93%",
                overflowY: "scroll",
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} sm={6}>
                  <InputGeneral
                    value={dataUpdata.nombre}
                    label="Nombre"
                    icon={<Pool></Pool>}
                  ></InputGeneral>
                  <Typography></Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputGeneral
                    value={dataUpdata.responsable}
                    label="Responsable"
                    icon={<Pool></Pool>}
                  ></InputGeneral>

                  <Typography>{data?.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputGeneral
                    value={dataUpdata.piscina}
                    label="Piscina"
                    icon={<Pool></Pool>}
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" fullWidth>
                    Guardar
                  </Button>
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
