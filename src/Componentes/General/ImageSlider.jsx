import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ALERTA from "../../assets/alerta.png";
// import "../../Estilos/General/imageSlider.css";

const Carousel = ({ data, obtenerId }) => {
  const [contador, setContador] = useState(0);

  const [maxContador, setMaxContador] = useState(0);

  const incrementar = () => {
    if (contador < maxContador - 1) {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  useEffect(() => {
    // setMaxContador(data.poolCreatedByUser.length - 1);
  }, [data]);
  return (
    <Box
      sx={{
        width: "90%",
        marginLeft: "5%",
        // backgroundColor: "pink",
        marginTop: "0px",
        height: `99%`, // Establecer altura fija
        overflow: "hidden",
        position: "relative",
        marginTop: "10px",
      }}
    >
      <IconButton
        onClick={() => incrementar()}
        sx={{
          position: "absolute",
          top: "0",
          left: "50%",
          color: "white",
          backgroundColor: "gray",
          zIndex: "1",
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton
        onClick={() => decrementar()}
        sx={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          color: "white",
          backgroundColor: "gray",
          zIndex: "1",
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>

      {data.pools.map((pool) => (
        <Card
          onClick={() => obtenerId(pool._id)}
          id={pool._id}
          key={pool._id}
          sx={{
            width: "80%",
            height: "400px",
            marginLeft: "10%",

            transition: "ease 0.3s",
            transform: `translateY(-${contador * 500}px)`,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid black",
            marginTop: "60px",
            marginBottom: "80px",
            cursor: "pointer",
            backgroundColor: "rgb(0,164,228)",

            "&:hover": {
              boxShadow: "2px 5px 5px black",
            },
          }}
        >
          <CardActionArea onClick={() => obtenerId()} sx={{ height: "100%" }}>
            <CardMedia sx={{ height: "85%" }}>
              <img src={pool.photo} alt="" className="img-carrusel" />
            </CardMedia>
            <CardContent>
              <Typography
                sx={{
                  backgroundColor: "rgb(0,164,228)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {pool.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default Carousel;
