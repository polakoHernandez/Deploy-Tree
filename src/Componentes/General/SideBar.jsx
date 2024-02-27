import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PoolIcon from "@mui/icons-material/Pool";
import ScienceIcon from "@mui/icons-material/Science";
import Co2Icon from "@mui/icons-material/Co2";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer({ abrirDrawer, cerraDrawer }) {
  const navigate = useNavigate("");

  const [open, setOpen] = React.useState(false);
  const [openPiscina, setOpenPiscina] = React.useState(false);
  const [openParam, setOpenParam] = React.useState(false);
  const [openQuimicos, setOpenQuimicos] = React.useState(false);
  const [openPerfil, setOpenPerfil] = React.useState(false);
  const [rol, setRol] = React.useState("");

  const abrirPisicina = () => {
    setOpenPiscina(!openPiscina);
    setOpen(false);
    setOpenParam(false);
    setOpenQuimicos(false);
    setOpenPerfil(false);
  };

  const abrirUsuario = () => {
    setOpenPiscina(false);
    setOpen(!open);
    setOpenParam(false);
    setOpenQuimicos(false);
    setOpenPerfil(false);
  };

  const abrirParam = () => {
    setOpenPiscina(false);
    setOpen(false);
    setOpenParam(!openParam);
    setOpenQuimicos(false);
    setOpenPerfil(false);
  };

  const abrirQuimicos = () => {
    setOpenPiscina(false);
    setOpen(false);
    setOpenParam(false);
    setOpenQuimicos(!openQuimicos);
    setOpenPerfil(false);
  };

  const abrirPerfil = () => {
    setOpenPiscina(false);
    setOpen(false);
    setOpenParam(false);
    setOpenQuimicos(false);
    setOpenPerfil(!openPerfil);
  };

  React.useEffect(() => {
    setRol(localStorage.getItem("rol"));
  }, []);

  return (
    <div>
      <Drawer open={abrirDrawer} onClose={cerraDrawer}>
        <Box
          sx={{
            backgroundColor: "rgb(0,164,228)",
            height: "100%",
          }}
        >
          <List>
            <ListItemButton
              onClick={() => abrirPisicina()}
              sx={{
                borderBottom: "1px solid white",
              }}
            >
              <ListItemIcon>
                <PoolIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                    }}
                  >
                    Piscina
                  </Typography>
                }
              />
              {openPiscina ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ExpandMore sx={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={openPiscina} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/CrearPiscina")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          width: "100%",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Crear piscina
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openPiscina} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/misPiscinas")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Mis piscinas
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openPiscina} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/gestionarPiscinas")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Gestionar piscinas
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Segundo Item */}
            <ListItemButton
              onClick={() => abrirUsuario()}
              sx={{
                borderBottom: "1px solid white",
                display: rol === "Gestor" ? "none" : "flex",
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                    }}
                  >
                    Usuarios
                  </Typography>
                }
              />
              {open ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ExpandMore sx={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/CrearUsuario")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          width: "100%",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Crear usuario
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/listaDeUsuarios")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Lista de usuarios
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Tercer Item */}
            <ListItemButton
              onClick={() => abrirParam()}
              sx={{
                borderBottom: "1px solid white",
              }}
            >
              <ListItemIcon>
                <Co2Icon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                    }}
                  >
                    Parametrización
                  </Typography>
                }
              />
              {openParam ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ExpandMore sx={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={openParam} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/crearParametro")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          width: "100%",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Crear norma
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openParam} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/verParametrosPiscinas")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Ver parametrización
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openParam} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/asignarParametros")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Asignar norma
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openParam} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/listaNormas")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Lista de normas
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Cuarto Item */}
            <ListItemButton
              onClick={() => abrirQuimicos()}
              sx={{
                borderBottom: "1px solid white",
              }}
            >
              <ListItemIcon>
                <ScienceIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                    }}
                  >
                    Químicos
                  </Typography>
                }
              />
              {openQuimicos ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ExpandMore sx={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={openQuimicos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/crearQuimico")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          width: "100%",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Crear producto
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openQuimicos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/agregarInventario")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Inventario
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>

            <Collapse in={openQuimicos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/listaQuimicos")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Químicos
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Quinto item */}
            <ListItemButton
              onClick={() => abrirPerfil()}
              sx={{
                borderBottom: "1px solid white",
              }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "white",
                    }}
                  >
                    Perfil
                  </Typography>
                }
              />
              {openPerfil ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ExpandMore sx={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={openPerfil} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/MiPerfil")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          width: "100%",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Mi perfil
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openPerfil} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/verNotificaciones")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Notificaciones
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={openPerfil} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/")}
                  sx={{
                    pl: 4,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "'Nunito Sans', sans-serif",
                          color: "white",
                          "&:hover": {
                            color: "rgb(0,164,228)",
                          },
                        }}
                      >
                        Cerrar Sesión
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
