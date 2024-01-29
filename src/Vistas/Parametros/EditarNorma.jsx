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
} from "@mui/material";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import Tabla from "../../Componentes/Parametros/Tabla";
import { Pool, Add, Delete } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
function EditarNorma() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("Id");

  //* estado para cargar la vista
  const [mostrarVista, setMostrarVista] = useState(false);

  //* Estado para guardar la data de info general
  const [data, setData] = useState({
    nameNormativity: "",
    description: "",
    typeOfWater: "",
    name: "",
    parameter: [{ name: "", specification: "" }],
  });
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

  //*Estao para renderizar el front
  const [reload, setReload] = useState(false);

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
    console.log(data);
  };

  //*Funciones ara capturar la data de inforGeneral
  const catchData = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
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

  //* Estado ara guradar lo parametros
  const [listaParametros, setLisaParametros] = useState([]);

  //*Funcion para renderizar el front
  const handleReloadData = () => {
    // Set reload flag to true to trigger data reload in DataGridDemo
    setReload(true);
  };

  //*Funcion para listar norma por Id
  const listarNormaId = async (id) => {
    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/normativity/${id}`,
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
          setOpenModal(true);
          break;

        case 200:
          const normaRetornada = await response.json();
          console.log(normaRetornada.normativityId);
          setData(normaRetornada.normativityId);
          setMostrarVista(true); // Muestra la vista al cargar los datos

          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log(response);
        break;

      case 401:
        console.log(await respuesta.json());
        break;

      case 500:
        console.log(await respuesta.json());
        break;
    }
  };

  const crearNorma = async (id) => {
    setDeshabilitar(true);

    // alert(JSON.stringify(data));

    const response = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/normativity/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
          "Content-Type": "application/json", // Añadido Content-Type
        },
        body: JSON.stringify({
          nameNormativity: data.nameNormativity,
          description: data.description,
          typeOfWater: data.typeOfWater,
          parameter: data.parameter,
        }),
      }
    );

    switch (response.status) {
      case 200:
        const result = await response.json();
        console.log(result);
        setOpen(true);
        setMensaje("Norma actualizada exitosamente!");
        setColor("success");
        setDeshabilitar(false);

        break;

      case 400:
        console.log(await response.json());
        setOpen(true);
        setMensaje("Todos los campos son obligatorios");
        setColor("error");
        setDeshabilitar(false);

        break;

      case 401:
        console.log(await response.json());
        setOpen(true);
        setMensaje("Token no valido");
        setColor("error");
        setDeshabilitar(false);

        break;

      case 404:
        console.log(await response.json());
        setOpen(true);
        setMensaje("Id de la norma no fue encontrado!");
        setColor("error");
        setDeshabilitar(false);

        break;
    }

    try {
    } catch (error) {
      console.log(error);
      setOpen(true);
      setMensaje("Error en el servidor");
      setColor("error");
      setDeshabilitar(false);
    }
    setDeshabilitar(false);
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
      justifyContent: "end",
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
      border: contador === 2 ? "1px solid black" : "",
      width: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      borderRadius: "5px 5px 0px 0px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      },
    },

    crearNorma: {
      backgroundColor: contador === 1 ? "rgb(0,164,228)" : "rgb(0,164,228)",
      color: contador === 1 ? "white" : "white",
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
    },

    guardar: {
      width: "95%",
      marginLeft: "2.5%",
      marginTop: "20px",
      marginBottom: "20px",
      backgroundColor: "rgb(0, 164, 228)",
      "&:hover": {
        backgroundColor: "rgb(0, 164, 228)",
      },
    },
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
      label: "Valor maximo",
    },
    {
      label: "Analisis y reporte",
    },
  ];

  useEffect(() => {
    listarParametros();
  }, []);

  useEffect(() => {
    listarParametros();
    setReload(false);
  }, [reload]);

  useEffect(() => {
    listarNormaId(id);
  }, []);

  useEffect(() => {
    // Verifica que la información se haya cargado correctamente en el estado
    console.log(data);
  }, [data]);

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
          {/* <Typography
            sx={{ ...styles.listaNormas }}
            onClick={() => setContador(2)}
          >
            lista de normas
          </Typography> */}
          <Typography
            sx={{ ...styles.crearNorma }}
            onClick={() => setContador(1)}
          >
            Editar norma
          </Typography>
        </Box>
        <Box sx={{ ...styles.containerFormulario }}>
          <Box sx={{ ...styles.containerGrid }}>
            <Box sx={{ ...styles.vistaFormulario }}>
              <Box sx={{ ...styles.titulo }}>Informacion geenral</Box>
              <Grid container>
                {InfoGeneral.map((elemento, index) =>
                  elemento.typo === "text" ? (
                    <Grid item xs={12} sm={12} md={4} key={elemento.nombre}>
                      <InputGeneral
                        value={elemento.value}
                        name={elemento.name}
                        onChange={catchData}
                        label={elemento.nombre}
                        icon={<Pool></Pool>}
                      ></InputGeneral>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={12} md={4} key={elemento.nombre}>
                      <InputSelect
                        value={{ label: elemento.value }}
                        onChange={(e) => catchDataSelect(e.target.textContent)}
                        options={listaOpciones}
                        label={elemento.nombre}
                        icon={<Pool></Pool>}
                      ></InputSelect>
                    </Grid>
                  )
                )}
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
                        <InputGeneral
                          icon={<Pool></Pool>}
                          label="Parámetro"
                          value={elemento.name}
                          name="name"
                          onChange={(e) =>
                            catchDataParametros(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <InputSelect
                          value={{ label: elemento.specification }}
                          icon={<Pool></Pool>}
                          label="Especificación"
                          options={listaEspecificaciones}
                          onChange={(e) =>
                            catchEspecificacion(e.target.textContent, index)
                          }
                        />
                      </Grid>
                      {elemento.specification === "Rango" && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <InputGeneral
                              type="number"
                              name="minRange"
                              icon={<Pool></Pool>}
                              label="Rango mínimo"
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
                              label="Rango máximo"
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
                      {elemento.specification === "Valor maximo" && (
                        <Grid item xs={12} sm={6}>
                          <InputGeneral
                            value={elemento.maxValueSpecification}
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
                      backgroundColor:
                        deshabilitar === true
                          ? "rgb(210,210,210)"
                          : "rgb(0,164,228)",
                    }}
                    onClick={() => crearNorma(data._id)}
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
          <Box sx={{ ...styles.vistaNormas }}>
            <Tabla
              reloadData={handleReloadData}
              data={
                listaParametros.length === 0
                  ? ""
                  : listaParametros.normativities
              }
            ></Tabla>
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

export default EditarNorma;
