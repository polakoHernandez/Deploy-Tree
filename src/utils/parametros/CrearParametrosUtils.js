export const organizarDataExcel = async (array) => {
  const arrayOrganizado = await array.map((item) => ({
    Norma: item?.nameNormativity,
    Tipo_de_agua: item?.typeOfWater,
    Estado: item?.state ? "Activo" : "Inactivo",
  }));

  return arrayOrganizado;
};
