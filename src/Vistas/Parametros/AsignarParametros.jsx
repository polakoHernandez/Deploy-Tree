import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import Alertas from "../../Componentes/General/Alertas";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import Tabla from "../../Componentes/Parametros/Tabla";
import { Pool, Add, Delete } from "@mui/icons-material";
import TablaPrevisualizacion from "../../Componentes/Parametros/TablaPrevisualizacion";

function AsignarParametros() {
  //* Estado para guardar la data de los inuts cambiantes
  const [data, setData] = useState({
    nameNormativity: "",
    description: "",
    typeOfWater: "",
    name: "",
    parameter: [{ nameParam: "", specification: "" }], //*Manera Correcta
    //! cambio porque el backend espera nameParam y no name parameter: [{ name: "", specification: "" }],
  });
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");
  const [listaNormas, setListaNormas] = useState([]);
  const [listaPiscinas, setListaPiscinas] = useState([]);
  const [idNorma, setIdNorma] = useState("");
  const [optionsPiscinas, setOptionsPiscinas] = useState([]);
  const [valuPisicna, setValuPisicna] = useState([]);
  const [cargando, setCargando] = useState(false);

  //*Estao para renderizar el front
  const [reload, setReload] = useState(false);

  //* Estado ara guradar lo parametros
  const [listaParametros, setLisaParametros] = useState([]);

  //*funcion para listar los parametros
  const listarParametros = async () => {
    const respuesta = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/normativities",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (respuesta.status) {
      case 200:
        const response = await respuesta.json();
        setLisaParametros(response);

        const newArray = response.normativities.map((elemento) => ({
          label: elemento.nameNormativity,
        }));
        setListaNormas(newArray);

        break;

      case 401:
        break;

      case 500:
        break;
    }
  };

  //*Funcion para listar Piscinas
  const listarPiscinas = async () => {
    const respuesta = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/pools",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (respuesta.status) {
      case 200:
        const response = await respuesta.json();
        setListaPiscinas(response.pools);

        const newArray = response.pools.map((elemento) => ({
          label: elemento.name,
        }));

        setOptionsPiscinas(newArray);

        // response.pools.forEach((element) => {
        //   setListaPiscinas((prevData) => [
        //     ...prevData,
        //     { label: element.name },
        //   ]);
        // });

        break;

      case 401:
        break;

      case 500:
        break;
    }
  };

  //*Funcion para obtener idNorma
  const obtenerIdNorma = (norma) => {
    const retonro = listaParametros.normativities.find(
      (element) => element.nameNormativity == norma
    );
    setIdNorma(retonro);
  };

  const obtenerIdPiscina = (piscina) => {
    const retorno = listaPiscinas.find((elemento) => elemento.name === piscina);
    setValuPisicna(retorno._id);
  };

  const asignarNorma = async () => {
    setDeshabilitar(true);
    setCargando(true);

    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/parameterization",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
          "Content-Type": "application/json", // Añadido Content-Type
        },
        body: JSON.stringify({
          typeValidation: "Norma",
          normativityId: idNorma,
          poolId: valuPisicna,
        }),
      }
    );

    switch (response.status) {
      case 200:
        const result = await response.json();
        setOpen(true);
        setMensaje("Norma Asignada exitosamente!");
        setColor("success");
        setDeshabilitar(false);
        setCargando(false);

        break;

      case 400:
        setOpen(true);
        setMensaje("Todos los campos son obligatorios");
        setColor("error");
        setDeshabilitar(false);
        setCargando(false);

        break;

      case 401:
        setOpen(true);
        setMensaje("Token no valido");
        setColor("error");
        setDeshabilitar(false);
        setCargando(false);

        break;
    }

    try {
    } catch (error) {
      setOpen(true);
      setMensaje("Error en el servidor");
      setColor("error");
      setDeshabilitar(false);
      setCargando(false);
    }
    setCargando(false);
  };

  //*ontaodor para mostrar las vistas
  const [contador, setContador] = useState(1);

  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

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

  //*Seccion para los parametro cambiantes
  const catchEspecificacion = (value, index) => {
    const newData = { ...data };
    newData.parameter[index].specification = value;

    // Eliminar propiedades existentes
    delete newData.parameter[index].minRange;
    delete newData.parameter[index].maxRange;
    delete newData.parameter[index].maxValueSpecification;
    delete newData.parameter[index].analysisReport;

    // Agregar propiedades según la especificación
    if (value === "Rango") {
      // Validar y quitar 'analysisReport' si existe
      if (newData.parameter[index].analysisReport) {
        delete newData.parameter[index].analysisReport;
      }
    } else if (value === "Valor máximo") {
      // Validar y quitar 'analysisReport' si existe
      if (newData.parameter[index].analysisReport) {
        delete newData.parameter[index].analysisReport;
      }
    } else if (value === "Análisis y reporte") {
      // Validar y quitar 'minRange' y 'maxRange' si existen
      if (newData.parameter[index].minRange) {
        delete newData.parameter[index].minRange;
      }
      if (newData.parameter[index].maxRange) {
        delete newData.parameter[index].maxRange;
      }
      // Validar y quitar 'maximo' si existe
      if (newData.parameter[index].maxValueSpecification) {
        delete newData.parameter[index].maxValueSpecification;
      }

      // Agregar 'analysisReport'
      newData.parameter[index].analysisReport = ""; // Puedes asignar un valor por defecto si es necesario
    }

    setData(newData);
  };

  const catchData = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const catchDataSelect = (value) => {
    setData((prevData) => ({
      ...prevData,
      typeOfWater: value,
    }));
  };

  //*funcion  para aregar y quitar inputs
  const agregar = () => {
    setData((prevData) => ({
      ...prevData,
      parameter: [...prevData.parameter, { name: "", specification: "" }],
    }));
  };

  const quitar = (indice) => {
    if (indice === 0) {
      return;
    }

    setData((prevData) => ({
      ...prevData,
      parameter: prevData.parameter
        .slice(0, indice)
        .concat(prevData.parameter.slice(indice + 1)),
    }));
  };

  //*Funcion para capturara la data de parametros
  const catchDataParametros = (index, name, value) => {
    setData((prevData) => {
      const updatedParametros = [...prevData.parameter];
      updatedParametros[index] = {
        ...updatedParametros[index],
        [name]: value,
      };

      return {
        ...prevData,
        parameter: updatedParametros,
      };
    });
  };

  const InfoGeneral = [
    {
      nombre: "Nombre de la norma",
      typo: "text",
      name: "nameNormativity",
      value: data.nameNormativity,
    },

    {
      nombre: "Descripcion",
      typo: "text",
      name: "description",
      value: data.description,
    },

    {
      nombre: "Tip de agua",
      typo: "select",
      name: "typeOfWater",
      value: data.typeOfWater,
    },
  ];

  const listaOpciones = [
    {
      label: "Agua Residual",
    },

    {
      label: "Agua Potale",
    },

    {
      label: "Piscina",
    },
  ];

  const listaEspecificaciones = [
    {
      label: "Rango",
    },
    {
      label: "Valor Maximo",
    },
    {
      label: "Analisis y reporte",
    },
  ];

  const styles = {
    generalContainer: {
      overflowX: "hidden",
      height: "100vh",
    },

    mainBox: {
      //! para cambiar el color backgroundColor: "pink",
      height: "87%",
      width: "90%",
      marginTop: "10px",
      marginLeft: "5%",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },

    containerEncabezado: {
      //! para cambiar el color backgroundColor: "red",
      height: "10%",
      display: "flex",
      justifyContent: "space-between",
      // backgroundColor: "red",
      height: "40px",
    },

    containerFormulario: {
      backgroundColor: "blue",
      overflowX: "scroll",
      height: "82%",
      boxShadow: "0px 5px 5px 0px black",
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "5px",
    },

    listaNormas: {
      backgroundColor: contador === 2 ? "white" : "rgb(0,164,228)",
      color: contador === 2 ? "black" : "white",
      border: contador === 2 ? "1px solid black" : "1px solid white",
      width: "150px",
      display: { xs: "none", sm: "flex" },
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      borderRadius: "5px 0px 0px 0px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    },

    normas: {
      backgroundColor: contador === 1 ? "white" : "rgb(0,164,228)",
      color: contador === 1 ? "black" : "white",
      border: contador === 1 ? "1px solid black" : "1px solid white",
      width: "150px",

      display: { xs: "none", sm: "flex" },
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      borderRadius: "0px 5px 0px 0px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    },

    crearNorma: {
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      // border: contador === 1 ? "1px solid black" : "",
      width: "150px",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      borderRadius: "5px 0px 0px 0px",
      cursor: "pointer",
    },

    containerGrid: {
      //!backgroundColor: "red",
      width: "90%",
      marginLeft: "5%",
      overflowX: "scroll",
    },

    titulo: {
      width: "50%",
      marginLeft: "25%",
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "20px",
      borderBottom: "3px solid black",
    },

    vistaFormulario: {
      display: contador === 1 ? "block" : "none",
    },

    vistaNormas: {
      display: contador === 2 ? "flex" : "none",
      height: "100%",
      // backgroundColor: "red",
    },

    guardar: {
      width: { xs: "91%", sm: "91%", md: "91%", lg: "91%" },
      marginLeft: { xs: "4%", md: "4.2%", lg: "4.5%" },
      marginTop: "20px",
      marginBottom: "20px",
      backgroundColor: "rgb(0, 164, 228)",
      "&:hover": {
        backgroundColor: "rgb(0, 164, 228)",
      },
    },
  };

  const crearNorma = async () => {
    setDeshabilitar(true);

    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/parameterization",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
          "Content-Type": "application/json", // Añadido Content-Type
        },
        body: JSON.stringify({
          typeValidation: "Manual",
          parameters: data.parameter,
          poolId: valuPisicna,
        }),
      }
    );

    switch (response.status) {
      case 200:
        const result = await response.json();
        setOpen(true);
        setMensaje("Parametros Asignados exitosamente!");
        setColor("success");
        setDeshabilitar(false);

        break;

      case 400:
        setOpen(true);
        setMensaje("Todos los campos son obligatorios");
        setColor("error");
        setDeshabilitar(false);
        alert("Estoy aqui2");

        break;

      case 401:
        setOpen(true);
        setMensaje("Token no valido");
        setColor("error");
        setDeshabilitar(false);
        alert("Estoy aqui2");

        break;
    }

    try {
    } catch (error) {
      setOpen(true);
      setMensaje("Error en el servidor");
      setColor("error");
      setDeshabilitar(false);
      alert("Estoy aqui4");
    }

    setDeshabilitar(false);
  };

  useEffect(() => {
    listarParametros();
  }, []);

  useEffect(() => {
    listarParametros();
    setReload(false);
  }, [reload]);

  useEffect(() => {
    listarPiscinas();
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
      <Box sx={{ ...styles.mainBox }}>
        <Box sx={{ ...styles.containerEncabezado }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ ...styles.listaNormas }}
              onClick={() => setContador(2)}
            >
              Manual
            </Typography>
            <Typography
              sx={{ ...styles.normas }}
              onClick={() => setContador(1)}
            >
              Norma
            </Typography>
          </Box>
          <Typography
            sx={{ ...styles.crearNorma }}
            // onClick={() => setContador(3)}
          >
            Crear norma
          </Typography>
        </Box>
        <Box sx={{ ...styles.containerFormulario }}>
          <Box sx={{ ...styles.containerGrid }}>
            <Box sx={{ ...styles.vistaFormulario }}>
              <Grid container spacing={2} style={{ paddingTop: "30px" }}>
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
                    Norma
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputSelect
                    onChange={(e) => obtenerIdNorma(e.target.textContent)}
                    options={listaNormas}
                    icon={<Pool></Pool>}
                    label="Listado de normas"
                    placeholder="Seleccione una norma"
                  ></InputSelect>
                </Grid>
                <Grid item xs={12}>
                  <InputSelect
                    onChange={(e) => obtenerIdPiscina(e.target.textContent)}
                    options={optionsPiscinas}
                    icon={<Pool></Pool>}
                    label="Listado de Piscinas"
                    placeholder="Seleccione una norma"
                  ></InputSelect>
                </Grid>
                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                  <Button
                    disabled={cargando}
                    variant="contained"
                    sx={{
                      width: { xs: "90%" },
                      marginLeft: { xs: "5%" },

                      backgroundColor:
                        cargando === true
                          ? "rgb(210,210,210)"
                          : "rgb(0,164,228)",
                    }}
                    onClick={asignarNorma}
                  >
                    {cargando === true ? (
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
          </Box>
          <Box sx={{ ...styles.vistaNormas }}>
            <Box sx={{ width: "100%" }}>
              <Grid container>
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
                    Manual
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputSelect
                    onChange={(e) => obtenerIdPiscina(e.target.textContent)}
                    options={optionsPiscinas}
                    icon={<Pool></Pool>}
                    label="Listado de Piscinas"
                    placeholder="Seleccione una norma"
                  ></InputSelect>
                </Grid>

                <Typography sx={{ ...styles.titulo }}>Parámetros</Typography>
                <Box
                  sx={{
                    width: "100%",
                    marginLeft: "0px",
                  }}
                >
                  {data.parameter.map((elemento, index) => (
                    <Grid container key={index}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            height: "100%",
                            width: "90%",
                            marginLeft: "5%",
                          }}
                        >
                          <IconButton onClick={() => quitar(index)}>
                            <Delete></Delete>
                          </IconButton>
                          <IconButton onClick={agregar}>
                            <Add></Add>
                          </IconButton>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Box
                          sx={{
                            width: { xs: "100%", sm: "100%", md: "90%" },
                            marginLeft: { xs: "0%", sm: "0%", md: "5%" },
                          }}
                        >
                          <InputGeneral
                            icon={<Pool></Pool>}
                            label="Parámetro"
                            value={elemento.parameter}
                            name="nameParam"
                            onChange={(e) =>
                              catchDataParametros(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box
                          sx={{
                            width: { xs: "100%", sm: "100%", md: "90%" },
                            marginLeft: { xs: "0%", sm: "0%", md: "5%" },
                          }}
                        >
                          <InputSelect
                            icon={<Pool></Pool>}
                            label="Especificación"
                            options={listaEspecificaciones}
                            onChange={(e) =>
                              catchEspecificacion(e.target.textContent, index)
                            }
                          />
                        </Box>
                      </Grid>

                      {elemento.specification === "Rango" && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <InputGeneral
                              type="number"
                              name="minRange"
                              icon={<Pool></Pool>}
                              label="Min Range"
                              value={elemento.minRange}
                              onChange={(e) =>
                                catchDataParametros(
                                  index,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputGeneral
                              type="number"
                              name="maxRange"
                              icon={<Pool></Pool>}
                              label="Max Range"
                              value={elemento.maxRange}
                              onChange={(e) =>
                                catchDataParametros(
                                  index,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                        </>
                      )}
                      {elemento.specification === "Valor Maximo" && (
                        <Grid item xs={12} sm={6}>
                          <InputGeneral
                            value={elemento.maximo}
                            icon={<Pool></Pool>}
                            label="Máximo"
                            name="maxValueSpecification"
                            // value={elemento.maximo}
                            onChange={(e) =>
                              catchDataParametros(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                      )}
                      {elemento.specification === "Analisis y reporte" && (
                        <Grid item xs={12} sm={6}>
                          <InputGeneral
                            value={elemento.maximo}
                            icon={<Pool></Pool>}
                            label="Análisis y reporte"
                            name="analysisReport "
                            // value={elemento.maximo}
                            onChange={(e) =>
                              catchDataParametros(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                      )}
                    </Grid>
                  ))}
                </Box>
                <Grid item xs={12}>
                  <Button
                    sx={{
                      ...styles.guardar,
                    }}
                    onClick={crearNorma}
                    variant="contained"
                    disabled={deshabilitar}
                  >
                    {deshabilitar ? (
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
          </Box>
        </Box>
      </Box>
      <Alertas
        open={open}
        mensaje={mensaje}
        severity={color}
        cerrar={() => setOpen(false)}
      ></Alertas>
    </Box>
  );
}

export default AsignarParametros;
