import React, { useState } from "react";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { Pool } from "@mui/icons-material";
import SearchAppBar from "../../Componentes/General/NavBar";
import styles from "./Estllos/CrearQumicosUi";
import InputBuscar from "../../Componentes/General/InputBuscar";
import InputGeneral from "../../Componentes/General/InputGeneral";
import InputSelect from "../../Componentes/General/InputSelect";
import Alertas from "../../Componentes/General/Alertas";

const CrearQuimico = () => {
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
  });
  const [habilitar, setHabilitar] = useState(false);
  const [openAlerta, setOpenAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

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
  const catchFiles = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0],
    }));
  };

  const catchSelect = (nombre, value) => {
    setData((prevData) => ({
      ...prevData,
      [nombre]: value,
    }));
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
    formData.append("availableQuantity", data.ingreso);
    formData.append("lot", data.lote);
    formData.append("expirationDate", data.fecha);

    return formData;
  };

  const crearrQuimico = async () => {
    setHabilitar(true);
    const body = crearFormulario();

    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/chemical-product",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
        body: body,
      }
    );

    switch (response.status) {
      case 200:
        const respuesta = await response.json();
        setOpenAlerta(true);
        setMensaje("producto creado con exíto");
        setColor("success");
        if (respuesta.minQuantity > respuesta.availableQuantity) {
          crearNotificacion(respuesta._id);
        }

        setHabilitar(false);
        break;

      case 400:
        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("Todos los campos son obligatorios");
        setColor("error");
        break;

      case 401:
        setHabilitar(false);
        setOpenAlerta(true);
        setColor("error");
        break;

      case 500:
        console.log(await response.json());
        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("Error en el sevidor");
        setColor("error");
        break;
    }
    setHabilitar(false);
  };

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
            <Typography sx={{ ...styles.textoEncabezado }}>
              Crear químico
            </Typography>
          </Box>
          <Box sx={{ ...styles.containerFormulario }}>
            <Box sx={{ ...styles.boxFormulario }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <InputSelect
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
                    options={listaFunciones}
                    icon={<Pool></Pool>}
                    label="Funcion"
                    onChange={(e) => {
                      catchSelect("funcion", e.target.textContent);
                    }}
                    type="text"
                  ></InputSelect>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputBuscar
                    label="Imagen producto"
                    onChange={catchFiles}
                    name="imagenProducto"
                  ></InputBuscar>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputBuscar
                    label="Ficha Tecnica"
                    onChange={catchFiles}
                    name="fichaTecnica"
                  ></InputBuscar>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputBuscar
                    label="Hoja de seguridad"
                    onChange={catchFiles}
                    name="hojaSeguridad"
                  ></InputBuscar>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    onChange={catchData}
                    icon={<Pool></Pool>}
                    label="Concentracion (%)"
                    type="number"
                    name="concentracion"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    onChange={catchData}
                    label="Densidad"
                    icon={<Pool></Pool>}
                    name="densidad"
                    type="number"
                  ></InputGeneral>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    onChange={catchData}
                    label="Proveedor"
                    icon={<Pool></Pool>}
                    name="proveedor"
                  ></InputGeneral>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <InputSelect
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
                    onChange={catchData}
                    label="Cantidad mínima"
                    icon={<Pool></Pool>}
                    name="cantidadMinima"
                    type="number"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    onChange={catchData}
                    label="Ingreso"
                    icon={<Pool></Pool>}
                    name="ingreso"
                    type="number"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    onChange={catchData}
                    label="Lote"
                    icon={<Pool></Pool>}
                    name="lote"
                  ></InputGeneral>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <InputGeneral
                    onChange={catchData}
                    icon={<Pool></Pool>}
                    type="date"
                    label="Fecha de vencimiento"
                    name="fecha"
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

export default CrearQuimico;
