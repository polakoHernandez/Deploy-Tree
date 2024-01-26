import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function TablaInventarioLote(data) {
  console.log({ Mydata: data });
  const columns = [
    {
      field: "lot",
      headerName: "Lote",
      width: 300,
      headerAlign: "center",
    },

    {
      field: "nameChemicalProduct",
      headerName: "Nombre",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "quantityByLot",
      headerName: "Cantidad",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "quantityByLot",
      headerName: "Unidad",
      width: 300,
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
        width: "95%",
        marginLeft: "2.5%",
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

export default TablaInventarioLote;
