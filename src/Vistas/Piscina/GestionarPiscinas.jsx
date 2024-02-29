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
import circular from "../../assets/imagePool/PiscinaCircular.png";
import rectangular from "../../assets/imagePool/PiscinaRectangular.png";
import ovalada from "../../assets/imagePool/PiscinaOvalada.png";
import "../../Estilos/Piscina/misPiscinas.css";
import { useLocation } from "react-router-dom";
import * as services from "../../services/pisicinas/gestionarPiscinas/services";
import InputSelectPool from "../../Componentes/General/InputSelectPool";

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
  const [inActivar, setInactivar] = useState(false);
  const [dataRango, setRango] = useState({
    max: 0,
    minRange: 0,
    maxRange: 0,
  });

  document.body.style.overflow = "hidden";
  const [idProp, setIdProp] = useState("");
  const [nombresPiscinas, setNombresPiscinas] = useState([]);
  const [historicoId, setIdHistorico] = useState("");
  const [myCount, setMyCount] = useState(0);
  const [openModalAjustar, setOpenModalAjustar] = useState(false);
  const [renderTabla, setRenderTabla] = useState(0);

  const [contador, setContador] = useState(0);
  const [miHistorico, setMiHistorico] = useState([]);
  // Estados para capturar datos de parametros y aforro
  const [dataParametro, setDataParametro] = useState({
    fecha: "",
    PPMactualCloro: "",
    PPMdeseadoMaximo: dataRango.max,
    PPMactualPh: "",
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

  const location = useLocation();

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

  const limiarParametros = () => {
    setDataParametro({
      PPMactualCloro: "",
      PPMactualPh: "",
      fecha: "",
    });
  };

  const limpiarAforo = () => {
    setDataAforo({
      fechaFinal: "",
      fechaInicio: "",
      cantidadPersonas: "",
      horasDeUso: "",
    });
  };

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
    setDataParametro((prevDatos) => {
      const newData = {
        ...prevDatos,
        [name]: value,
      };
      if (newData.PPMactualCloro < 0 || newData.PPMactualPh < 0) {
        setInactivar(true);
      } else if (
        newData.PPMactualCloro === "0" ||
        newData.PPMactualPh === "0"
      ) {
        setInactivar(true);
      } else {
        setInactivar(false);
      }
      return newData;
    });
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
      setColor("error");
      return;
    }

    setPeticion(true);

    //!! Cambiar la url del enpoin a la nueva
    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/aforo",
      {
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
      }
    );

    switch (response.status) {
      case 200:
        const respuesta = response.json();
        setOpenAlerta(true);
        setMensaje("Aforo creado correctamente");
        setColor("success");
        setDeshabilitar(false);
        setPeticion(false);
        setContadorAforo(contadorAforo + 1);
        limpiarAforo();

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
      // `https://treea-piscinas-api.vercel.app/v1/aforo/${idPool}`,
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
      // backgroundColor: "red",
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
    const rol = localStorage.getItem("rol");

    if (rol === "GESTOR") {
      services.listarPiscinasPorId().then((res) => {
        switch (res.status) {
          case 200:
            setData(res);
            const nombrePiscinas = res?.pools?.map((piscina) => ({
              label: piscina.name,
            }));
            setNombresPiscinas(nombrePiscinas);
            setCargando(false);
            break;

          default:
            break;
        }
      });
      return;
    }

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
          const queryParams = new URLSearchParams(location.search);
          const id = queryParams.get("id");

          setIdProp(id);
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

  const obtenerIdProp = (idPool) => {
    if (idPool === null || idPool === "") {
      return;
    } else {
      const respuesta = data?.pools?.find((element) => element?._id === idPool);
      setPool(respuesta);
      setContador(2);
    }
  };

  const crearNotificacion = async (id) => {
    const rol = localStorage.getItem("rol");

    if (rol === "GERENTE") {
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
    } else if (rol === "GESTOR") {
      try {
        const response = await fetch(
          "https://treea-piscinas-api.vercel.app/v1/notify-gestor",
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
    }
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
        limiarParametros();
        break;

      case 400:
        const responsess = await respuesta.json();
        setOpenAlerta(true);
        setMensaje("Campos obligatorios vacios");
        setColor("error");

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
      `https://treea-piscinas-api.vercel.app/v1/pool/${pool?._id}`,
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
        console.log({ WEY: response?.testTest[0] });

        const typeValidation = response?.testTest[0]?.typeValidation;

        if (typeValidation == "Manual") {
          const ph = response.testTest[0].parameters.find(
            (elemento) => elemento.minRange
          );

          const cloro = response.testTest[0].parameters.find(
            (elemento) => elemento.maxValueSpecification
          );

          setRango((prevDatos) => ({
            max: cloro?.maxValueSpecification || "",
            minRange: ph?.minRange || "",
            maxRange: ph?.maxRange || "",
          }));
        } else if (typeValidation == "Norma") {
          const normativityId = response?.testTest[0].normativityId.parameter;

          const ph = normativityId?.find((elemento) => elemento.minRange);

          const cloro = normativityId?.find(
            (elemento) => elemento.maxValueSpecification
          );

          setRango((prevDatos) => ({
            max: cloro?.maxValueSpecification || "",
            minRange: ph?.minRange || "",
            maxRange: ph?.maxRange || "",
          }));
        } else {
          setRango((prevDatos) => ({
            max: "",
            minRange: "",
            maxRange: "",
          }));
        }

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
      `https://treea-piscinas-api.vercel.app/v1/history-pool/${pool?._id}`,
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
        // originalConsoleLog({ NEIDER: response?.historyPoolIdFormatted });
        setIdHistoricoRetornado(response?.historyPoolId[0]?._id);
        setIdHistorico(response?.historyPoolId[0]?._id);

        const newArray = response?.historyPoolIdFormatted?.flatMap((elemento) =>
          elemento.parameters.map((parametro, index) => ({
            idGlobal: elemento._id,
            idPh: parametro?.phId,
            idCloro: parametro?.chlorineId,
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
    obtenerIdProp(idProp);

    // setReload(false); // Reset reload flag
  }, [idProp]);

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

    listarAforo(pool?._id);
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
                // overflowY: "scroll",
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
                    // backgroundColor: "pink",
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
                      // backgroundColor: "blue",
                      height: "70px",
                      width: { xs: "100%", sm: "50%" },
                      marginTop: {
                        xs: "20px",
                        sm: "50px",
                        md: "0px",
                        lg: "-15px",
                        xl: "15px",
                      },
                      marginRight: { xs: "2%", sm: "1%", md: "7%", lg: "5%" },
                      marginBottom: { xs: "0px", sm: "80px", md: "0px" },
                    }}
                  >
                    <InputSelectPool
                      size="small"
                      label="Buscar piscina"
                      options={nombresPiscinas}
                      icon={<Pool></Pool>}
                      placeholder="Seleccione una piscina"
                      onChange={(e) => obtenerIdPorNombre(e.target.textContent)}
                    ></InputSelectPool>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    //backgroundColor: "blue",
                    marginLeft: { xs: "-8%", md: "-5%", lg: "-5%" },
                    marginTop: "-20px",
                    // backgroundColor: "antiquewhite",
                    height: "45px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      // backgroundColor: "green",
                      marginLeft: "1%",
                      marginTop: {
                        xs: "-9.4%",
                        sm: "-10%",
                        md: "0.6%",
                        lg: "0.4%",
                        xl: "0.4%",
                      },
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
                      Crear aforo
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
                      marginTop: {
                        xs: "-9%",
                        sm: "0.5%",
                        md: "0.6%",
                        lg: "0.5%",
                        xs: "0.5%",
                      },
                      // marginTop: { xs: "-9.4%", xl: "-14.5%" },
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
                    backgroundColor: "white",
                    height: {
                      xs: "62vh",
                      sm: "70vh",
                      md: "63vh",
                      lg: "64vh",
                      xl: "60vh",
                    },
                    width: { xs: "95%", sm: "95%", md: "90%", lg: "100%" },
                    marginLeft: { xs: "2.5%", sm: "2.5%", md: "5%", lg: "-5%" },
                    borderRadius: "5px",
                    // backgroundColor: "red",
                    boxShadow: "0px 5px 5px 0px black",
                    border: "1px solid black",
                  }}
                >
                  <Box
                    sx={{
                      height: "85%",
                      overflowY: "scroll",
                      // backgroundColor: "red",
                    }}
                  >
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
                              Dirección
                            </Typography>
                            <Typography>{pool?.address}</Typography>{" "}
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
                              Clase de instalación
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

                          <Grid xs={12}>
                            {pool?.form === "Rectangular" ? (
                              <Box
                                sx={{
                                  width: "90%",
                                  marginLeft: "5%",
                                  height: "400px",
                                  // backgroundColor: "cyan",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                              >
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "100px",
                                    left: "40%",
                                    transform: "rotate(-30deg)",
                                  }}
                                >
                                  {pool?.height} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "200px",
                                    left: "45%",
                                  }}
                                >
                                  {pool?.width} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "320px",
                                    left: "55%",
                                  }}
                                >
                                  A. {pool?.depth?.depthA} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "280px",
                                    left: "65%",
                                  }}
                                >
                                  B. {pool?.depth?.depthB} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "230px",
                                    left: "75%",
                                  }}
                                >
                                  C. {pool?.depth?.depthC} m
                                </Typography>
                                <img
                                  src={rectangular}
                                  className="img_rectangurlar"
                                ></img>
                              </Box>
                            ) : pool?.form === "Circular" ? (
                              <Box
                                sx={{
                                  width: "90%",
                                  marginLeft: "5%",
                                  height: "400px",
                                  // backgroundColor: "cyan",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                              >
                                {/* <Typography sx={{position:"absolute", top:"110px", left:"35%"}}>{pool?.height} m</Typography> */}
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "180px",
                                    left: "50%",
                                  }}
                                >
                                  {pool?.width} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "270px",
                                    left: "20%",
                                  }}
                                >
                                  A. {pool?.depth?.depthA} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "190px",
                                    left: "20%",
                                  }}
                                >
                                  B. {pool?.depth?.depthB} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "120px",
                                    left: "20%",
                                  }}
                                >
                                  C. {pool?.depth?.depthC} m
                                </Typography>
                                <img
                                  src={circular}
                                  className="img_rectangurlar"
                                ></img>
                              </Box>
                            ) : pool?.form === "Ovalada" ? (
                              <Box
                                sx={{
                                  width: "90%",
                                  marginLeft: "5%",
                                  height: "400px",
                                  // backgroundColor: "cyan",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                              >
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "100px",
                                    left: "40%",
                                    transform: "rotate(-30deg)",
                                  }}
                                >
                                  {pool?.height} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "180px",
                                    left: "46%",
                                  }}
                                >
                                  {pool?.width} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "320px",
                                    left: "55%",
                                  }}
                                >
                                  A. {pool?.depth?.depthA} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "260px",
                                    left: "63%",
                                  }}
                                >
                                  B. {pool?.depth?.depthB} m
                                </Typography>
                                <Typography
                                  sx={{
                                    position: "absolute",
                                    top: "200px",
                                    left: "68%",
                                  }}
                                >
                                  C. {pool?.depth?.depthC} m
                                </Typography>
                                <img
                                  src={ovalada}
                                  className="img_rectangurlar"
                                ></img>
                              </Box>
                            ) : (
                              ""
                            )}
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Profundidad máxima (m)
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
                              Profundidad mínima (m)
                            </Typography>
                            <Typography>{pool?.meanDepth}</Typography>
                          </Grid>
                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Volumen (m³)
                            </Typography>
                            <Typography>
                              {" "}
                              {pool?.poolVolumR === undefined
                                ? ""
                                : pool?.poolVolumR}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              Volumen (L)
                            </Typography>
                            <Typography>
                              {pool?.numberLitersR === undefined
                                ? ""
                                : pool?.numberLitersR}
                            </Typography>
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
                              Caudal (L/seg)
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
                              P. Recirculación mínimo (h)
                            </Typography>
                            <Typography>
                              {pool?.recirculationPeriod?.min}
                            </Typography>
                          </Grid>

                          <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                            >
                              P. Recirculación máximo (h)
                            </Typography>
                            <Typography>
                              {pool?.recirculationPeriod?.max}
                            </Typography>
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
                            <Typography
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              No data
                            </Typography>
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
                                    Altura del filtro (m)
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterBedHeight}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Capacidad del filtro (L)
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterCapacity}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Diámetro del filtro (m)
                                  </Typography>
                                  <Typography sx={{ ...styles.fontTexto }}>
                                    {elemento.filterDiameter}
                                  </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography sx={{ ...styles.fontTypografy }}>
                                    Altura del lecho filtrante (m)
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
                                    Ficha técnica
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
                                      Ficha técnica
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
                            value={dataParametro.fecha}
                            name="fecha"
                            onChange={capTurarDatosParametros}
                            type="date"
                            label="Fecha"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box
                            sx={{
                              // backgroundColor: "blue",
                              width: { xs: "100%", sm: "100%", md: "90%" },
                              marginLeft: { xs: "0%", sm: "0%", md: "6%" },
                            }}
                          >
                            <InputGeneal
                              placeholder="0"
                              value={dataParametro.PPMactualCloro}
                              name="PPMactualCloro"
                              onChange={capTurarDatosParametros}
                              label="PPM actual | cloro"
                              type="number"
                              icon={<PoolIcon></PoolIcon>}
                            ></InputGeneal>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box
                            sx={{
                              // backgroundColor: "red",
                              width: { xs: "100%", sm: "100%", md: "90%" },
                              marginLeft: { xs: "0%", sm: "0%", md: "5%" },
                            }}
                          >
                            <InputGeneal
                              disabled
                              value={dataRango?.max}
                              name="PPMdeseadoMaximo"
                              onChange={capTurarDatosParametros}
                              label="PPM deseado máximo | cloro"
                              type="number"
                              icon={<PoolIcon></PoolIcon>}
                            ></InputGeneal>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                          <Box
                            sx={{
                              // backgroundColor: "blue",
                              width: { xs: "100%", sm: "100%", md: "90%" },
                              marginLeft: { xs: "0%", sm: "0%", md: "12%" },
                            }}
                          >
                            <InputGeneal
                              placeholder="0"
                              value={dataParametro.PPMactualPh}
                              name="PPMactualPh"
                              onChange={capTurarDatosParametros}
                              label="PPM actual | ph"
                              type="number"
                              icon={<PoolIcon></PoolIcon>}
                            ></InputGeneal>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                          <Box
                            sx={
                              {
                                // backgroundColor: "cyan",
                              }
                            }
                          >
                            <InputGeneal
                              disabled
                              value={dataRango.minRange}
                              name="PPMdeseado"
                              onChange={capTurarDatosParametros}
                              label="PPM deseado minímo | ph"
                              type="number"
                              icon={<PoolIcon></PoolIcon>}
                            ></InputGeneal>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Box
                            sx={{
                              // backgroundColor: "blue",
                              width: { xs: "100%", sm: "100%", md: "90%" },
                              marginRight: { xs: "0%", sm: "0%", md: "16%" },
                            }}
                          >
                            <InputGeneal
                              disabled
                              value={dataRango.maxRange}
                              name="PPMdeseado2"
                              onChange={capTurarDatosParametros}
                              label="PPM deseado máximo | ph"
                              type="number"
                              icon={<PoolIcon></PoolIcon>}
                            ></InputGeneal>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              marginLeft: "5%",
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
                              width: "90%",
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
                              marginLeft: "5%",
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
                              width: "90%",
                              height: "50px",
                              justifyContent: "center",
                              backgroundColor: "rgb( 253, 94, 94 )",
                              color: "white",
                            }}
                          >
                            Ph está fuera del rango permitido
                          </Typography>
                        </Grid>
                        {/* Validacion cloro */}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              // backgroundColor: "red",
                              // paddingTop: "10px",
                            }}
                          >
                            {/* {dataParametro.PPMactualCloro > dataRango.max  ? ( */}

                            <Typography
                              sx={{
                                display:
                                  dataParametro.PPMactualCloro < 0 ||
                                  dataParametro.PPMactualPh < 0
                                    ? "flex"
                                    : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "50px",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                backgroundColor: "rgb(253, 94, 94 )",
                                color: "white",
                              }}
                            >
                              No puedes ingresar valores negativos
                            </Typography>
                            <Typography
                              sx={{
                                display:
                                  dataParametro.PPMactualCloro === "0" ||
                                  dataParametro.PPMactualPh === "0"
                                    ? "flex"
                                    : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "50px",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                backgroundColor: "rgb(253, 94, 94 )",
                                color: "white",
                                marginTop: "10px",
                              }}
                            >
                              Debe ingresar números mayores a 0
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "90%",
                              marginLeft: "5%",
                              // backgroundColor: "red",
                              // paddingTop: "10px",
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
                                  dataParametro.PPMactualCloro <= dataRango.max
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
                            disabled={
                              deshabilidar || inActivar === true
                                ? true
                                : deshabilidar || inActivar === false
                                ? false
                                : ""
                            }
                            onClick={() => enviarParametros()}
                            variant="contained"
                            sx={{
                              width: "95%",
                              marginLeft: "2.5%",
                              marginTop: "10px",
                              marginBottom: "10px",
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
                            value={dataAforo.fechaInicio}
                            name="fechaInicio"
                            onChange={capTurarDatosAforo}
                            label="Fecha inicio"
                            type="date"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            value={dataAforo.fechaFinal}
                            name="fechaFinal"
                            onChange={capTurarDatosAforo}
                            label="Fecha final"
                            type="date"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            value={dataAforo.cantidadPersonas}
                            name="cantidadPersonas"
                            onChange={capTurarDatosAforo}
                            label="Cantidad de personas"
                            type="number"
                            icon={<PoolIcon></PoolIcon>}
                          ></InputGeneal>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputGeneal
                            value={dataAforo.horasDeUso}
                            name="horasDeUso"
                            onChange={capTurarDatosAforo}
                            label="Tiempo de uso(h)"
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
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "blue",
                            height: "50vh",
                            display: contador === 4 ? "flex" : "none",
                          }}
                        >
                          <Tabla
                            data={respuestaAforo}
                            contador={contador}
                            nombrePiscina={pool?.name}
                          ></Tabla>
                        </Box>
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
    height: "98vh",
    overflowY: { xs: "scroll", ms: "scroll", md: "scroll", lg: "scroll" },
    // backgroundColor: "cyan",
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
