export const organizarDataParametros = async (array) => {
  const dataOrganizada = await array.map((item) => ({
    Fecha: item?.createAt,
    Nombre: item?.typeValidation,
    Responsable: `${item?.modifiedBy?.name} ${item?.modifiedBy?.lastName}`,
    Piscina: item?.poolId[0]?.name,
    Estado: item?.state ? "Activo" : "Inactivo",
  }));

  return dataOrganizada;
};

export const OrganizarDataPorFecha = async (
  array,
  fechaInicial,
  fechaFinal
) => {
  console.log({ mYARRAY: array });

  let filteredArray = await array.filter((obj) => {
    return (
      new Date(obj.Fecha).toLocaleDateString() >=
        new Date(fechaInicial).toLocaleDateString() &&
      new Date(obj.Fecha).toLocaleDateString() <=
        new Date(fechaFinal).toLocaleDateString()
    );
  });
  console.log({ Hey: filteredArray });

  return filteredArray;
};

export const organizarDataExcel = async (array) => {
  const arrayOrganizado = await array.map((item) => ({
    Fecha: new Date(item?.Fecha).toLocaleDateString(),
    Nombre: item?.Nombre,
    Responsable: item.Responsable,
    Piscina: item.Piscina,
    Estado: item?.Estado ? "Activo" : "Inactivo",
  }));

  return arrayOrganizado;
};
