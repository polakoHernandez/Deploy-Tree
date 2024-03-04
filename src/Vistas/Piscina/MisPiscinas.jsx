import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SearchAppBar from "../../Componentes/General/NavBar";
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "../../Componentes/General/BackDrop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SliderHorizontal from "../../Componentes/General/SliderHorizontal";
import SliderVertical from "../../Componentes/General/SliderVertical";
import { useLocation } from "react-router-dom";
import InputSelect from "../../Componentes/General/InputSelect";
import { Pool } from "@mui/icons-material";
import circular from "../../assets/imagePool/PiscinaCircular.png"
import rectangular from "../../assets/imagePool/PiscinaRectangular.png"
import ovalada from "../../assets/imagePool/PiscinaOvalada.png"
import "../../Estilos/Piscina/misPiscinas.css"
import * as services from "../../services/pisicinas/misPisicnas/services"
import InputSelectPool from "../../Componentes/General/InputSelectPool";

function MisPiscinas() {
  const location = useLocation();
  const idProp = new URLSearchParams(location.search).get("idProp");
  const [data, setData] = useState("");
  const [pool, setPool] = useState("");
  const [cargando, setCargando] = useState(false);
  const [listaNombresPiscinas, setListaNombresPiscinas] = useState([]);
  const [posicion, setPosicion] = useState(0)
  //   Estados para mover el fromualrio
  const [mover, setMover] = useState(false); //MOvercon Piscina
  const [moverUsuario, setMoverUsuarios] = useState(false);
  const [moverParametros, setMoverParametros] = useState(false);
  const [moverQuimicos, setMoverQuimicos] = useState(false);
  const [moverPerfil, setMoverPerfil] = useState(false);

  //   Fnciones para mover el romulario
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

  const animationStyles = {
    mainBox: {
      // backgroundColor: "pink",
      overflowY: {xs:"scroll", sm:"scroll", md:"scroll", lg:"hidden", xl:"hidden"},
      height: "100vh",
      transition: "ease 0.3s",
      transform:
        mover || moverUsuario || moverParametros || moverQuimicos || moverPerfil
          ? "translateY( 190px)"
          : "translateY(0px)",
    },
  };

  const listaDeMisPiscinas = async () => {
    const idUser = localStorage.getItem("id");
    const rol = localStorage.getItem("rol")
    setCargando(true);


    if(rol  ==="GERENTE"){


      services.listarPisicnas().then((res)=>{
        console.log(res)
        

        switch (res.status) {
          case 200:

                setData(res)
                const nombrePiscinas = res?.poolCreatedByUser?.map(
                  (pisicina) =>( 
                    {
                      label: pisicina.name,
                    },
                  
                ));
                setListaNombresPiscinas(nombrePiscinas);
                    setCargando(false)
            break;
        
          default:
            break;
        }
        
      })


        return

    }



    try {
      const tokenSend = localStorage.getItem("clave");
      const response = await fetch(
        `https://treea-piscinas-api.vercel.app/v1/pool-by-user/${idUser}`,
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
          break;

        case 200:
          const responeData = await response.json();
          console.log(responeData)
          console.log(responeData?.poolCreatedByUser);
          const nombrePiscinas = responeData?.poolCreatedByUser?.map(
            (pisicina) =>( 
              {
                label: pisicina.name,
              },
            
          ));
          console.log({ aqui: nombrePiscinas });
          setListaNombresPiscinas(nombrePiscinas);
          setData(responeData);
          setCargando(false);

          break;
      }
    } catch (error) {
      setCargando(false);
    }
    setCargando(false);
  };

 

  const obtenerIdPorNombre = (nombrePiscina) => {
    const respuesta = data?.poolCreatedByUser?.find(
      (element) => element.name === nombrePiscina
    );
  
    if (respuesta) {
      setPool(respuesta);
  
      const index = data.poolCreatedByUser.findIndex(
        (element) => element.name === nombrePiscina
      );
  
      setPosicion(index);
    } else {
      // Handle the case when 'respuesta' is null (element not found)
      console.log(`No pool found with the name ${nombrePiscina}`);
    }
  };
  

  const obetnerId = async (idPool) => {
    const respuesta = data?.poolCreatedByUser?.find(
      (element) => element?._id === idPool
    );
    setPool(respuesta);
  };

  useEffect(() => {
    listaDeMisPiscinas();

 
  }, []);

  return (
    <Box sx={{ ...styles.generalContainer }}>
      <SearchAppBar
        onClick={() => moverTabla()}
        moverUsuario={moverTablaUsuarios}
        moverParametros={moverTablaParametros}
        moverQuimicos={moverTablaQuimicos} //
        moverPerfil={moverTablaPerfil}
      ></SearchAppBar>

      {cargando ? (
        <Backdrop open={cargando}></Backdrop>
      ) : (
        <Box sx={animationStyles.mainBox}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={0}
              sm={0}
              md={4}
              sx={{
                height: "100%",
                display: { xs: "none", sm: "none", md: "flex" },
                // backgroundColor:"red"
              }}
            >
              {data && (
                <SliderVertical
                  posicion={posicion}
                  data={data}
                  obtenerId={obetnerId}
                ></SliderVertical>
                // <ImageSlider data={data} obtenerId={obetnerId}></ImageSlider>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid
                item
                xs={12}
                sx={{
                  width: "100%",
                  // backgroundColor: "red",
                  paddingTop: "10px",
                  height: { xs: "300px", sm: "40vh" },
                  display: { xs: "flex", sm: "flex", md: "none" },
                }}
              >
                {/* <SliderHorizontal
                  data={data}
                  obtenerId={obetnerId}
                ></SliderHorizontal> */}
                {data && (
                  <SliderHorizontal
                    data={data}
                    obtenerId={obetnerId}
                  ></SliderHorizontal>
                )}
              </Grid>
              <Grid item xs={12} sx={{ height: "15%" }}>
                <Box
                  sx={{
                    // backgroundColor: "red",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginTop: { xs: "20px", sm: "200px", md: "0px" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "50%" },
                      height: "100%",
                      // backgroundColor: "cyan",
                      // marginTop: { md: "-px" },
                      marginRight: { md: "5%" },
                    }}
                  >
                    <InputSelectPool
                      value={{label:pool.name || ""} }
                      size="small"
                      label="Buscar piscina"
                      options={listaNombresPiscinas}
                      icon={<Pool></Pool>}
                      placeholder="Selecciones una piscina"
                      onChange={(e)=>{obtenerIdPorNombre(e.target.textContent)                        
                     
                      }}
                    ></InputSelectPool>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ height: "85%" }}>
                <Box
                  sx={{
                    width: { xs: "95%", sm: "95%", md: "90%", lg: "100%" },
                    marginLeft: {
                      xs: "2.5%",
                      sm: "2.5%",
                      md: "5%",
                      lg: "-5%",
                    },
                    marginTop:"-50px",
                    //  backgroundColor: "antiquewhite",
                    height: "45px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "rgb(0,164,228)",
                      height: "40px",
                      width: "150px",
                      borderRadius: "5px 0px 0px 0px",
                      color: "white",
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Nunito Sans', sans-serif",
                      marginTop:"5px"
                    }}
                  >
                    Mis piscinas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    backgroundColor: "white",
                    height: { xs: "62vh", sm: "70vh", md: "63vh", lg:"70vh", xl:"60vh" },
                    width: { xs: "95%", sm: "95%", md: "90%", lg:"100%" },
                    marginLeft: {xs:"2.5%", sm:"2.5%", md:"5%", lg:"-5%"},                    // marginTop:"-60px",
                    borderRadius: "5px",
                    // backgroundColor:"purple",
                    boxShadow: "0px 5px 5px 0px black",
                    border: "1px solid black",
                  }}
                >
                  {/* Seccion de informacion general */}
                  <Box>
                

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Información general
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            // backgroundColor: "red",
                            width: "100%",
                            height: "200px",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "100px",
                          }}
                        >
                          <img src={pool?.photo} className="img-piscina"></img>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Nombre
                        </Typography>
                        <Typography>{pool?.name}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Departamento
                        </Typography>
                        <Typography>{pool?.department}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Ciudad/Municipio
                        </Typography>
                        <Typography>{pool?.city}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Dirección
                        </Typography>
                        <Typography>{pool?.address}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Uso
                        </Typography>
                        <Typography>{pool?.use}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Características
                        </Typography>
                        <Typography>{pool?.typePool}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Temperatura de la piscina (°C)
                        </Typography>
                        <Typography>{pool?.temperature}°C</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Temperatura externa (°C)
                        </Typography>
                        <Typography>{pool?.externalTemperature}°C</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Estructura
                        </Typography>
                        <Typography>{pool?.category}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Clase de instalación
                        </Typography>
                        <Typography>{pool?.typeInstallation}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Secion de medidas */}
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Medidas
                        </Typography>
                      </Grid>

                      <Grid xs={12}>
                      
                          
                          {pool?.form ==="Rectangular" ?
                            <Box sx={{
                              width:"90%",
                              marginLeft:"5%",
                              height:"400px",
                              // backgroundColor: "cyan",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position:"relative"
                            }}>
                               <Typography sx={{position:"absolute", top:"100px", left:"40%", transform:"rotate(-30deg)"}}>{pool?.height} m</Typography>
                            <Typography sx={{position:"absolute", top:"200px", left:"45%"}}>{pool?.width} m</Typography>
                            <Typography  sx={{position:"absolute", top:"320px", left:"55%"}}>A. {pool?.depth?.depthA} m</Typography>
                            <Typography  sx={{position:"absolute", top:"280px", left:"65%"}}>B. {pool?.depth?.depthB} m</Typography>
                            <Typography sx={{position:"absolute", top:"230px", left:"75%"}}>C. {pool?.depth?.depthC} m</Typography>
                          <img src={rectangular} className="img_rectangurlar"></img>
                          </Box>
                          :
                          pool?.form ==="Circular"?
                          <Box sx={{
                            width:"90%",
                            marginLeft:"5%",
                            height:"400px",
                            // backgroundColor: "cyan",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position:"relative"
                          }}>
                             {/* <Typography sx={{position:"absolute", top:"110px", left:"35%"}}>{pool?.height} m</Typography> */}
                          <Typography sx={{position:"absolute", top:"180px", left:"50%"}}>{pool?.width} m</Typography>
                          <Typography  sx={{position:"absolute", top:"270px", left:"20%"}}>A. {pool?.depth?.depthA} m</Typography>
                            <Typography  sx={{position:"absolute", top:"190px", left:"20%"}}>B. {pool?.depth?.depthB} m</Typography>
                            <Typography sx={{position:"absolute", top:"120px", left:"20%"}}>C. {pool?.depth?.depthC} m</Typography>                                 
                              <img src={circular} className="img_rectangurlar"></img>
                          </Box>
                          :
                          pool?.form ==="Ovalada"? 
                          <Box sx={{
                            width:"90%",
                            marginLeft:"5%",
                            height:"400px",
                            // backgroundColor: "cyan",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position:"relative"
                          }}>
                             <Typography sx={{position:"absolute", top:"100px", left:"40%", transform:"rotate(-30deg)"}}>{pool?.height} m</Typography>
                          <Typography sx={{position:"absolute", top:"180px", left:"46%"}}>{pool?.width} m</Typography>
                          <Typography  sx={{position:"absolute", top:"320px", left:"55%"}}>A. {pool?.depth?.depthA} m</Typography>
                            <Typography  sx={{position:"absolute", top:"260px", left:"63%"}}>B. {pool?.depth?.depthB} m</Typography>
                            <Typography sx={{position:"absolute", top:"200px", left:"68%"}}>C. {pool?.depth?.depthC} m</Typography>         
                              <img src={ovalada} className="img_rectangurlar"></img>
                          </Box>
                          :""
                          }
                        
                      </Grid>            
                                            
                       <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad mínima (m)
                        </Typography>
                        <Typography>
                          {pool?.minDepth === undefined ? "" : pool?.minDepth}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad máxima (m)
                        </Typography>
                        <Typography>
                          {pool?.maxDepth === undefined ? "" : pool?.maxDepth}
                        </Typography>
                      </Grid>
                    
                    

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Profundidad media (m)
                        </Typography>
                        <Typography>
                          {pool?.meanDepth === undefined ? "" : pool?.meanDepth}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Volumen (m³)
                        </Typography>
                        <Typography>
                          {pool?.poolVolumR === undefined ? "" : pool?.poolVolumR}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Volumen (L)
                        </Typography>
                        <Typography>
                          {pool?.numberLitersR === undefined ? "" : pool?.numberLitersR}
                        </Typography>
                      </Grid>

                    </Grid>
                  </Box>

                  {/* Seccion de detalles de operacion */}
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Detalles de operación
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Sistema de operación
                        </Typography>
                        <Typography>{pool?.systemOperation}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                         Caudal (L/seg)
                        </Typography>
                        <Typography>{pool?.caudal}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Climatizado
                        </Typography>
                        <Typography>{pool?.airConditioned}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          P. Recirculación mínima (h)
                        </Typography>
                        <Typography>{pool?.recirculationPeriod?.min}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          P. Recirculación máximo (h)
                        </Typography>
                        <Typography>{pool?.recirculationPeriod?.max}</Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          Dosificación automática
                        </Typography>
                        <Typography>{pool?.autoDosing}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Seccion de equipos */}
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Sección de filtros
                        </Typography>
                      </Grid>

                      <Box
                        sx={{
                          ...styles.boxListadoFiltros,
                        }}
                      >
                        {pool === "" ? (
                          <Typography>No data</Typography>
                        ) : (
                          pool?.filters.map((elemento, index) => (
                            <Grid
                              container
                              marginTop={1}
                              marginBottom={1}
                              key={index}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  sx={{
                                    ...styles.fontTypografy,
                                    width: "20%",
                                    marginLeft: "40%",
                                    borderBottom: "2px solid black",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Filtro {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Filtro
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filter}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Altura del filtro (m)
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterBedHeight}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Capacidad del filtro (L)
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterCapacity}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Diámetro del filtro (m)
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterDiameter}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Altura del lecho filtrante (m)
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.filterHeight}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))
                        )}
                      </Box>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Sección de bombas
                        </Typography>
                      </Grid>

                      <Box
                        sx={{
                          ...styles.boxListadoFiltros,
                          // backgroundColor: "red",
                        }}
                      >
                        {pool === "" ? (
                          <Typography></Typography>
                        ) : (
                          pool?.pumps?.map((elemento, index) => (
                            <Grid
                              key={index}
                              container

                              // sx={{ backgroundColor: "blue" }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  sx={{
                                    ...styles.fontTypografy,
                                    width: "20%",
                                    marginLeft: "40%",
                                    borderBottom: "2px solid black",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Bomba {index + 1}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  // backgroundColor: "pink",
                                  display: "flex",
                                  justifyContent: "center",
                                  marginBottom:"30px"
                                }}
                              >
                                <img
                                  src={elemento.platePhoto}
                                  style={{
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "5px",
                                  }}
                                ></img>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Marca
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.pumpBrand}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Caudal (L/seg)
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.pumpFlow}
                                </Typography>
                              </Grid>

                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Referencia
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.referencePump}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Ficha técnica
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <a
                                    href={elemento.dataSheetPump}
                                    target="_blank"
                                  >
                                    <IconButton>
                                      <PictureAsPdfIcon
                                        sx={{
                                          color: "red",
                                        }}
                                      ></PictureAsPdfIcon>
                                    </IconButton>
                                  </a>
                                </Box>
                              </Grid>
                            </Grid>
                          ))
                        )}
                      </Box>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            width: "90%",
                            marginLeft: "5%",
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "22px",
                            borderBottom: "3px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Sección de Calentador
                        </Typography>
                      </Grid>
                      {pool === "" ? (
                        <></>
                      ) : (
                        <>
                          {pool?.heaters?.map((elemento, index) => (
                            <Grid container key={index}>
                              <Grid item xs={12}>
                                <Typography
                                  sx={{
                                    ...styles.fontTypografy,
                                    width: "20%",
                                    marginLeft: "40%",
                                    borderBottom: "2px solid black",
                                    marginBottom: "5px",
                                    marginTop: "10px"
                                  }}
                                >
                                  Calentador {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Referencia
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.heaterReference}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Marca
                                </Typography>
                                <Typography sx={{ ...styles.fontTexto }}>
                                  {elemento.heaterBrand}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography sx={{ ...styles.fontTypografy }}>
                                  Ficha técnica
                                </Typography>
                                <Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <a
                                      href={elemento.dataSheetHeater}
                                      target="_blank"
                                    >
                                      <IconButton>
                                        <PictureAsPdfIcon
                                          sx={{
                                            color: "red",
                                          }}
                                        ></PictureAsPdfIcon>
                                      </IconButton>
                                    </a>
                                  </Box>
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                        </>
                      )}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default MisPiscinas;

const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
    // backgroundColor: "red",
    overflowY: { xs: "scroll", sm: "scroll", md: "scroll", lg: "scroll" },
    // backgroundColor: "red",
  },

  fontTypografy: {
    fontFamily: "'Nunito Sans', sans-serif",
    display: "flex",
    justifyContent: "center",
  },

  fontTexto: {
    display: "flex",
    justifyContent: "center",
  },

  boxListadoFiltros: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};
