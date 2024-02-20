import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Button, Grid } from "@mui/material";
import "../../Estilos/Inicio de sesion/FormularioContrasena.css";

function FormularioContrasena({ open, close }) {
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
                      className="input-motion"
                      placeholder="Ingrese su correo..."
                    ></motion.input>
                  </Box>
                </Box>
                <Box className="button-container">
                  <Button variant="contained" className="btn-motion">
                    Enviar
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
    </motion.div>
  );
}

export default FormularioContrasena;
