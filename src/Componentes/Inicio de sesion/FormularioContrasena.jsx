import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Button, Grid, CircularProgress } from "@mui/material";
import "../../Estilos/Inicio de sesion/FormularioContrasena.css";
import { recuperarContrasena } from "../../services/login/services";
import Alertas from "../../Componentes/General/Alertas";

function FormularioContrasena({ open, close }) {
  const [data, setData] = useState({
    email: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(false);
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
            <motion.span
              className="texto-msg"
              animate={{
                opacity: open ? 1 : 0,
              }}
              transition={{
                delay: open ? 0.5 : "",
                ease: "easeInOut",
              }}
            >
              Enviaremos un link a su correo con una duración de 10 minutos para
              recuperar su contraseña
            </motion.span>
          </Grid>
          <Grid item xs={6}>
            <motion.div className="container-inputs-motion">
              <motion.div
                initial={{
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                animate={{
                  x: open ? 0 : 500,
                }}
                transition={{
                  delay: open ? 1 : "",
                  duration: 0.3,
                }}
              >
                <Box className="container-correo-txt">
                  <span className="correo-txt">
                    Por favor, ingrese el correo con el que se registró
                  </span>
                </Box>
              </motion.div>
              <motion.div
                initial={{
                  height: "50%",
                }}
                animate={{
                  x: open ? 0 : -500,
                }}
                transition={{
                  delay: open ? 1 : "",
                  duration: 0.3,
                }}
              >
                <Box>
                  <Box className="container-correo-span-txt">
                    <Box className="container-txt-span">
                      <span>Correo</span>
                    </Box>
                  </Box>
                  <Box className="container-input-motion">
                    <motion.input
                      value={data.email}
                      onChange={(e) => catchDataInput(e.target.value)}
                      className="input-motion"
                      placeholder="Ingrese su correo..."
                    ></motion.input>
                  </Box>
                </Box>
                <Box className="button-container">
                  <Button
                    disabled={deshabilitar}
                    variant="contained"
                    className="btn-motion"
                    onClick={enviarPeticion}
                  >
                    {deshabilitar ? (
                      <CircularProgress
                        color="inherit"
                        size={24}
                      ></CircularProgress>
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                </Box>
                <Box className="button-container">
                  <Button
                    variant="contained"
                    color="error"
                    className="btn-motion"
                    onClick={() => close(false)}
                  >
                    Cancelar
                  </Button>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      <Alertas
        open={openAlert}
        severity={severity}
        mensaje={message}
        cerrar={() => setOpenAlert(false)}
      ></Alertas>
    </motion.div>
  );
}

export default FormularioContrasena;
