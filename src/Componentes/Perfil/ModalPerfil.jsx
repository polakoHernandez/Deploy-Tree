import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { listarUsuario } from "../../services/usuario/sevices";
import styles from "../../Estilos/Usuarios/MiPerfil";
import Avatar from "@mui/material/Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", md: "70%", lg: "60%" },
  height: { xs: "500px", sm: "500px", md: "400px", lg: "400px" },
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalAjustar({ open, close }) {
  const [data, setData] = useState("");

  const catchDataUsuario = () => {
    listarUsuario().then((res) => {
      console.log(res);

      switch (res.status) {
        case 200:
          console.log(res);
          setData(res.respuesta.userID);
          return;

        case 401:
          return;

        case 500:
          return;
      }
    });
  };

  useEffect(() => {
    catchDataUsuario();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid
              container
              sx={{
                width: "100%",
                height: "100%",
                paddingLeft: "30px",
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                  <IconButton onClick={() => close()}>
                    <Close></Close>
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ ...styles.tittle }}>Mi perfil</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={6} sx={{ cursor: "pointer" }}>
                <motion.div
                  initial={{ opacity: 0, cursor: "pointer" }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Typography sx={{ ...styles.typos }}>Documento</Typography>
                    <Typography>{data?.ID}</Typography>
                  </motion.div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ cursor: "pointer" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Typography sx={{ ...styles.typos }}>Nombre</Typography>
                    <Typography>{data?.name}</Typography>
                  </motion.div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ cursor: "pointer" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Typography sx={{ ...styles.typos }}>Apellido</Typography>
                    <Typography>{data?.lastName}</Typography>
                  </motion.div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ cursor: "pointer" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Typography sx={{ ...styles.typos }}>Correo</Typography>
                    <Typography>{data?.email}</Typography>
                  </motion.div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ cursor: "pointer" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Typography sx={{ ...styles.typos }}>Rol</Typography>
                    <Typography>{data?.role}</Typography>
                  </motion.div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ cursor: "pointer" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Typography sx={{ ...styles.typos }}>Teléfono</Typography>
                    <Typography>{data?.cellPhone}</Typography>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

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
