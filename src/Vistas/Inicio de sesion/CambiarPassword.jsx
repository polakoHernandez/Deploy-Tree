import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Button, Grid, CircularProgress } from "@mui/material";
import { recuperarContrasena } from "../../services/login/services";
import Alertas from "../../Componentes/General/Alertas";
import "../../Estilos/Inicio de sesion/CambiarPassword.css";
import logo from "../../../public/Logo-tree-a.ico";

function CambiarPassword({ open, close }) {
  const [data, setData] = useState({
    email: "",
  });

  const [render, setRender] = useState(0);

  const catchDataInput = (value) => {
    setData({
      email: value,
    });
  };

  const enviarPeticion = () => {
    setDeshabilitar(true);

    if (!data["email"]) {
      setDeshabilitar(false);
      setMessage("Ingrese un correo");
      setSeverity("error");
      setOpenAlert(true);
      return;
    }

    recuperarContrasena(data["email"]).then((res) => {
      console.log(res);

      switch (res?.status) {
        case 200:
          setRender(render + 1);
          setOpenAlert(true);
          setMessage(res.respuesta.msg);
          setSeverity("success");
          setDeshabilitar(false);
          break;

        case 401:
          setOpenAlert(true);
          setMessage(res.respuesta.msg);
          setSeverity("error");
          setDeshabilitar(false);
          break;

        case 404:
          setOpenAlert(true);
          setMessage(res.respuesta.msg);
          setSeverity("error");
          setDeshabilitar(false);
          break;

        case 500:
          setOpenAlert(true);
          setMessage(res.respuesta.msg);
          setSeverity("error");
          setDeshabilitar(false);
          break;

        default:
          setOpenAlert(true);
          // setMessage(res.respuesta.msg);
          setSeverity("error");
          setDeshabilitar(false);
          console.log(res);

          break;
      }
    });
  };

  useEffect(() => {
    setData(() => ({
      email: "",
    }));
  }, [render]);

  return (
    <Box className="container-general">
      <motion.div
        className="container-motion"
        initial={{
          y: -1000,
        }}
        animate={{
          y: 0,
        }}
        transition={{}}
      >
        <Box
          className="card"
          sx={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: "white",
            width: { xs: "90%", sm: "90%", md: "90%", lg: "800px" },
            height: "350px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Grid
            container
            sx={{ width: "100%", height: "90%", marginTop: "15px" }}
          >
            <Grid
              item
              xs={6}
              sx={{
                borderRight: "2px solid rgb( 173, 173, 172 )",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.img
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  delay: 0.4,
                  ease: "easeInOut",
                  duration: 0.4,
                }}
                src={logo}
              ></motion.img>
            </Grid>
            <Grid item xs={6}>
              <Box className="container-title-pass">
                <motion.div
                  initial={{
                    width: "100%",
                    height: "20%",
                    x: 500,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  animate={{
                    width: "100%",
                    height: "20%",
                    x: 0,
                  }}
                  transition={{
                    delay: 0.8,
                  }}
                >
                  <span className="tittle">Cambiar contraseña</span>
                </motion.div>
                <motion.div
                  initial={{
                    width: "100%",
                    height: "80%",
                    y: 500,
                  }}
                  animate={{
                    width: "100%",
                    height: "80%",
                    y: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  transition={{
                    delay: 0.8,
                  }}
                >
                  <Box sx={{ width: "90%" }}>
                    <label className="labels">Contraseña</label>
                  </Box>
                  <motion.input
                    className="input-motion"
                    type="password"
                  ></motion.input>
                  <Box sx={{ width: "90%" }}>
                    <label className="labels">Confirmar contraseña</label>
                  </Box>
                  <motion.input
                    className="input-motion"
                    type="password"
                  ></motion.input>
                  <Button
                    variant="contained"
                    className="button-motion"
                    sx={{ marginTop: "10px" }}
                  >
                    Enviar
                  </Button>
                  <Button
                    sx={{ marginTop: "10px" }}
                    variant="contained"
                    color="error"
                    className="button-motion"
                  >
                    cancelar
                  </Button>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
}

export default CambiarPassword;
