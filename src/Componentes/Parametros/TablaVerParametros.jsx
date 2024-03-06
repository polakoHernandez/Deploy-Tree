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
import ModalDataParametros from "../../Componentes/Parametros/ModalDataParametros";
import ModalUpdateParametros from "../../Componentes/Parametros/ModalUpdateParametros";
import Alertas from "../General/Alertas";

export default function TablaVerParametros({
  data,
  cargando,
  mover,
  moverUsuarios,
  moverParametros,
  moverQuimicos,
  moverPerfil,
  reloadData,
  render,
}) {
  const navigate = useNavigate("");

  const [habilitar, setHabilitar] = useState(false);

  //Datos para mostrar en la modal
  const [datosRow, setDatosRows] = useState("");

  const [openAlerta, setOpenAlerta] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

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
        case 404:
          setOpenAlerta(true);
          setSeverity("error");
          setMessage("Ya hay una asigancion activa");
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

        case 404:
          setOpenAlerta(true);
          setSeverity("error");
          setMessage("Ya hay una asigancion activa");
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
      field: "normativityId",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return params.value === null ? "Manual" : params.value.nameNormativity;
      },
    },

    {
      field: "modifiedBy",
      headerName: "Responsable",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return params?.value?.name || "No name";
      },
    },

    {
      field: "poolId",
      headerName: "Piscina",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => {
        return params.value && params.value.length > 0
          ? params.value[0].name
          : "";
      },
    },

    {
      field: "state",
      headerName: "Estado",
      width: 130,
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
      width: 120,
      headerAlign: "center",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "accion",
      headerName: "Administrar",
      width: 219,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "space-around", width: "90%" }}
        >
          <Tooltip title="Editar">
            <IconButton
              onClick={() => editarPersona(params.row)}
              disabled={params.row.typeValidation === "Norma" ? true : false}
            >
              <EditIcon
                sx={{
                  color:
                    params.row.typeValidation === "Norma" ? "gray" : "green",
                }}
              ></EditIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualizar">
            <IconButton
              onClick={() =>
                navigate(
                  `/verDataParametro?id=${params.row._id}?nombre=${params.row.modifiedBy.name}`
                )
              }
            >
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
    if (data.typeValidation === "Norma") {
      alert("No se puede actulizar una norma ");
      return;
    }

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
          width: { xs: "90%", sm: "90%", md: "90%", lg: "1170px" },
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
      <ModalDataParametros
        data={datosRow}
        open={open}
        close={close}
      ></ModalDataParametros>

      <ModalUpdateParametros
        render={render}
        data={datosRow}
        open={openUpdate}
        close={() => setopenUpdate(false)}
      ></ModalUpdateParametros>
      <Alertas
        open={openAlerta}
        mensaje={message}
        severity={severity}
      ></Alertas>
    </Box>
  );
}
