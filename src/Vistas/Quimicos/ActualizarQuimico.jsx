import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { Pool } from "@mui/icons-material";
import SearchAppBar from "../../Componentes/General/NavBar";
import styles from "./Estllos/CrearQumicosUi";
import InputBuscar from "../../Componentes/General/InputBuscar";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import Alertas from "../../Componentes/General/Alertas";
import { useNavigate } from "react-router-dom";
const ActualizarQuimico = () => {
  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);
  const [data, setData] = useState({
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
  const [habilitar, setHabilitar] = useState(false);
  const [openAlerta, setOpenAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");
  const [idPropp, setIdPropp] = useState("");
  const [dataSimulada, setDataSimulada] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [mostrarArchivo, setMostrarArchivo] = useState({
    ficha: false,
    hoja: false,
    image: false,
  });
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

  //*Funcion para capturar datos de inputGeneral
  const catchData = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //*Funcion para capturar los files d elos inputBuscar
  const catchFiles = (e, archivo) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0],
    }));
    setMostrarArchivo((prevData) => ({
      ...prevData,
      [archivo]: true,
    }));
  };

  const catchSelect = (nombre, value) => {
    setData((prevData) => ({
      ...prevData,
      [nombre]: value,
    }));
  };

  const extractFileName = (fichaTecnica, imagenProducto, hojaSeguridad) => {
    // Extraer el nombre del archivo de la URL
    let ficha = fichaTecnica.split("/");
    ficha = ficha[ficha.length - 1];
    let image = imagenProducto.split("/");
    image = image[image.length - 1];
    let hoja = hojaSeguridad.split("/");
    hoja = hoja[hoja.length - 1];

    setDataSimulada({
      fichaTecnica: ficha,
      hojaSeguridad: hoja,
      imagenProducto: image,
    });
  };

  const asignarData = (data) => {
    setData(() => ({
      nombre: data?.name,
      funcion: data?.chemicalFunction,
      imagenProducto: data?.image,
      fichaTecnica: data?.safetyDataSheet,
      hojaSeguridad: data?.dataSheet,
      concentracion: data?.concentration,
      densidad: data?.density,
      proveedor: data?.supplier,
      unidades: data?.units,
      cantidadMinima: data?.minQuantity,
      lote: data?.lot,
      fecha: data?.expirationDate,
      disponible: data?.availableQuantity,
    }));

    extractFileName(data.safetyDataSheet, data.image, data.dataSheet);
  };

  const listaFunciones = [
    {
      label: "Desinfectante",
    },
    {
      label: "Regulador",
    },
    {
      label: "Limpieza",
    },
    {
      label: "Coagulante",
    },
    {
      label: "Flocluante",
    },
    {
      label: "Alguicida",
    },
    {
      label: "Desengrasante",
    },
  ];

  const listaNombres = [
    {
      label: "Hipoclorito de calcio 67%",
    },
    {
      label: "Hipoclorito de sodio 12%",
    },
    {
      label: "Tricloro 90%",
    },
    {
      label: "Dicloro anhidro 62%",
    },
    {
      label: "Dicloro hidratado 54%",
    },
    {
      label: "Tiosulfato de sodio",
    },
    {
      label: "Sulfito de sodio",
    },
    {
      label: "Alcalinity +",
    },
    {
      label: "Carbonato de sodio",
    },
    {
      label: "Acido muriatico 31%",
    },
    {
      label: "Bisulfato de sodio",
    },
    {
      label: "Cloruro de calcio (100%)",
    },
    {
      label: "Cloruro de calcio 77%",
    },
  ];

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

  const camposFormData = [
    "name",
    "chemicalFunction",
    "image",
    "dataSheet",
    "safetyDataSheet",
    "concentration",
    "density",
    "supplier",
    "units",
    "minQuantity",
    "availableQuantity",
    "lot",
    "expirationDate",
  ];

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
            chemicalProductId: id,
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

  const crearFormulario = () => {
    const formData = new FormData();
    formData.append("name", data.nombre);
    formData.append("chemicalFunction", data.funcion);
    formData.append("image", data.imagenProducto);
    formData.append("dataSheet", data.fichaTecnica);
    formData.append("safetyDataSheet", data.hojaSeguridad);
    formData.append("concentration", data.concentracion);
    formData.append("density", data.densidad);
    formData.append("supplier", data.proveedor);
    formData.append("units", data.unidades);
    formData.append("minQuantity", data.cantidadMinima);
    formData.append("availableQuantity", data.disponible);
    formData.append("lot", data.lote);
    formData.append("expirationDate", data.fecha);

    return formData;
  };

  const crearrQuimico = async () => {
    const body = crearFormulario();
    setHabilitar(true);

    const response = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/chemical-product/${idPropp}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
        body: body,
      }
    );
    let respuesta = "";
    switch (response.status) {
      case 200:
        respuesta = await response.json();
        setOpenAlerta(true);
        setMensaje("producto acualizado con exíto");
        setColor("success");

        setHabilitar(false);
        console.log(respuesta);
        limpiar();
        setTimeout(() => {
          navigate("/listaQuimicos");
        }, 1000);

        break;

      case 400:
        respuesta = await response.json();

        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje(respuesta?.errors[0]?.msg);
        setColor("error");
        console.log(respuesta);
        break;

      case 401:
        respuesta = await response.json();

        setHabilitar(false);
        setOpenAlerta(true);
        setColor("error");
        console.log(respuesta);
        break;

      case 500:
        respuesta = await response.json();

        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("Error en el sevidor");
        setColor("error");
        console.log(respuesta);
        break;
    }
    setHabilitar(false);
  };

  const listarQuimicoId = async (idPool) => {
    const tokenSend = localStorage.getItem("clave");
    const response = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/chemical-product/${idPool}`,
      {
        method: "GET",
        headers: {
          Accpet: "Application/json",
          "x-token": tokenSend,
        },
      }
    );

    let respuesta = "";

    switch (response.status) {
      case 200:
        respuesta = await response.json();
        console.log({ Ok: respuesta });
        asignarData(respuesta.chemicalProductID);
        break;

      default:
        respuesta = await response.json();
        console.log({ Fail: respuesta });
    }
  };

  const limpiar = () => {
    setData({
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
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    setIdPropp(id);
    listarQuimicoId(id);
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
            <Typography sx={{ ...styles.textoEncabezado }}>Editar</Typography>
          </Box>
          <Box sx={{ ...styles.containerFormulario }}>
            <Box sx={{ ...styles.boxFormulario }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <InputSelect
                    value={{ label: data?.nombre }}
                    options={listaNombres}
                    icon={<Pool></Pool>}
                    label="Nombre"
                    name="nombre"
                    type="text"
                    onChange={(e) =>
                      catchSelect("nombre", e.target.textContent)
                    }
                  ></InputSelect>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputSelect
                    value={{ label: data.funcion }}
                    options={listaFunciones}
                    icon={<Pool></Pool>}
                    label="Función"
                    onChange={(e) => {
                      catchSelect("funcion", e.target.textContent);
                    }}
                    type="text"
                  ></InputSelect>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputBuscar
                    // value={data?.imagenProducto}
                    label="Imagen producto"
                    onChange={(e) => catchFiles(e, "image")}
                    name="imagenProducto"
                  ></InputBuscar>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {mostrarArchivo.image === false
                      ? dataSimulada?.imagenProducto
                      : ""}
                  </Typography>{" "}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputBuscar
                    label="Ficha técnica"
                    onChange={(e) => catchFiles(e, "ficha")}
                    name="fichaTecnica"
                  ></InputBuscar>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {mostrarArchivo.ficha === false
                      ? dataSimulada?.fichaTecnica
                      : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputBuscar
                    // value={data?.hojaSeguridad}
                    label="Hoja de seguridad"
                    onChange={(e) => catchFiles(e, "hoja")}
                    name="hojaSeguridad"
                  ></InputBuscar>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {mostrarArchivo.hoja === false
                      ? dataSimulada?.hojaSeguridad
                      : ""}
                  </Typography>{" "}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    value={data?.concentracion}
                    onChange={catchData}
                    icon={<Pool></Pool>}
                    label="Concentracion (%)"
                    type="number"
                    name="concentracion"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    value={data?.densidad}
                    onChange={catchData}
                    label="Densidad"
                    icon={<Pool></Pool>}
                    name="densidad"
                    type="number"
                  ></InputGeneral>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    value={data.proveedor}
                    onChange={catchData}
                    label="Proveedor"
                    icon={<Pool></Pool>}
                    name="proveedor"
                  ></InputGeneral>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputSelect
                    value={{ label: data?.unidades }}
                    options={listaUnidades}
                    label="Unidades"
                    icon={<Pool></Pool>}
                    onChange={(e) =>
                      catchSelect("unidades", e.target.textContent)
                    }
                  ></InputSelect>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    value={data.cantidadMinima}
                    onChange={catchData}
                    label="Cantidad mínima"
                    icon={<Pool></Pool>}
                    name="cantidadMinima"
                    type="number"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    disabled={true}
                    value={data.lote}
                    onChange={catchData}
                    label="Lote"
                    icon={<Pool></Pool>}
                    name="lote"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    value={
                      data.fecha
                        ? new Date(data.fecha).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={catchData}
                    icon={<Pool></Pool>}
                    type="date"
                    label="Fecha de vencimiento"
                    name="fecha"
                  ></InputGeneral>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    disabled={true}
                    value={data?.disponible}
                    onChange={catchData}
                    icon={<Pool></Pool>}
                    type="number"
                    label="Cantidad disponible"
                    name="disponible"
                  ></InputGeneral>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={habilitar}
                    variant="contained"
                    sx={{ ...styles.button }}
                    onClick={() => crearrQuimico()}
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
          </Box>
        </Box>
      </Box>
      <Alertas
        open={openAlerta}
        mensaje={mensaje}
        severity={color}
        cerrar={() => setOpenAlerta(false)}
      ></Alertas>
    </Box>
  );
};

export default ActualizarQuimico;
