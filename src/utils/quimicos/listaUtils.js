export const organizarDataExcel = async (array) => {
  const arrayOrganizado = await array.map((item) => ({
    Nombre: item?.name,
    Función: item?.chemicalFunction,
    Proveedor: item?.supplier,
    Cantidad: item?.availableQuantity,
  }));

  return arrayOrganizado;
};
