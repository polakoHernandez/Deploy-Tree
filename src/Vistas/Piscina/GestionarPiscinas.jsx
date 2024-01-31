import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import "../../Estilos/Piscina/misPiscinas.css";
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "../../Componentes/General/BackDrop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InputGeneal from "../../Componentes/General/InputGeneral";
import PoolIcon from "@mui/icons-material/Pool";
import Alertas from "../../Componentes/General/Alertas";
import Tabla from "../../Componentes/GestionarPisicnas/Tabla";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import SliderVertical from "../../Componentes/GestionarPisicnas/SliderVertical";
import SliderHorizontal from "../../Componentes/GestionarPisicnas/SliderHorizontal";
import TablaLisaHistorico from "../../Componentes/Parametros/TablaLisaHistorico";
import ModalAjustar from "../../Componentes/Parametros/ModalAjustar";
import InputSelect from "../../Componentes/General/InputSelect";
import Pool from "@mui/icons-material/Pool";

function GestionarPiscinas() {
  const [data, setData] = useState("");
  const [pool, setPool] = useState("");
  const [cargando, setCargando] = useState(false);
  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);
  const [contadorAforo, setContadorAforo] = useState(0);
  const [idHistoricoRetornado, setIdHistoricoRetornado] = useState("");
  const [deshabilidar, setDeshabilitar] = useState(false);
  const [dataRango, setRango] = useState({
    max: 0,
    minRange: 0,
    maxRange: 0,
  });

  document.body.style.overflow = "hidden";

  const [nombresPiscinas, setNombresPiscinas] = useState([]);
  const [historicoId, setIdHistorico] = useState("");

  const [openModalAjustar, setOpenModalAjustar] = useState(false);
  const [renderTabla, setRenderTabla] = useState(0);

  const [contador, setContador] = useState(0);
  const [miHistorico, setMiHistorico] = useState([]);
  // Estados para capturar datos de parametros y aforro
  const [dataParametro, setDataParametro] = useState({
    fecha: "",
    PPMactualCloro: 0,
    PPMdeseadoMaximo: dataRango.max,
    PPMactualPh: 0,
    PPMdeseado: dataRango.minRange,
    PPMdeseado2: dataRango.maxRange,
  });
  const [dataAforo, setDataAforo] = useState({
    fechaInicio: "",
    fechaFinal: "",
    cantidadPersonas: "",
    horasDeUso: "",
  });
  const [dataHistorico, setDataHistorico] = useState([]);

  const [respuestaAforo, setRespuestaAforo] = useState("");
  const [openAlerta, setOpenAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

  // Estado para controlar las alertas
  const [peticion, setPeticion] = useState(false);

  //Estados para las notificaciones
  const [notificacion, setNotificacion] = useState(false);

  const [nuevaData, setNuevaData] = useState({
    fecha: "",
    ppmActualCloro: "",
    ppmdeseadoMaximoCloro: "",
    ppmactualPh: "",
    ppmDeseadoPh: "",
    ppmDeseadoPh2: "",
  });

  // Funciones para capturara datos de parametros ya foror
  const capTurarDatosAforo = (event) => {
    const { name, value } = event.target;
    setDataAforo((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const capTurarDatosParametros = (event) => {
    const { name, value } = event.target;
    setDataParametro((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const obtenerIdPorNombre = (nombre) => {
    const respuesta = data?.pools?.find((element) => element.name === nombre);
    setPool(respuesta);
  };

  //Funciones para crear Parametros y aforo
  const crearAforo = async () => {
    // setDeshabilitar(true);

    if (
      pool._id === "" ||
      dataAforo.cantidadPersonas === "" ||
      dataAforo.fechaFinal === "" ||
      dataAforo.fechaInicio === "" ||
      dataAforo.horasDeUso === ""
    ) {
      setOpenAlerta(true);
      setMensaje("Todos los campos son obligatorios");
      setColor("warning");
      return;
    }

    setPeticion(true);

    //!! Cambiar la url del enpoin a la nueva
    const response = await fetch("https://pool-api-treea.vercel.app/v1/aforo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
        "x-token": localStorage.getItem("clave"),
      },
      body: JSON.stringify({
        poolId: pool._id,
        startDate: dataAforo.fechaInicio,
        endDate: dataAforo.fechaFinal,
        timeUse: dataAforo.horasDeUso,
        quantityPerson: dataAforo.cantidadPersonas,
      }),
    });

    switch (response.status) {
      case 200:
        const respuesta = response.json();
        setOpenAlerta(true);
        setMensaje("Aforo creado correctamente");
        setColor("success");
        setDeshabilitar(false);
        setPeticion(false);
        setContadorAforo(contadorAforo + 1);
        break;

      case 404:
        setOpenAlerta(true);
        setMensaje("No ha ingresdo campos obligatorios");
        setColor("success");
        setDeshabilitar(false);
        setPeticion(false);

        break;

      case 401:
        setOpenAlerta(true);
        setMensaje("Token no valido");
        setColor("success");
        setDeshabilitar(false);
        setPeticion(false);

        break;

      case 500:
        setOpenAlerta(true);
        setMensaje("Error en el servidor");
        setColor("success");
        setDeshabilitar(false);
        setPeticion(false);
    }
    setDeshabilitar(false);
    setPeticion(false);
  };

  //Funcion pra listar el aforo
  const listarAforo = async (idPool) => {
    const response = await fetch(
      // `https://pool-api-treea.vercel.app/v1/aforo/${idPool}`,
      `https://treea-piscinas-api.vercel.app/v1/aforo/${idPool}`,
      {
        method: "GET",
        headers: {
          Accpet: "Application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );
    switch (response.status) {
      case 200:
        const respuesta = await response.json();
        setRespuestaAforo(respuesta.aforoId);
        break;

      case 404:
        alert("Token no valido");
        break;

      case 404:
        alert("No encontraodr");
        break;

      case 500:
        break;
    }
  };

  const incrementar = () => {
    if (contador === 4) {
      return;
    }

    setContador(contador + 1);
  };

  const decrementar = () => {
    if (contador === 0) {
      return;
    }
    setContador(contador - 1);
  };

  //   Fnciones para mover el romulario
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

  const animationStyles = {
    mainBox: {
      height: "87%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },
  };

  const listaDeMisPiscinas = async () => {
    setCargando(true);
    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/pools/",
        {
          method: "GET",
          headers: {
            Accpet: "Application/json",
            "x-token": tokenSend,
          },
        }
      );

      switch (response.status) {
        case 401:
          break;

        case 200:
          const responeData = await response.json();

          setData(responeData);
          setCargando(false);
          const nombrePiscinas = responeData?.pools?.map((piscina) => ({
            label: piscina.name,
          }));

          setNombresPiscinas(nombrePiscinas);
          break;
      }
    } catch (error) {
      setCargando(false);
    }
    setCargando(false);
  };

  const obetnerId = (idPool) => {
    const respuesta = data?.pools?.find((element) => element?._id === idPool);
    setPool(respuesta);
  };

  const crearNotificacion = async (id) => {
    try {
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/notify-manager",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "x-token": localStorage.getItem("clave"),
            "content-type": "application/json",
          },
          body: JSON.stringify({
            historyPoolId: id,
            userId: localStorage.getItem("id"),
          }),
        }
      );

      switch (response.status) {
        case 200:
          const respuesta = await response.json();

          break;
      }
    } catch (error) {}
  };

  const enviarParametros = async () => {
    setDeshabilitar(true);
    const respuesta = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/history-pool",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
          "x-token": localStorage.getItem("clave"),
        },
        body: JSON.stringify({
          poolId: pool._id,
          paramChlorine: {
            ppmActual: dataParametro.PPMactualCloro,
            ppmDesired: dataRango.max,
            ppmDesiredMin: 0,
          },
          paramPh: {
            ppmActual: dataParametro.PPMactualPh,
            ppmDesiredMin: dataRango.minRange,
            // ppmDesiredMax: 0,
            ppmDesired: dataRango.maxRange, //Este es el pph Maximo ph
          },
          date: dataParametro.fecha,
        }),
      }
    );

    switch (respuesta.status) {
      case 200:
        const response = await respuesta.json();
        setOpenAlerta(true);
        setMensaje("Parámetro creado con exito");
        setColor("success");

        crearNotificacion(response._id);
        setRenderTabla(renderTabla + 1);
        break;

      case 400:
        const responsess = await respuesta.json();
        setOpenAlerta(true);
        setMensaje("Error al el parametro");
        setColor("success");

        setDeshabilitar(false);

        break;

      case 500:
        const responsesss = await respuesta.json();
        setOpenAlerta(true);
        setMensaje("Error al crear el parametro");
        setColor("success");

        setDeshabilitar(false);

        break;
    }
    setDeshabilitar(false);
  };

  const listarHistorico = async () => {
    const tokenSend = localStorage.getItem("clave");
    const respuesta = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/pool/${pool._id}`,
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
        const response = await respuesta.json();

        //*

        const typeValidation = response?.testTest[0]?.typeValidation;

        if (typeValidation == "Manual") {
          const ph = response.testTest[0].parameters.find(
            (elemento) => elemento.minRange
          );

          const cloro = response.testTest[0].parameters.find(
            (elemento) => elemento.maxValueSpecification
          );

          setRango((prevDatos) => ({
            max: cloro?.maxValueSpecification,
            minRange: ph?.minRange,
            maxRange: ph?.maxRange,
          }));
        } else if (typeValidation == "Norma") {
          const normativityId = response?.testTest[0].normativityId.parameter;

          const ph = normativityId?.find((elemento) => elemento.minRange);

          const cloro = normativityId?.find(
            (elemento) => elemento.maxValueSpecification
          );

          setRango((prevDatos) => ({
            max: cloro?.maxValueSpecification,
            minRange: ph?.minRange,
            maxRange: ph?.maxRange,
          }));
        }

        //*

        // if (response?.testTest[0]?.typeValidation === "Manual") {
        //   //*Ph
        //   const minRange =
        //     response.testTest[0]?.parameters[1]?.minRange !== undefined
        //       ? response.testTest[0]?.parameters[1]?.minRange
        //       : 0;

        //   const maxRange =
        //     response?.testTest[0]?.parameters[1]?.maxRange !== undefined
        //       ? response.testTest[0]?.parameters[1]?.maxRange
        //       : 0;

        //   //*Cloro
        //   const maximo =
        //     response.testTest[0]?.parameters[0]?.maxValueSpecification !==
        //     undefined
        //       ? response.testTest[0]?.parameters[0]?.maxValueSpecification
        //       : 0;

        //   setRango((prevDatos) => ({
        //     max: maximo,
        //     minRange: minRange,
        //     maxRange: maxRange,
        //   }));
        // } else if (response?.testTest[0]?.typeValidation === "Norma") {
        //   const maximo =
        //     response.testTest[0]?.normativityId?.parameter[0]
        //       .maxValueSpecification !== undefined
        //       ? response.testTest[0]?.normativityId?.parameter[0]
        //           .maxValueSpecification
        //       : 0;

        //   const minRange =
        //     response.testTest[0]?.normativityId?.parameter[1].minRange !==
        //     undefined
        //       ? response.testTest[0]?.normativityId?.parameter[1].minRange
        //       : 0;
        //   const maxRange =
        //     response.testTest[0]?.normativityId?.parameter[1].maxRange !==
        //     undefined
        //       ? response.testTest[0]?.normativityId?.parameter[1].maxRange
        //       : 0;

        //   setRango((prevDatos) => ({
        //     max: maximo,
        //     minRange: minRange,
        //     maxRange: maxRange,
        //   }));
        // }

        //! se procede a hacer un nuevo mapeo para asignar Cloro y Ph en los inputs en la vista parametrso

        break;
      case 400:
        const response2 = await respuesta.json();
        break;
      case 404:
        const response3 = await respuesta.json();
        break;
      case 500:
        const response4 = await respuesta.json();
        break;

      default:
        break;
    }
  };

  const listarHistorico2 = async () => {
    const tokenSend = localStorage.getItem("clave");
    const respuesta = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/history-pool/${pool._id}`,
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
        const response = await respuesta.json();
        // setMiHistorico(response.historyPoolIdFormatted);

        setIdHistoricoRetornado(response?.historyPoolId[0]?._id);
        setIdHistorico(response?.historyPoolId[0]?._id);

        const newArray = response?.historyPoolIdFormatted?.flatMap((elemento) =>
          elemento.parameters.map((parametro, index) => ({
            id: index * Math.random(),
            fecha: elemento.date,
            nombre: parametro.nameParam, // Corregir aquí
            date: parametro.date,
            ajustado:
              parametro.nameParam === "Cloro" // Corregir aquí
                ? parametro.isAdjustedChlorine
                : parametro.isAdjustedPh,
            maximo: parametro.max,
            mensaje: parametro.message,
            minimo: parametro.min,
            real: parametro.real,
            usuario: elemento.modifiedBy.name,
            apellido: elemento.modifiedBy.lastName || "",
          }))
        );

        setMiHistorico(newArray);

        break;
      case 400:
        const response2 = await respuesta.json();

        break;
      case 404:
        const response3 = await respuesta.json();
        break;
      case 500:
        const response4 = await respuesta.json();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    listaDeMisPiscinas();
    // setReload(false); // Reset reload flag
  }, []);

  useEffect(() => {
    if (pool === "") {
      return; //
    }

    listarAforo(pool?._id);
    listarHistorico();
    listarHistorico2();
  }, [pool?._id]);

  useEffect(() => {
    if (pool === "") {
      return; //
    }

    listarAforo(pool._id);
  }, [contadorAforo]);

  useEffect(() => {
    if (pool === "") {
      return; //
    }

    listarHistorico2();
  }, [renderTabla]);

  return (
    <Box sx={{ ...styles.generalContainer }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>

      {cargando ? (
        <Backdrop open={cargando}></Backdrop>
      ) : (
        <Box sx={animationStyles.mainBox}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={0}
              sm={0}
              md={4}
              sx={{
                // backgroundColor: "red",
                height: "100%",
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              {data && (
                <SliderVertical
                  data={data}
                  obtenerId={obetnerId}
                ></SliderVertical>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid
                item
                xs={12}
                sx={{
                  width: "100%",
                  height: { xs: "50vh", sm: "30vh" },
                  display: { xs: "flex", sm: "flex", md: "none" },
                }}
              >
                {data && (
                  <SliderHorizontal
                    data={data}
                    obtenerId={obetnerId}
                  ></SliderHorizontal>
                )}
              </Grid>
              <Grid item xs={12} sx={{ height: "15%" }}>
                <Box
                  sx={{
                    //backgroundColor: "cyan",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    marginTop: { xs: "0px", sm: "200px", md: "0px" },
                    marginBottom: { xs: "0px", sm: "0px", md: "120px" },
                  }}
                >
                  <Box
                    sx={{
                      //backgroundColor: "red",
                      height: "100px",
                      width: { xs: "100%", sm: "50%" },
                      marginTop: { xs: "50px", sm: "90px" },
                      marginRight: { xs: "2%", sm: "1%", md: "7%", lg: "5%" },
                      marginBottom: { xs: "0px", sm: "80px" },
                    }}
                  >
                    <InputSelect
                      label="Buscar piscina"
                      options={nombresPiscinas}
                      icon={<Pool></Pool>}
                      placeholder="Seleccione una piscina"
                      onChange={(e) => obtenerIdPorNombre(e.target.textContent)}
                    ></InputSelect>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ height: "85%" }}>
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: { xs: "-8%", md: "-5%", lg: "-5%" },
                    // backgroundColor: "antiquewhite",
                    height: "45px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "1%",
                      marginTop: "5px",
                      height: "40px",
                      width: "500px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      onClick={() => setContador(1)}
                      sx={{
                        width: "150px",
                        backgroundColor:
                          contador === 1 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 1 ? "black" : "white",
                        border: contador == 1 ? "1px solid rgb(0,164,228)" : "",
                        borderRight: "1px solid white",
                        borderRadius: "5px 0px 0px 0px",
                        cursor: "pointer",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Parámetro
                    </Typography>

                    <Typography
                      onClick={() => {
                        setContador(2);
                      }}
                      sx={{
                        backgroundColor:
                          contador === 2 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 2 ? "black" : "white",
                        width: "120px",
                        border:
                          contador == 2 ? "1px solid rgb(0,164,228)" : "white",
                        borderRight: "1px solid white",
                        cursor: "pointer",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Histórico
                    </Typography>

                    <Typography
                      onClick={() => setContador(3)}
                      sx={{
                        backgroundColor:
                          contador === 3 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 3 ? "black" : "white",
                        border: contador == 3 ? "1px solid rgb(0,164,228)" : "",
                        width: "150px",

                        borderRight: "1px solid white",

                        cursor: "pointer",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Crear Aforo
                    </Typography>
                    <Typography
                      onClick={() => {
                        setContador(4);
                      }}
                      sx={{
                        backgroundColor:
                          contador === 4 ? "white" : "rgb(0,164,228)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: contador === 4 ? "black" : "white",
                        width: "120px",

                        border: contador == 4 ? "1px solid rgb(0,164,228)" : "",
                        // borderRight: "1px solid white",
                        borderRadius: "0px 5px 0px 0px",
                        cursor: "pointer",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                          color: "black",
                          backgroundColor: "white",
                          border: "1px solid rgb(0,164,228)",
                        },
                      }}
                    >
                      Ver aforo
                    </Typography>
                  </Box>

                  <Typography
                    onClick={() => setContador(0)}
                    sx={{
                      backgroundColor: "rgb(0,164,228)",
                      height: "40px",
                      marginTop: "5px",
                      width: { xs: "80%", sm: "30%", md: "20%" },
                      marginRight: { xs: "-5%", sm: "-5%", md: "0%" },
                      borderRadius: "5px 0px 0px 0px",
                      color: "white",
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Nunito Sans', sans-serif",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid rgb(0,164,228)",
                      },
                    }}
                  >
                    Mis piscinas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    // backgroundColor: "red",
                    height: { xs: "62vh", sm: "70vh", md: "62vh" },
                    width: { xs: "95%", sm: "95%", md: "90%", lg: "100%" },
                    marginLeft: { xs: "2.5%", sm: "2.5%", md: "5%", lg: "-5%" },
                    borderRadius: "5px",
                    // backgroundColor: "cyan",
                    boxShadow: "0px 5px 5px 0px black",
                    border: "1px solid black",
                  }}
                >
                  <Box sx={{ height: "85%", overflowY: "scroll" }}>
                    <Box
                      sx={{
                        display: contador === 0 ? "block" : "none",
                      }}
                    >
                      {/* Seccion de informacion general */}
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: "22px",
                                borderBottom: "3px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "30px",
                              }}
                            >
                              Información General
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "100%",
                                height: "400px",
                                // backgroundColor: "red",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={pool?.photo}
                                className="img-piscina"
                              ></img>
                            </Box>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Nombre
                            </Typography>
                            <Typography>{pool?.name}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Departamento
                            </Typography>
                            <Typography>{pool?.department}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Ciudad/Municipio
                            </Typography>
                            <Typography>{pool?.city}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Uso
                            </Typography>
                            <Typography>{pool?.use}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Características
                            </Typography>
                            <Typography>{pool?.typePool}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Temperatura
                            </Typography>
                            <Typography>{pool?.temperature}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Temperatura externa
                            </Typography>
                            <Typography>{pool?.externalTemperature}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Estructura
                            </Typography>
                            <Typography>{pool?.category}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Clase de istalación
                            </Typography>
                            <Typography>{pool?.typeInstallation}</Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Secion de medidas */}
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: "22px",
                                borderBottom: "3px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "30px",
                              }}
                            >
                              Medidas
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Forma
                            </Typography>
                            <Typography>{pool?.form}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Largo (m)
                            </Typography>
                            <Typography>{pool?.height}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Ancho (m)
                            </Typography>
                            <Typography>{pool?.width}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad A (m)
                            </Typography>
                            <Typography>{pool?.depth?.depthA}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad B (m)
                            </Typography>
                            <Typography>{pool?.depth?.depthB}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad C (m)
                            </Typography>
                            <Typography>{pool?.depth?.depthC}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Proundidad máxima (m)
                            </Typography>
                            <Typography>{pool?.maxDepth}</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad promedio (m)
                            </Typography>
                            <Typography>{pool?.minDepth}</Typography>
                          </Grid>

                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad minima (m)
                            </Typography>
                            <Typography>{pool?.meanDepth}</Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Seccion de detalles de operacion */}
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: "22px",
                                borderBottom: "3px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "30px",
                              }}
                            >
                              Detalles de operación
                            </Typography>
                          </Grid>

                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Sistema de operación
                            </Typography>
                            <Typography>{pool?.systemOperation}</Typography>
                          </Grid>
                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Caudal
                            </Typography>
                            <Typography>{pool?.caudal}</Typography>
                          </Grid>
                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Climatizado
                            </Typography>
                            <Typography>{pool?.airConditioned}</Typography>
                          </Grid>

                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              P. Recirculació mínimo
                            </Typography>
                            <Typography>{pool?.maxDepth}</Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              P. Recirculació máximo
                            </Typography>
                            <Typography>{pool?.meanDepth}</Typography>
                          </Grid>

                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Dosificación automática
                            </Typography>
                            <Typography>{pool?.autoDosing}</Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Seccion de equipos */}
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: "22px",
                                borderBottom: "3px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "30px",
                              }}
                            >
                              Sección de filtros
                            </Typography>
                          </Grid>

                          {pool === "" ? (
                            <Typography>No data</Typography>
                          ) : (
                            pool?.filters?.map((elemento, index) => (
                              <Grid
                                key={index}
                                container
                                marginTop={1}
                                marginBottom={1}
                              >
                                <Grid item xs={12}>
                                  <Typography
                                    sx={{
                                      ...styles.fontTypografy,
                                      width: "20%",
                                      marginLeft: "40%",
                                      borderBottom: "2px solid black",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Filtro {index + 1}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Filtro
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filter}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Altua del filtro
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterBedHeight}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Capacidad del filtro
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterCapacity}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Diametro del filtro
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterDiameter}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Filter Height
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterHeight}
                                  </Typography>
                                </Grid>
                              </Grid>
                            ))
                          )}

                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: "22px",
                                borderBottom: "3px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "30px",
                              }}
                            >
                              Sección de bombas
                            </Typography>
                          </Grid>

                          {pool === "" ? (
                            <Typography></Typography>
                          ) : (
                            pool?.pumps?.map((elemento, index) => (
                              <Grid
                                key={index}
                                container
                                // sx={{ backgroundColor: "blue" }}
                              >
                                <Grid item xs={12}>
                                  <Typography
                                    sx={{
                                      ...styles.fontTypografy,
                                      width: "20%",
                                      marginLeft: "40%",
                                      borderBottom: "2px solid black",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Bomba {index + 1}
                                  </Typography>
                                </Grid>
                                <Grid
                                  xs={12}
                                  sx={{
                                    // backgroundColor: "pink",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src={elemento.platePhoto}
                                    style={{
                                      width: "300px",
                                      height: "300px",
                                      borderRadius: "5px",
                                    }}
                                  ></img>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Marca
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.pumpBrand}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Flujo
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.pumpFlow}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Referencia
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.referencePump}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Hoja de datos
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <a
                                      href={elemento.dataSheetPump}
                                      target="_blank"
                                    >
                                      <IconButton>
                                        <PictureAsPdfIcon
                                          sx={{
                                            color: "red",
                                          }}
                                        ></PictureAsPdfIcon>
                                      </IconButton>
                                    </a>
                                  </Box>
                                </Grid>
                              </Grid>
                            ))
                          )}

                          <Grid item xs={12}>
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontSize: "22px",
                                borderBottom: "3px solid black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "30px",
                              }}
                            >
                              Sección de Calentador
                            </Typography>
                          </Grid>
                          {pool === "" ? (
                            <></>
                          ) : (
                            <>
                              {pool?.heaters?.map((elemento, index) => (
                                <Grid container key={index}>
                                  <Grid item xs={12}>
                                    <Typography
                                      sx={{
                                        ...styles.fontTypografy,
                                        width: "20%",
                                        marginLeft: "40%",
                                        borderBottom: "2px solid black",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      Calentador {index + 1}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Typography
                                      sx={{ ...styles.fontTypografy }}
                                    >
                                      Referencia
                                    </Typography>
                                    <Typography sx={{ ...styles.fontTexto }}>
                                      {elemento.heaterReference}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Typography
                                      sx={{ ...styles.fontTypografy }}
                                    >
                                      Marca
                                    </Typography>
                                    <Typography sx={{ ...styles.fontTexto }}>
                                      {elemento.heaterBrand}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Typography
                                      sx={{ ...styles.fontTypografy }}
                                    >
                                      Hoja de datos
                                    </Typography>
                                    <Typography>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <a
                                          href={elemento.dataSheetHeater}
                                          target="_blank"
                                        >
                                          <IconButton>
                                            <PictureAsPdfIcon
                                              sx={{
                                                color: "red",
                                              }}
                                            ></PictureAsPdfIcon>
                                          </IconButton>
                                        </a>
                                      </Box>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ))}
                            </>
                          )}
                        </Grid>
                      </Box>
                    </Box>

                    {/* Seccion e parametros */}

                    <Box sx={{ display: contador == 1 ? "block" : "none" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              fontFamily: "'Nunito Sans', sans-serif",
                              fontSize: "22px",
                              borderBottom: "3px solid black",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingTop: "30px",
                            }}
                          >
                            Crear parámetro
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <InputGeneal
                            name="fecha"
                            onChange={capTurarDatosParametros}
                            type="date"
                            label="Fecha"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            value={dataParametro.PPMactualCloro}
                            name="PPMactualCloro"
                            onChange={capTurarDatosParametros}
                            label="PPM actual | cloro"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            disabled
                            value={dataRango?.max}
                            name="PPMdeseadoMaximo"
                            onChange={capTurarDatosParametros}
                            label="PPM deseado máximo | cloro"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputGeneal
                            value={dataParametro.PPMactualPh}
                            name="PPMactualPh"
                            onChange={capTurarDatosParametros}
                            label="PPM actual | ph"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <InputGeneal
                            disabled
                            value={dataRango.minRange}
                            name="PPMdeseado"
                            onChange={capTurarDatosParametros}
                            label="PPM deseado minímo | ph"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <InputGeneal
                            disabled
                            value={dataRango.maxRange}
                            name="PPMdeseado2"
                            onChange={capTurarDatosParametros}
                            label="PPM deseado máximo | ph"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              // backgroundColor: "red",
                              paddingTop: "10px",
                            }}
                          >
                            {/* {dataParametro.PPMactualPh > dataRango.minRange &&
                            dataParametro.PPMactualPh < dataRango.maxRange ? ( */}
                            <Typography
                              sx={{
                                width: "800px",
                                display:
                                  dataParametro.PPMactualPh >=
                                    dataRango.minRange &&
                                  dataParametro.PPMactualPh <=
                                    dataRango.maxRange &&
                                  dataParametro.PPMactualPh > 0
                                    ? "flex"
                                    : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "50px",
                                backgroundColor: "rgb( 178, 252, 126 )",
                                color: "white",
                                fontFamily: "'Nunito Sans', sans-serif",
                                borderRadius: "5px",
                              }}
                            >
                              Ph en el rango permitido
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: "bold",

                                display:
                                  (dataParametro.PPMactualPh > 0 &&
                                    dataParametro.PPMactualPh <
                                      dataRango.minRange) ||
                                  dataParametro.PPMactualPh > dataRango.maxRange
                                    ? "flex"
                                    : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "5px",
                                width: "800px",
                                height: "50px",
                                justifyContent: "center",
                                backgroundColor: "rgb( 253, 94, 94 )",
                                color: "white",
                              }}
                            >
                              Ph esta fuera del rango permitido
                            </Typography>
                            {/* )} */}
                          </Box>
                        </Grid>
                        {/* Validacion cloro */}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              // backgroundColor: "red",
                              paddingTop: "10px",
                            }}
                          >
                            {/* {dataParametro.PPMactualCloro > dataRango.max  ? ( */}
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                display:
                                  dataParametro.PPMactualCloro === 0
                                    ? "none"
                                    : dataParametro.PPMactualCloro >
                                      dataRango.max
                                    ? "flex"
                                    : "none",

                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "5px",
                                width: "100%",
                                height: "50px",
                                backgroundColor: "rgb( 253, 94, 94 )",
                                color: "white",
                              }}
                            >
                              Cloro está fuera de rango{" "}
                            </Typography>

                            <Typography
                              sx={{
                                display:
                                  dataParametro.PPMactualCloro > 0 &&
                                  dataParametro.PPMactualCloro < dataRango.max
                                    ? "flex"
                                    : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "50px",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                backgroundColor: "rgb( 178, 252, 126 )",
                                color: "white",
                              }}
                            >
                              Cloro está dentro del rango permitido
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            disabled={deshabilidar}
                            onClick={() => enviarParametros()}
                            variant="contained"
                            sx={{
                              width: "95%",
                              marginLeft: "2.5%",
                              marginTop: "10px",
                              backgroundColor: "rgb(0,164,228)",
                              "&:hover": {
                                backgroundColor: "rgb(0,164,228)",
                              },
                            }}
                          >
                            {deshabilidar === true ? (
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

                    {/* Seccion de cerar Aforo */}
                    <Box
                      sx={{
                        display: contador == 3 ? "flex" : "none",
                        // display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "red",
                        height: "100%",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              fontFamily: "'Nunito Sans', sans-serif",
                              fontSize: "22px",
                              borderBottom: "3px solid black",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingTop: "30px",
                              marginTop: { xs: "70px", sm: "0px" },
                            }}
                          >
                            Crear aforo
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            name="fechaInicio"
                            onChange={capTurarDatosAforo}
                            label="Fecha inicio"
                            type="date"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            name="fechaFinal"
                            onChange={capTurarDatosAforo}
                            label="Fecha final"
                            type="date"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            name="cantidadPersonas"
                            onChange={capTurarDatosAforo}
                            label="Cantidad de personas"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            name="horasDeUso"
                            onChange={capTurarDatosAforo}
                            label="Horas de uso"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            onClick={() => crearAforo()}
                            variant="contained"
                            disabled={peticion}
                            sx={{
                              width: "95%",
                              marginLeft: "2.5%",
                              backgroundColor:
                                peticion === true
                                  ? "rgb( 210, 210, 210 )"
                                  : "rgb(0,164,228)",
                              "&:hover": {
                                backgroundColor: "rgb(0,164,228)",
                              },
                            }}
                          >
                            {peticion ? (
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

                    {/* Seccion de crear Aforo */}
                    <Box
                      sx={{ display: contador == 3 ? "block" : "none" }}
                    ></Box>
                    {respuestaAforo === "" ? (
                      ""
                    ) : (
                      <Box>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              fontFamily: "'Nunito Sans', sans-serif",
                              fontSize: "22px",
                              borderBottom: "3px solid black",
                              display: contador === 4 ? "flex" : "none",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingTop: "30px",
                            }}
                          >
                            Ver aforo
                          </Typography>
                        </Grid>
                        <Tabla
                          data={respuestaAforo}
                          contador={contador}
                          nombrePiscina={pool?.name}
                        ></Tabla>
                      </Box>
                    )}

                    <Box
                      sx={{
                        display: contador === 2 ? "content" : "none",
                        // backgroundColor: "red",
                        width: "100&",
                        height: "100%",
                      }}
                    >
                      <Box>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              fontFamily: "'Nunito Sans', sans-serif",
                              fontSize: "22px",
                              borderBottom: "3px solid black",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingTop: "30px",
                            }}
                          >
                            Ver histórico
                          </Typography>
                        </Grid>
                        <TablaLisaHistorico
                          renderizar={() => setRenderTabla(renderTabla + 1)}
                          idPool={pool?._id}
                          idHistorico={historicoId}
                          // CloroPh={}
                          data={miHistorico}
                          contador={contador}
                        ></TablaLisaHistorico>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      // backgroundColor: "cyan",
                      height: "10%",
                      display: "flex",
                      justifyContent: contador === 0 ? "end" : "space-between",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => decrementar()}
                      sx={{
                        "&:hover": {
                          color: "rgb(0,164,228)",
                        },

                        display: contador == 0 ? "none" : "block",
                      }}
                    >
                      <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => incrementar()}
                      sx={{
                        "&:hover": {
                          color: "rgb(0,164,228)",
                        },
                      }}
                    >
                      <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
      <Alertas
        open={openAlerta}
        cerrar={() => setOpenAlerta(false)}
        mensaje={mensaje}
        severity={color}
      ></Alertas>
      <ModalAjustar
        open={openModalAjustar}
        close={() => setOpenModalAjustar(false)}
      ></ModalAjustar>
    </Box>
  );
}

export default GestionarPiscinas;

const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100%",
    // backgroundColor: "red",
  },
  fontTypografy: {
    fontFamily: "'Nunito Sans', sans-serif",
    display: "flex",
    justifyContent: "center",
  },

  fontTexto: {
    display: "flex",
    justifyContent: "center",
  },
};
