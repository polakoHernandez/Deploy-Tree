export const opcionesInputs = (array) => {
  const arrayNombre = array.map((item) => ({
    label: item.name,
  }));

  return arrayNombre;
};

export const obtenerId = (array, nombre) => {
  const item = array.find((item) => item.name === nombre);
  return item._id;
};

export const obtenerDataInputs = (name, value, state) => {
  setState((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// export const OrganizarDataPorFecha = (array, fechaInicial, fechaFinal) => {
//   let filteredArray = array.filter((obj) => {
//     return obj.fecha >= fechaInicial && obj.fecha <= fechaFinal;
//   });

//   console.log({ MIDATA: filteredArray });
// };

export const organizarDataExcel = (array, fechaInicial, fechaFinal) => {
  let filteredArray = array.filter((obj) => {
    return obj.fecha >= fechaInicial && obj.fecha <= fechaFinal;
  });

  console.log(filteredArray);
  const arrayOrganizado = filteredArray.map((item) => ({
    Fecha: new Date(item.fecha).toLocaleDateString(),
    Responsable: item.responsable,
    Producto: item.productoQuimico,
    Lote: item.lote,
    Entrada: item.entrada,
    cantidad_Dosificada: item.cantidadDosificada,
    Saldo: item.cantidadDisponible,
    Cantidad_Disponible: item.tipo,
  }));

  return arrayOrganizado;
};
