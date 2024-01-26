import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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

          {/* Seccion de Informacion General */}
          <Box>
            {/* foto
                    Nombre
                    departamento
                    ciudad/Muicipio
                    Direccion
                    Uso
                    Caracterisicas
                    Temperatura
                    Tempertaura Externa
                    Estructura
                    Clase de instalacion */}

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
                  Información General
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
                  Clase de istalación
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

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Forma
                </Typography>
                <Typography>{pool.form}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Largo
                </Typography>
                <Typography>{pool.height}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Ancho
                </Typography>
                <Typography>{pool.width}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad A (m)
                </Typography>
                <Typography>
                  {pool.depth && pool.depth.depthA !== undefined
                    ? pool.depth.depthA
                    : ""}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad B (m)
                </Typography>
                <Typography>
                  {pool.depth && pool.depth.depthB !== undefined
                    ? pool.depth.depthB
                    : ""}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad C (m)
                </Typography>
                <Typography>
                  {pool.depth && pool.depth.depthC !== undefined
                    ? pool.depth.depthC
                    : ""}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Proundidad máxima (m)
                </Typography>
                <Typography>
                  {pool.maxDepth === undefined ? "" : pool.maxDepth}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  Profundidad minima (m)
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
                  Caudal
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
                  P. Recirculació mínimo
                </Typography>
                <Typography>{pool.maxDepth}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  P. Recirculació máximo
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
                          Altua del filtro
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterBedHeight}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Capacidad del filtro
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterCapacity}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Diametro del filtro
                        </Typography>
                        <Typography sx={{ ...styles.fontTexto }}>
                          {elemento.filterDiameter}
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography sx={{ ...styles.fontTylografy }}>
                          Filter Height
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
                          Flujo
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
                          DataSheet
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
                  Sección de Calentador
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
                          DataSheet
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
