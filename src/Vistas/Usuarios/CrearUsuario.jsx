import React, { useState, useRef } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import InputGeneral from "../../Componentes/General/InputGeneral";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneAndroid from "@mui/icons-material/PhoneAndroid";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import InputPassword from "../../Componentes/General/InputPassword";
import InputSelect from "../../Componentes/General/InputSelect";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Alertas from "../../Componentes/General/Alertas";
import ModalGeneral from "../../Componentes/General/Modal";

function CrearUsuario() {
  document.body.style.overflow = "scroll";
  const [openModal, setOpenModal] = useState(false);

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

  const [data, setData] = useState({
    cedula: "",
    nombre: "",
    apellidos: "",
    celular: "",
    rol: "",
    password: "",
    confirm: "",
    email: "",
  });

  const limpiar = (event) => {
    setData({
      cedula: "",
      nombre: "",
      apellidos: "",
      celular: "",
      rol: "",
      password: "",
      confirm: "",
      email: "",
    });
  };

  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [severity, setSeverity] = useState("");

  const [cargando, setCargando] = useState(false);

  const seleccionarData = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const seleccionarRol = (event, value) => {
    // Handle the change in the Autocomplete component
    seleccionarData("rol", value.label);
  };

  const roles = [
    {
      label: "Gerente",
    },
    {
      label: "Gestor",
    },
  ];

  //!No esta en uso
  const validarContrasena = (contrasena) => {
    // Al menos 7 caracteres, una mayúscula, una minúscula, un número y un carácter especial
    const expresionRegular =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

    return expresionRegular.test(contrasena);
  };

  const crearUsuario = async () => {
    if (data.password !== data.confirm) {
      setCargando(false);
      setOpen(true);
      setSeverity("error");
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    try {
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/user",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
            "x-token": localStorage.getItem("clave"),
          },
          body: JSON.stringify({
            name: data.nombre,
            lastName: data.apellidos,
            ID: data.cedula,
            cellPhone: data.celular,
            email: data.email,
            password: data.password,
            role: data.rol.toUpperCase(),
            state: true,
          }),
        }
      );

      let respuesta = "";

      switch (response.status) {
        case 200:
          respuesta = await response.json();
          setCargando(false);
          setOpen(true);
          setSeverity("success");
          setMensaje("Creado con éxito");
          limpiar();
          break;

        case 401:
          respuesta = await response.json();
          setCargando(false);
          setOpen(true);
          setSeverity("error");
          setMensaje(respuesta.msg);
          break;

        case 400:
          respuesta = await response.json();

          switch (respuesta.type) {
            case "fields_required":
              setOpen(true);
              setSeverity("error");
              setMensaje(respuesta.errors[0].msg);
              setCargando(false);
              console.log(respuesta);
              break;

            default:
              break;
          }
          break;

        case 500:
          respuesta = await response.json();
          setOpen(true);
          setSeverity("error");
          setMensaje("Error en el servidor");
          setCargando(false);
          setOpenModal(true);

          break;
      }

      // Puedes hacer algo con la respuesta aquí
    } catch (error) {
      setOpen(true);
      setSeverity("error");
      setMensaje("Error en el servidor");
      setCargando(false);
    }
    setCargando(false);
  };

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "scroll",
        position: "relative",
        height: "99vh",
      }}
    >
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>
      <Typography
        sx={{
          position: "absolute",
          backgroundColor: "rgb(0,164,228)",
          top:
            mover ||
            // moverUsuarios ||
            moverParametros ||
            moverQuimicos ||
            moverPerfil ||
            moverUsuario
              ? "258px"
              : " 97px",

          right: { xs: "5%", sm: "5%" },
          width: "150px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          borderRadius: "5px 0px 0 0",
          fontFamily: "'Nunito Sans', sans-serif",

          transition: "ease 0.1s",
        }}
      >
        Crear usuario
      </Typography>
      <Box
        sx={{
          // backgroundColor: "red",
          border: "1px solid black",
          borderRadius: "5px",
          boxShadow: "0px 5px 5px 0px black",
          width: "90%",
          height: { xs: "70%", lg: "75%", xl: "75%" },
          marginLeft: "5%",
          marginTop: "190px",
          // marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          overflowY: "scroll",
          transition: "ease 0.8s",
          transform:
            mover ||
            // moverUsuarios ||
            moverParametros ||
            moverQuimicos ||
            moverPerfil ||
            moverUsuario
              ? "translateY(30px)"
              : "translatey(-130px)",
          transition: "ease 0.1s",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              value={data.cedula}
              name="cedula"
              type="text"
              label="Cedula"
              placeholder="Ingrese su cedula"
              icon={<CoPresentIcon></CoPresentIcon>}
              onChange={(e) => seleccionarData("cedula", e.target.value)}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              value={data.nombre}
              name="nombre"
              type="text"
              label="Nombre"
              placeholder="Ingrese su nombre"
              icon={<AccountCircleIcon></AccountCircleIcon>}
              onChange={(e) => seleccionarData("nombre", e.target.value)}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              value={data.apellidos}
              name="apellidos"
              type="text"
              label="Apellidos"
              placeholder="Ingrese sus apellidos"
              icon={<BadgeIcon></BadgeIcon>}
              onChange={(e) => seleccionarData("apellidos", e.target.value)}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              value={data.celular}
              name="celular"
              type="number"
              label="Celular"
              placeholder="Ingrese su celular"
              icon={<PhoneAndroid></PhoneAndroid>}
              onChange={(e) => seleccionarData("celular", e.target.value)}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              value={data.email}
              name="email"
              type="email"
              label="Correo electrónico"
              placeholder="Ingrese su Email"
              icon={<AttachEmailIcon></AttachEmailIcon>}
              onChange={(e) => seleccionarData("email", e.target.value)}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputSelect
              value={{ label: data.rol }}
              name="rol"
              label="Rol"
              placeholder="seleccione su rol"
              icon={<HowToRegIcon></HowToRegIcon>}
              options={roles}
              onChange={seleccionarRol}
            ></InputSelect>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputPassword
              value={data.password}
              name="password"
              placeholder="Ingrese su contraseña"
              label="Contraseña"
              onChange={(e) => seleccionarData("password", e.target.value)}
            ></InputPassword>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputPassword
              value={data.confirm}
              name="confirm"
              placeholder="Ingrese su contraseña"
              label="Confirmar contraseña"
              onChange={(e) => seleccionarData("confirm", e.target.value)}
            ></InputPassword>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={cargando}
              variant="contained"
              sx={{
                width: { xs: "90%", sm: "95%" },
                marginTop: { xs: "10px", sm: "0px" },
                marginBottom: { xs: "10px", sm: "0px" },
                marginLeft: { xs: "5%", sm: "2.5%" },
                backgroundColor: "rgb(0,164,228)",
                "&:hover": {
                  backgroundColor: "rgb(0,164,228)",
                },
              }}
              onClick={() => crearUsuario()}
            >
              {cargando ? (
                <CircularProgress size={24} color="inherit"></CircularProgress>
              ) : (
                "Guardar"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Alertas
        severity={severity}
        mensaje={mensaje}
        open={open}
        cerrar={() => setOpen(false)}
      ></Alertas>
      <ModalGeneral
        open={openModal}
        mensaje1="UPS!"
        mensaje2="Su Sesión Ha Expirado"
      ></ModalGeneral>
    </div>
  );
}

export default CrearUsuario;
