export const listarPiscinasPorId = async () => {
  const response = await fetch(
    `https://treea-piscinas-api.vercel.app/v1/pool-by-user/${localStorage.getItem(
      "id"
    )}`,
    {
      method: "GET",
      headers: {
        Accpet: "Application/json",
        "x-token": localStorage.getItem("clave"),
      },
    }
  );

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = await response.json();

      return { status: 200, pools: respuesta.poolCreatedByUser };
    case 400:
      respuesta = await response.json();

      return { status: 400, respuesta: respuesta };
    case 401:
      respuesta = await response.json();

      return { status: 400, respuesta: respuesta };
    case 500:
      respuesta = await response.json();

      return { status: 500, respuesta: respuesta };
  }
};
