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
import { useLocation, useNavigate } from "react-router-dom";
function EditarUsuario() {
  document.body.style.overflow = "scroll";

  const location = useLocation();
  const navigate = useNavigate();
  const { _id, ID, name, lastName, email, cellPhone, role } = location.state;

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

  const limpiar = (event) => {
    setData({
      cedula: "",
      nombre: "",
      apellidos: "",
      celular: "",
      rol: { label: "" },
      password: "",
      confirm: "",
      email: "",
    });
  };

  const [data, setData] = useState({
    cedula: ID,
    nombre: name,
    apellidos: lastName,
    celular: cellPhone,
    rol: { label: role } || { label: "" },
    password: "",
    confirm: "",
    email: email,
  });

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

  const seleccionarRol = (rol, value) => {
    // Handle the change in the Autocomplete component

    setData((prevData) => ({
      ...prevData,
      [rol]: { label: value },
    }));
  };

  const roles = [
    {
      label: "Gerente",
    },
    {
      label: "Gestor",
    },
  ];

  const crearUsuario = async () => {
    if (data.celular === "") {
      setMensaje("El celular debe ser un número");
      setOpen(true);
      setSeverity("warning");
      return;
    } else if (
      data.email === "" ||
      data.nombre === "" ||
      data.rol === "" ||
      data.apellidos == "" ||
      data.cedula === ""
    ) {
      setOpen(true);
      setMensaje("Todos los campos son obligatorios");
      setSeverity("warning");
      return;
    }

    setCargando(true);
    try {
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/user/${_id}`,
        {
          method: "PUT",
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
            role: data.rol.label,
          }),
        }
      );

      switch (response.status) {
        case 200:
          const responeData = await response.json();
          setCargando(false);
          setOpen(true);
          setSeverity("success");
          setMensaje("Actualizado con éxito");
          limpiar();
          setTimeout(() => {
            navigate("/listaDeUsuarios");
          }, 1000);
          break;

        case 401:
          setOpen(true);
          setSeverity("error");
          setMensaje("El token no es valido");
          setCargando(false);
          break;

        case 500:
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
      style={{ overflowX: "hidden", overflowY: "scroll", position: "relative" }}
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
            moverPerfil
              ? "258px"
              : " 128px",

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
        Editar usuario
      </Typography>
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "5px",
          boxShadow: "0px 5px 5px 0px black",
          width: "90%",
          height: "500px",
          marginLeft: "5%",
          marginTop: "190px",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          overflowY: "scroll",
          transition: "ease 0.8s",
          transform:
            mover ||
            // moverUsuarios ||
            moverParametros ||
            moverQuimicos ||
            moverPerfil
              ? "translateY(30px)"
              : "translatey(-100px)",
          transition: "ease 0.1s",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              name="cedula"
              type="text"
              label="Cedula"
              placeholder="Ingrese su cedula"
              icon={<CoPresentIcon></CoPresentIcon>}
              onChange={(e) => seleccionarData("cedula", e.target.value)}
              value={data.cedula}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              name="nombre"
              type="text"
              label="Nombre"
              placeholder="Ingrese su nombre"
              icon={<AccountCircleIcon></AccountCircleIcon>}
              onChange={(e) => seleccionarData("nombre", e.target.value)}
              value={data.nombre}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              name="apellidos"
              type="text"
              label="Apellidos"
              placeholder="Ingrese sus apellidos"
              icon={<BadgeIcon></BadgeIcon>}
              onChange={(e) => seleccionarData("apellidos", e.target.value)}
              value={data.apellidos}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              name="celular"
              type="number"
              label="Celular"
              placeholder="Ingrese su celular"
              icon={<PhoneAndroid></PhoneAndroid>}
              onChange={(e) => console.log(e.target.textContent)}
              value={data.celular}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputGeneral
              name="email"
              type="email"
              label="Email"
              placeholder="Ingrese su Email"
              icon={<AttachEmailIcon></AttachEmailIcon>}
              onChange={(e) => seleccionarData("email", e.target.value)}
              value={data.email}
            ></InputGeneral>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputSelect
              name="rol"
              label="Rol"
              placeholder="seleccione su rol"
              icon={<HowToRegIcon></HowToRegIcon>}
              options={roles}
              onChange={(e) => seleccionarRol("rol", e.target.textContent)}
              value={data.rol}
            ></InputSelect>
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
                "ACTUALIZAR"
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

export default EditarUsuario;
