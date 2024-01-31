import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import DataGridDemo from "../../Componentes/General/Tabla";
import { Box, Typography } from "@mui/material";
import ModalGeneral from "../../Componentes/General/Modal";

function ListaDeUsuarios() {
  document.body.style.overflow = "scroll";
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(false);
  // Funcion para listar todos los usuarios

  // Estados para recargar los datos
  const [reload, setReload] = useState(false);

  const listarUsuarios = async () => {
    setCargando(true);
    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        "https://pool-api-treea.vercel.app/v1/users",
        {
          method: "GET",
          headers: {
            Accpet: "Application/json",
            "x-token": tokenSend,
          },
        }
      );

      switch (response.status) {
        case 401:
          setCargando(false);
          setOpenModal(true);
          break;

        case 200:
          const responeData = await response.json();

          setData(responeData.users);
          setCargando(false);
          break;
      }
    } catch (error) {
      setCargando(false);
      setOpenModal(true);
    }
    setCargando(false);
  };

  //Mover la tabla con Usuario
  const moverTabla = () => {
    setMover(!mover);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaUsuarios = () => {
    setMover(false);
    setMoverUsuarios(!moverUsuario);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaParametros = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(!moverParametros); //
    setMoverQuimicos(false);
    setMoverPerfil(false);
  };

  const moverTablaQuimicos = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(!moverQuimicos);
    setMoverPerfil(false);
  };

  const moverTablaPerfil = () => {
    setMover(false);
    setMoverUsuarios(false);
    setMoverParametros(false);
    setMoverQuimicos(false);
    setMoverPerfil(!moverPerfil);
  };

  const handleReloadData = () => {
    // Set reload flag to true to trigger data reload in DataGridDemo
    setReload(true);
  };

  const animationStyles = {
    mainBox: {
      // backgroundColor: "pink",
      // height: "100vh",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },
  };

  useEffect(() => {
    listarUsuarios();

    setReload(false); // Reset reload flag
  }, [reload]);

  return (
    <Box sx={{ overflowX: "hidden", height: "600px" }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>
      <Box
        sx={{
          overflowX: "hidden",
          height: "100%",
          ...animationStyles.mainBox,
          // backgroundColor: "red",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <Typography
            sx={{
              backgroundColor: "rgb(0,164,228)",
              width: { xs: "35%", sm: "25%", md: "20%", lg: "15%" },
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px 0px 0px 0px",
              color: "rgb(255,255,255)",
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            Lista de usuarios
          </Typography>
        </Box>
        <DataGridDemo
          data={data || ""}
          cargando={cargando}
          mover={mover}
          moverUsuarios={moverUsuario}
          moverParametros={moverParametros}
          moverQuimicos={moverQuimicos}
          moverPerfil={moverPerfil}
          reloadData={handleReloadData}
        ></DataGridDemo>
      </Box>

      <ModalGeneral
        open={openModal}
        mensaje1="UPS!"
        mensaje2="Su Sesión Ha Expirado"
      ></ModalGeneral>
    </Box>
  );
}

export default ListaDeUsuarios;
