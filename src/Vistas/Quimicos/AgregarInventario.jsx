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

function AgregarInventario() {
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);
  const [habilitar, setHabilitar] = useState(false);

  //*Estados para guradar los uimicos de la repuesta del servidor
  const [data, setData] = useState([]);
  const [nombresQuimicos, setNombresQuimicos] = useState([]);
  const [quimico, setQuimico] = useState({
    name: "no data",
    availableQuantity: 0,
  });

  const [openAlerta, setOpenAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

  //*estado para guardar data del reotrno por Id
  const [inventarioId, setinvenarioId] = useState([]);

  //*estado para guardar inventario por lote
  const [InventarioLote, setInventarioLote] = useState([]);

  //* estado para armar la data que voy a mostrar en Inventario Lote
  const [armar, setArmar] = useState([]);

  //*Estados para guardar los datos de los texfield
  const [dataText, setDataText] = useState({
    cantidad: "",
    unidades: "",
    lote: "",
    fecha: "",
  });

  //*Funcion para capturar los datos de los texFields
  const catchDataText = (e) => {
    setDataText((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //*Funcion para capturar los files d elos inputBuscar
  const catchSelect = (nombre, value) => {
    setDataText((prevData) => ({
      ...prevData,
      [nombre]: value,
    }));
  };

  //*Estado para el display de las vistas
  const [contador, setContador] = useState(1);

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

  //*Funcion para traer los productos quimicos de la base de datos
  const listarProductosQuimicos = async () => {
    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/chemical-products",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (response.status) {
      case 200:
        const respuesta = await response.json();
        setData(respuesta);
        setNombresQuimicos([]);

        respuesta.chemicalProducts.forEach((element) => {
          setNombresQuimicos((prevNombres) => [
            ...prevNombres,
            { label: element.name },
          ]);
        });

        break;

      case 401:
        break;

      case 500:
        break;
    }
  };

  //*Funcion para obtener el producto desde el inputSelect
  const obtenerProducto = (nombresQuimico) => {
    // const respuesta = data.chemicalProducts.find(
    //   (element) => (element.name = nombresQuimico)
    // );
    setQuimico(
      data.chemicalProducts.find((element) => element.name === nombresQuimico)
    );
  };

  const agregarAInventario = async (idProductoQuimico) => {
    setHabilitar(true);
    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/chemical-inventory",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
          "Content-Type": "application/json", // Asegúrate de incluir el tipo de contenido
        },
        body: JSON.stringify({
          chemicalName: idProductoQuimico,
          quantity: dataText.cantidad,
          units: dataText.unidades,
          lot: dataText.lote,
          expirationDate: dataText.fecha, // Asegúrate de usar el formato correcto para la fecha
        }),
      }
    );

    switch (response.status) {
      case 200:
        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("Agregado con exíto");
        setColor("success");

        break;

      case 401:
        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("No fue agregado");
        setColor("error");
        break;

      case 500:
        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("Error en el servidor");
        setColor("success");

        break;
    }
    setHabilitar(false);
  };

  const listarinventarioId = async (idProductoQuimico) => {
    const response = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/history-chemical-products/${idProductoQuimico}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (response.status) {
      case 200:
        setinvenarioId(await response.json());
        setInventarioLote(inventarioId);

        break;

      case 401:
        break;

      case 500:
        setinvenarioId("");

        break;
    }
  };

  const listarInventarioLote = async (idProductoQuimico) => {
    const response = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/chemical-inventory/${idProductoQuimico}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (response.status) {
      case 200:
        setInventarioLote(await response.json());

        break;

      case 401:
        break;

      case 500:
        setinvenarioId("");

        break;
    }
  };

  useEffect(() => {
    listarProductosQuimicos();
  }, []);

  useEffect(() => {
    listarinventarioId(quimico?._id);
  }, [quimico]);

  useEffect(() => {
    listarInventarioLote(quimico?._id);
  }, [quimico]);

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
            <Typography sx={{ ...styles.actual }}>Inventario</Typography>
          </Box>
          <Box sx={{ ...styles.formulario }}>
            <Box sx={{ ...styles.containerDatos }}>
              {/* Vista agergar */}
              <Box sx={{ ...stylesAnimation.uno }}>
                <Box sx={{ ...styles.formularioUno }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputSelect
                        options={
                          nombresQuimicos === ""
                            ? [{ label: "No hay opciones" }]
                            : nombresQuimicos
                        }
                        label="Lista de quimicos"
                        icon={<Pool></Pool>}
                        onChange={(e) => obtenerProducto(e.target.textContent)}
                      ></InputSelect>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        type="number"
                        label="Cantidad"
                        icon={<Pool></Pool>}
                        name="cantidad"
                        onChange={catchDataText}
                      ></InputGeneral>
                    </Grid>
                    <Grid item xs={6}>
                      <InputSelect
                        options={listaUnidades}
                        label="Unidades"
                        icon={<Pool></Pool>}
                        name="unidades"
                        onChange={(e) =>
                          catchSelect("unidades", e.target.textContent)
                        }
                      ></InputSelect>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Lote"
                        icon={<Pool></Pool>}
                        name="lote"
                        onChange={catchDataText}
                      ></InputGeneral>
                    </Grid>

                    <Grid item xs={6}>
                      <InputGeneral
                        label="Fecha"
                        type="date"
                        icon={<Pool></Pool>}
                        name="fecha"
                        onChange={catchDataText}
                      ></InputGeneral>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled={habilitar}
                        variant="contained"
                        sx={{ ...styles.button }}
                        onClick={() =>
                          agregarAInventario(quimico?._id || "no data")
                        }
                      >
                        {habilitar ? (
                          <CircularProgress
                            size={24}
                            color="inherit"
                          ></CircularProgress>
                        ) : (
                          "Guardar"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ ...styles.data }}>
                  <Box sx={{ ...styles.azul }}>
                    <Typography sx={{ ...styles.tittle }} y>
                      Nombre del químico{" "}
                    </Typography>
                    <Typography>{quimico?.name || "No data"} </Typography>
                    <Typography sx={{ ...styles.tittle }}>
                      Cantidad disponible{" "}
                    </Typography>
                    <Typography>
                      {quimico?.availableQuantity?.toFixed(1)}{" "}
                      {quimico?.units || "No data"}
                    </Typography>
                  </Box>
                  <Box sx={{ ...styles.dibujo }}>dibujo</Box>
                </Box>
              </Box>
              {/* Vista Inventario */}
              <Box sx={{ ...stylesAnimation.dos }}>
                <Grid item xs={12}>
                  <InputSelect
                    options={
                      nombresQuimicos === ""
                        ? [{ label: "No hay opciones" }]
                        : nombresQuimicos
                    }
                    label="Lista de quimicos"
                    icon={<Pool></Pool>}
                    onChange={(e) => obtenerProducto(e.target.textContent)}
                  ></InputSelect>
                </Grid>
                <TablaInventarioId
                  data={inventarioId?.dataWithQuantity || "no data"}
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
                      options={
                        nombresQuimicos === ""
                          ? [{ label: "No hay opciones" }]
                          : nombresQuimicos
                      }
                      label="Lista de quimicos"
                      icon={<Pool></Pool>}
                      onChange={(e) => obtenerProducto(e.target.textContent)}
                    ></InputSelect>
                  </Grid>
                </Box>
                <TablaInventarioLote
                  data={inventarioId?.inventoryByLot || "no data"}
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
      <Alertas
        open={openAlerta}
        severity={color}
        mensaje={mensaje}
        cerrar={() => setOpenAlerta(false)}
      ></Alertas>
    </Box>
  );
}

export default AgregarInventario;
