import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Close, Pool, Tune } from "@mui/icons-material";
import InputGeneral from "../General/InputGeneral";
import Alertas from "../General/Alertas";

function ModalAjustado({
  open,
  close,
  idPool,
  idHistorico,
  CloroPh,
  renderizar,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", md: "50%", lg: "40%" },
    height: { xs: "500px", sm: "500px", md: "400px", lg: "400px" },
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

  const [openAviso, setOpenAviso] = useState(false);
  const [avisoMessage, setAvisoMessage] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");
  const [inActivar, setInactivar] = useState(false);

  const [data, setData] = useState({
    valor: "",
  });

  const catchData = (e) => {
    setData((prevdata) => {
      const newData = {
        ...prevdata,
        [e.target.name]: e.target.value,
      };

      if (newData.valor < 0) {
        setOpenAviso(true);
        setAvisoMessage("No puede ingresar números negativos");
        setSeverityMessage("error");
        setInactivar(true);
      } else if (newData.valor === "0") {
        setOpenAviso(true);
        setAvisoMessage("Debe ingresar un número mayor a 0");
        setSeverityMessage("error");
        setInactivar(true);
      } else {
        setInactivar(false);
      }

      return newData;
    });
  };

  const porFin = async () => {
    setDesactivar(true);

    if (CloroPh.nombre === "Cloro") {
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/history-pool-param/${CloroPh.idGlobal}`,
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

          setDesactivar(false);
          setAbrirAlerta(true);
          setColor("success");
          setMensaje(respuesta.msg);
          close();
          renderizar();

          if (data.valor > CloroPh.maximo && data.valor !== 0) {
            const responseNuevo = await fetch(
              `https://treea-piscinas-api.vercel.app/v1/update-property-isadjusted`,
              {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
                  "x-token": localStorage.getItem("clave"),
                },

                body: JSON.stringify({
                  nameParam: CloroPh.nombre,
                  paramId: CloroPh.idCloro,
                }),
              }
            );

            let nuevaRespuesta = "";

            switch (responseNuevo.status) {
              case 200:
                nuevaRespuesta = await responseNuevo.json();
                console.log({ Ready: nuevaRespuesta });

                break;

              case 500:
                nuevaRespuesta = await responseNuevo.json();
                console.log({ Fail: nuevaRespuesta });

                break;
            }
          }

          break;
      }
    } else if (CloroPh.nombre === "Ph") {
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/history-pool-param/${CloroPh.idGlobal}`,
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

          setDesactivar(false);
          setAbrirAlerta(true);
          setColor("success");
          setMensaje(respuesta.msg);
          renderizar();
          close();

          if (data.valor < CloroPh.minimo || data.valor > CloroPh.maximo) {
            const responseNuevo = await fetch(
              `https://treea-piscinas-api.vercel.app/v1/update-property-isadjusted`,
              {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
                  "x-token": localStorage.getItem("clave"),
                },

                body: JSON.stringify({
                  nameParam: CloroPh.nombre,
                  paramId: CloroPh.idPh,
                }),
              }
            );

            let nuevaRespuesta = "";

            switch (responseNuevo.status) {
              case 200:
                nuevaRespuesta = await responseNuevo.json();
                console.log({ Ready: nuevaRespuesta });
                renderizar();

                break;

              case 500:
                nuevaRespuesta = await responseNuevo.json();
                console.log({ Fail: nuevaRespuesta });

                break;
            }
          }

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
                    Señor usuario para ajustar el parámetro por favor ingrese un
                    valor que este dentro del rango permitido
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <InputGeneral
                  placeholder="0"
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
                  disabled={desactivar || inActivar ? true : false}
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
          <Alertas
            open={openAviso}
            mensaje={avisoMessage}
            severity={severityMessage}
            cerrar={() => setOpenAviso(false)}
          ></Alertas>
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
