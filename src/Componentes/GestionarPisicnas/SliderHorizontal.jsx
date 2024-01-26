import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import Slider from "react-slick";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import "../../Estilos/General/SliderHorizontal.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderHorizontal({ data, obtenerId }) {
  //*This funcnion returne me the arrows for the carrusel
  const NextArrow = (props) => {
    const { style, onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          ...style,
          position: "absolute",
          right: "0px",
          top: "140px",
          color: "black",
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    );
  };

  //*This funcnion returne me the arrows for the carrusel
  const PrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          ...style,
          position: "absolute",
          top: "141.5px",
          color: "white",
          zIndex: "99",
          color: "black",
        }}
      >
        <ArrowBackIos />
      </IconButton>
    );
  };

  //*seetings for the carrusel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  //*Styles ofr this component
  const styles = {
    cardStyle: {
      width: { xs: "70%", sm: "40%" },
      marginLeft: { xs: "15%", sm: "30%" },
      height: "300px",
      backgroundColor: "rgb(0,164,228)",
      color: "white",
    },

    typographyStyle: {
      fontFamily: "'Nunito Sans', sans-serif",
      display: "flex",
      justifyContent: "center",
    },

    boxImage: {
      width: "100%",
      height: "250px",
    },
  };

  return (
    <div className="container-carrusel">
      <Slider {...settings} className="carrusel">
        {data.pools.map((pool) => (
          <Box className="container-card" key={pool._id}>
            <Card
              sx={styles.cardStyle}
              onClick={() => obtenerId(pool._id)}
              id={pool._id}
            >
              <CardActionArea>
                <Box sx={{ ...styles.boxImage }}>
                  <img src={pool.photo} className="img-pools"></img>
                </Box>
                <CardContent>
                  <Typography sx={styles.typographyStyle}>
                    {pool.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Slider>
    </div>
  );
}

export default SliderHorizontal;
