import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton, Input, backdropClasses } from "@mui/material";
import InputGeneral from "../General/InputGeneral";
import {
  Add,
  Close,
  Delete,
  PictureAsPdf,
  Poll,
  Pool,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import InputSelect from "../General/InputSelect";
import "../../Estilos/Quimicos/verQuimico.css";

const style = {
  position: "absolute",
  overflow: "hidden",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "70%", lg: "70%" },
  height: { xs: "85vh", sm: "85vh" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalListaQuimicos({ data, open, close }) {
  const [dataUpdata, setDataUpdate] = useState({
    nombre: data?.normativityId?.nameNormativity,
    responsable: data?.name,
    piscina: data?.poolId?.[0]?.name,
  });

  const [dataParameter, setDataParameter] = useState({
    parameter: [{ name: "", specification: "" }],
  });

  useEffect(() => {
    // Actualizar el estado cuando las props (data) cambien
    setDataUpdate({
      nombre: data?.normativityId?.nameNormativity,
      responsable: data?.name,
      piscina: data?.poolId?.[0]?.name,
      fecha: data?.createAt,
    });
  }, [data]);

  console.log(data.typeValidation);

  const listaOpciones = [
    {
      label: "Cloro",
    },

    {
      label: "Ph",
    },
  ];

  //*Funcion para seleccionar prametro y mostrar valor maximo o rango minimo y maximo
  const seleccionarOpcion = (parametro, index) => {
    if (parametro === "Cloro") {
      setDataParameter((prevData) => {
        const temArray = [...prevData.parameter];
        if (temArray[index]) {
          temArray[index] = {
            name: parametro,
            specification: "Valor maximo",
            maxValueSpecification:
              dataParameter.parameter[index].maxValueSpecification,
          };
        }

        return { ...prevData, parameter: temArray };
      });
    } else if (parametro === "") {
      setDataParameter((prevData) => {
        const temArray = [...prevData.parameter];
        if (temArray[index]) {
          temArray[index] = {
            name: parametro,
            specification: "",
          };
        }

        return { ...prevData, parameter: temArray };
      });
    } else if (parametro === "Ph") {
      setDataParameter((prevData) => {
        const temArray = [...prevData.parameter];
        if (temArray[index]) {
          temArray[index] = {
            name: parametro,
            specification: "Rango",
            minRange: "",
            maxRange: "",
          };
        }

        return { ...prevData, parameter: temArray };
      });
    }
  };

  //*Funcion para capturar el valor d elos inputs rango minimo  maximo y Vamor maximo
  const catchDataParametro = (value, name) => {
    setDataParameter((prevData) => ({
      ...prevData,
      parameter: [{ ...prevData.parameter[0], [name]: value }],
    }));
  };

  //*Esta funcion agregar parametros cuando presionamos click en boton add
  const agregarParametro = () => {
    setDataParameter((prevData) => {
      const arrayTemp = [...prevData.parameter];
      arrayTemp.push({ name: "", specification: "" });

      return { ...prevData, parameter: arrayTemp };
    });
  };

  const eliminarParametro = (indice) => {
    if (dataParameter.parameter.length === 1) {
      return;
    }

    setDataParameter((prevData) => {
      const arrayTemp = [...prevData.parameter];
      arrayTemp.splice(indice, 1);

      return { ...prevData, parameter: arrayTemp };
    });
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "300px",
                height: "300px",
                top: { xs: "-190px", sm: "-190px", md: "-160px", lg: "-160px" },
                left: {
                  xs: "-190px",
                  sm: "-190px",
                  md: "-170px",
                  lg: "-170px",
                },
                backgroundColor:
                  data?.chemicalFunction === "Desinfectante"
                    ? "red"
                    : data?.chemicalFunction === "Regulador"
                    ? "blue"
                    : data?.chemicalFunction === "Coagulante"
                    ? "orange"
                    : data?.chemicalFunction === "Alguicida"
                    ? "green"
                    : data?.chemicalFunction === "Limpieza"
                    ? "purple"
                    : "",
                transform: "rotate(-50deg)",
                color: "red",
              }}
            >
              1
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Grid>
                <IconButton onClick={() => close()}>
                  <Close></Close>
                </IconButton>
              </Grid>
            </Box>

            <Typography sx={estilos.titulo}>Químico </Typography>
            <Box
              sx={{
                // backgroundColor: "gray",
                height: "90%",
                overflowY: "scroll",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyItems: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "10px",
                    marginBottom: "50px",
                  }}
                >
                  <img src={data?.image} className="img-chemical"></img>
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  sx={{ marginBottom: "40px" }}
                >
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Nombre
                  </Typography>
                  <Typography>{data?.name}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Función
                  </Typography>
                  <Typography>{data?.chemicalFunction}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Ficha técnica
                  </Typography>
                  <Box>
                    <a href={data?.safetyDataSheet} target="_blank">
                      <IconButton sx={{ color: "red" }}>
                        <PictureAsPdf></PictureAsPdf>
                      </IconButton>
                    </a>
                  </Box>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Hoja de seguridad
                  </Typography>
                  <Box>
                    <a href={data?.dataSheet} target="_blank">
                      <IconButton sx={{ color: "red" }}>
                        <PictureAsPdf></PictureAsPdf>
                      </IconButton>
                    </a>
                  </Box>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  sx={{ marginBottom: "30px" }}
                >
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Concentración
                  </Typography>
                  <Typography>{data?.concentration}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Densidad
                  </Typography>
                  <Typography>{data?.density}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Proveedor
                  </Typography>
                  <Typography>{data?.supplier}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Unidad
                  </Typography>
                  <Typography>{data?.units}</Typography>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  sx={{ marginBottom: "30px" }}
                >
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Cantidad mínima
                  </Typography>
                  <Typography>{data?.minQuantity}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Cantidad disponible
                  </Typography>
                  <Typography>{data?.availableQuantity}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Lote
                  </Typography>
                  <Typography>{data?.lot}</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Fecha de vencimiento
                  </Typography>
                  <Typography>
                    {new Date(
                      new Date(data?.expirationDate).getTime() +
                        24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={3}>
                  <Typography
                    sx={{
                      width: "90%",
                      fontFamily: "'Nunito Sans', sans-serif",
                      borderBottom: "3px solid rgb(0,164,228)",
                    }}
                  >
                    Unidad
                  </Typography>
                  <Typography>{data?.units}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const estilos = {
  titulo: {
    // backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "25px",
  },

  subtitle: {
    fontFamily: "'Nunito Sans', sans-serif",
    borderBottom: "2px solid rgb(0,164,228)",
  },
};
