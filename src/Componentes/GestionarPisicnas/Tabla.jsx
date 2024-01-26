import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../Estilos/General/tabla.css";

const columns = [
  // { field: "_id", headerName: "_id", width: 300, headerAlign: "center" },
  // {
  //   field: "createAt",
  //   headerName: "creaeAt",
  //   width: 300,
  //   headerAlign: "center",

  //   valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  // },
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
    width: 300,
    headerAlign: "center",

    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: "endDate",
    headerName: "Fecha final",
    width: 300,
    headerAlign: "center",

    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },

  //Esto viene como un objeto con el nombre u
  {
    field: "quantityPerson",
    headerName: "Cantidad de persona",
    width: 300,
    headerAlign: "center",
  },

  {
    field: "timeUse",
    headerName: "Tiempo de uso",
    width: 300,
    headerAlign: "center",
  },
];

export default function Tabla({ data, contador, nombrePiscina }) {
  console.log(data || "");
  return (
    <div
      style={{
        height: 400,
        width: "100%",
        display: contador === 3 ? "block" : "none",
      }}
    >
      <DataGrid
        sx={{ marginTop: "10px", width: "98%", marginLeft: "1%" }}
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
    </div>
  );
}
