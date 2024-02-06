import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import DataGridDemo from "../../Componentes/General/Tabla";
import { Box, Typography } from "@mui/material";
import ModalGeneral from "../../Componentes/General/Modal";
import TablaVerParametros from "../../Componentes/Parametros/TablaVerParametros";
import { useNavigate } from "react-router-dom";
import TablaListaQuimicos from "../../Componentes/Quimicos/TablaListaQuimicos";

function ListaQuimicos() {
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

  const navigate = useNavigate();

  // Estados para recargar los datos
  const [reload, setReload] = useState(false);

  const listarUsuarios = async () => {
    setCargando(true);
    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/chemical-products",
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
          console.log(await response.json());
          break;

        case 200:
          const responeData = await response.json();
          console.log(responeData?.chemicalProducts);

          setData(responeData?.chemicalProducts);
          setCargando(false);
          break;
      }
    } catch (error) {
      setCargando(false);
      setOpenModal(true);
      console.log(error);
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
    <Box
      sx={{
        overflowX: { xs: "scroll", sm: "scroll", md: "hidden" },
        height: "100vh",
      }}
    >
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
          paddingBottom: "50px",
          width: "95%",
          height: "500px",
          marginLeft: "2.5%",
          position: "relative",
          transition: "ease 0.6s",
          transform:
            mover ||
            moverUsuario ||
            moverParametros ||
            moverQuimicos ||
            moverPerfil
              ? "translateY(190px)"
              : "translateY(45px)",
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
            right: { xs: "5%", sm: "5%", md: "5%", lg: "5%", xl: "14.2%" },
            fontFamily: "'Nunito Sans', sans-serif",
            width: "150px",
            height: "40px",
            borderRadius: "5px 0px 0px 0px",
          }}
        >
          Químicos
        </Typography>

        <TablaListaQuimicos
          data={data || ""}
          cargando={cargando}
          mover={mover}
          moverUsuarios={moverUsuario}
          moverParametros={moverParametros}
          moverQuimicos={moverQuimicos}
          moverPerfil={moverPerfil}
          reloadData={handleReloadData}
        ></TablaListaQuimicos>
      </Box>
    </Box>
  );
}

export default ListaQuimicos;