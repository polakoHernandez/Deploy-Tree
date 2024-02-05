import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Input,
} from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PoolIcon from "@mui/icons-material/Pool";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import InputBuscar from "../../Componentes/General/InputBuscar";
import Alertas from "../../Componentes/General/Alertas";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { Add, Delete, Poll, Pool } from "@mui/icons-material";

function CrearPiscina() {
  //Referencia a inputs

  // const filtroRef = useRef();

  const refGeneral = useRef("");

  // *Estado ara guardar los datos del formulario
  const [data, setData] = useState({
    nombre: "",
    departamento: "",
    municipio: "",
    direccion: "",
    uso: "",
    caracteristica: "",
    temperatura: 0,
    temperaturaExterna: 0,
    estructura: "",
    instalacion: "",
    fotoPiscina: "",
    forma: "",
    largo: 0,
    ancho: 0,

    profundidad: 0,
    profundidadB: 0,
    profundidadC: 0,

    operacion: "",
    caudal: 0,
    climatizado: "",
    recirculacionMaximo: 0,
    recirculacionMinimo: 0,

    dosificacion: "",
    filtro: [
      { filtro: "", altura: "", diametro: "", capacidad: "", lecho: "" },
    ],
    bomba: [{ flujo: "", referencia: "", marca: "", dataSheet: "", foto: "" }],
    calentador: [{ referencia: "", marca: "", dataSheet: "" }],
    fotoPiscina: "",
  });

  //*Funcion para capturar los datos de los filtros

  const agregarFiltros = () => {
    setData((prevData) => ({
      ...prevData,
      filtro: [
        ...prevData.filtro,
        { filtro: "", altura: "", diametro: "", capacidad: "", lecho: "" },
      ],
    }));
  };

  const eliminarFiltro = (indice) => {
    if (indice === 0) {
      return;
    }

    setData((prevData) => ({
      ...prevData,
      filtro: prevData.filtro
        .slice(0, indice)
        .concat(prevData.filtro.slice(indice + 1)),
    }));
  };

  const catchDataFiltros = (index, field, value) => {
    setData((prevData) => {
      const updatedFiltro = [...prevData.filtro];
      updatedFiltro[index] = {
        ...updatedFiltro[index],
        [field]: value,
      };

      return {
        ...prevData,
        filtro: updatedFiltro,
      };
    });
  };

  //*Estados para agregar los texfield de Bomba
  const agregarBombas = () => {
    setData((prevData) => ({
      ...prevData,
      bomba: [
        ...prevData.bomba,
        { filtro: "", altura: "", diametro: "", capacidad: "", lecho: "" },
      ],
    }));
  };

  const eliminarBombas = (indice) => {
    if (indice === 0) {
      return;
    }

    setData((prevData) => ({
      ...prevData,
      bomba: prevData.bomba
        .slice(0, indice)
        .concat(prevData.bomba.slice(indice + 1)),
    }));
  };

  const catchDataBombas = (index, e) => {
    setData((prevData) => {
      const updatedFiltro = [...prevData.bomba];
      updatedFiltro[index] = {
        ...updatedFiltro[index],
        [e.target.name]: e.target.value,
      };

      return {
        ...prevData,
        bomba: updatedFiltro,
      };
    });
  };

  const catchDataBombasFiles = (index, event) => {
    const files = event.target.files;
    const fieldName = event.target.name;

    setData((prevData) => {
      const newData = [...prevData.bomba];
      newData[index][fieldName] = files[0];
      return { ...prevData, bomba: newData };
    });
  };

  //*Estados para agregar texfiled para calentadores
  const agregarCalentadores = () => {
    setData((prevData) => ({
      ...prevData,
      calentador: [
        ...prevData.calentador,
        { referencia: "", marca: "", dataSheet: "" },
      ],
    }));
  };

  const eliminarCalentadores = (indice) => {
    if (indice === 0) {
      return;
    }

    setData((prevData) => ({
      ...prevData,
      calentador: prevData.calentador
        .slice(0, indice)
        .concat(prevData.calentador.slice(indice + 1)),
    }));
  };

  const catchDataCalentadores = (index, e) => {
    setData((prevData) => {
      const updatedFiltro = [...prevData.calentador];
      updatedFiltro[index] = {
        ...updatedFiltro[index],
        [e.target.name]: e.target.value,
      };

      return {
        ...prevData,
        calentador: updatedFiltro,
      };
    });
  };

  const catchDataCalentadoresFiles = (index, event) => {
    const files = event.target.files;
    const fieldName = event.target.name;

    setData((prevData) => {
      const newData = [...prevData.calentador];
      newData[index][fieldName] = files[0];
      return { ...prevData, calentador: newData };
    });
  };
  //*Estado para guardar el id del departamento
  const [idDepartamento, setIdDepartamento] = useState("");

  //Estado para deshabilidar el boton guardar
  const [deshabilitar, setDeshabilitar] = useState(false);

  // *Funcion para obetener los datos de los inputs
  const seleccionarData = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //*Funcion para limpiar a data

  const limpiar = (event) => {
    setData({
      nombre: "",
      direccion: "",
      uso: "",
      caracteristica: "",
      temperatura: "",
      temperaturaExterna: "",
      estructura: "",
      instalacion: "",
      fotoPiscina: "",
      forma: "",
      largo: "",
      ancho: "",
      profundidad: "",
      profundidadB: "",
      profundidadC: "",
      operacion: "",
      caudal: "",
      climatizado: "",
      recirculacionMinimo: "",
      recirculacionMaximo: "",
      dosificacion: "",
      filtro: [
        { filtro: "", lecho: "", altura: "", diametro: "", capacidad: "" },
      ],
      alturaFiltro: "",
      cantidadFiltro: "",
      caudalBomba: "",
      cantidadBomba: "",
      marcaBomba: "",
      referenciaBomba: "",
      cantidadCalentador: "",
      referenciaCalentador: "",
      marcaCalentador: "",
    });
  };

  //Estado abrir alerta
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  //Estaod para gauradr los nombres de los departamentos y muicipios
  const [nombreDepartamento, setNombreDepartamento] = useState([]);
  const [nombreMunicipio, setNombreMunicipio] = useState([]);
  const [respuestaGeneral, setRespuestaGeneral] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  //   Estados para controlar el dispaly de las secciones
  const [contador, setContador] = useState(1);

  //Funciones para incrementar y disinuir contador

  const incrementar = () => {
    if (contador === 4) {
      return;
    } else {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador === 1) {
      return;
    } else {
      setContador(contador - 1);
    }
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

  //   Estlos de componentes animados
  const styleAnimation = {
    mainBox: {
      //   backgroundColor: "red",
      width: "90%",
      marginLeft: "5%",
      marginTop: "10px",
      transition: "ease 0.2s",
      height: "480px",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 180px)"
          : "translateY(10px)",
    },

    ventanas: {
      fontFamily: "'Nunito Sans', sans-serif",
      color: "white",
      width: "190px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRight: "1px solid white",
      fontSize: { xs: "15px", sm: "15px", md: "12.5px", lg: "15px" },
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
        border: "1px solid rgb(0,164,228)",
      },
    },

    containerVentanas: {
      // backgroundColor: "gray",
      width: "90%",
      marginLeft: "5%",
      display: "flex",
      justifyContent: {
        xs: "flex-end",
        md: "space-between",
        lg: "space-between",
      },
      flexDirection: "row",
    },

    infoGeneral: {
      backgroundColor: contador == 1 ? "white" : "rgb(0,164,228)",
      color: contador == 1 ? "black" : "white",
      border: contador === 1 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "5px 0px 0px 0px",
    },

    medidas: {
      backgroundColor: contador == 2 ? "white" : "rgb(0,164,228)",
      color: contador == 2 ? "black" : "white",
      border: contador === 2 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "0px 0px 0px 0px",
    },

    operacion: {
      backgroundColor: contador == 3 ? "white" : "rgb(0,164,228)",
      color: contador == 3 ? "black" : "white",
      border: contador === 3 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "0px 0px 0px 0px",
    },

    equipos: {
      borderRight: "none",
      backgroundColor: contador == 4 ? "white" : "rgb(0,164,228)",
      color: contador == 4 ? "black" : "white",
      border: contador === 4 ? "1px solid rgb(0,162,228)" : "1px solid white",
      borderRadius: "0px 5px 0px 0px",
    },

    InformacionGenera: {
      width: "100%",
      height: "100%",
      display: contador === 1 ? "content" : "none",
    },
  };

  // Listaod de opciones para los inputs
  const usos = [
    {
      label: "Privada",
    },
    {
      label: "Publica",
    },
  ];

  const caracteristicas = [
    {
      label: "Cubierta",
    },
    {
      label: "Descubierta",
    },
  ];

  const estructura = [
    {
      label: "Adultos",
    },
    {
      label: "Niños",
    },
  ];

  const instalacion = [
    {
      label: "Piscina de nado",
    },

    {
      label: "Piscina de recreo",
    },
    {
      label: "Piscina de aprendizaje",
    },
    {
      label: "Piscina de olas",
    },
    {
      label: "Atracciones acuaticas interactivas",
    },
    {
      label: "Especial terapeuticas",
    },
    {
      label: "Especial termales",
    },
  ];

  const forma = [
    {
      label: "Rectangular",
    },

    {
      label: "Circular",
    },
    {
      label: "Ovalada",
    },
  ];

  const operacion = [
    {
      label: "Recirculacion",
    },
    {
      label: "Renovacion continua",
    },
    {
      label: "Desalojo completo e intermintente",
    },
  ];

  const si_no = [
    {
      label: "Si",
    },
    {
      label: "No",
    },
  ];

  const filtros = [
    {
      label: "Arena",
    },
    {
      label: "Carbon",
    },
    {
      label: "Arena carbon",
    },
    {
      label: "Arena Antrecita",
    },
  ];

  const listarDepartamentos = async () => {
    try {
      const response = await fetch(
        "https://api-colombia.com/api/v1/Department",
        {}
      );
      const data = await response.json();

      setRespuestaGeneral(data); //

      setNombreDepartamento(
        data.map((departamento) => ({ label: departamento.name }))
      );
    } catch (error) {
      console.error("Error al obtener la lista de departamentos", error);
    }
  };

  const obtenerIdDepartamento = (departamento) => {
    const departamentoEncontrado = respuestaGeneral.find(
      (item) => item.name === departamento
    );

    setIdDepartamento(departamentoEncontrado.id);
  };

  const listarMunicipios = async (idDepartamento) => {
    try {
      if (!idDepartamento) {
        return;
      }

      const respuesta = await fetch(
        `https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`
      );

      const datos = await respuesta.json();
      setNombreMunicipio(datos.map((municipio) => ({ label: municipio.name })));
    } catch (error) {
      console.error("Error al obtener la lista de municipios", error);
    }
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
            poolId: id,
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

  const crearPiscina = async () => {
    // for (const key in data) {
    //    if (data.hasOwnProperty(key) && data[key] === "") {
    //      setOpen(true);
    //      setColor("error");
    //      setMensaje("Todos los campos son obligatorios!");
    //      return; // At least one attribute is empty
    //    }
    //  }

    setDeshabilitar(true);

    const formData = new FormData();

    formData.append("name", data.nombre);
    formData.append("address", data.direccion);
    formData.append("height", data.largo);
    formData.append("width", data.ancho);
    formData.append("department", data.departamento);
    formData.append("city", data.municipio);
    formData.append("externalTemperature", data.temperaturaExterna);
    formData.append("category", data.estructura);

    // Depth
    formData.append("depth[depthA]", data.profundidad);
    formData.append("depth[depthB]", data.profundidadB);
    formData.append("depth[depthC]", data.profundidadC);

    formData.append("recirculationPeriod[min]", data.recirculacionMaximo);
    formData.append("recirculationPeriod[max]", data.recirculacionMinimo);

    formData.append("form", data.forma);

    formData.append("use", data.uso);
    formData.append("photo", data.fotoPiscina);
    formData.append("typePool", data.caracteristica);
    formData.append("temperature", data.temperatura);

    formData.append("typeInstallation", data.instalacion);
    formData.append("systemOperation", data.operacion); // todo usar ChangeOperator data?.property
    formData.append("airConditioned", data.climatizado);
    formData.append("caudal", data.caudal);
    formData.append("autoDosing", data.dosificacion);

    data.filtro.forEach((elemento, index) => {
      formData.append(`filters[${index}][filter]`, elemento.filtro);
      formData.append(`filters[${index}][filterHeight]`, elemento.altura);
      formData.append(`filters[${index}][filterDiameter]`, elemento.diametro);
      formData.append(`filters[${index}][filterCapacity]`, elemento.capacidad);
      formData.append(`filters[${index}][filterBedHeight]`, elemento.lecho);
    });

    data.bomba.forEach((elemento, index) => {
      formData.append(`pumps[${index}][pumpFlow]`, elemento.flujo);
      formData.append(`pumps[${index}][referencePump]`, elemento.referencia);
      formData.append(`pumps[${index}][pumpBrand]`, elemento.marca);
      formData.append(`pumps[${index}][dataSheetPump]`, elemento.dataSheet);
      formData.append(`pumps[${index}][platePhoto]`, elemento.foto);
    });

    data.calentador.forEach((elemento, index) => {
      formData.append(
        `heaters[${index}][heaterReference]`,
        elemento.referencia
      );
      formData.append(`heaters[${index}][heaterBrand]`, elemento.marca);
      formData.append(`heaters[${index}][dataSheetHeater]`, elemento.dataSheet);
    });

    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/pool",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
          // "content-type": "application/json",
        },
        body: formData,
      }
    );

    switch (response.status) {
      case 200:
        const result = await response.json();
        const idPool = result._id;
        setOpen(true);
        setMensaje("Piscina Creada exitosamente!");
        setColor("success");
        crearNotificacion(idPool);

        setDeshabilitar(false);

        break;

      case 400:
        const respuesta = await response.json();
        const mensjae = respuesta.errors.map((item) => item.msg);
        const mensajeMostrar = mensjae.join(",");
        setOpen(true);
        setMensaje(mensajeMostrar);
        setColor("error");
        setDeshabilitar(false);
        console.log("MI RESPUESTA");
        console.log(respuesta.errors);

        break;

      case 500:
        const error = await response.json();
        setOpen(true);
        setMensaje("Error al crear la pisicina");
        setColor("error");
        setDeshabilitar(false);
        console.log("ESTE ES EL ERROR");
        console.log(error);
        // alert(JSON.stringify(error));
        break;
    }
  };

  useEffect(() => {
    listarDepartamentos();
  }, []);

  useEffect(() => {
    listarMunicipios(idDepartamento);
  }, [idDepartamento]);

  return (
    <Box sx={styles.generalContainer}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>
      <Box sx={styleAnimation.mainBox}>
        <Box sx={styleAnimation.containerVentanas}>
          <Box
            sx={{
              backgroundColor: "white",
              width: { xs: "30%", sm: "30%", md: "75%", lg: "70%" },
              display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              fontFamily: "'Nunito Sans', sans-serif",
              borderRadius: "5px 5px 0px 0px",
              marginLeft: "5px",
            }}
          >
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.infoGeneral,
              }}
              onClick={() => setContador(1)}
            >
              Información general
            </Typography>
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.medidas,
              }}
              onClick={() => setContador(2)}
            >
              medidas
            </Typography>
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.operacion,
              }}
              onClick={() => setContador(3)}
            >
              Detalles de operación
            </Typography>
            <Typography
              sx={{
                ...styleAnimation.ventanas,
                ...styleAnimation.equipos,
              }}
              onClick={() => setContador(4)}
            >
              Equipos
            </Typography>
          </Box>
          <Typography sx={styles.crearPiscina}>Crear Piscina</Typography>
        </Box>
        <Box sx={styles.contenedorInputs}>
          <Box sx={{ width: "100%", height: "100%" }}>
            {/* Mensajes de cabeceras */}
            <Box
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                color: "white",
                height: "10%",
                display: contador === 4 ? "none" : "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                fontFamily: "'Nunito Sans', sans-serif",
                color: "black",
                borderBottom: "3px solid black",
              }}
            >
              {contador === 1
                ? "Información general"
                : contador === 2
                ? "Medidas"
                : contador === 3
                ? "Detalles de operación"
                : contador === 4
                ? "Equipos"
                : ""}
            </Box>

            {/* Secciones de formularios */}
            <Box
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                // backgroundColor: "red",
                height: "80%",
                overflowY: "scroll",
              }}
            >
              {/* Seccion de infromacion general */}
              <Box sx={styleAnimation.InformacionGenera}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      value={data.nombre}
                      label="Nombre"
                      placeholder="Ingrese el nombre"
                      icon={<PoolIcon></PoolIcon>}
                      name="nombre"
                      onChange={(e) =>
                        seleccionarData("nombre", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      inputRef={refGeneral}
                      options={nombreDepartamento}
                      label="Departamento"
                      placeholder="Seleccione"
                      name="departamento"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) => {
                        seleccionarData("departamento", e.target.textContent);
                        obtenerIdDepartamento(e.target.textContent);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={nombreMunicipio}
                      label="Ciudad/Municipio"
                      placeholder="Seleccione"
                      name="municipio"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) => {
                        seleccionarData("municipio", e.target.textContent);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      value={data.direccion}
                      label="Dirección"
                      placeholder="Ingrese la dirección"
                      icon={<PoolIcon></PoolIcon>}
                      name="direccion"
                      onChange={(e) =>
                        seleccionarData("direccion", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={usos}
                      label="Uso"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="uso"
                      onChange={(e) =>
                        seleccionarData("uso", e.target.textContent)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={caracteristicas}
                      label="Características"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="caracteristica"
                      onChange={(e) =>
                        seleccionarData("caracteristica", e.target.textContent)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      type="number"
                      value={data.temperatura}
                      label="Temperatura °C"
                      placeholder="*C"
                      icon={<PoolIcon></PoolIcon>}
                      name="temperatura"
                      onChange={(e) =>
                        seleccionarData("temperatura", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputGeneral
                      type="number"
                      value={data.temperaturaExterna}
                      label="Temperatura externa °C"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="temperaturaExterna"
                      onChange={(e) =>
                        seleccionarData("temperaturaExterna", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={estructura}
                      label="Estructura"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="estructura"
                      onChange={(e) =>
                        seleccionarData("estructura", e.target.textContent)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={{ height: "90px" }}>
                    <InputSelect
                      options={instalacion}
                      label="Clase de instalación"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="instalacion"
                      onChange={(e) => {
                        seleccionarData("instalacion", e.target.textContent);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    sx={{
                      height: "90px",
                      // backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: "15px",
                    }}
                  >
                    <InputBuscar
                      onChange={(e) => {
                        seleccionarData("fotoPiscina", e.target.files[0]);
                      }}
                      label="Foto"
                    ></InputBuscar>
                  </Grid>
                </Grid>
              </Box>
              {/* Seccion de Medidas */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: contador === 2 ? "flex" : "none",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      label="Forma"
                      options={forma}
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Seleccione"
                      onChange={(e) =>
                        seleccionarData("forma", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.largo}
                      type="number"
                      label="Largo(m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese el largo"
                      onChange={(e) => seleccionarData("largo", e.target.value)}
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.ancho}
                      type="number"
                      label="Ancho(m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese el ancho"
                      onChange={(e) => seleccionarData("ancho", e.target.value)}
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.profundidad}
                      type="number"
                      label="Profundidad(m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese la profundidad"
                      onChange={(e) =>
                        seleccionarData("profundidad", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.profundidadB}
                      type="number"
                      label="Profundidad B (m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese la profundidad B"
                      onChange={(e) =>
                        seleccionarData("profundidadB", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.profundidadC}
                      type="number"
                      label="Profundidad C (m)"
                      icon={<PoolIcon></PoolIcon>}
                      placeholder="Ingrese la profundidad C"
                      onChange={(e) =>
                        seleccionarData("profundidadC", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>
                </Grid>
              </Box>
              {/* Seccion de detalles de operacion  */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: contador === 3 ? "flex" : "none",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      options={operacion}
                      label="Sistema de operación"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      name="operacion"
                      onChange={(e) =>
                        seleccionarData("operacion", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.caudal}
                      type="number"
                      label="Caudal"
                      placeholder="Ingrese el caudal"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("caudal", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      options={si_no}
                      label="Climatizado"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("climatizado", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.recirculacionMinimo}
                      type="number"
                      label="P. Recirculación mínimo (h)"
                      placeholder="Ingrese P. Recirculación mínimo "
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("recirculacionMinimo", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputGeneral
                      value={data.recirculacionMaximo}
                      type="number"
                      label="P. Recirculación máximo (h)"
                      placeholder="Ingrese P. Recirculación máximo (h) "
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("recirculacionMaximo", e.target.value)
                      }
                    ></InputGeneral>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <InputSelect
                      options={si_no}
                      label="Dosificación automática"
                      placeholder="Seleccione"
                      icon={<PoolIcon></PoolIcon>}
                      onChange={(e) =>
                        seleccionarData("dosificacion", e.target.textContent)
                      }
                    ></InputSelect>
                  </Grid>
                </Grid>
              </Box>
              {/* Seccion de Equipos */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: contador === 4 ? "flex" : "none",
                  flexDirection: "column",
                }}
              >
                {/* Seccion de filtros */}
                <Typography sx={styles.encabezadosEqupios}>
                  Sección de filtros
                </Typography>
                <Grid container>
                  <Grid item xs={12}>
                    {data.filtro.map((elemento, index) => (
                      <Grid container key={index}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <IconButton onClick={agregarFiltros}>
                              <Add></Add>
                            </IconButton>
                            <IconButton onClick={() => eliminarFiltro(index)}>
                              <Delete></Delete>
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <InputSelect
                            onChange={(e) =>
                              catchDataFiltros(
                                index,
                                "filtro",
                                e.target.textContent
                              )
                            }
                            name="filtro"
                            icon={<Pool></Pool>}
                            label="filtro"
                            options={filtros}
                          ></InputSelect>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <InputGeneral
                            type="number"
                            name="altura"
                            label="Altura"
                            icon={<Pool></Pool>}
                            onChange={(e) =>
                              catchDataFiltros(index, "altura", e.target.value)
                            }
                          ></InputGeneral>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <InputGeneral
                            onChange={(e) =>
                              catchDataFiltros(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            type="number"
                            name="diametro"
                            label="Diametro"
                            icon={<Pool></Pool>}
                          ></InputGeneral>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <InputGeneral
                            onChange={(e) =>
                              catchDataFiltros(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            type="number"
                            name="capacidad"
                            label="Capacidad"
                            icon={<Pool></Pool>}
                          ></InputGeneral>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <InputGeneral
                            onChange={(e) =>
                              catchDataFiltros(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            type="number"
                            name="lecho"
                            label="Altura de lecho filtrante"
                            icon={<Pool></Pool>}
                          ></InputGeneral>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Seccion de Bomas */}
                <Typography sx={styles.encabezadosEqupios}>
                  Sección de bombas
                </Typography>
                <Grid container>
                  <Grid container>
                    <Grid item xs={12} sx={{}}>
                      {data.bomba.map((elemento, index) => (
                        <Grid container key={index}>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <IconButton onClick={agregarBombas}>
                                <Add></Add>
                              </IconButton>
                              <IconButton onClick={() => eliminarBombas(index)}>
                                <Delete></Delete>
                              </IconButton>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <InputGeneral
                              type="number"
                              label="Flujo"
                              name="flujo"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataBombas(index, e)}
                            ></InputGeneral>
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <InputGeneral
                              label="Referencia"
                              name="referencia"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataBombas(index, e)}
                            ></InputGeneral>
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <InputGeneral
                              label="Marca"
                              name="marca"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataBombas(index, e)}
                            ></InputGeneral>
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <InputBuscar
                              label="Hoja de seguridad"
                              name="dataSheet"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataBombasFiles(index, e)}
                            ></InputBuscar>
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <InputBuscar
                              label="Foto"
                              name="foto"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataBombasFiles(index, e)}
                            ></InputBuscar>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>

                {/* Seccion Calentador */}
                <Typography sx={styles.encabezadosEqupios}>
                  Sección de calentador
                </Typography>
                <Grid container>
                  <Grid container>
                    <Grid item xs={12} sx={{}}>
                      {data.calentador.map((elemeto, index) => (
                        <Grid container key={index}>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <IconButton onClick={agregarCalentadores}>
                                <Add></Add>
                              </IconButton>
                              <IconButton
                                onClick={() => eliminarCalentadores(index)}
                              >
                                <Delete></Delete>
                              </IconButton>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <InputGeneral
                              label="Referencia"
                              name="referencia"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataCalentadores(index, e)}
                            ></InputGeneral>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <InputGeneral
                              label="Marca"
                              name="marca"
                              icon={<Pool></Pool>}
                              onChange={(e) => catchDataCalentadores(index, e)}
                            ></InputGeneral>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <InputBuscar
                              label="Hoja de seguridad"
                              name="dataSheet"
                              icon={<Pool></Pool>}
                              onChange={(e) =>
                                catchDataCalentadoresFiles(index, e)
                              }
                            ></InputBuscar>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={deshabilitar}
                    onClick={() => crearPiscina()}
                    sx={{
                      backgroundColor:
                        deshabilitar === true
                          ? "rgb(210,210,210)"
                          : "rgb(0,164,228)",
                      color: "white",
                      width: "95%",
                      marginTop: "10px",
                      marginBottom: "10px",
                      marginLeft: "2.5%",
                      ":hover": {
                        backgroundColor: "rgb(0,164,228)",
                      },
                    }}
                  >
                    {deshabilitar === true ? (
                      <CircularProgress
                        color="inherit"
                        size={24}
                      ></CircularProgress>
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </Grid>
              </Box>

              {/* Seccion de las flechas */}
            </Box>
            <Box
              sx={{
                // backgroundColor: "gray",
                marginTop: contador === 4 ? "46px" : "0px",
                width: "95%",
                marginLeft: "2.5%",
                display: "flex",
                justifyContent: contador === 1 ? "flex-end" : "space-between",
              }}
            >
              <KeyboardDoubleArrowLeftIcon
                sx={{
                  ...styles.arrows,
                  display: contador === 1 ? "none" : "flex",
                }}
                onClick={() => decrementar()}
              ></KeyboardDoubleArrowLeftIcon>
              <KeyboardDoubleArrowRightIcon
                sx={styles.arrows}
                onClick={() => incrementar()}
              ></KeyboardDoubleArrowRightIcon>
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

export default CrearPiscina;

const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
  },

  crearPiscina: {
    backgroundColor: "rgb(0,164,228)",
    width: "150px",
    height: "40px",
    fontFamily: "'Nunito Sans', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    borderRadius: "5px 0px 0px 0px",
    marginRight: "5px",
  },

  contenedorInputs: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    height: "89%",
    borderRadius: "5px",
    boxShadow: "0px 5px 5px 0px black",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  arrows: {
    cursor: "pointer",
    "&:hover": {
      color: "rgb(0,164,228)",
    },
  },

  encabezadosEqupios: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    borderBottom: "3px solid black",
  },
};
