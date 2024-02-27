import React, { useState } from "react";
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../../Estilos/General/tabla.css";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";

import ModalListaQuimicos from "./ModalListaQuimicos";

export default function TablaListaQuimicos({
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
  const [openUpdate, setopenUpdate] = useState(false);

  // Funcion para cerrar la modal
  const close = () => {
    setOpen(false);
  };

  const inhabilitarUsuario = async (idUsuario, state) => {
    setHabilitar(true);

    if (state === true) {
      const respuesta = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/deactivate-paramete/${idUsuario}`,
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
        `https://treea-piscinas-api.vercel.app/v1/activate-paramete/${idUsuario}`,
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

        // Handle other status codes if needed

        default:
          console.error("Unexpected status:", respuesta.status);
          setHabilitar(false);
      }
    }

    // console.log(await respuesta.json());
    // reloadData();
  };

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return params?.value === null
          ? "Manual"
          : params?.value?.nameNormativity;
      },
    },

    {
      field: "chemicalFunction",
      headerName: "Funcion",
      width: 200,
      headerAlign: "center",
    },

    {
      field: "supplier",
      headerName: "Proveedor",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => {
        return params.value && params.value.length > 0
          ? params.value[0].name
          : "";
      },
    },

    {
      field: "availableQuantity",
      headerName: "Cantidad",
      width: 130,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "accion",
      headerName: "Administrar",
      width: 120,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "space-around", width: "90%" }}
        >
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                navigate(`/actualizarQuimico?id=${params?.row?._id}`);
              }}
            >
              <EditIcon sx={{ color: "green" }}></EditIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizar">
            <IconButton
              onClick={() => {
                setOpen(true), setDatosRows(params.row);
              }}
            >
              <VisibilityIcon sx={{ color: "blue" }}></VisibilityIcon>
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
    setDatosRows(data);
    setopenUpdate(true);
  };

  return (
    <Box
      sx={{
        // width: { xs: "90%", sm: "90%", md: "90%", lg: "1250px" },
        // marginLeft: { xs: "5%", sm: "5%", md: "5%", lg: "5%", xl: "4.75%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <DataGrid
        sx={{
          width: { xs: "90%", sm: "90%", md: "80%", lg: "952px" },
        }}
        rows={data}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        // pageSizeOptions={[5, 6]}
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
      <ModalListaQuimicos
        data={datosRow}
        open={open}
        close={close}
      ></ModalListaQuimicos>
    </Box>
  );
}
