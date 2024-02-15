import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { Close, Pool, CloudDownload } from "@mui/icons-material";
import InputGeneral from "../General/InputGeneral";

function ModalReporte({ open, close }) {
  return (
    <motion.div
      initial={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "-100vh",
        left: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{
        top: open ? "0vh" : "-100vh",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "50%",
          height: "320px",
          border: "1px solid black",
          borderRadius: "15px",
        }}
      >
        <Box>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <IconButton onClick={close}>
              <Close></Close>
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Grid>
            <InputGeneral
              type="date"
              label="Fecha inicial"
              icon={<Pool></Pool>}
            ></InputGeneral>
          </Grid>
          <Grid>
            <InputGeneral
              type="date"
              label="Fecha final"
              icon={<Pool></Pool>}
            ></InputGeneral>
          </Grid>
        </Box>
        <Box
          sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
        >
          <Grid>
            <Button
              variant="contained"
              fullWidth
              endIcon={<CloudDownload></CloudDownload>}
            >
              Descargar
            </Button>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
}

export default ModalReporte;
