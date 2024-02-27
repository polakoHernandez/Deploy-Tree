import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import circular from "../../assets/imagePool/PiscinaCircular.png";
import rectangular from "../../assets/imagePool/PiscinaRectangular.png";
import ovalada from "../../assets/imagePool/PiscinaOvalada.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
  overflow: "scroll",
};

export default function ModalNotificaciones({ open, close, pool }) {
  const styles = {
    generalContainer: {
      overflowX: "hidden",
      height: "100vh",
      // backgroundColor: "red",
    },

    fontTylografy: {
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
    },

    fontTexto: {
      display: "flex",
      justifyContent: "center",
    },

    boxListadoFiltros: {
      width: "100%",
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  };

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton onClick={() => close()}>
              <Close></Close>
            </IconButton>
          </Box>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "22px",
                    borderBottom: "3px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  Información general
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    // backgroundColor: "red",
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "100px",
                  }}
                >
                  <img src={pool.photo} className="img-piscina"></img>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Nombre
                </Typography>
                <Typography>{pool.name}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Departamento
                </Typography>
                <Typography>{pool.department}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Ciudad/Municipio
                </Typography>
                <Typography>{pool.city}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Dirección
                </Typography>
                <Typography>{pool.address}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Uso
                </Typography>
                <Typography>{pool.use}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Características
                </Typography>
                <Typography>{pool.typePool}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Temperatura °C
                </Typography>
                <Typography>{pool.temperature}°C</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Temperatura externa °C
                </Typography>
                <Typography>{pool.externalTemperature}°C</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Estructura
                </Typography>
                <Typography>{pool.category}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Clase de instalación
                </Typography>
                <Typography>{pool.typeInstallation}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Seccion de Medidas */}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "22px",
                    borderBottom: "3px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  Medidas
                </Typography>
              </Grid>

              <Grid xs={12}>
                {pool?.form === "Rectangular" ? (
                  <Box
                    sx={{
                      width: "90%",
                      marginLeft: "5%",
                      height: "400px",
                      // backgroundColor: "cyan",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "100px",
                        left: "40%",
                        transform: "rotate(-30deg)",
                      }}
                    >
                      {pool?.height} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "200px", left: "45%" }}
                    >
                      {pool?.width} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "320px", left: "55%" }}
                    >
                      A. {pool?.depth?.depthA} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "280px", left: "65%" }}
                    >
                      B. {pool?.depth?.depthB} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "230px", left: "75%" }}
                    >
                      C. {pool?.depth?.depthC} m
                    </Typography>
                    <img src={rectangular} className="img_rectangurlar"></img>
                  </Box>
                ) : pool?.form === "Circular" ? (
                  <Box
                    sx={{
                      width: "90%",
                      marginLeft: "5%",
                      height: "400px",
                      // backgroundColor: "cyan",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {/* <Typography sx={{position:"absolute", top:"110px", left:"35%"}}>{pool?.height} m</Typography> */}
                    <Typography
                      sx={{ position: "absolute", top: "180px", left: "50%" }}
                    >
                      {pool?.width} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "270px", left: "20%" }}
                    >
                      A. {pool?.depth?.depthA} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "190px", left: "20%" }}
                    >
                      B. {pool?.depth?.depthB} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "120px", left: "20%" }}
                    >
                      C. {pool?.depth?.depthC} m
                    </Typography>
                    <img src={circular} className="img_rectangurlar"></img>
                  </Box>
                ) : pool?.form === "Ovalada" ? (
                  <Box
                    sx={{
                      width: "90%",
                      marginLeft: "5%",
                      height: "400px",
                      // backgroundColor: "cyan",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "100px",
                        left: "40%",
                        transform: "rotate(-30deg)",
                      }}
                    >
                      {pool?.height} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "180px", left: "46%" }}
                    >
                      {pool?.width} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "320px", left: "55%" }}
                    >
                      A. {pool?.depth?.depthA} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "260px", left: "63%" }}
                    >
                      B. {pool?.depth?.depthB} m
                    </Typography>
                    <Typography
                      sx={{ position: "absolute", top: "200px", left: "68%" }}
                    >
                      C. {pool?.depth?.depthC} m
                    </Typography>
                    <img src={ovalada} className="img_rectangurlar"></img>
                  </Box>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad máxima (m)
                </Typography>
                <Typography>
                  {pool.maxDepth === undefined ? "" : pool.maxDepth}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad mínima (m)
                </Typography>
                <Typography>
                  {pool.minDepth === undefined ? "" : pool.minDepth}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad media (m)
                </Typography>
                <Typography>
                  {pool.meanDepth === undefined ? "" : pool.meanDepth}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Volumen (m³){" "}
                </Typography>
                <Typography>
                  {pool?.poolVolumR === undefined ? "" : pool?.poolVolumR}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Volumen (L){" "}
                </Typography>
                <Typography>
                  {pool?.numberLitersR === undefined ? "" : pool?.numberLitersR}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Seccion de detalles de operacion */}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "22px",
                    borderBottom: "3px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  Detalles de operación
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Sistema de operación
                </Typography>
                <Typography>{pool.systemOperation}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Caudal (L/seg)
                </Typography>
                <Typography>{pool.caudal}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Climatizado
                </Typography>
                <Typography>{pool.airConditioned}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  P. Recirculación mínimo (h)
                </Typography>
                <Typography>{pool.maxDepth}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  P. Recirculación máximo (h)
                </Typography>
                <Typography>{pool.meanDepth}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Dosificación automática
                </Typography>
                <Typography>{pool.autoDosing}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Seccion de equipos */}
          {/* Seccion de equipos */}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "22px",
                    borderBottom: "3px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  Sección de filtros
                </Typography>
              </Grid>

              <Box
                sx={{
                  ...styles.boxListadoFiltros,
                }}
              >
                {pool === "" || !pool.filters ? (
                  <Typography>No data</Typography>
                ) : (
                  pool.filters.map((elemento, index) => (
                    <Grid container xs={12} marginTop={1} marginBottom={1}>
                      <Grid xs={12}>
                        <Typography
                          sx={{
                            ...styles.fontTylografy,
                            width: "20%",
                            marginLeft: "40%",
                            borderBottom: "2px solid black",
                            marginBottom: "5px",
                          }}
                        >
                          Filtro {index + 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Filtro
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filter}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Altura del filtro (m)
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterBedHeight}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Capacidad del filtro (L)
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterCapacity}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Diámetro del filtro (m)
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterDiameter}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Altura del lecho filtrante (m)
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterHeight}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                )}
              </Box>

              <Grid item xs={12}>
                <Typography
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "22px",
                    borderBottom: "3px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  Sección de bombas
                </Typography>
              </Grid>

              <Box
                sx={{
                  ...styles.boxListadoFiltros,
                  // backgroundColor: "red",
                }}
              >
                {pool === "" || !pool.pumps ? (
                  <Typography></Typography>
                ) : (
                  pool.pumps.map((elemento, index) => (
                    <Grid
                      key={index}
                      container
                      xs={12}
                      // sx={{ backgroundColor: "blue" }}
                    >
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            ...styles.fontTylografy,
                            width: "20%",
                            marginLeft: "40%",
                            borderBottom: "2px solid black",
                            marginBottom: "5px",
                          }}
                        >
                          Bomba {index + 1}
                        </Typography>
                      </Grid>
                      <Grid
                        xs={12}
                        sx={{
                          // backgroundColor: "pink",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={elemento.platePhoto}
                          style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "5px",
                          }}
                        ></img>
                      </Grid>
                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Marca
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.pumpBrand}
                        </Typography>
                      </Grid>

                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Caudal (L/seg)
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.pumpFlow}
                        </Typography>
                      </Grid>

                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Referencia
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.referencePump}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Ficha técnica
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <a href={elemento.dataSheetPump} target="_blank">
                            <IconButton>
                              <PictureAsPdfIcon
                                sx={{
                                  color: "red",
                                }}
                              ></PictureAsPdfIcon>
                            </IconButton>
                          </a>
                        </Box>
                      </Grid>
                    </Grid>
                  ))
                )}
              </Box>

              <Grid item xs={12}>
                <Typography
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "22px",
                    borderBottom: "3px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                >
                  Sección de calentadores
                </Typography>
              </Grid>
              {pool === "" || !pool.heaters ? (
                <></>
              ) : (
                <>
                  {pool.heaters.map((elemento, index) => (
                    <Grid container key={index}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            ...styles.fontTylografy,
                            width: "20%",
                            marginLeft: "40%",
                            borderBottom: "2px solid black",
                            marginBottom: "5px",
                          }}
                        >
                          Calentador {index + 1}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Referencia
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.heaterReference}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Marca
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.heaterBrand}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Ficha técnica
                        </Typography>
                        <Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <a href={elemento.dataSheetHeater} target="_blank">
                              <IconButton>
                                <PictureAsPdfIcon
                                  sx={{
                                    color: "red",
                                  }}
                                ></PictureAsPdfIcon>
                              </IconButton>
                            </a>
                          </Box>
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
