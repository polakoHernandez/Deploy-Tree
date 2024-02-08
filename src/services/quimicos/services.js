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
