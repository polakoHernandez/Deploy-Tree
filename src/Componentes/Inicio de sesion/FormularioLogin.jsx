import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import Logo from "../../../public/Logo-Tree-a.ico";
import { Grid, TextField, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../Estilos/Inicio de sesion/login.css";
import User from "../../assets/avatar-user.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Alertas from "../General/Alertas";
import { useNavigate } from "react-router-dom";

function FormularioLogin({ estilo }) {
  const navigate = useNavigate("");
  const [cargando, setCargando] = useState(false);
  const [see, setSee] = useState(false);
  const [respuesta, seRespuesta] = useState("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("error");
  const [mensaje, setMensaje] = useState("!Usuario no encontrado!");
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const capTurarDatos = (event) => {
    const { name, value } = event.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const cerrar = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      luva: {
        main: "rgb(0,164,228)", // Cambia 'tu_color_personalizado' al color que desees
      },
    },
  });

  const loguearme = async () => {
    setCargando(true);

    if (datos.email === "") {
      setOpen(true);
      setMensaje("Debe ingresar su Email");
      setColor("warning");
      setCargando(false);
      return;
    } else if (datos.password === "") {
      setOpen(true);
      setMensaje("Debe ingresar su contraseña");
      setColor("warning");
      setCargando(false);

      return;
    }

    try {
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: datos.email,
            password: datos.password,
          }),
        }
      );

      let respuesta = "";

      switch (response.status) {
        case 400:
          respuesta = await response.json();
          setOpen(true);
          setMensaje(respuesta.msg);
          setColor("error");
          setCargando(false);

          break;

        case 404:
          respuesta = await response.json();

          setOpen(true);
          setMensaje(respuesta.msg);
          setColor("error");
          setCargando(false);

          break;

        case 403:
          respuesta = await response.json();

          setOpen(true);
          setMensaje(respuesta.msg);
          setColor("error");
          setCargando(false);

          break;

        case 200:
          const responseData = await response.json();
          const { user, token } = responseData;
          setCargando(false);
          localStorage.setItem("clave", token);
          localStorage.setItem("user", user.name);
          localStorage.setItem("id", user._id);
          localStorage.setItem("rol", user.role);
          navigate(`/principal?data=${responseData}`, {
            state: {
              user,
              token,
            },
          });
          break;

        default:
          // Handle other status codes if needed
          break;
      }
    } catch (error) {
      setOpen(true);
      setMensaje("Error en el servidor");
      setCargando(false);
    }

    setCargando(false);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "10px", sm: "10px", md: "10px" },
          width: { xs: "90%", sm: "90%", md: "50%", lg: "40%" },
          height: { xs: "90vh", sm: "500px", md: "95vh", lg: "95vh" },
          marginLeft: { xs: "5%", sm: "5%", md: "25%", lg: "30%" },
          borderRadius: { xs: "15px" },
          border: "solid 1px black",
          borderColor: "black",
          backgroundColor: "white",
        }}
        className={`${estilo}`}
      >
        <Grid container>
          {/* contenedor logo y x  */}
          <Grid
            item
            xs={12}
            sx={{
              // backgroundColor: "red",
              marginTop: { xs: "10px" },
              height: { xs: "70px" },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src={Logo}
              alt=""
              className="estilos-imagen-tree estilos-propios"
            />
            {/* <CloseIcon
              sx={{ marginRight: "20px" }}
              className="close-icon"
            ></CloseIcon> */}
          </Grid>

          {/* contenedor Bienvenido  y logo */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              // backgroundColor: "blue",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-25px",
            }}
          >
            <p className="mensaje-bienvenida">Bienvenido</p>
            <img src={User} alt="" className="logo-user" />
          </Grid>

          {/* Contenedor inputs */}
          <Grid
            item
            xs={12}
            sx={{
              // backgroundColor: "cyan",
              marginTop: { xs: "2px", sm: "10px", md: "5px" },
              height: "125px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                onChange={capTurarDatos}
                name="email"
                label="Email"
                placeholder="Ingrese su email"
                sx={{
                  width: "90%",
                  marginLeft: "5%",
                  // border: "solid 2px rgb(0,164,228)",
                  borderRadius: "7px",
                }}
                color="luva"
                focused
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <EmailIcon></EmailIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <TextField
                onChange={capTurarDatos}
                name="password"
                type={see ? "text" : "password"}
                label="Contraseña"
                placeholder="ingrese su contraseña"
                sx={{
                  width: "90%",
                  marginLeft: "5%",
                  // border: "solid 2px rgb(0,164,228)",
                  borderRadius: "7px",
                  border: "none",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSee(!see)} edge="end">
                        {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                color="luva"
                focused
              ></TextField>
            </ThemeProvider>
          </Grid>

          {/* Contenedor boton y olvide mi contraseña */}
          <Grid
            item
            xs={12}
            sx={{
              // backgroundColor: "gray",
              marginTop: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              disabled={cargando}
              onClick={() => loguearme()}
              variant="contained"
              sx={{ width: "90%", marginLeft: "0%" }}
            >
              {cargando ? (
                <CircularProgress size={24} color="inherit"></CircularProgress>
              ) : (
                "Iniciar Sesion"
              )}
            </Button>
            <p className="olvido">Olvide mi contraseña</p>
          </Grid>

          {/* Contenedor logos */}
          <Grid
            item
            xs={12}
            sx={{
              // backgroundColor: "red",
              display: { xs: "flex", sm: "flex", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-30px",
            }}
          >
            <p className="msg-conoce">Conoce más acerca de nosotros</p>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "50%",
                marginTop: { xs: "0", sm: "-15px", md: "0" },
              }}
            >
              <a
                href="https://web.facebook.com/treeaenterprises"
                target="_blank"
                className="icon icon-2"
              >
                <FacebookIcon></FacebookIcon>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/treeaenterprises/"
                className="icon icon-2"
              >
                <InstagramIcon></InstagramIcon>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/tree-a-enterprises-164776101/"
                className="icon icon-2"
              >
                <LinkedInIcon></LinkedInIcon>
              </a>
              <a
                target="_blank"
                href="https://wa.me/573225100966"
                className="icon icon-2"
              >
                <WhatsAppIcon></WhatsAppIcon>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Alertas
        severity={color}
        open={open}
        mensaje={mensaje}
        cerrar={() => setOpen(false)}
      ></Alertas>
    </Box>
  );
}

export default FormularioLogin;
