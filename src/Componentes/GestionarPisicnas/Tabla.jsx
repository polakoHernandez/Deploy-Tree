import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import "../../Estilos/General/tabla.css";

const columns = [
  {
    field: "poolId",
    headerName: "Nombre",
    width: 300,
    headerAlign: "center",
    valueGetter: (params) => params.row.poolId.name,
    // El valueGetter te permite acceder a propiedades anidadas
  },
  {
    field: "startDate",
    headerName: "Fecha de inicio",
    width: 120,
    headerAlign: "center",

    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "endDate",
    headerName: "Fecha final",
    width: 120,
    headerAlign: "center",

    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },

  //Esto viene como un objeto con el nombre u
  {
    field: "quantityPerson",
    headerName: "Cantidad de personas",
    width: 156,
    headerAlign: "center",
  },

  {
    field: "timeUse",
    headerName: "Tiempo de uso",
    width: 143,
    headerAlign: "center",
  },
];

export default function Tabla({ data, contador, nombrePiscina }) {
  return (
    <DataGrid
      sx={{
        display: contador === 4 ? "flex" : "none",
        marginTop: "10px",
        width: { xs: "95%", sm: "95%", lg: "840px" },
      }}
      rows={data}
      columns={columns.map((col) => ({
        ...col,
        headerClassName: "custom-header",
      }))}
      getRowId={(data) => data._id}
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
  );
}
