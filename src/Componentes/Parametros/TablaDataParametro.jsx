import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../../Estilos/General/tabla.css";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import ModalData from "../Parametros/ModalData";

export default function TablaDataParametro({
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
        `https://pool-api-treea.vercel.app/v1/deactivate-normativity/${idUsuario}`,
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
        `https://pool-api-treea.vercel.app/v1/activate-normativity/${idUsuario}`,
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
      field: "validacion",
      headerName: "Nombre de la norma",
      width: 200,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "nombre",
      headerName: "Responsable",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        params.row.nombre + "" + params.row.apellido;
      },
    },

    {
      field: "fecha",
      headerName: "Fecha",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        // Obtén la fecha del modelo de la fila
        const fecha = params.value;

        // Formatea la fecha usando Date
        const formattedDate = new Date(fecha).toLocaleDateString();

        return <div>{formattedDate}</div>;
      },
    },
    {
      field: "nameParam" || "name",
      headerName: "Nombre del parametro",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.name || params.row.nameParam;
      },
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
      width: 120,
      headerAlign: "center",
      editable: true,
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
    {
      field: "maxRange",
      headerName: "Máximo",
      width: 120,
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
      headerName: "Analisis y reporte",
      width: 190,
      headerAlign: "center",
      editable: true,
      renderCell: (params) =>
        params.value === null || params.value === undefined
          ? "********"
          : params.value,
    },

    {
      field: "piscina",
      headerName: "Piscina",
      width: 200,
      headerAlign: "center",
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "50%",
              border:
                params.value === true ? "2px solid green" : "1px solid red",
              color: params.value === true ? "green" : "red",
              fontFamily: "'Nunito Sans', sans-serif",

              borderRadius: "5px",
            }}
          >
            {params.value === true ? "ACTIVO" : "INACTIVO"}
          </Typography>
        </Box>
      ),
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
        width: { xs: "90%", sm: "90%", md: "90%", lg: "90%", xl: "50%" },
        marginLeft: "5%",
        marginTop: "40px",
        marginBottom: "30px",
        display: contador === 2 ? "none" : "content",
      }}
    >
      <DataGrid
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
        getRowId={(data) => data._id}
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
