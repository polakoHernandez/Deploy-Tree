import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import "../../Estilos/Inicio de sesion/login.css";
import imagen from "../../assets/pool1.jpg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../public/Logo-Tree-a.ico";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FormularioLogin from "../../Componentes/Inicio de sesion/FormularioLogin";
import Alertas from "../../Componentes/General/Alertas";

function Login() {
  const [mvIconTree, setMvIconTree] = useState("no");
  const [mvLogos, setMvLogos] = useState("no");
  const [mvIniciarSesion, setMvIniciarSesion] = useState("no");
  const [mvNoCuenta, setMvNoCuenta] = useState("no");
  const [mvFormulario, setMvFormulario] = useState("mv-formulario");
  const [visible, setVisible] = useState("ocultar");

  const [scroll, setScroll] = useState(false);

  document.body.style.overflow = scroll ? "scroll" : "hidden";

  const desplazarContenido = () => {
    setMvLogos("mv-logos");
    setMvIconTree("mv-icon-tree");
    setMvIniciarSesion("mv-iniciar-sesion");
    setMvNoCuenta("mv-no-cuenta");
    setMvFormulario("mv-formulario-efecto");
    setVisible("mostrar");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "573225100966";
    const message = "Me gustaría hablar contigo";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ overflow: "hidden", className: "over" }}>
      <Grid
        container
        sx={{
          height: { xs: "100vh" },
          position: "relative",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: { xs: "40%", sm: "150px", md: "50vh", lg: "50vh" },
          }}
        >
          <img src={imagen} alt="" className="estilos-imagen" />
          <Grid
            item
            sx={{
              // backgroundColor: "blue",
              width: { xs: "70%", sm: "40%", md: "30%", lg: "20%" },
              left: { xs: "15%", sm: "60%", md: "70%", lg: "80%" },
              top: "0",
              position: "absolute",
              alignItems: "center",
              textAlign: "center",
              overflow: "hidden",
            }}
            className={mvLogos}
          >
            <p className="mensaje3">Conoce más acerca de nosotros</p>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <a
                href="https://web.facebook.com/treeaenterprises"
                target="_blank"
                className="icon"
              >
                <FacebookIcon></FacebookIcon>
              </a>
              <a
                href="https://www.instagram.com/treeaenterprises/"
                target="_blank"
                className="icon"
              >
                <InstagramIcon></InstagramIcon>
              </a>
              <a
                href="https://www.linkedin.com/in/tree-a-enterprises-164776101/"
                target="_blank"
                className="icon"
              >
                <LinkedInIcon></LinkedInIcon>
              </a>
              <a
                href="https://wa.me/573225100966"
                className="icon"
                target="_blank"
              >
                <WhatsAppIcon></WhatsAppIcon>
              </a>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          className="principal-inferior"
          sx={{
            height: { xs: "60%", sm: "50vh" },
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              order: { xs: 2, sm: 2, md: 1 },
              overflow: "hidden",
              // backgroundColor: "blue",
            }}
            className={mvNoCuenta}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  // backgroundColor: "red",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: { xs: 0, sm: 0 },
                  marginTop: { xs: "0px", sm: "65px", md: "0" },
                  display: { xs: "flex", sm: "flex", md: "flex" },
                  textAlign: "center",
                }}
              >
                <p className="mensaje1">¿No tienes cuenta?</p>
                <p className="mensaje2">Comunícate con nosotros</p>
              </Grid>

              <Grid
                item
                xs={12}
                className="container-boton-whatsApp"
                sx={{
                  // backgroundColor: "green",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: { xs: 0, sm: 10 },
                  paddingBottom: { xs: "55px", sm: 0 },
                  marginTop: { xs: "0px", sm: "-15px", md: "0px" },
                }}
              >
                <Button
                  sx={{
                    width: { xs: "90%", sm: "50%", md: "80%", lg: "50%" },
                    height: { xs: "60px", sm: "50px", md: "60px", lg: "60px" },
                  }}
                  onClick={handleWhatsAppClick}
                  variant="contained"
                  color="success"
                  endIcon={
                    <WhatsAppIcon sx={{ marginLeft: "405%" }}></WhatsAppIcon>
                  }
                >
                  WhatsApp
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            className="seccion-derecha"
            sx={{
              height: { xs: "20vh", sm: "-300px", md: "50vh" },
              marginTop: { xs: "0px", sm: "-50px", md: "0px" },
              order: { xs: 1, sm: 1, md: 2 },
              display: "flex",
              justifyContent: "space-between",
              // backgroundColor: "pink",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  height: { xs: "10vh", sm: "15vh" },
                  display: "flex",
                  justifyContent: {
                    xs: "start",
                    sm: "start",
                    md: "end",
                    lg: "end",
                  },
                  paddingRight: "20px",
                  marginBottom: { xs: "-40px", sm: "30px", md: "0px" },
                  marginTop: { xs: "0", sm: "-16px", md: "0px" },
                }}
                className={mvIconTree}
              >
                <img src={logo} alt="" className="estilos-imagen-tree" />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: { xs: "6vh", sm: "10vh" },
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: { xs: "40px", sm: "32px", md: "45px" },
                  paddingBottom: { xs: "0", sm: "0", md: "140px" },
                  marginTop: { xs: "0", sm: "-170px", md: "0" },
                }}
                className={mvIniciarSesion}
              >
                <Button
                  sx={{
                    width: { xs: "90%", sm: "50%", md: "80%", lg: "50%" },
                    height: { xs: "60px", sm: "50px", md: "60px", lg: "60px" },
                    marginTop: { xs: "0px", sm: "105px", md: "0px" },
                  }}
                  variant="contained"
                  color="primary"
                  endIcon={
                    <AccountCircleIcon
                      sx={{ marginLeft: "350%" }}
                    ></AccountCircleIcon>
                  }
                  onClick={() => {
                    desplazarContenido();
                    setScroll(!scroll);
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FormularioLogin
        estilo={mvFormulario}
        visibilidad={visible}
      ></FormularioLogin>
    </Box>
  );
}

export default Login;
