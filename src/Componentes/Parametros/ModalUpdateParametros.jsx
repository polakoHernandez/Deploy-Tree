import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton, Input, CircularProgress } from "@mui/material";
import InputGeneral from "../General/InputGeneral";
import { Add, Close, Delete, Poll, Pool } from "@mui/icons-material";
import { useState, useEffect } from "react";
import InputSelect from "../General/InputSelect";
import Alertas from "../../Componentes/General/Alertas";

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

export default function ModalUpdateParametros({ data, open, close, render }) {
  const [dataParameter, setDataParameter] = useState({
    parameter: [{ nameParam: "", specification: "" }],
  });

  const [habilitar, setHabilitar] = useState(false);
  const [openAlerta, setOpenAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");
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
            nameParam: parametro,
            specification: "Valor Maximo",
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
            nameParam: parametro,
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
            nameParam: parametro,
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

  const capturarValores = (name, value, index) => {
    setDataParameter((prevData) => {
      const updatedParameters = [...prevData.parameter];
      updatedParameters[index] = {
        ...updatedParameters[index],
        [name]: value,
      };
      return { ...prevData, parameter: updatedParameters };
    });

    console.log(dataParameter.parameter);
  };

  const actualizarParametros = async () => {
    setHabilitar(true);

    const response = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/parameterization/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-token": localStorage.getItem("clave"),
        },
        body: JSON.stringify({
          parameters: dataParameter.parameter,
        }),
      }
    );
    let respuesta = "";
    switch (response.status) {
      case 200:
        respuesta = await response.json();
        setOpenAlerta(true);
        setMensaje("Parametro acualizado con exíto");
        setColor("success");
        render();
        setHabilitar(false);
        console.log(respuesta);

        break;

      case 400:
        respuesta = await response.json();

        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje(respuesta?.errors[0]?.msg);
        setColor("error");
        console.log(respuesta);
        break;

      case 401:
        respuesta = await response.json();

        setHabilitar(false);
        setOpenAlerta(true);
        setColor("error");
        console.log(respuesta);
        break;

      case 500:
        respuesta = await response.json();

        setHabilitar(false);
        setOpenAlerta(true);
        setMensaje("Error en el sevidor");
        setColor("error");
        console.log(respuesta);
        break;
    }
    setHabilitar(false);
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
                  {/* Seccion de inut de parametro y especificación */}
                  <Grid item xs={6}>
                    <InputGeneral
                      disabled={true}
                      options={listaOpciones}
                      icon={<Pool></Pool>}
                      label="Parámetro"
                      value={dataParameter?.parameter[index]?.nameParam || ""}
                      onChange={(e) =>
                        seleccionarOpcion(e.target.textContent, index)
                      }
                    ></InputGeneral>
                  </Grid>
                  <Grid item xs={6}>
                    <InputGeneral
                      disabled={true}
                      value={
                        dataParameter?.parameter[index]?.specification || ""
                      }
                      options={[{ label: "No data" }]}
                      icon={<Pool></Pool>}
                      label="Especificación"
                      onChange={(e) =>
                        catchDataParametro(
                          "specification",
                          e.target.textContent
                        )
                      }
                    ></InputGeneral>
                  </Grid>
                  {/* Seccion de Inuts rango minimo, maximo y valor maximo */}
                  {dataParameter?.parameter[index]?.specification ===
                  "Valor Maximo" ? (
                    <Grid container>
                      <Grid xs={12} sm={12} md={6}>
                        <InputGeneral
                          value={
                            dataParameter?.parameter[index]
                              ?.maxValueSpecification
                          }
                          label="Valor maximo"
                          icon={<Pool></Pool>}
                          type="number"
                          onChange={(e) =>
                            capturarValores(
                              "maxValueSpecification",
                              e.target.value,
                              index
                            )
                          }
                        ></InputGeneral>
                      </Grid>
                    </Grid>
                  ) : dataParameter?.parameter[index]?.specification ===
                    "Rango" ? (
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <InputGeneral
                          value={dataParameter?.parameter[index]?.minRange}
                          label="Rango mínimo"
                          icon={<Pool></Pool>}
                          type="number"
                          onChange={(e) =>
                            capturarValores("minRange", e.target.value, index)
                          }
                        ></InputGeneral>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <InputGeneral
                          value={dataParameter?.parameter[index]?.maxRange}
                          label="Rango máximo"
                          icon={<Pool></Pool>}
                          type="number"
                          onChange={(e) =>
                            capturarValores("maxRange", e.target.value, index)
                          }
                        ></InputGeneral>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              ))}

              <Grid container>
                <Grid item xs={12}>
                  <Button
                    disabled={habilitar}
                    onClick={() => actualizarParametros()}
                    variant="contained"
                    sx={{
                      width: "95%",
                      marginTop: "10px",
                      marginLeft: "2.5%",
                      marginBottom: "20px",
                      backgroundColor: "rgb(0,164,228)",
                      "&:hover": {
                        backgroundColor: "rgb(0,164,228)",
                      },
                    }}
                  >
                    {habilitar ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                      ></CircularProgress>
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Alertas
            open={openAlerta}
            mensaje={mensaje}
            severity={color}
            cerrar={() => setOpenAlerta(false)}
          ></Alertas>
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
