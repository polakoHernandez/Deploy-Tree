const url = "https://treea-piscinas-api.vercel.app/v1";

export const listarProductosQuimicos = async () => {
  const response = await fetch(`${url}/chemical-products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-token": localStorage.getItem("clave"),
    },
  });

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = response.json();

      return respuesta;

    case 401:
      break;

    case 500:
      break;
  }
};

export const listarHistoricoProducto = async (idProducto) => {
  const response = await fetch(
    `${url}/history-chemical-products/${idProducto}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-token": localStorage.getItem("clave"),
      },
    }
  );

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = response.json();
      return respuesta;

    case 401:
      break;

    case 500:
      break;
  }
};

export const listarHistoricoLote = async (idProductoQuimico) => {
  const response = await fetch(
    `${url}/history-chemical-products/${idProductoQuimico}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-token": localStorage.getItem("clave"),
      },
    }
  );

  let respuesta = "";
  switch (response.status) {
    case 200:
      return (respuesta = response.json());

    case 401:
      break;

    case 500:
      setinvenarioId("");

      break;
  }
};

export const agregarAInventario = async (idProductoQuimico, data) => {
  const response = await fetch(`${url}/chemical-inventory`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-token": localStorage.getItem("clave"),
      "Content-Type": "application/json", // Asegúrate de incluir el tipo de contenido
    },
    body: JSON.stringify({
      chemicalName: idProductoQuimico,
      quantity: data?.cantidad,
      units: data?.unidades,
      lot: data?.lote,
      expirationDate: data?.fecha, // Asegúrate de usar el formato correcto para la fecha
    }),
  });

  let respuesta = "";

  switch (response.status) {
    case 200:
      respuesta = await response.json();
      console.log(respuesta);
      return { state: 200, respuesta: respuesta };

    case 401:
      respuesta = await response.json();
      console.log(respuesta);

      return { state: 401, respuesta: respuesta };

    case 500:
      respuesta = await response.json();
      console.log(respuesta);

      return { state: 500, respuesta: respuesta };
  }
};
