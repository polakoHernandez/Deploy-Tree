const url = "https://treea-piscinas-api.vercel.app/v1";

export const listarPisicnas = async () => {
  const response = await fetch(`${url}/pools`, {
    method: "GET",
    headers: {
      Accpet: "Application/json",
      "x-token": localStorage.getItem("clave"),
    },
  });

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = await response.json();
      return { status: 200, poolCreatedByUser: respuesta.pools };

    case 401:
      respuesta = await response.json();
      return { status: 401, respuesta: respuesta };

    case 500:
      respuesta = await response.json();
      return { status: 500, respuesta: respuesta };
  }
};
