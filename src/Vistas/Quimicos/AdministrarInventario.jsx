import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import styles from "./Estllos/agegarInventarioUI";
import {
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
  Pool,
} from "@mui/icons-material";
import InputSelect from "../../Componentes/General/InputSelect";
import InputGeneral from "../../Componentes/General/InputGeneral";
import TablaInventarioId from "../../Componentes/Quimicos/TablaInventarioId";
import TablaInventarioLote from "../../Componentes/Quimicos/TablaInventarioLote";
import Alertas from "../../Componentes/General/Alertas";
import { useLocation } from "react-router-dom";
import {
  listarProductosQuimicos,
  listarHistoricoProducto,
  listarHistoricoLote,
} from "../../services/quimicos/services";
import { opcionesInputs, obtenerId } from "../../utils/quimicos/utils";

function AdministrarInventario() {
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  //*Estado para el display de las vistas
  const [contador, setContador] = useState(1);

  //*Estado para almacenar el listado de productos uimicos
  const [listaQuimicos, setListaQuimicos] = useState("");

  //*Estado para guarar las opciones de los inputs
  const [opcionesInpts, setOpcionesInputs] = useState("");

  //*Estado para guardar el historio por Id
  const [historicoId, setHistoricoId] = useState("");

  //*Estado para guardar el historico por lote
  const [historicoLote, setHistoricoLote] = useState("");

  //*Estado para guardar la informaciondel indice
  const [dataIndice, setDataIndice] = useState("");

  //*Funcion para manejar el contador
  const incrementar = () => {
    if (contador === 3) {
      return;
    }

    setContador(contador + 1);
  };

  const decrementar = () => {
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
      //   backgroundColor: "red",
      height: "87%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },

    agregar: {
      backgroundColor: contador === 1 ? "white" : "rgb(0,164,228)",
      color: contador === 1 ? "black" : "white",
      border: contador === 1 ? "1px solid black" : "",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      height: "40px",
      marginTop: "10.5px",
      justifyContent: "center",
      alignItems: "center",
      width: { xs: "30%", sm: "30%", md: "35%" },
      borderRadius: "10px 0px 0px 0px",
      borderRight: "1px solid white",
      cursor: "pointer",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
      },
    },

    inventario: {
      backgroundColor: contador === 2 ? "white" : "rgb(0,164,228)",
      color: contador === 2 ? "black" : "white",
      border: contador === 2 ? "1px solid black" : "",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      height: "40px",
      marginTop: "10.5px",
      justifyContent: "center",
      alignItems: "center",
      width: { xs: "30%", sm: "40%", md: "35%" },
      borderRight: "1px solid white",
      cursor: "pointer",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
      },
    },

    lote: {
      backgroundColor: contador === 3 ? "white" : "rgb(0,164,228)",
      color: contador === 3 ? "black" : "white",
      border: contador === 3 ? "1px solid black" : "",

      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      height: "40px",
      marginTop: "10.5px",
      justifyContent: "center",
      alignItems: "center",
      width: { xs: "40%", sm: "30%", md: "35%" },
      borderRadius: "0px 10px 0px 0px",
      cursor: "pointer",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
      },
    },

    uno: {
      // backgroundColor: "red",
      height: "100%",
      display: contador === 1 ? "flex" : "none",
      flexDirection: { xs: "column", sm: "column", md: "row" },
      overflow: "scroll", // Puedes cambiar "auto" por el valor que necesites: visible, hidden, scroll, etc.
    },

    dos: {
      // backgroundColor: "blue",
      height: "100%",
      display: contador === 2 ? "block" : "none",
    },

    tres: {
      // backgroundColor: "gray",
      height: "100%",
      display: contador === 3 ? "content" : "none",
    },
  };
  const listaUnidades = [
    {
      label: "Kilogramos",
    },
    {
      label: "Gramos",
    },

    {
      label: "Litros",
    },
    {
      label: "Galones",
    },
  ];

  const obtenerInfoIndice = (array, nombre) => {
    const id = obtenerId(array, nombre);
    listarHistoricoProducto(id).then((res) => {
      const array = res.dataWithQuantity;
      const ultimoItem = array[array.length - 1];
      setDataIndice({
        nombre: ultimoItem.productoQuimico,
        saldo: ultimoItem.cantidadDisponible,
      });
    });
  };

  const listarInventarioId = (array, nombre) => {
    const id = obtenerId(array, nombre);
    listarHistoricoProducto(id).then((res) => {
      setHistoricoId(res.dataWithQuantity);
    });
  };

  const listarInventarioLote = (array, nombre) => {
    const id = obtenerId(array, nombre);
    listarHistoricoLote(id).then((res) => {
      setHistoricoLote(res.inventoryByLot);
    });
  };

  useEffect(() => {
    listarProductosQuimicos().then((res) => {
      setListaQuimicos(res.chemicalProducts);
      const opciones = opcionesInputs(res.chemicalProducts);
      setOpcionesInputs(opciones);
    });
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
          <Box sx={{ ...styles.encabezado }}>
            <Box sx={{ ...styles.tabs }}>
              <Typography
                sx={{ ...stylesAnimation.agregar }}
                onClick={() => setContador(1)}
              >
                Agregar
              </Typography>
              <Typography
                sx={{ ...stylesAnimation.inventario }}
                onClick={() => setContador(2)}
              >
                Inventario
              </Typography>
              <Typography
                sx={{ ...stylesAnimation.lote }}
                onClick={() => setContador(3)}
              >
                Lote
              </Typography>
            </Box>
            <Typography sx={{ ...styles.actual }}>
              Control de inventario
            </Typography>
          </Box>
          <Box sx={{ ...styles.formulario }}>
            <Box sx={{ ...styles.containerDatos }}>
              {/* Vista agergar */}
              <Box sx={{ ...stylesAnimation.uno }}>
                <Box sx={{ ...styles.formularioUno }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputSelect
                        options={opcionesInpts || [{ label: "No data" }]}
                        label="Lista de químicos"
                        icon={<Pool></Pool>}
                        onChange={(e) =>
                          obtenerInfoIndice(listaQuimicos, e.target.textContent)
                        }
                      ></InputSelect>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        type="number"
                        label="Cantidad"
                        icon={<Pool></Pool>}
                        name="cantidad"
                      ></InputGeneral>
                    </Grid>
                    <Grid item xs={6}>
                      <InputSelect
                        options={listaUnidades}
                        label="Unidades"
                        icon={<Pool></Pool>}
                        name="unidades"
                      ></InputSelect>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Lote"
                        icon={<Pool></Pool>}
                        name="lote"
                      ></InputGeneral>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Fecha"
                        type="date"
                        icon={<Pool></Pool>}
                        name="fecha"
                      ></InputGeneral>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" sx={{ ...styles.button }}>
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ ...styles.data }}>
                  <Box sx={{ ...styles.azul }}>
                    <Typography sx={{ ...styles.tittle }} y>
                      Nombre del químico{" "}
                    </Typography>
                    <Typography>{dataIndice?.nombre || "No data"} </Typography>
                    <Typography sx={{ ...styles.tittle }}>
                      Cantidad disponible{" "}
                    </Typography>
                    <Typography>{dataIndice?.saldo || "no data"}</Typography>
                  </Box>
                </Box>
              </Box>
              {/* Vista Inventario */}
              <Box sx={{ ...stylesAnimation.dos }}>
                <Grid item xs={12}>
                  <InputSelect
                    options={opcionesInpts || [{ label: "No data" }]}
                    label="Lista de químicos"
                    icon={<Pool></Pool>}
                    onChange={(e) =>
                      listarInventarioId(listaQuimicos, e.target.textContent)
                    }
                  ></InputSelect>
                </Grid>
                <TablaInventarioId
                  data={historicoId || "no data"}
                ></TablaInventarioId>
              </Box>
              {/* Vista Lote */}
              <Box sx={{ ...stylesAnimation.tres }}>
                <Box
                  sx={{
                    // backgroundColor: "blue",
                    width: { xs: "100%", md: "78%" },
                    marginLeft: { xs: "0%", md: "11%" },
                  }}
                >
                  <Grid item xs={12}>
                    <InputSelect
                      options={opcionesInpts || [{ label: "No data" }]}
                      label="Lista de químicos"
                      icon={<Pool></Pool>}
                      onChange={(e) =>
                        listarInventarioLote(
                          listaQuimicos,
                          e.target.textContent
                        )
                      }
                    ></InputSelect>
                  </Grid>
                </Box>
                <TablaInventarioLote
                  data={historicoLote || "no data"}
                ></TablaInventarioLote>
              </Box>
            </Box>

            <Box sx={{ ...styles.containerFlechas }}>
              <IconButton onClick={() => decrementar()}>
                <KeyboardDoubleArrowLeft></KeyboardDoubleArrowLeft>
              </IconButton>
              <IconButton onClick={() => incrementar()}>
                <KeyboardDoubleArrowRight></KeyboardDoubleArrowRight>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Alertas
        open={openAlerta}
        severity={color}
        mensaje={mensaje}
        cerrar={() => setOpenAlerta(false)}
      ></Alertas> */}
    </Box>
  );
}

export default AdministrarInventario;
