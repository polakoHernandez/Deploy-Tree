import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../../Estilos/General/tabla.css";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import ModalData from "../Parametros/ModalData";

export default function TablaPrevisualizacion({
  data,
  cargando,
  mover,
  moverUsuarios,
  moverParametros,
  moverQuimicos,
  moverPerfil,
  reloadData,
  contador,
}) {
  const navigate = useNavigate("");

  const [habilitar, setHabilitar] = useState(false);
  const [datosRow, setDatosRows] = useState("");

  //Datos para mostrar en la modal

  //Estaod para abrir la modal
  const [open, setOpen] = useState(false);

  // Funcion para cerrar la modal
  const close = () => {
    setOpen(false);
  };

  const inhabilitarUsuario = async (idUsuario, state) => {
    setHabilitar(true);

    if (state === true) {
      const respuesta = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/deactivate-normativity/${idUsuario}`,
        {
          method: "PUT",
          headers: {
            Accpet: "Application/json",
            "x-token": localStorage.getItem("clave"),
          },
        }
      );

      switch (respuesta.status) {
        case 200:
          console.log(await respuesta.json());
          reloadData();
          setHabilitar(false);
          break;

        case 400:
          alert("Usuario no encontrado");
          setHabilitar(false);
          break;

        case 500:
          alert("Error en el servidor");

        // Handle other status codes if needed

        default:
          console.error("Unexpected status:", respuesta.status);
          setHabilitar(false);
      }
    } else if (state === false) {
      const respuesta = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/activate-normativity/${idUsuario}`,
        {
          method: "PUT",
          headers: {
            Accpet: "Application/json",
            "x-token": localStorage.getItem("clave"),
          },
        }
      );

      switch (respuesta.status) {
        case 200:
          console.log(await respuesta.json());
          setHabilitar(false);
          reloadData();
          break;

        case 500:
          alert("Error en el servidor");
          setHabilitar(false);

        // Handle other status codes if needed

        default:
          console.error("Unexpected status:", respuesta.status);
          setHabilitar(false);
      }
    }

    // console.log(await respuesta.json());
    // reloadData();
    setHabilitar(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Parámetro",
      width: 150,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "specification",
      headerName: "Especificación",
      width: 200,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "minRange",
      headerName: "Mínimo",
      width: 150,
      headerAlign: "center",
      editable: true,
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
    {
      field: "maxRange",
      headerName: "Máximo",
      width: 150,
      headerAlign: "center",
      editable: true,
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
    {
      field: "maxValueSpecification",
      headerName: "Valor máximo",
      width: 150,
      headerAlign: "center",
      editable: true,
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
    {
      field: "tal vez",
      headerName: "Análisis y reporte",
      width: 179,
      headerAlign: "center",
      editable: true,
      renderCell: (params) =>
        params.value === null || params.value === undefined
          ? "********"
          : params.value,
    },
  ];

  const mostrarDatos = (datos) => {
    setDatosRows(datos);
    setOpen(true);
  };

  const editarNorma = (id) => {
    navigate(`/editarNorma?Id=${id}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "30px",
        display: contador === 2 ? "none" : "flex",
      }}
    >
      <DataGrid
        sx={{ width: { xs: "95%", sm: "95%", md: "80%", lg: "980px" } }}
        rows={data || ""}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        loading={cargando}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowId={(data) => data.name}
        getRowClassName={
          (params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? "even-row" // Clase para índices pares
              : "odd-row" // Clase para índices impares
        }
        getCellClassName={(params) => "cell"}
      />
      <ModalData data={datosRow} open={open} close={close}></ModalData>
    </Box>
  );
}
