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
import ModalData from "./ModalData";
import { useNavigate } from "react-router-dom";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";

export default function DataGridDemo({
  data,
  cargando,
  mover,
  moverUsuarios,
  moverParametros,
  moverQuimicos,
  moverPerfil,
  reloadData,
}) {
  const navigate = useNavigate("");

  const [habilitar, setHabilitar] = useState(false);

  //Datos para mostrar en la modal
  const [datosRow, setDatosRows] = useState("");

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
        `https://treea-piscinas-api.vercel.app/v1/user/${idUsuario}`,
        {
          method: "DELETE",
          headers: {
            Accpet: "Application/json",
            "x-token": localStorage.getItem("clave"),
          },
        }
      );

      switch (respuesta.status) {
        case 200:
          // console.log(await respuesta.json());
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
          setHabilitar(false);
      }
    } else if (state === false) {
      const respuesta = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/activate-user/${idUsuario}`,
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

        case 500:
          alert("Error en el servidor");
          setHabilitar(false);

        default:
          setHabilitar(false);
      }
    }
  };

  const columns = [
    { field: "ID", headerName: "Id", width: 200, headerAlign: "center" },

    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Correo electónico",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "cellPhone",
      headerName: "Teléfono",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Rol",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {params.value === "GERENTE"
              ? "Gerente"
              : params.value === "GESTOR"
              ? "Gestor"
              : ""}
          </Typography>
        );
      },
    },

    {
      field: "state",
      headerName: "Estado",
      width: 200,
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
          {params.value ? "Activo" : "Inactivo"}
        </Typography>
      ),
    },
    {
      field: "createAt",
      headerName: "Fecha creación",
      width: 200,
      headerAlign: "center",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "accion",
      headerName: "Administrar",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "space-around", width: "90%" }}
        >
          <Tooltip title="Editar">
            <IconButton onClick={() => editarPersona(params.row)}>
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

  const editarPersona = (data) => {
    const { _id, ID, name, lastName, email, cellPhone, role } = data;

    navigate(`/EditarUsuario?data=${data}`, {
      state: {
        _id,
        ID,
        name,
        lastName,
        email,
        cellPhone,
        role,
      },
    });
  };

  const handleColumnWidthChange = (params) => {
    // Puedes realizar acciones adicionales aquí si es necesario
    console.log(
      "Nueva anchura de la columna:",
      params.colDef.field,
      params.width
    );
  };

  return (
    <Box sx={{ width: "90%", marginLeft: "5%", height: "80vh" }}>
      <DataGrid
        rows={data}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        onColumnWidthChange={handleColumnWidthChange} // Agrega esta línea para manejar el cambio de tamaño de columna
        loading={cargando}
        getRowId={(data) => data.ID}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // pageSizeOptions={[6, 7]}
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
