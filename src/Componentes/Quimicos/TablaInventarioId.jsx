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
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
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
      width: 210,
      headerAlign: "center",
    },

    {
      field: "productoQuimico",
      headerName: "Nombre",
      width: 171,
      headerAlign: "center",
    },
    {
      field: "lote",
      headerName: "Lote",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "entrada",
      headerName: "Entrada",
      width: 80,
      headerAlign: "center",
    },
    {
      field: "cantidadDosificada",
      headerName: "Cantidad dosificada",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "cantidadDisponible",
      headerName: "Saldo",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 120,
      headerAlign: "center",
    },
  ];

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  console.log(data);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        marginTop: "5px",
        marginBottom: "60px",
        height: "50vh",
      }}
    >
      <DataGrid
        sx={{
          width: {
            xs: "95%",
            sm: "95%",
            md: "97.3%",
            lg: "1102px",
            xl: "1102px",
          },
        }}
        rows={data.data}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        // loading={cargando}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
