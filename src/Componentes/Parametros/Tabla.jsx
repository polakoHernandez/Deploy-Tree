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

export default function DataGridDemo({
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
          reloadData();
          setHabilitar(false);
          break;

        case 400:
          alert("Usuario no encontrado");
          setHabilitar(false);
          break;

        case 500:

        // Handle other status codes if needed

        default:
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
          setHabilitar(false);
          reloadData();
          break;

        case 500:
          alert("Error en el servidor");
          setHabilitar(false);

        // Handle other status codes if needed

        default:
          setHabilitar(false);
      }
    }

    setHabilitar(false);
  };

  const columns = [
    {
      field: "nameNormativity",
      headerName: "Nombre",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "typeOfWater",
      headerName: "Tipo de agua",
      width: 150,
      headerAlign: "center",
    },

    {
      field: "state",
      headerName: "Estado",
      width: 300,
      align: "center",
      headerAlign: "center",
      // valueFormatter: (params) => (params.value ? "ACTIVO" : "INACTIVO"),
      renderCell: (params) => (
        <Typography
          sx={{
            width: "60%",
            textAlign: "center",
            color: params.value ? "green" : "red",
            fontFamily: "'Nunito Sans', sans-serif",
            border: "1px solid black",
            borderRadius: "5px",
            borderColor: params.value ? "green" : "red",
          }}
        >
          {params.value ? "ACTIVO" : "INACTIVO"}
        </Typography>
      ),
    },

    {
      field: "accion",
      headerName: "Administrar",
      width: 277,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "space-around", width: "90%" }}
        >
          <Tooltip title="Editar">
            <IconButton onClick={() => editarNorma(params.row._id)}>
              <EditIcon sx={{ color: "green" }}></EditIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizar">
            <IconButton onClick={() => mostrarDatos(params.row)}>
              <VisibilityIcon sx={{ color: "blue" }}></VisibilityIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.state ? "Inhablilitar" : "Habilitar"}>
            <IconButton
              onClick={() =>
                inhabilitarUsuario(params.row._id, params.row.state)
              }
              disabled={habilitar}
            >
              {habilitar ? (
                <CircularProgress size={25}></CircularProgress>
              ) : params.row.state ? (
                <PersonOffIcon sx={{ color: "red" }}></PersonOffIcon>
              ) : (
                <PersonIcon sx={{ color: "green" }}></PersonIcon>
              )}
            </IconButton>
          </Tooltip>
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
        height: 360,
        // backgroundColor: "red",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <DataGrid
        sx={{ width: { xs: "95%", sm: "95%", md: "978px" } }}
        rows={data || ""}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        loading={cargando}
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
