import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Slider from "react-slick";
import pool from "../../assets/pool1.jpg";
import "../../Estilos/General/SliderVertical.css";

function SliderVertical({ data, obtenerId, posicion }) {
  const sliderRef = useRef(null);

  const NextArrow = (props) => {
    const { style, onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          ...style,
          position: "absolute",
          right: "42.78%",
          top: "-45px",
          color: "black",
        }}
      >
        <ExpandLess sx={{ fontSize: "40px" }} />
      </IconButton>
    );
  };

  const PrevArrow = (props) => {
    const { style, onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          ...style,
          position: "absolute",
          bottom: "-50px",
          left: "45%",
          zIndex: "99",
          color: "black",
        }}
      >
        <ExpandMore sx={{ fontSize: "40px" }} />
      </IconButton>
    );
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(posicion);
    }
  }, [posicion]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    initialSlide: posicion,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const styles = {
    slyderContainer: {
      position: "absolute",
      width: "35%",
      height: "100%",
      paddingTop: "20vh",
      left: "-2%",
    },

    cardStyle: {
      width: { xs: "90%", sm: "40%", md: "90%", lg: "70%" },
      marginLeft: { xs: "15%", sm: "30%", md: "5%", lg: "15%" },
      height: { xs: "100px", sm: "250px", md: "350px" },
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
      height: "300px",
    },
  };

  return (
    <Box sx={{ ...styles.slyderContainer }}>
      <Slider {...settings} ref={sliderRef}>
        {data.poolCreatedByUser.map((pool, index) => (
          <Box key={pool._id}>
            <Card
              sx={styles.cardStyle}
              onClick={() => {
                obtenerId(pool._id);
              }}
              id={index}
            >
              <CardActionArea>
                <Box sx={{ ...styles.boxImage }}>
                  <img
                    src={pool.photo}
                    className="img-pools"
                    alt={`pool-${index}`}
                  />
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
    </Box>
  );
}

export default SliderVertical;
