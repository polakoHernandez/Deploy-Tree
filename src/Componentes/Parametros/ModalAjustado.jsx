import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Close, Pool } from "@mui/icons-material";
import InputGeneral from "../General/InputGeneral";
import Alertas from "../General/Alertas";

function ModalAjustado({ open, close, idPool, idHistorico, CloroPh }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", md: "50%", lg: "40%" },
    height: { xs: "500px", sm: "500px", md: "300px", lg: "300px" },
    bgcolor: "background.paper",
    //   border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    overflowY: "scroll",
  };

  const [nombreParametro, setNombreParametro] = useState(CloroPh?.nombre);
  const [desactivar, setDesactivar] = useState(false);
  const [abrirAlerta, setAbrirAlerta] = useState(false);
  const [color, setColor] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [data, setData] = useState({
    valor: "",
  });

  const catchData = (e) => {
    setData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  const porFin = async () => {
    setDesactivar(true);

    if (CloroPh.nombre === "Cloro") {
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/history-pool-param/${idHistorico}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
            "x-token": localStorage.getItem("clave"),
          },
          body: JSON.stringify({
            nameParam: CloroPh.nombre,
            "paramChlorine.ppmActual": data.valor,
          }),
        }
      );

      switch (response.status) {
        case 200:
          const respuesta = await response.json();
          console.log(
            "%cMi Data",
            "color: green; font-weight: bold; font-size: 16px;"
          );
          console.log({ NUEVAPRUEBA: respuesta });

          setDesactivar(false);
          setAbrirAlerta(true);
          setColor("success");
          setMensaje(respuesta.msg);
          close();
          break;
      }
    } else if (CloroPh.nombre === "Ph") {
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/history-pool-param/${idHistorico}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
            "x-token": localStorage.getItem("clave"),
          },
          body: JSON.stringify({
            nameParam: CloroPh.nombre,
            "paramPh.ppmActual": data.valor,
          }),
        }
      );

      switch (response.status) {
        case 200:
          const respuesta = await response.json();
          console.log(
            "%cMi Data",
            "color: green; font-weight: bold; font-size: 16px;"
          );

          console.log({ NUEVAPRUEBA: respuesta });
          setDesactivar(false);
          setAbrirAlerta(true);
          setColor("success");
          setMensaje(respuesta.msg);
          close();

          break;
      }
    }
  };

  useEffect(() => {
    if (CloroPh) {
      setNombreParametro(CloroPh.nombre || "");
    }
  }, [CloroPh]);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                  <IconButton onClick={close}>
                    <Close></Close>
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    // backgroundColor: "red",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "25px",
                  }}
                >
                  Ajustando el parámetro
                </Typography>
              </Grid>
              <Grid item={12}>
                <Box
                  sx={{
                    backgroundColor: "rgb(    255, 218, 128   )",
                    height: "60px",
                    padding: "20px",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Señor usuario para ajustar el parametro por favor ingrese un
                    valor que este dentro del rango permitido
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <InputGeneral
                  name="valor"
                  onChange={catchData}
                  label="PPM actual"
                  icon={<Pool></Pool>}
                  type="number"
                ></InputGeneral>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => porFin()}
                  disabled={desactivar}
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    marginLeft: { xs: "10%", sm: "10%", md: "10%", lg: "10%" },
                  }}
                >
                  {desactivar === true ? (
                    <CircularProgress
                      color="inherit"
                      size={24}
                    ></CircularProgress>
                  ) : (
                    "Guardar"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Alertas
        open={abrirAlerta}
        cerrar={() => setAbrirAlerta(false)}
        mensaje={mensaje}
        severity={color}
      ></Alertas>
    </div>
  );
}

export default ModalAjustado;
