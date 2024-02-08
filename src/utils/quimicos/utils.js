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
