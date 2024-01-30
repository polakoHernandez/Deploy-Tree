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
  const columns = [
    {
      field: "lot",
      headerName: "Lote",
      width: 200,
      headerAlign: "center",
    },

    {
      field: "nameChemicalProduct",
      headerName: "Nombre",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "quantityByLot",
      headerName: "Cantidad",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "quantityByLot",
      headerName: "Unidad",
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
        width: { xs: "90%", sm: "90%", md: "70%" },
        marginLeft: { xs: "5%", sm: "5%", md: "15%" },
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
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
