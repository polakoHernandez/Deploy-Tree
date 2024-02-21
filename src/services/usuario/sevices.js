const url = "https://treea-piscinas-api.vercel.app/v1";

export const listarUsuario = async () => {
  const response = await fetch(`${url}/user/${localStorage.getItem("id")}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-token": localStorage.getItem("clave"),
    },
  });

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = await response.json();
      return { status: 200, respuesta: respuesta };

    case 401:
      respuesta = await response.json();
      return { status: 401, respuesta: respuesta };

    case 500:
      respuesta = await response.json();
      return { status: 500, respuesta: respuesta };
  }
};
