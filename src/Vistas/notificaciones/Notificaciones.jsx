import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Alert,
  Badge,
} from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import styles from "./Estllos/notificaciones";
import {
  Close,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Check,
  ErrorOutline,
  Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ModalNotificaciones from "../../Componentes/Notificaciones/ModalNotificaciones";

const Notificaciones = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [dataPiscina, setDataPiscina] = useState([]);

  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const [contador, setContador] = useState(1);
  const [contadorParametro, setContadorParametro] = useState(0);
  const [contadorPiscina, setContadorPiscina] = useState(0);
  const [contadorInsumo, setContadorInsumo] = useState(0);
  const [refrescar, setRefrescar] = useState(0);

  const [dataQuimico, setDataQuimico] = useState({
    nombre: "",
    funcion: "",
    imagenProducto: "",
    fichaTecnica: "",
    hojaSeguridad: "",
    concentracion: "",
    densidad: "",
    proveedor: "",
    unidades: "",
    cantidadMinima: "",
    ingreso: "",
    lote: "",
    fecha: "",
    disponible: "",
  });

  const incrementar = () => {
    if (contador === 3) {
      return;
    }
    setContador(contador + 1);
  };

  const decremenrtar = () => {
    if (contador === 1) {
      return;
    }
    setContador(contador - 1);
  };

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

    insumos: {
      // backgroundColor: "blue",
      width: "100%",
      height: "100%",
      paddingTop: "10px",
      display: contador === 1 ? "content" : "none",
    },

    parametros: {
      //   backgroundColor: "pink",
      width: "100%",
      height: "100%",
      paddingTop: "10px",
      display: contador === 2 ? "content" : "none",
    },

    piscinas: {
      //   backgroundColor: "cyan",
      width: "100%",
      height: "100%",
      paddingTop: "10px",
      display: contador === 3 ? "content" : "none",
    },

    insumosTypo: {
      width: { xs: "50px", sm: "120px", md: "100px", lg: "150px" },
      border: contador === 1 ? "1px solid black" : "1px solid white",
      backgroundColor: contador === 1 ? "white" : "rgb(0,164,228)",
      color: contador === 1 ? "black" : "white",
      borderRadius: "10px 0px 0px 0px",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",

      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    },

    parametrosTypo: {
      width: { xs: "50px", sm: "140px", md: "100px", lg: "150px" },
      border: contador === 2 ? "1px solid black" : "1px solid white",
      backgroundColor: contador === 2 ? "white" : "rgb(0,164,228)",
      color: contador === 2 ? "black" : "white",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",

      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    },

    piscinasTypo: {
      width: { xs: "50px", sm: "120px", md: "100px", lg: "150px" },
      border: contador === 3 ? "1px solid black" : "1px solid white",
      backgroundColor: contador === 3 ? "white" : "rgb(0,164,228)",
      color: contador === 3 ? "black" : "white",
      borderRadius: "0px 10px 0px 0px",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",

      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    },
  };

  const listarNotificaciones = async () => {
    try {
      const tokenSend = localStorage.getItem("clave");
      const respuesta = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/notifications-manager",
        {
          method: "GET",
          headers: {
            Accpet: "Application/json",
            "x-token": tokenSend,
          },
        }
      );

      switch (respuesta.status) {
        case 200:
          const respo = await respuesta.json();
          console.log(respo.notifications);
          setNotificaciones(respo.notifications);

          // Actualizar el contador después de obtener las notificaciones
          const contadorParametroIncrementado = respo.notifications.reduce(
            (contador, elemento) =>
              elemento.typeNotification === "parameterNotification"
                ? contador + 1
                : contador,
            0
          );
          setContadorParametro(contadorParametroIncrementado);

          const contadorPiscinaIncrementado = respo.notifications.reduce(
            (contador, elemento) =>
              elemento.typeNotification === "poolNotification"
                ? contador + 1
                : contador,
            0
          );
          setContadorPiscina(contadorPiscinaIncrementado);

          const contadorInsumoIncrementado = respo.notifications.reduce(
            (contador, elemento) =>
              elemento.typeNotification === "chemicalNotification"
                ? contador + 1
                : contador,
            0
          );
          setContadorInsumo(contadorInsumoIncrementado);

          break;

        case 401:
          const response = await respuesta.json();
          console.log(response);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarNotificacionId = async (id) => {
    try {
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/notify-manager/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
            "x-token": localStorage.getItem("clave"),
          },
        }
      );

      switch (response.status) {
        case 200:
          const resuesta = await response.json();
          console.log(resuesta);
          setRefrescar((prevRefrescar) => prevRefrescar + 1);
          break;

        case 400:
          const respondido = await response.json();
          console.log(respondido);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarPiscina = async (id) => {
    try {
      const tokenSend = localStorage.getItem("clave");
      const respuesta = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/pool/${id}`,
        {
          method: "GET",
          headers: {
            Accpet: "Application/json",
            "x-token": tokenSend,
          },
        }
      );

      switch (respuesta.status) {
        case 200:
          const respo = await respuesta.json();
          console.log(respo.poolID);
          setOpenModal(true);
          setDataPiscina(respo.poolID);

          break;

        case 401:
          const response = await respuesta.json();
          console.log(response);
          break;
        case 404:
          const responses = await respuesta.json();
          console.log(response);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarNotificaciones();
  }, [refrescar]);

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
          <Box sx={{ ...styles.encabezado }}>
            <Box sx={{ ...styles.containerTypografhys }}>
              <Typography
                sx={{ ...stylesAnimation.insumosTypo }}
                onClick={() => setContador(1)}
              >
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>Insumos</Box>
                <Box>
                  <Badge color="error" badgeContent={contadorInsumo}>
                    <Notifications sx={{ color: "red" }}></Notifications>
                  </Badge>
                </Box>
              </Typography>
              <Typography
                sx={{ ...stylesAnimation.parametrosTypo }}
                onClick={() => setContador(2)}
              >
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                  Parámetros
                </Box>
                <Box>
                  <Badge color="warning" badgeContent={contadorParametro}>
                    <Notifications sx={{ color: "orange" }}></Notifications>
                  </Badge>
                </Box>
              </Typography>
              <Typography
                sx={{ ...stylesAnimation.piscinasTypo }}
                onClick={() => setContador(3)}
              >
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>Piscinas</Box>
                <Badge color="success" badgeContent={contadorPiscina}>
                  <Notifications sx={{ color: "green" }}></Notifications>
                </Badge>
              </Typography>
            </Box>
            <Typography sx={{ ...styles.textoEncabezado }}>
              Notificaciones
            </Typography>
          </Box>
          <Box sx={{ ...styles.containerFormulario }}>
            <Box sx={{ ...styles.boxFormulario }}>
              <Box sx={{ ...stylesAnimation.insumos }}>
                <Grid container>
                  {notificaciones.length === 0
                    ? ""
                    : notificaciones.map((elemento, index) =>
                        elemento.typeNotification === "chemicalNotification" ? (
                          <Grid item xs={12} key={index}>
                            <Alert
                              id={elemento._id}
                              sx={{
                                marginBottom: "10px",
                                // backgroundColor: "blue",
                                display: "flex",
                                flexDirection: "row",
                                position: "relative",
                              }}
                              variant="filled"
                              severity="error"
                              icon={
                                <ErrorOutline
                                  fontSize="inherit"
                                  sx={{ marginTop: "8px" }}
                                />
                              }
                              onClick={() => {
                                // eliminarNotificacionId(elemento._id);
                                navigate(
                                  `/agregarInventario?id=${elemento.chemicalProductId._id}`
                                );
                              }}
                            >
                              <Typography
                                sx={{
                                  marginTop: "5px",
                                  width: { xs: "80%", sm: "90%" },
                                  // Ajusta el tamaño del Typography para ocupar el espacio disponible
                                }}
                              >
                                {`El producto químico ${
                                  elemento.chemicalProductId &&
                                  elemento.chemicalProductId.name
                                }  está próximo a finalizar, solo quedan ${
                                  elemento.chemicalProductId &&
                                  elemento.chemicalProductId.availableQuantity
                                } ${
                                  elemento.chemicalProductId &&
                                  elemento.chemicalProductId.units
                                }`}
                              </Typography>
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                }}
                                color="inherit"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation(); // Evitar la propagación del evento
                                  // eliminarNotificacionId(elemento._id);
                                }}
                              >
                                <Close />
                              </IconButton>
                            </Alert>
                          </Grid>
                        ) : null
                      )}
                </Grid>
              </Box>
              <Box sx={{ ...stylesAnimation.parametros }}>
                {notificaciones.length === 0
                  ? ""
                  : notificaciones.map((elemento, index) =>
                      elemento.typeNotification === "parameterNotification" ? (
                        <Grid item xs={12} key={index}>
                          <Alert
                            sx={{ cursor: "pointer" }}
                            id={elemento._id}
                            sx={{ marginBottom: "10px" }}
                            variant="filled"
                            severity="warning"
                            icon={<ErrorOutline fontSize="inherit" />}
                            onClick={() => {
                              // eliminarNotificacionId(elemento._id);
                              navigate(
                                `/gestionarPiscinas?id=${elemento?.historyPoolId?.poolId?._id}`
                              );
                            }}
                            action={
                              <IconButton
                                color="inherit"
                                size="small"
                                onClick={
                                  (e) => ""
                                  // eliminarNotificacionId(elemento._id)
                                }
                              >
                                <Close></Close>
                              </IconButton>
                            }
                          >
                            {`El Usuario ${
                              elemento.userId && elemento.userId.name
                            } 
                              ${elemento.userId && elemento.userId.lastName}
                              con rol ${
                                elemento.userId && elemento.userId.role
                              } creó un histórico para la ${
                              elemento?.historyPoolId?.poolId?.name
                            } el día ${new Date(
                              new Date(elemento?.historyPoolId?.date).setDate(
                                new Date(
                                  elemento?.historyPoolId?.date
                                ).getDate() + 1
                              )
                            ).toLocaleDateString()}, el sistema generó los siguientes mensajes:                        
                                                        
                            `}
                            <Typography sx={{ color: "black" }}>
                              {`${elemento?.historyPoolId?.paramChlorine?.message}`}
                            </Typography>

                            <Typography sx={{ color: "black" }}>
                              {/* {elemento?.historyPoolId?.paramPh?.message ===
                              "good"
                                ? `${elemento?.historyPoolId?.paramPh?.nameParam} esta en el rango permitido`
                                : `${elemento?.historyPoolId?.paramPh?.message}`} */}
                              {elemento?.historyPoolId?.paramPh?.message ===
                              "good"
                                ? `${elemento?.historyPoolId?.paramPh?.nameParam}  esta en el rango permitido`
                                : `${elemento?.historyPoolId?.paramPh?.message}`}
                            </Typography>
                          </Alert>
                        </Grid>
                      ) : null
                    )}
              </Box>
              <Box sx={{ ...stylesAnimation.piscinas }}>
                <Grid container>
                  {notificaciones.length === 0
                    ? ""
                    : notificaciones.map((elemento, index) =>
                        elemento.typeNotification === "poolNotification" ? (
                          <Grid item xs={12} key={index}>
                            <Alert
                              id={elemento._id}
                              sx={{ marginBottom: "10px" }}
                              variant="filled"
                              severity="success"
                              icon={
                                <ErrorOutline
                                  fontSize="inherit"
                                  sx={{ marginTop: "8px" }}
                                />
                              }
                              onClick={() => {
                                // eliminarNotificacionId(elemento._id);
                                mostrarPiscina(
                                  elemento.poolId && elemento.poolId._id
                                );
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography sx={{ marginTop: "5px" }}>
                                  {`El Usuario ${
                                    elemento.userId && elemento.userId.name
                                  } 
                             ${elemento.userId && elemento.userId.lastName}
                            con rol ${
                              elemento.userId && elemento.userId.role
                            } creó una piscina con el nombre  ${
                                    elemento.poolId && elemento.poolId.name
                                  } el día ${
                                    elemento.poolId &&
                                    new Date(
                                      elemento.poolId.createAt
                                    ).toLocaleDateString()
                                  }`}
                                </Typography>
                                <IconButton
                                  color="inherit"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Evitar la propagación del evento
                                    // eliminarNotificacionId(elemento._id);
                                  }}
                                >
                                  <Close></Close>
                                </IconButton>
                              </Box>
                            </Alert>
                          </Grid>
                        ) : null
                      )}
                </Grid>
              </Box>
            </Box>
            <Box sx={{ ...styles.containerFlechas }}>
              <IconButton onClick={() => decremenrtar()}>
                <KeyboardDoubleArrowLeft></KeyboardDoubleArrowLeft>
              </IconButton>
              <IconButton onClick={() => incrementar()}>
                <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <ModalNotificaciones
        pool={dataPiscina}
        open={openModal}
        close={() => setOpenModal(false)}
      ></ModalNotificaciones>
    </Box>
  );
};

export default Notificaciones;
