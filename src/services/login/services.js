export const recuperarContrasena = async (email) => {
  const response = await fetch(
    "https://kcc6rdhv-3000.use2.devtunnels.ms/v1/reset-password",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "x-token": localStorage.getItem("clave"),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = await response.json();
      return { status: 200, respuesta: respuesta };

    case 401:
      respuesta = await response.json();
      return { status: 401, respuesta: respuesta };

    case 404:
      respuesta = await response.json();
      return { status: 404, respuesta: respuesta };
    case 500:
      respuesta = await response.json();
      return { status: 500, respuesta: respuesta };

    default:
      respuesta = await response.json();
      return { status: 500, respuesta: respuesta };
  }
};
