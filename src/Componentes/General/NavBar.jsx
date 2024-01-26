import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListIcon from "@mui/icons-material/List";
import Logo from "../../../public/Logo-Tree-a.ico";
import "../../Estilos/General/navBar.css";
import TemporaryDrawer from "./SideBar";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import { ListItemText, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function SearchAppBar({
  onClick,
  moverUsuario,
  moverParametros,
  moverQuimicos,
  moverPerfil,
}) {
  const navigate = useNavigate("");

  // Estado para abrir el drawer
  const [abrirDrawer, setAbrirDrawer] = useState(false);

  // Estados para abrir los menus
  const [menuPiscina, setMenuPiscina] = useState(false);
  const [menuUusarios, setMenuUusarios] = useState(false);
  const [menuParametros, setMenuParametros] = useState(false);
  const [menuQuimicos, setMenuQuimicos] = useState(false);
  const [menuPerfil, setMenuPerfil] = useState(false);

  // Funciones para abrir los menus
  const abriMenuPiscina = () => {
    setMenuPiscina(!menuPiscina);
    setMenuUusarios(false);
    setMenuParametros(false);
    setMenuQuimicos(false);
    setMenuPerfil(false);
    onClick();
  };

  const abriMenuUsuarios = () => {
    setMenuUusarios(!menuUusarios);
    setMenuPiscina(false);
    setMenuParametros(false);
    setMenuQuimicos(false);
    setMenuPerfil(false);
    moverUsuario();
  };

  const abriMenuParametros = () => {
    setMenuUusarios(false);
    setMenuPiscina(false);
    setMenuParametros(!menuParametros);
    setMenuQuimicos(false);
    moverParametros(); // onClick();
  };

  const abriMenuQuimicos = () => {
    setMenuUusarios(false);
    setMenuPiscina(false);
    setMenuParametros(false);
    setMenuQuimicos(!menuQuimicos);
    setMenuPerfil(false);
    moverQuimicos();
  };

  const abrirMenuPerfil = () => {
    setMenuUusarios(false);
    setMenuPiscina(false);
    setMenuParametros(false);
    setMenuQuimicos(false);
    setMenuPerfil(!menuPerfil);
    moverPerfil();
  };

  //Funcion para mostrar el drawer

  const mostrarDrawer = () => {
    setAbrirDrawer(true);
  };

  // Funcion para cerrar el darwer
  const cerrarDrawer = () => {
    setAbrirDrawer(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderBottom: "7px solid rgb(0,164,228)",
          width: "100%",

          // boxShadow:
          //   "0 4px 6px -1px rgb(0,164,228,5), 0 2px 4px -1px rgba(0,164,228,5)",
        }}
      >
        <Toolbar sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100px",
              height: "70px",
              marginLeft: "-24px",
              borderRadius: "3px",

              "&:hover": {
                backgroundColor: "rgb(0,164,228)",
                transition: "ease 0.3s",
                color: "white",
              },
            }}
          >
            <IconButton
              onClick={() => mostrarDrawer()}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginLeft: "10px",
                marginTop: "12px",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <ListItemButton
            onClick={() => abriMenuPiscina()}
            sx={{
              backgroundColor: menuPiscina ? "rgb(0, 164, 228)" : "white",
              cursor: " pointer",
              borderRadius: "3px",
              height: "70px",
              width: "200px",
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              color: menuPiscina ? "white" : "black",
              fontFamily: "'Nunito Sans', sans-serif",
              "&:hover": {
                backgroundColor: "rgb(0,164,228)",
                transition: "ease 0.3s",
                color: "white",
              },
            }}
          >
            <Box>Piscina</Box>
            <MoreVertIcon></MoreVertIcon>
          </ListItemButton>
          <Collapse
            in={menuPiscina}
            timeout="auto"
            unmountOnExit
            sx={{
              width: "300px",
              position: "absolute",
              top: "70px",
              left: "82px",
              backgroundColor: "rgb(0,164,228)",
            }}
          >
            <ListItemButton
              sx={{
                pl: 4,
                // "&:hover": {
                //   backgroundColor: "white",
                // },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                      width: "100%",
                      // "&:hover": {
                      //   color: "rgb(0,164,228)",
                      // },
                    }}
                  >
                    Crear Piscina
                  </Typography>
                }
              />
            </ListItemButton>
          </Collapse>

          <Collapse
            in={menuPiscina}
            timeout="auto"
            unmountOnExit
            sx={{
              width: "300px",
              position: "absolute",
              top: "70px",
              left: "82px",
              backgroundColor: "rgb(0,164,228)",
              borderRadius: "5px",
            }}
          >
            <ListItemButton
              onClick={() => navigate("/CrearPiscina")}
              sx={{
                pl: 4,
                borderBottom: "1px solid white",
                // "&:hover": {
                //   backgroundColor: "white",
                // },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                      width: "100%",
                      // "&:hover": {
                      //   color: "rgb(0,164,228)",
                      // },
                    }}
                  >
                    Crear Piscina
                  </Typography>
                }
              />
              <ChevronRightIcon sx={{ color: "white" }}></ChevronRightIcon>
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/misPiscinas")}
              sx={{
                pl: 4,
                borderBottom: "1px solid white",

                // "&:hover": {
                //   backgroundColor: "white",
                // },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                      width: "100%",
                      // "&:hover": {
                      //   color: "rgb(0,164,228)",
                      // },
                    }}
                  >
                    Mis Piscinas
                  </Typography>
                }
              />
              <ChevronRightIcon sx={{ color: "white" }}></ChevronRightIcon>
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/gestionarPiscinas")}
              sx={{
                pl: 4,

                // "&:hover": {
                //   backgroundColor: "white",
                // },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                      width: "100%",
                      // "&:hover": {
                      //   color: "rgb(0,164,228)",
                      // },
                    }}
                  >
                    Gestionar Mis Piscinas
                  </Typography>
                }
              />
              <ChevronRightIcon sx={{ color: "white" }}></ChevronRightIcon>
            </ListItemButton>
          </Collapse>
          <ListItemButton
            onClick={() => abriMenuUsuarios()}
            sx={{
              backgroundColor: menuUusarios ? "rgb(0, 164, 228)" : "white",
              cursor: " pointer",
              borderRadius: "3px",
              height: "70px",
              width: "200px",
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              color: menuUusarios ? "white" : "black",
              fontFamily: "'Nunito Sans', sans-serif",
              "&:hover": {
                backgroundColor: "rgb(0,164,228)",
                transition: "ease 0.3s",
                color: "white",
              },
            }}
          >
            <Box>Usuarios</Box>
            <MoreVertIcon></MoreVertIcon>
            <Collapse
              in={menuUusarios}
              timeout="auto"
              unmountOnExit
              sx={{
                width: "300px",
                position: "absolute",
                top: "70px",
                left: "0px",
                backgroundColor: "rgb(0,164,228)",
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              <ListItemButton
                onClick={() => navigate("/CrearUsuario")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Crear Usuario
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate(`/listaDeUsuarios`)}
                sx={{
                  pl: 4,

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Lista de Usuarios
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
            </Collapse>
          </ListItemButton>
          <ListItemButton
            onClick={() => abriMenuParametros()}
            sx={{
              backgroundColor: menuParametros ? "rgb(0,164,228)" : "white",
              cursor: " pointer",
              borderRadius: "3px",
              height: "70px",
              width: "300px",
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              color: menuParametros ? "white" : "black",
              fontFamily: "'Nunito Sans', sans-serif",
              "&:hover": {
                backgroundColor: "rgb(0,164,228)",
                transition: "ease 0.3s",
                color: "white",
              },
            }}
          >
            <Box>Parametrización</Box>
            <MoreVertIcon></MoreVertIcon>
            <Collapse
              in={menuParametros}
              timeout="auto"
              unmountOnExit
              sx={{
                width: "300px",
                position: "absolute",
                top: "70px",
                left: "0px",
                backgroundColor: "rgb(0,164,228)",
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              <ListItemButton
                onClick={() => navigate("/crearParametro")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Crear Parámetros
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/verParametrosPiscinas")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Ver Paramerización
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/asignarParametros")}
                sx={{
                  pl: 4,
                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Asignar Parámetros
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
            </Collapse>
          </ListItemButton>
          <ListItemButton
            onClick={() => abriMenuQuimicos()}
            sx={{
              backgroundColor: menuQuimicos ? "rgb(0,164,228)" : "white",
              cursor: " pointer",
              borderRadius: "3px",
              height: "70px",
              width: "200px",
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              color: menuQuimicos ? "white" : "black",
              fontFamily: "'Nunito Sans', sans-serif",
              "&:hover": {
                backgroundColor: "rgb(0,164,228)",
                transition: "ease 0.3s",
                color: "white",
              },
            }}
          >
            <Box>Químicos</Box>
            <MoreVertIcon></MoreVertIcon>
            <Collapse
              in={menuQuimicos}
              timeout="auto"
              unmountOnExit
              sx={{
                width: "300px",
                position: "absolute",
                top: "70px",
                left: "0px",
                backgroundColor: "rgb(0,164,228)",
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              <ListItemButton
                onClick={() => navigate("/crearQuimico")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Crear Productos
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/agregarInventario")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Agrear a Inventario
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Inventario
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4,
                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Lote
                    </Typography>
                  }
                />
                <ChevronRightIcon></ChevronRightIcon>
              </ListItemButton>
            </Collapse>
          </ListItemButton>
          <ListItemButton
            onClick={() => abrirMenuPerfil()}
            sx={{
              backgroundColor: menuPerfil ? "rgb(0,164,228)" : "white",
              cursor: " pointer",
              borderRadius: "3px",
              height: "70px",
              width: "300px",
              display: { xs: "flex", sm: "flex", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              color: "black",
              fontFamily: "'Nunito Sans', sans-serif",
              "&:hover": {
                backgroundColor: "rgb(0,164,228)",
                transition: "ease 0.3s",
                color: "white",
              },
            }}
          >
            <Box
              sx={{
                // backgroundColor: "red",
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgb(0,164,228)",
                  width: "50%",
                  color: "white",
                  fontSize: "15px",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "5px 0px 0px 5px",
                }}
              >
                {localStorage.getItem("user")}
              </Box>
              <AccountCircleIcon
                sx={{
                  color: "white",
                  backgroundColor: "rgb(0,164,228)",
                  width: "30%",
                  borderRadius: "0px 5px 5px 0px",
                }}
              ></AccountCircleIcon>
            </Box>
            <Collapse
              in={menuPerfil}
              timeout="auto"
              unmountOnExit
              sx={{
                width: "300px",
                position: "absolute",
                top: "70px",
                left: "0px",
                backgroundColor: "rgb(0,164,228)",
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              <ListItemButton
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Mi perfil
                    </Typography>
                  }
                />
                <ChevronRightIcon sx={{ color: "white" }}></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/verNotificaciones")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Notificaciones
                    </Typography>
                  }
                />
                <ChevronRightIcon sx={{ color: "white" }}></ChevronRightIcon>
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/")}
                sx={{
                  pl: 4,
                  borderBottom: "1px solid white",

                  // "&:hover": {
                  //   backgroundColor: "white",
                  // },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "white",
                        width: "100%",
                        // "&:hover": {
                        //   color: "rgb(0,164,228)",
                        // },
                      }}
                    >
                      Cerrar Sesión
                    </Typography>
                  }
                />
                <ChevronRightIcon sx={{ color: "white" }}></ChevronRightIcon>
              </ListItemButton>
            </Collapse>
          </ListItemButton>

          <Box
            sx={{
              cursor: " pointer",
              height: "70px",
              width: "300px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              color: "black",
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            <img src={Logo} className="logo-tree"></img>
          </Box>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer
        abrirDrawer={abrirDrawer}
        cerraDrawer={() => cerrarDrawer()}
      ></TemporaryDrawer>
    </Box>
  );
}
