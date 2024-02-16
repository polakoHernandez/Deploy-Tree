export const organizarDataExcel = async (array) => {
  const dataOrganizada = await array?.map((item) => ({
    Validación: item?.validacion,
    Responsable: `${item.nombre} ${item.apellido} `,
    Parámetro: item?.name || item?.nameParam,
    Especificación: item?.specification,
    Fecha: new Date(item?.fecha).toLocaleDateString(),
    Rango_mínimo: item?.minRange || 0,
    Rango_máximo: item?.maxRange || 0,
    Valor_máximo: item?.maxValueSpecification || 0,
    Piscina: item?.piscina,
    Estado: item?.estado ? "Activo" : "Inactivo",
    Análisis_y_Report: "*******",
  }));

  return dataOrganizada;
};
