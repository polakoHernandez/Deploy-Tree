import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import { Box, Typography, Button } from "@mui/material";
import TablaVerParametros from "../../Componentes/Parametros/TablaVerParametros";
import { useNavigate } from "react-router-dom";
import { organizarDataParametros } from "../../utils/parametros/utils.js";
import { Description } from "@mui/icons-material";
import ModalReporte from "../../Componentes/Parametros/ModalReporte.jsx";
function VerParamtrosPiscinas() {
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

  const [render, setRender] = useState(0);

  const navigate = useNavigate();

  //*Estado para guardar la data organizada
  const [dataOrganizada, setDataOrganizada] = useState("");

  //*Estado para mostrar la modal reporte
  const [showRepor, setShowReport] = useState(false);

  // Estados para recargar los datos
  const [reload, setReload] = useState(false);

  const listarUsuarios = async () => {
    setCargando(true);
    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/parameterizations",
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
          console.log(responeData);
          organizarDataParametros(responeData.parameterizations).then(
            (respuesta) => {
              setDataOrganizada(respuesta);
            }
          );

          setData(responeData.parameterizations);
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

  useEffect(() => {
    listarUsuarios();
  }, [render]);

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
        <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
          <Box
            sx={{
              width: { xs: "90%", sm: "90%", md: "90%", lg: "1170px" },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={data === "" ? true : false}
              endIcon={<Description></Description>}
              onClick={() => setShowReport(true)}
            >
              Generar reporte
            </Button>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(0,164,228)",
                color: "white",
                fontFamily: "'Nunito Sans', sans-serif",
                width: "150px",
                height: "40px",
                borderRadius: "5px 0px 0px 0px",
              }}
            >
              Parámetros
            </Typography>
          </Box>
        </Box>

        <TablaVerParametros
          render={setRender}
          data={data || ""}
          cargando={cargando}
          mover={mover}
          moverUsuarios={moverUsuario}
          moverParametros={moverParametros}
          moverQuimicos={moverQuimicos}
          moverPerfil={moverPerfil}
          reloadData={handleReloadData}
        ></TablaVerParametros>
      </Box>
      <ModalReporte
        data={dataOrganizada}
        open={showRepor}
        close={() => setShowReport(false)}
      ></ModalReporte>
    </Box>
  );
}

export default VerParamtrosPiscinas;
