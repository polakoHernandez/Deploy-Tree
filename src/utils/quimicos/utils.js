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

export const OrganizarDataPorFecha = async (
  array,
  fechaInicial,
  fechaFinal
) => {
  let filteredArray = await array.filter((obj) => {
    return obj.fecha >= fechaInicial || obj.fecha <= fechaFinal;
  });

  return filteredArray;
};

export const organizarDataExcel = async (array) => {
  const arrayOrganizado = await array.map((item) => ({
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
