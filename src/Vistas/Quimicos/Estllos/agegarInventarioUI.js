const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
    // backgroundColor: "red",
  },

  container: {
    // backgroundColor: "blue",
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "5px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  encabezado: {
    // backgroundColor: "gray",
    height: "10%",
    display: "flex",
    justifyContent: "space-between",
  },

  tabs: {
    // backgroundColor: "red",
    width: { xs: "70%", sm: "50%", md: "30%" },
    display: "flex",
    justifyContent: "space-between",
  },

  actual: {
    backgroundColor: "rgb(0, 164, 228)",
    width: { xs: "20%", sm: "20%", md: "10%" },
    display: "flex",
    height: "40px",
    marginTop: "10.5px",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "'Nunito Sans', sans-serif",
    borderRadius: "5px 0px 0px 0px",
  },

  formulario: {
    backgroundColor: "white",
    height: "85%",
    backgroundColor: "white",
    // overflowY: "scroll",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 5px 5px 0px black",
    border: "1px solid black",
    overflowY: "scroll",
  },

  containerDatos: {
    // backgroundColor: "red",
    height: "85%",
  },
  containerFlechas: {
    // backgroundColor: "blue",
    height: "15%",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      color: "rgb(0,164,228)",
    },
  },

  formularioUno: {
    width: { xs: "100%", sm: "100%", md: "50%" },
    height: { xs: "700px", sm: "250%", md: "100%" },
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "60px",
    overflowY: "scroll", // Corrige la ortografía aquí  },
    // backgroundColor: "blue",
  },

  data: {
    display: { xs: "none", sm: "none", md: "block" },
    marginTop: { xs: "50px", sm: "50px", md: "0px" },
    width: { xs: "100%", sm: "100%", md: "50%" },
    height: { xs: "30%", sm: "10%" },
    // backgroundColor: "pink",
  },

  button: {
    backgroundColor: "rgb(0,164,228)",
    width: "95%",
    marginLeft: "2.5%",
    "&:hover": {
      backgroundColor: "rgb(0,164,228)",
    },
  },

  azul: {
    backgroundColor: "rgb(0,164,228)",
    width: "90%",
    height: { xs: "100px", sm: "100px", md: "200px", lg: "200px" },
    borderRadius: "15px",
    marginTop: "5px",
    marginLeft: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Corrección aquí  },
    color: "white",
  },

  tittle: {
    fontFamily: "'Nunito Sans', sans-serif",
  },

  dibujo: {
    // backgroundColor: "red",
    width: "90%",
    height: "50%",
    borderRadius: "15px",
    marginTop: "5px",
    marginLeft: "5%",
  },
};

export default styles;
