import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Grid, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Close } from "@mui/icons-material";

function ModalData({ data, open, close }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", md: "50%", lg: "50%", xl: "60%" },
    height: { xs: "500px", sm: "500px", md: "500px", lg: "400px", xl: "500px" },
    bgcolor: "background.paper",
    //   border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    overflowY: "scroll",
  };

  const estilos = {
    titulo: {
      // backgroundColor: "blue",
      display: "flex",
      justifyContent: "center",
      fontFamily: "'Nunito Sans', sans-serif",
      fontSize: "25px",
    },

    subtitle: {
      fontFamily: "'Nunito Sans', sans-serif",
      borderBottom: "2px solid rgb(0,164,228)",
    },
  };

  const columns = [
    {
      field: "name",
      headerName: "NOMBRE",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "specification",
      headerName: "Especificación",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "minRange",
      headerName: "Rango minímo",
      width: 120,
      headerAlign: "center",
      type: "number",
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
    {
      field: "maxRange",
      headerName: "Rango máximo",
      width: 120,
      headerAlign: "center",
      type: "number",
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
    {
      field: "maxValueSpecification",
      headerName: "Valor máximo",
      width: 120,
      headerAlign: "center",
      type: "number",
      renderCell: (params) =>
        params.value === null || params.value === undefined ? 0 : params.value,
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid xs={12}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton onClick={() => close()}>
                  <Close></Close>
                </IconButton>
              </Box>
            </Grid>
            <Typography sx={estilos.titulo}>Datos de la norma</Typography>
            <Box
              sx={{
                // backgroundColor: "gray",
                width: { xs: "100%", sm: "100%", md: "100%" },
                marginLeft: { xs: "0", sm: "0", md: "0" },
                height: { xs: "93%", sm: "93%", md: "20%" },
                overflowY: "scroll",
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>Nombre</Typography>
                  <Typography>{data.nameNormativity}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>Tipo de Agua</Typography>
                  <Typography>{data.typeOfWater}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>Descripción</Typography>
                  <Typography>{data.description}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography sx={estilos.subtitle}>
                    Fecha de creación
                  </Typography>
                  <Typography>
                    {new Date(data.createAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                // backgroundColor: "red",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                marginBottom: "10px",
              }}
            >
              <DataGrid
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%",
                    xl: "711px",
                  },
                }}
                rows={data.parameter}
                columns={columns.map((col) => ({
                  ...col,
                  headerClassName: "custom-header",
                }))}
                // loading={cargando}
                getRowId={(data) => data._id}
                getRowClassName={
                  (params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                      ? "even-row" // Clase para índices pares
                      : "odd-row" // Clase para índices impares
                }
                getCellClassName={(params) => "cell"}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalData;
