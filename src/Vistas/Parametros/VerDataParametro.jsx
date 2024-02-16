import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import Alertas from "../../Componentes/General/Alertas";
import { Box, Typography, Button } from "@mui/material";
import Tabla from "../../Componentes/Parametros/Tabla";
import { useLocation } from "react-router-dom";
import TablaDataParametro from "../../Componentes/Parametros/TablaDataParametro";
import { Description } from "@mui/icons-material";
import { organizarDataExcel } from "../../utils/parametros/ParametrosUtil";

function VerDataParametro() {
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
  const [dataOrganizada, setDataOrganizada] = useState("");

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  console.log(id);

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
  };

  //*Funciones ara capturar la data de inforGeneral
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

  //* Estado ara guradar lo parametros
  const [listaParametros, setLisaParametros] = useState([]);

  //*Funcion para renderizar el front
  const handleReloadData = () => {
    // Set reload flag to true to trigger data reload in DataGridDemo
    setReload(true);
  };

  //*funcion para listar los parametros
  const listarParametros = async () => {
    const respuesta = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/parameterization/${id}`,
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

        const typeValidation = response?.parameterizationId?.typeValidation;

        if (typeValidation === "Manual") {
          const parametros = response?.parameterizationId?.parameters;
          const piscina = response?.parameterizationId?.poolId[0];
          const responsable = {
            nombre: response?.parameterizationId?.modifiedBy?.name,
            apellido: response?.parameterizationId?.modifiedBy?.lastName,
          };
          const otro = {
            stado: response?.parameterizationId?.state,
            fecha: response?.parameterizationId?.createAt,
          };

          const arrayOrganizado = parametros.map((elemento) => ({
            ...elemento,
            piscina: piscina.name,
            nombre: responsable.nombre,
            apellido: responsable.apellido,
            estado: otro.stado,
            fecha: otro.fecha,
            validacion: typeValidation,
          }));

          setDataOrganizada(arrayOrganizado);
        } else if (typeValidation === "Norma") {
          const piscina = response?.parameterizationId?.poolId[0].name;
          const parametros =
            response?.parameterizationId?.normativityId?.parameter;
          const responsable = {
            nombre: response?.parameterizationId?.modifiedBy.name,
            apellido: response?.parameterizationId?.modifiedBy.lastName,
          };

          const otro = {
            stado: response?.parameterizationId?.state,
            fecha: response?.parameterizationId?.createAt,
          };

          const arrayOrganizado = parametros.map((elemento) => ({
            ...elemento,
            piscina: piscina,
            nombre: responsable.nombre,
            apellido: responsable.apellido,
            estado: otro.stado,
            fecha: otro.fecha,
            validacion: typeValidation,
          }));

          setDataOrganizada(arrayOrganizado);
        }

        setLisaParametros(response);
        break;

      case 401:
        break;

      case 500:
        break;
    }
  };

  //*Funcion para descargar a formato Excel
  const exportToExcel = () => {
    organizarDataExcel(dataOrganizada).then((respuesta) => {
      // Desde este punto construyo el xlsx
      const ws = XLSX.utils.json_to_sheet(respuesta); // sección para convertir json a hoja
      const wb = XLSX.utils.book_new(); // sección para crear un nuevo libro de excel
      XLSX.utils.book_append_sheet(wb, ws, "Reporte"); // sección para incluir datos en la hoja

      // Guardar el archivo
      XLSX.writeFile(wb, "Paramertrización.xlsx"); // sección para descargar el archivo con formato xlsx
    });
  };

  const crearNorma = async () => {
    setDeshabilitar(true);

    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/normativity",
      {
        method: "POST",
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
        setOpen(true);
        setMensaje("Norma Creada exitosamente!");
        setColor("success");
        setDeshabilitar(false);

        break;

      case 400:
        setOpen(true);
        setMensaje("Todos los campos son obligatorios");
        setColor("error");
        setDeshabilitar(false);

        break;

      case 401:
        setOpen(true);
        setMensaje("Token no valido");
        setColor("error");
        setDeshabilitar(false);

        break;
    }

    try {
    } catch (error) {
      setOpen(true);
      setMensaje("Error en el servidor");
      setColor("error");
      setDeshabilitar(false);
    }
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
      height: "8%",
      display: "flex",
      justifyContent: "space-between",
      // backgroundColor: "red",
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
      height: "40px",
      marginTop: "10.5px",
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
      backgroundColor: "rgb(0,164,228)",
      color: "white",
      border: "",
      height: "100%",
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
          <Box>
            <Button
              variant="contained"
              color="success"
              disabled={listaParametros === "" ? true : false}
              endIcon={<Description></Description>}
              onClick={exportToExcel}
            >
              Generar reporte
            </Button>
          </Box>
          <Typography
            sx={{ ...styles.crearNorma }}
            onClick={() => setContador(1)}
          >
            Parametrización
          </Typography>
        </Box>
        <Box sx={{ ...styles.containerFormulario }}>
          <Box sx={{ ...styles.containerGrid }}></Box>
          <Box sx={{ ...styles.vistaNormas }}>
            <Tabla
              contador={contador}
              reloadData={handleReloadData}
              data={
                listaParametros.length === 0
                  ? ""
                  : listaParametros.normativities
              }
            ></Tabla>
          </Box>
          <Box>
            <Box>
              <TablaDataParametro
                contador={contador}
                data={dataOrganizada}
              ></TablaDataParametro>
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

export default VerDataParametro;
