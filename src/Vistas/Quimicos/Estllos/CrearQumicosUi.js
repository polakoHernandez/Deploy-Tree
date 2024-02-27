const styles = {
  generalContainer: {
    overflowX: "hidden",
    height: "100vh",
    // backgroundColor: "red",
  },

  container: {
    // backgroundColor: "pink",
    width: "80%",
    marginTop: "10px",
    marginLeft: "10%",
    height: "100%",
  },

  encabezado: {
    // backgroundColor: "blue",
    width: "110%",
    height: "40px",
    display: "flex",
    justifyContent: "end",
    aligItems: "center",
    marginLeft: "-5%",
  },

  containerFormulario: {
    backgroundColor: "white",
    width: "110%",
    height: "85%",
    marginLeft: "-5%",
    overflowY: "scroll",
    // backgroundColor: "pink",
    borderRadius: "5px",
    boxShadow: "0px 5px 5px 0px black",
    border: "1px solid black",
  },

  textoEncabezado: {
    backgroundColor: "rgb(0,164,228)",
    width: { xs: "40%", sm: "40%", md: "30%", lg: "20%" },

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "white",
    borderRadius: "5px 0px 0px 0px",
  },

  boxFormulario: {
    // backgroundColor: "red",
    width: "95%",
    marginLeft: "2.5%",
    height: "100%",
    overflowY: "scroll",
  },

  button: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "rgb(0, 164, 228)",
    "&:hover": {
      backgroundColor: "rgb(0,164,228)",
    },
  },
};

export default styles;
