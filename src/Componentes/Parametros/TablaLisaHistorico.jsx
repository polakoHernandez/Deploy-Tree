import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../Estilos/General/tabla.css";
import { Button, Typography, Box, IconButton } from "@mui/material";

import ModalAjustar from "./ModalAjustar";
import { Visibility } from "@mui/icons-material";
import ModalAjustado from "./ModalAjustado";
import ModalDetalles from "./ModalDetalles";

export default function TablaLisaHistorico({
  data,
  contador,
  idHistorico,
  idPool,
  renderizar,
}) {
  const [rowIdCounter, setRowIdCounter] = useState(1);
  const [openModalAjustar, setOpenModalAjustar] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [prop2, setProp2] = useState(false);
  const [openModalDetalle, setOpenModalDetalle] = useState(false);
  const [dataDetalle, setDataDetalle] = useState("");

  const handleIncrementRowId = () => {
    setRowIdCounter((prevCounter) => prevCounter + 1);
  };

  const mostrarModalDetalle = (params) => {
    setDataDetalle(params);
    setOpenModalDetalle(true);
  };

  const [DataPropModal, setDataModalprop] = useState("");

  const abirModalAjusta = (nombreParametro) => {
    setOpenModalAjustar(true);
    setDataModalprop(nombreParametro);
  };

  const abrirModalAjustado = (nombreParametro) => {
    setAbrirModal(true);
    setProp2(nombreParametro);
  };

  const dataWithIds = data.map((row, index) => ({ ...row, id: index + 1 }));

  const columns = [
    {
      field: "nombre",
      headerName: "Parámetro",
      width: 100,
      headerAlign: "center",
    },

    {
      field: "date",
      headerName: "Fecha",
      width: 100,
      headerAlign: "center",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },

    {
      field: "minimo",
      headerName: "Mínimo",
      width: 100,
      headerAlign: "center",
    },

    {
      field: "real",
      headerName: "Real",
      width: 100,
      headerAlign: "center",
    },

    {
      field: "maximo",
      headerName: "Máximo",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "mensaje",
      headerName: "Estado",
      width: 200,
      headerAlign: "center",
      renderCell: (paramas) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Button
            onClick={() =>
              paramas.row.ajustado === true
                ? abrirModalAjustado(paramas.row)
                : ""
            }
            // disabled={
            //   paramas.row.nombre === "Cloro"
            //     ? localStorage.getItem("AjusteCloro") === "true"
            //       ? true
            //       : false
            //     : paramas.row.nombre === "Ph"
            //     ? localStorage.getItem("AjustePh") === "true"
            //       ? true
            //       : false
            //     : ""
            // }
            variant="contained"
            sx={{
              width: "60%",
              backgroundColor:
                paramas.row.ajustado === true
                  ? "orange"
                  : paramas.value === "good"
                  ? "green"
                  : "red",
              textAlign: "center",
              color: "white",
              fontFamily: "'Nunito Sans', sans-serif",
              border: "1px solid black",
              borderRadius: "5px",
              borderColor:
                paramas.row.ajustado === true
                  ? "orange"
                  : paramas.value === "good"
                  ? "green"
                  : "red",
              "&:hover": {
                backgroundColor:
                  paramas.row.ajustado === true
                    ? "orange"
                    : paramas.value === "good"
                    ? "green"
                    : "red",
                textAlign: "center",
                color: "white",
                fontFamily: "'Nunito Sans', sans-serif",
                border: "1px solid black",
                borderRadius: "5px",
                borderColor:
                  paramas.row.ajustado === true
                    ? "orange"
                    : paramas.value === "good"
                    ? "green"
                    : "red",
              },
            }}
          >
            {paramas.row.nombre === "Cloro"
              ? localStorage.getItem("AjusteCloro") === "true"
                ? "Ajustado 2"
                : paramas.row.ajustado === true
                ? "Ajustado  " + `${paramas.row.ajustado}`
                : paramas.value === "good"
                ? "Cumple"
                : "No cumple"
              : //Desde aui tood lo d eph
              paramas.row.nombre === "Ph"
              ? paramas.row.ajustado === true
                ? "Ajustado ***" + `${paramas.row.ajustado}`
                : paramas.value === "good"
                ? "Cumple tl vez"
                : "No cumple"
              : ""}
          </Button> */}

          {paramas.row.nombre === "Cloro" && paramas.value === "good" ? (
            <Button color="success" variant="contained">
              {paramas.row.ajustado === true ? "Ajustado" : "cumple"}
            </Button>
          ) : paramas.row.ajustado === true ? (
            <Button
              onClick={() =>
                paramas.row.ajustado === true
                  ? abrirModalAjustado(paramas.row)
                  : ""
              }
              sx={{
                backgroundColor:
                  localStorage.getItem("AjusteCloro") === "true"
                    ? "orange"
                    : "red",
              }}
            >
              {localStorage.getItem("AjusteCloro") === "true"
                ? "Ajustado"
                : "No cumple"}
            </Button>
          ) : paramas.row.nombre === "Ph" && paramas.value === "good" ? (
            <Button color="success" variant="contained">
              {paramas.row.ajustado === true ? "Ajustado" : "cumple"}
            </Button>
          ) : (
            <Button color="primary">
              {localStorage.getItem("AjustePh") === "true"
                ? "Ajustado"
                : "No cumple"}
            </Button>
          )}
        </Box>
      ),
    },

    {
      //*Is
      field: "ajustado",
      headerName: "Ajustado",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return params.value === false ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {params.row.mensaje !== "good" ? (
              <Button
                variant="contained"
                onClick={() => {
                  abirModalAjusta(params.row);
                }}
              >
                Ajustar
              </Button>
            ) : (
              <Typography>****</Typography>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              disabled
              onClick={() => abirModalAjusta(params.row)}
            >
              Ajustar
            </Button>
          </Box>
        );
      },
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => mostrarModalDetalle(params.row)}
            variant="containded"
            sx={{
              backgroundColor: "blue",
              color: "white",
              "&:hover": {
                backgroundColor: "blue",
                color: "white",
              },
            }}
          >
            <Visibility></Visibility>
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <div
      style={{
        height: 400,
        width: "100%",
        display: contador === 2 ? "block" : "none",
      }}
    >
      <DataGrid
        sx={{ marginTop: "10px", width: "98%", marginLeft: "1%" }}
        rows={dataWithIds || ""}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowClassName={
          (params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? "even-row" // Clase para índices pares
              : "odd-row" // Clase para índices impares
        }
        getCellClassName={(params) => "cell"}
        pageSizeOptions={[5, 10]}
      />
      <ModalAjustado
        renderizar={renderizar}
        CloroPh={prop2}
        idHistorico={idHistorico}
        idPool={idPool}
        open={abrirModal}
        close={() => setAbrirModal(false)}
      ></ModalAjustado>

      <ModalAjustar
        renderizar={renderizar}
        idHistorico={idHistorico}
        CloroPh={DataPropModal}
        open={openModalAjustar}
        close={() => setOpenModalAjustar(false)}
      ></ModalAjustar>
      <ModalDetalles
        open={openModalDetalle}
        close={() => setOpenModalDetalle(false)}
        data={dataDetalle}
      ></ModalDetalles>
    </div>
  );
}
