import { configureStore } from "@reduxjs/toolkit";
import { origenSlice } from "./slices";

export default configureStore({
  reducer: {
    //Vamos a poner todos los valores que vamos a tener
    unValor: origenSlice.reducer,
  },
});
