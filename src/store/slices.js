import { createSlice } from "@reduxjs/toolkit";

export const origenSlice = createSlice({
  name: "UnValor",
  initialState: { miNombre: "Luva", edad: 18 },
  reducers: {
    guardarMinombre: (state, action) => {
      state.miNombre = action.payload;
    },
  },
});

export const { guardarMinombre } = origenSlice.actions;
