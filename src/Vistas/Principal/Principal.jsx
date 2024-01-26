import React, { useEffect, useState } from "react";
import SearchAppBar from "../../Componentes/General/NavBar";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import imagen from "../../assets/principal.svg";
import "../../Estilos/Principal/principal.css";
import Push from "push.js";
import { useNavigate } from "react-router-dom";

import TemporaryDrawer from "../../Componentes/General/SideBar";
function Principal() {
  const navigate = useNavigate();

  const notificacion = () => {
    Push.create("TREEA ENTERPRISE", {
      body: "Tienes nuevas notificaciones",
      // icon: logo,
      timeout: 4000,
      onClick: function () {
        navigate("/verNotificaciones");
      },
    });
  };

  const listarNotificaciones = async () => {
    try {
      const tokenSend = localStorage.getItem("clave");
      const respuesta = await fetch(
        "https://treea-piscinas-api.vercel.app/v1/notifications-manager",
        {
          method: "GET",
          headers: {
            Accpet: "Application/json",
            "x-token": tokenSend,
          },
        }
      );

      switch (respuesta.status) {
        case 200:
          const respo = await respuesta.json();
          console.log(respo.notifications);
          notificacion();

          break;

        case 401:
          const response = await respuesta.json();
          console.log(response);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarNotificaciones(); //
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <SearchAppBar></SearchAppBar>
      <Grid item container sx={{ overflow: "hidden" }}>
        <Grid
          xs={12}
          sm={12}
          md={6}
          sx={{ height: "80vh", overflowX: "hidden" }}
        >
          <Box
            sx={{
              fontFamily: "'Nunito Sans', sans-serif",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginTop: { xs: "-120px", sm: "0" },
            }}
          >
            <Box sx={{}}>
              <Typography
                sx={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: { xs: "36px", sm: "40px" },
                }}
              >
                Ahora puedes iniciar a
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  color: "blcak",
                  fontSize: { xs: "33px", sm: "40px" },
                }}
              >
                <span style={{ color: "rgb(0,164,228)" }}>administrar</span> tus
                piscinas,
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: { xs: "37px", sm_: "40px" },
                }}
              >
                selecciona una opción
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            height: "80vh",

            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "end" },
            paddingLeft: { xs: "0", sm: "0", md: "60px" },
            marginTop: { xs: "-350px", sm: "0" },
          }}
        >
          <img src={imagen} className="img-principal"></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Principal;
