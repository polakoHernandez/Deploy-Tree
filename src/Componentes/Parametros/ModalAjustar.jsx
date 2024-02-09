import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton, CircularProgress } from "@mui/material";
import InputSelect from "../General/InputSelect";
import { Close, Pool } from "@mui/icons-material";
import Alertas from "../General/Alertas";
import AlertaCalcular from "../GestionarPisicnas/AlertaCalcular";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "70%", lg: "50%" },
  height: { xs: "500px", sm: "300px", md: "350px", lg: "250px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalAjustar({
  data,
  open,
  close,
  CloroPh,
  idHistorico,
  renderizar,
}) {
  const [nombreParametro, setNombreParametro] = useState(CloroPh?.nombre);

  const [tipo, setTipo] = useState("");
  const [retornado, setRetornado] = useState("");
  const [dataCompleta, setDataCompleta] = useState([]);
  const [dataEnviar, setDataEnviar] = useState({
    idProducto: "",
    idHistoricoPool: "",
  });
  const [abrirAlerta3, setAbrirAlerta3] = useState(false);
  const [abrirAleta, setAbrirAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [idHistoricoNuevo, setIdHistoricoNuevo] = useState("");
  const [dataClorPh, setDataClorPh] = useState("");
  const [ajusteCloro, setAjusteCloro] = useState(false);
  const [ajustePh, setAjustePh] = useState("");
  const [productoRetornadoId, setProductoRetornadoId] = useState("");
  const [respuestaModal, setRespuestaModal] = useState("");
  const [abrirAlerta2, setAbrirAlerta2] = useState(false);
  const [mensaje2, setMensaje2] = useState("");
  const [color2, setColor2] = useState("");
  const [abrirModalSucces, setAbriModalSucces] = useState(false);
  const [desactivarCalcular, setActivarCalcular] = useState(false);

  const listarProductos = async () => {
    const response = await fetch(
      "https://treea-piscinas-api.vercel.app/v1/search-chemical-product",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
          "x-token": localStorage.getItem("clave"),
        },
        body: JSON.stringify({
          category: tipo,
        }),
      }
    );

    switch (response.status) {
      case 200:
        const respuesta = await response.json();
        setDataCompleta(respuesta.searchChemicalProduct);

        const newArray = respuesta.searchChemicalProduct.map((elemento) => ({
          label: elemento.name,
        }));

        setRetornado(newArray);
        break;

      case 500:
        const respuesta2 = await response.json();
        break;
    }
  };

  const historyChemicalProduct = async (id) => {
    // return alert(JSON.stringify({ ID: respuestaModal }));

    const respuesta = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/history-chemical-product`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
          "x-token": localStorage.getItem("clave"),
        },

        body: JSON.stringify({
          settingDosing: id,
        }),
      }
    );

    switch (respuesta.status) {
      case 200:
        const response = await respuesta.json();
        setAbrirAlerta3(true);

        if (CloroPh.nombre === "Cloro") {
          // const updateProp = {
          //   nameParam: CloroPh.nombre,
          // };

          const response = await fetch(
            `https://treea-piscinas-api.vercel.app/v1/history-pool/${dataClorPh.historyPoolId._id}/${dataClorPh.historyPoolId.paramChlorine._id}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
                "x-token": localStorage.getItem("clave"),
              },

              body: JSON.stringify({
                nameParam: CloroPh.nombre,
              }),
            }
          );

          switch (response.status) {
            case 200:
              const respues = await response.json();

              break;

            case 404:
              const respues2 = await response.json();

              break;

            case 500:
              const respues3 = await response.json();

              break;

            default:
              break;
          }
        } else if (CloroPh.nombre === "Ph") {
          const response = await fetch(
            `https://treea-piscinas-api.vercel.app/v1/history-pool/${dataClorPh.historyPoolId._id}/${dataClorPh.historyPoolId.paramPh._id}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
                "x-token": localStorage.getItem("clave"),
              },

              body: JSON.stringify({
                nameParam: CloroPh.nombre,
              }),
            }
          );

          switch (response.status) {
            case 200:
              const respues = await respuesta.json();

              break;

            case 404:
              const respues2 = await respuesta.json();

              break;

            case 500:
              const respues3 = await respuesta.json();

              break;

            default:
              break;
          }
        }

        break;

      case 500:
        const response2 = await respuesta.json();

        break;
    }
  };

  const retornahistoricoPool = async () => {
    const respuesta = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/history-pool-param/${idHistoricoNuevo}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
          "x-token": localStorage.getItem("clave"),
        },
      }
    );

    switch (respuesta.status) {
      case 200:
        const respues = await respuesta.json();
        setDataClorPh(respues);
        setAjusteCloro(respues.historyPoolId.paramChlorine.isAdjustedChlorine);
        setAjustePh(respues.historyPoolId.paramPh.isAdjustedPh);

        break;

      case 404:
        const respues2 = await respuesta.json();

        break;

      case 500:
        const respues3 = await respuesta.json();

        break;

      default:
        break;
    }
  };

  const guardarData = async () => {
    setActivarCalcular(true);

    const respuesta = await fetch(
      `https://treea-piscinas-api.vercel.app/v1/setting-dosing`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
          "x-token": localStorage.getItem("clave"),
        },

        body: JSON.stringify({
          category: tipo,
          productId: productoRetornadoId,
          historyPoolId: idHistoricoNuevo,
        }),
      }
    );

    switch (respuesta.status) {
      case 200:
        const respues = await respuesta.json();
        setRespuestaModal(respues);
        setAbrirAlerta2(true);
        setMensaje2(respues.message);
        setColor2("success");
        setActivarCalcular(false);
        // alert(JSON.stringify({ probandoRespuesa: respues }));
        close();
        historyChemicalProduct(respues._id);
        renderizar();
        break;

      case 404:
        const respues2 = await respuesta.json();
        setActivarCalcular(false);

        break;

      case 500:
        const respues3 = await respuesta.json();
        setActivarCalcular(false);

        break;
    }
    setActivarCalcular(false);
  };

  const IdProducto = (nombreProducto) => {
    const productoRetonrado = dataCompleta.find((elemento) => {
      return elemento.name === nombreProducto;
    });

    setProductoRetornadoId(productoRetonrado._id);
    // alert(productoRetornadoId);

    if (
      productoRetonrado?.availableQuantity <= productoRetonrado?.minQuantity
    ) {
      setAbrirAlerta(true);
      setColor("error");
      setMensaje(
        `No hay inventario del producto quimíco ${productoRetonrado.name}`
      );
      setDeshabilitar(true);
    } else {
      setDeshabilitar(false);
      //!Pendinete llamar al enpoint /history-pool/{poolId}/{historyId}
      // alert(CloroPh.ajustado);

      if (CloroPh.nombre === "Cloro" && CloroPh.mansaje !== "good") {
        retornahistoricoPool();
        //*Almacenar y guaradr en el local Storage
      } else if (CloroPh.nombre === "Ph" && CloroPh.mansaje !== "good") {
        retornahistoricoPool();
        setAjustePh(true);
      }

      // guardarData();
    }

    setDataEnviar((prev) => ({
      ...prev,
      idProducto: productoRetonrado._id,
    }));
  };

  useEffect(() => {
    if (CloroPh) {
      setNombreParametro(CloroPh.nombre || "");
    }
  }, [CloroPh]);

  useEffect(() => {
    if (idHistorico) {
      setIdHistoricoNuevo(idHistorico || "");
    }
  }, [idHistorico]);

  useEffect(() => {
    listarProductos();
  }, [tipo]);

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <IconButton onClick={() => close()}>
                <Close></Close>
              </IconButton>
            </Box>
            <Typography sx={estilos.titulo}>Ajustes</Typography>

            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <InputSelect
                  label="Categoria"
                  options={
                    nombreParametro === "Cloro"
                      ? [{ label: "Desinfectante" }]
                      : [{ label: "Regulador" }]
                  }
                  icon={<Pool></Pool>}
                  onChange={(e) => setTipo(e.target.textContent)}
                ></InputSelect>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputSelect
                  icon={<Pool></Pool>}
                  label="Producto"
                  options={retornado || [{ label: "No opciones" }]}
                  onChange={(e) => {
                    IdProducto(e.target.textContent);
                    // alert(dataEnviar.idProducto);
                  }}
                ></InputSelect>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    marginLeft: "7%",
                  }}
                >
                  <Button
                    disabled={
                      desactivarCalcular === true || deshabilitar == true
                    }
                    variant="contained"
                    // disabled={deshabilitar}
                    onClick={() => guardarData()}
                  >
                    {desactivarCalcular === true ? (
                      <CircularProgress
                        color="inherit"
                        size={24}
                      ></CircularProgress>
                    ) : (
                      " Calcular"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Alertas
            open={abrirAleta}
            severity={color}
            cerrar={() => setAbrirAlerta(false)}
            mensaje={mensaje}
          ></Alertas>
        </Box>
      </Modal>
      <Alertas
        open={abrirModalSucces}
        cerrar={() => setAbriModalSucces(false)}
        mensaje="Operacion Exitosa"
        color="success"
      ></Alertas>

      <Alertas
        open={abrirAlerta3}
        cerrar={() => setAbrirAlerta3(false)}
        mensaje="Ajuste de dosificación creado con exito"
        color="succes"
      ></Alertas>
      <AlertaCalcular
        render={renderizar}
        adicionar={() => {
          setAbrirAlerta2(false);
          setAbriModalSucces(true);
          renderizar();
          close();
        }}
        open={abrirAlerta2}
        severity={color2}
        cerrar={() => setAbrirAlerta2(false)}
        mensaje={mensaje2}
      ></AlertaCalcular>
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
