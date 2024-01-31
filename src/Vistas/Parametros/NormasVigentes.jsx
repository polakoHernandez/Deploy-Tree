// import React from "react";

// function VerParamtrosPiscinas() {
//   return <div>VerParamtrosPiscinas</div>;
// }

// export default VerParamtrosPiscinas;

import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import DataGridDemo from "../../Componentes/General/Tabla";
import { Box, Typography } from "@mui/material";
// import "../../Estilos/Usuarios/ListaDeUsuarios.css";
import ModalGeneral from "../../Componentes/General/Modal";
import TablaVerParametros from "../../Componentes/Parametros/TablaVerParametros";
import TablaNormasVigentes from "../../Componentes/Parametros/TablaNormasVigentes";

function NormasVigentes() {
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
        "https://pool-api-treea.vercel.app/v1/normativities",
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

          console.log(responeData.normativities);
          setData(responeData?.normativities);
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

  useEffect(() => {
    listarUsuarios();

    setReload(false); // Reset reload flag
  }, [reload]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>
      <Box
        sx={{
          // backgroundColor: "red",
          width: "95%",
          marginLeft: "2.5%",
          marginTop: "600px",
          position: "relative",
          //backgroundColor: "red",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "rgb(0,164,228)",
            color: "white",
            position: "absolute",
            top: "-40px",
            right: { xs: "17.5%", sm: "17.5%", md: "17.5%", lg: "17.5%" },
            fontFamily: "'Nunito Sans', sans-serif",
            width: "150px",
            height: "40px",
            borderRadius: "5px 0px 0px 0px",
            transition: "ease 0.6s",
            transform:
              mover ||
              moverUsuario ||
              moverParametros ||
              moverQuimicos ||
              moverPerfil
                ? "translateY(-250px)"
                : "translateY(-420px)",
          }}
        >
          Parámetros
        </Typography>

        <TablaNormasVigentes
          data={data || ""}
          cargando={cargando}
          mover={mover}
          moverUsuarios={moverUsuario}
          moverParametros={moverParametros}
          moverQuimicos={moverQuimicos}
          moverPerfil={moverPerfil}
          reloadData={handleReloadData}
        ></TablaNormasVigentes>
      </Box>

      <ModalGeneral
        open={openModal}
        mensaje1="UPS!"
        mensaje2="Su Sesión Ha Expirado"
      ></ModalGeneral>
    </div>
  );
}

export default NormasVigentes;
