import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton, Input } from "@mui/material";
import InputGeneral from "../General/InputGeneral";
import { Add, Close, Delete, Poll, Pool } from "@mui/icons-material";
import { useState, useEffect } from "react";
import InputSelect from "../General/InputSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "70%", lg: "70%" },
  height: { xs: "500px", sm: "400px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalUpdateParametros({ data, open, close }) {
  const [dataParameter, setDataParameter] = useState({
    parameter: [{ name: "", specification: "" }],
  });

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
        const temArray = [...prevData?.parameter];
        if (temArray[index]) {
          temArray[index] = {
            name: parametro,
            specification: "Valor maximo",
            maxValueSpecification:
              dataParameter?.parameter[index].maxValueSpecification,
          };
        }

        return { ...prevData, parameter: temArray };
      });
    } else if (parametro === "") {
      setDataParameter((prevData) => {
        const temArray = [...prevData?.parameter];
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

  useEffect(() => {
    setDataParameter({
      parameter: data?.parameters || [{ name: "", specification: "" }],
    });
  }, [data?.parameters]);

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
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Grid>
                <IconButton onClick={() => close()}>
                  <Close></Close>
                </IconButton>
              </Grid>
            </Box>

            <Typography sx={estilos.titulo}>Actualizar </Typography>
            <Box
              sx={{
                // backgroundColor: "gray",
                height: "85%",
                overflowY: "scroll",
              }}
            >
              {dataParameter?.parameter?.map((parametro, index) => (
                <Grid container key={index}>
                  {/* Seccion de botones para agrega    */}
                  <Grid xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton onClick={() => eliminarParametro(index)}>
                        <Delete></Delete>
                      </IconButton>
                      <IconButton onClick={agregarParametro}>
                        <Add></Add>
                      </IconButton>
                    </Box>
                  </Grid>
                  {/* Seccion de inut de parametro y especificación */}
                  <Grid item xs={6}>
                    <InputSelect
                      options={listaOpciones}
                      icon={<Pool></Pool>}
                      label="Parámetro"
                      value={{
                        label: dataParameter?.parameter[index]?.nameParam,
                      }}
                      onChange={(e) =>
                        seleccionarOpcion(e.target.textContent, index)
                      }
                    ></InputSelect>
                  </Grid>
                  <Grid item xs={6}>
                    <InputSelect
                      // disabled={true}
                      value={{
                        label: dataParameter?.parameter[index]?.specification,
                      }}
                      options={[{ label: "No data" }]}
                      icon={<Pool></Pool>}
                      label="Especificación"
                      onChange={(e) =>
                        catchDataParametro(
                          "specification",
                          e.target.textContent
                        )
                      }
                    ></InputSelect>
                  </Grid>
                  {/* Seccion de Inuts rango minimo, maximo y valor maximo */}
                  {dataParameter?.parameter[index]?.specification ===
                  "Valor Maximo" ? (
                    <Box>
                      <Grid xs={12}>
                        <InputGeneral
                          value={
                            dataParameter?.parameter[index]
                              ?.maxValueSpecification
                          }
                          label="Valor maximo"
                          icon={<Pool></Pool>}
                          type="number"
                        ></InputGeneral>
                      </Grid>
                    </Box>
                  ) : dataParameter?.parameter[index]?.specification ===
                    "Rango" ? (
                    <Box>
                      <Grid xs={12}>
                        <InputGeneral
                          value={dataParameter?.parameter[index]?.minRange}
                          label="Rango mínimo"
                          icon={<Pool></Pool>}
                          type="number"
                        ></InputGeneral>
                      </Grid>
                      <Grid xs={12}>
                        <InputGeneral
                          value={dataParameter?.parameter[index]?.maxRange}
                          label="Rango máximo"
                          icon={<Pool></Pool>}
                          type="number"
                        ></InputGeneral>
                      </Grid>
                    </Box>
                  ) : (
                    ""
                  )}
                </Grid>
              ))}
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
