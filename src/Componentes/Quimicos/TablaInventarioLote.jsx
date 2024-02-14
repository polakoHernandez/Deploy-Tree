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
      field: "nameChemicalProduct",
      headerName: "Nombre",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "lot",
      headerName: "Lote",
      width: 200,
      headerAlign: "center",
    },

    {
      field: "quantityByLot",
      headerName: "Saldo",
      width: 202,
      headerAlign: "center",
    },
  ];

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        width: "100%",
        marginTop: "5px",
        marginBottom: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <DataGrid
        sx={{ width: { xs: "95%", sm: "70%", md: "653px", lg: "653px" } }}
        rows={data.data}
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
