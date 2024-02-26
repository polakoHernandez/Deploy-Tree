import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import {
  Close,
  Pool,
  CloudDownload,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import InputGeneral from "../General/InputGeneral";
import {
  OrganizarDataPorFecha,
  organizarDataExcel,
} from "../../utils/quimicos/utils";

function ModalReporte({ open, close, data }) {
  const [fechaInicial, setFechaInicia] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [notRegister, setNoRegister] = useState(false);
  const dateRef = useRef(null);
  const dateFinalRef = useRef(null);

  console.log({ dataRepote: data });

  //*fuction to download data json like excel
  const exportToExcel = () => {
    OrganizarDataPorFecha(data, fechaInicial, fechaFinal).then((res) => {
      if (res.length === 0) {
        setNoRegister(true);
        setTimeout(() => {
          setNoRegister(false);
        }, 2000);
        return;
      }

      organizarDataExcel(res).then((respuesta) => {
        // Desde este punto construyo el xlsx
        const ws = XLSX.utils.json_to_sheet(respuesta); // sección para convertir json a hoja
        const wb = XLSX.utils.book_new(); // sección para crear un nuevo libro de excel
        XLSX.utils.book_append_sheet(wb, ws, "InventarioId"); // sección para incluir datos en la hoja

        // Guardar el archivo
        XLSX.writeFile(wb, "Inventario.xlsx"); // sección para descargar el archivo con formato xlsx
        dateRef.current.value = "";
        dateFinalRef.current.value = "";
        setFechaFinal("");
        setFechaFinal("");
      });
    });
  };

  return (
    <motion.div
      initial={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "-100vh",
        left: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{
        top: open ? "0vh" : "-100vh",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.3,
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "white",
          width: "50%",
          height: "400px",
          //   border: "1px solid black",
          borderRadius: "15px",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <motion.div
          initial={{
            backgroundColor: "red",
            position: "absolute",
            top: "15px",
            height: "50px",
            width: "300px",
            borderRadius: "50px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
          animate={{
            duration: 0.3,
            x: notRegister ? -50 : -300,
          }}
        >
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                No hay registros
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SentimentVeryDissatisfied
                sx={{ fontSize: "30px", color: "white" }}
              ></SentimentVeryDissatisfied>
            </Box>
          </Box>
        </motion.div>
        <Box>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <IconButton
              onClick={() => {
                close();
                dateRef.current.value = "";
                dateFinalRef.current.value = "";
                setFechaFinal("");
                setFechaFinal("");
              }}
            >
              <Close></Close>
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: "25px",
          }}
        >
          <motion.h3
            animate={{
              opacity: 1,
              scale: 1.5, // Escala inicial
            }}
            transition={{
              delay: 2, // Retraso de 2 segundos
              duration: 1, // Duración de la animación
              scale: { duration: 1, yoyo: 1 }, // Escala de vuelta a 1 con duración y efecto yoyo
            }}
          >
            Seleccione el rango
          </motion.h3>
        </Box>
        <Box>
          <Grid>
            <InputGeneral
              label="Fecha inicial"
              inputRef={dateRef}
              icon={<Pool></Pool>}
              type="date"
              onChange={(e) => {
                console.log(e.target);
                setFechaInicia((fecha) => {
                  const fechaActual = new Date(e.target.value);
                  fechaActual.setDate(fechaActual.getDate() + 1);
                  return fechaActual.toISOString().split("T")[0];
                });
              }}
            ></InputGeneral>
          </Grid>
          <Grid>
            <InputGeneral
              inputRef={dateFinalRef}
              label="Fecha final"
              icon={<Pool></Pool>}
              type="date"
              onChange={(e) =>
                setFechaFinal((fecha) => {
                  const fechaActual = new Date(e.target.value);
                  fechaActual.setDate(fechaActual.getDate() + 1);
                  return fechaActual.toISOString().split("T")[0];
                })
              }
            ></InputGeneral>
          </Grid>
        </Box>
        <Box
          sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
        >
          <Grid>
            <Button
              disabled={fechaFinal === "" || fechaFinal === "" ? true : false}
              onClick={exportToExcel}
              // onClick={() => console.log(dateRef.current.value)}
              variant="contained"
              fullWidth
              endIcon={<CloudDownload></CloudDownload>}
            >
              Descargar
            </Button>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
}

export default ModalReporte;
