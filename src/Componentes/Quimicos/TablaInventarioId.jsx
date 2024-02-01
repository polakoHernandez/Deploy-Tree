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
      width: 150,
      headerAlign: "center",
    },

    {
      field: "productoQuimico",
      headerName: "Nombre",
      width: 150,
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
      width: 100,
      headerAlign: "center",
    },
    {
      field: "cantidadDosificada",
      headerName: "Cantidad dosificada",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "saldo",
      headerName: "Saldo",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
      headerAlign: "center",
    },
  ];

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <Box
      sx={{
        width: "90%",
        marginLeft: "5%",
        marginTop: "5px",
        marginBottom: "60px",
      }}
    >
      <DataGrid
        rows={data.data || ""}
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
