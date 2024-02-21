import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import styles from "../../Estilos/Usuarios/MiPerfil";
import { motion } from "framer-motion";
import { listarUsuario } from "../../services/usuario/sevices";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const MiPerfil = () => {
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  //Funciones para mover la caja contenedora
  const moverTabla = () => {
    setMover(!mover);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaUsuarios = () => {
    setMover(false);
    setMoverUsuarios(!moverUsuario);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaParametros = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(!moverParametros); //
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaQuimicos = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(!moverQuimicos);
    setMoverPerfil(false);
  };

  const moverTablaPerfil = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(!moverPerfil);
  };

  const stylesAnimation = {
    mainBox: {
      //backgroundColor: "red",
      height: "87%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },
  };

  const catchDataUsuario = () => {
    listarUsuario().then((res) => {
      console.log(res);

      switch (res.status) {
        case 200:
          console.log(res);
          setData(res.respuesta.userID);
          return;

        case 401:
          return;

        case 500:
          return;
      }
    });
  };

  useEffect(() => {
    catchDataUsuario();
  }, []);

  return (
    <Box sx={{ ...styles.generalContainer }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>

      <Box sx={{ ...stylesAnimation.mainBox }}>
        <Box sx={{ ...styles.container }}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "72%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Box sx={{ ...styles.encabezado }}></Box>
              <Typography sx={{ ...styles.textoEncabezado }}>
                Mi perfil
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ ...styles.containerFormulario }}>
              <Grid
                container
                sx={{
                  width: "80%",
                  height: "70%",
                  paddingLeft: "30px",
                  marginTop: "-30px",
                }}
              >
                <Grid item xs={12}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    <Tooltip title="Editar">
                      <IconButton
                        onClick={() => {
                          navigate(`/EditarUsuario?data=${data}`, {
                            state: {
                              _id: data._id,
                              ID: data.ID,
                              name: data.name,
                              lastName: data.lastName,
                              email: data.email,
                              cellPhone: data.cellPhone,
                              role: data.role,
                            },
                          });
                        }}
                        color="success"
                        sx={{
                          border: "1px solid green",
                          borderRadius: "0px",
                        }}
                      >
                        <Edit></Edit>
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sx={{ cursor: "pointer" }}>
                  <motion.div
                    initial={{ opacity: 0, cursor: "pointer" }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography sx={{ ...styles.typos }}>
                        Documento
                      </Typography>
                      <Typography>{data?.ID}</Typography>
                    </motion.div>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sx={{ cursor: "pointer" }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography sx={{ ...styles.typos }}>Nombre</Typography>
                      <Typography>{data?.name}</Typography>
                    </motion.div>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sx={{ cursor: "pointer" }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography sx={{ ...styles.typos }}>Apellido</Typography>
                      <Typography>{data?.lastName}</Typography>
                    </motion.div>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sx={{ cursor: "pointer" }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography sx={{ ...styles.typos }}>Correo</Typography>
                      <Typography>{data?.email}</Typography>
                    </motion.div>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sx={{ cursor: "pointer" }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography sx={{ ...styles.typos }}>Rol</Typography>
                      <Typography>{data?.role}</Typography>
                    </motion.div>
                  </motion.div>
                </Grid>
                <Grid item xs={6} sx={{ cursor: "pointer" }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Typography sx={{ ...styles.typos }}>Teléfono</Typography>
                      <Typography>{data?.cellPhone}</Typography>
                    </motion.div>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MiPerfil;
