import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Button, Grid, CircularProgress } from "@mui/material";
import { cambiarContrasena } from "../../services/login/services";
import Alertas from "../../Componentes/General/Alertas";
import "../../Estilos/InicioDeSesion/CambiarPassword.css";
import logo from "../../../public/Logo-tree-a.ico";

function CambiarPassword({ open, close }) {
  const [data, setData] = useState("");
  const [openAlerta, setOpenAlerta] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(false);

  const [render, setRender] = useState(0);
  const [urlData, setUrlData] = useState({
    token: "",
    id: "",
  });

  const catchUrl = () => {
    // Obtén la cadena de búsqueda de la URL actual
    const queryString = window.location.pathname;

    // Extrae los valores de idUser y token de la cadena de búsqueda
    const [, idUser, token] = queryString.match(
      /\/password-reset\/([^\/]+)\/([^\/]+)/
    );

    setUrlData({
      token: token,
      id: idUser,
    });
  };

  const catchDataInput = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const enviarPeticion = () => {
    setDeshabilitar(true);

    if (!data["password"] || !data["confirm"]) {
      setDeshabilitar(false);
      setMessage("Todos los campos son obligatorios");
      setSeverity("error");
      setOpenAlerta(true);
      return;
    } else if (data["password"] !== data["confirm"]) {
      setDeshabilitar(false);
      setMessage("Las contraseñas no coinciden");
      setSeverity("error");
      setOpenAlerta(true);
      return;
    }

    cambiarContrasena(urlData["id"], urlData["token"], data["password"]).then(
      (res) => {
        console.log(res);

        switch (res?.status) {
          case 200:
            setRender(render + 1);
            setOpenAlerta(true);
            setMessage(res.respuesta.msg);
            setSeverity("success");
            setDeshabilitar(false);
            break;

          case 401:
            setOpenAlerta(true);
            setMessage(res.respuesta.msg);
            setSeverity("error");
            setDeshabilitar(false);
            break;

          case 400:
            if (res.respuesta.type === "fields_required") {
              setOpenAlerta(true);
              setMessage(res.respuesta.errors[0].msg);
              setSeverity("error");
              setDeshabilitar(false);
              return;
            }
            setOpenAlerta(true);
            setMessage(res.respuesta.msg);
            setSeverity("error");
            setDeshabilitar(false);
            break;

          case 500:
            setOpenAlerta(true);
            setMessage(
              res.respuesta.msg === "jwt expired"
                ? "Su link ha expirado"
                : res.respuesta.msg
            );
            setSeverity("error");
            setDeshabilitar(false);
            break;

          default:
            setOpenAlerta(true);
            setSeverity("error");
            setDeshabilitar(false);
            console.log(res);

            break;
        }
      }
    );
  };

  useEffect(() => {
    setData(() => ({
      password: "",
      confirm: "",
    }));
  }, [render]);

  useEffect(() => {
    catchUrl();
  }, []);

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
                    onChange={(e) => catchDataInput("password", e.target.value)}
                    value={data["password"]}
                    className="input-motion"
                    type="password"
                  ></motion.input>
                  <Box sx={{ width: "90%" }}>
                    <label className="labels">Confirmar contraseña</label>
                  </Box>
                  <motion.input
                    value={data["confirm"]}
                    onChange={(e) => catchDataInput("confirm", e.target.value)}
                    className="input-motion"
                    type="password"
                  ></motion.input>
                  <Button
                    disabled={deshabilitar}
                    onClick={enviarPeticion}
                    variant="contained"
                    className="button-motion"
                    sx={{ marginTop: "10px" }}
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
      <Alertas
        open={openAlerta}
        severity={severity}
        cerrar={() => setOpenAlerta(false)}
        mensaje={message}
      ></Alertas>
    </Box>
  );
}

export default CambiarPassword;
