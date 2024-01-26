import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function TablaInventarioId(data) {
  console.log({ Mydata: data });
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 200,
      headerAlign: "center",
      valueFormatter: (params) =>
        new Date(
          params == undefined
            ? ""
            : params.value === undefined
            ? ""
            : params.value
        ).toLocaleDateString(),
    },

    {
      field: "responsable",
      headerName: "Responsable",
      width: 200,
      headerAlign: "center",
    },

    {
      field: "productoQuimico",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "lote",
      headerName: "Lote",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "entrada",
      headerName: "Entrada",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "cantidadDosificada",
      headerName: "Cantidad dosificada",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "availableQuantity",
      headerName: "Saldo",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 200,
      headerAlign: "center",
    },
  ];

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <Box
      sx={{
        height: 380,
        width: "98%",
        marginLeft: "1%",
        marginTop: "5px",
        marginBottom: "60px",
        height: "300px",
      }}
    >
      <DataGrid
        rows={data.data || ""}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        // loading={cargando}
        getRowId={() => generateUniqueId()}
        getRowClassName={
          (params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? "even-row" // Clase para índices pares
              : "odd-row" // Clase para índices impares
        }
        getCellClassName={(params) => "cell"}
      />
    </Box>
  );
}

export default TablaInventarioId;
