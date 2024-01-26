import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ALERTA from "../../assets/alerta.png";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

const Carrusel = ({ data, obtenerId }) => {
  const contenido = [
    {
      contenido: "Mantenimiento",
      img: ALERTA,
    },
    {
      contenido: "Diseñamos",
      img: ALERTA,
    },
    {
      contenido: "Mantenimiento",
      img: ALERTA,
    },
    {
      contenido: "Evaluamos el ph",
      img: ALERTA,
    },
  ];

  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: 0,
  };

  return (
    <div className="container_carrusel">
      <Slider {...settings}>
        {data.poolCreatedByUser.map((pool) => (
          <Card
            onClick={() => obtenerId(pool._id)}
            id={pool._id}
            key={pool._id}
            sx={{
              height: { xs: "180px", sm: "180px" },
              width: { height: { xs: "50px", sm: "50px" } },
            }}
          >
            <CardActionArea sx={{ width: "100%", height: "100%" }}>
              <CardMedia
                sx={{
                  height: "90%",
                }}
              >
                <img src={pool.photo} loading="lazy" className="img-carrusel" />
              </CardMedia>
              {/* <CardContent>
                <h5 className="ocupacion_style">{item.contenido}</h5>
              </CardContent> */}
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default Carrusel;
