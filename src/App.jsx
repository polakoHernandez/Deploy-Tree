import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Vistas/Inicio de sesion/Login";
import Principal from "./Vistas/Principal/Principal";
import TemporaryDrawer from "./Componentes/General/SideBar";
import CrearUsuario from "./Vistas/Usuarios/CrearUsuario";
import ListaDeUsuarios from "./Vistas/Usuarios/ListaDeUsuarios";
import MyComponent from "./Componentes/General/Paginatio";
import CrearPiscina from "./Vistas/Piscina/CrearPiscina";
import EditarUsuario from "./Vistas/Usuarios/EditarUsuario";
import MisPiscinas from "./Vistas/Piscina/MisPiscinas";
import GestionarPiscinas from "./Vistas/Piscina/GestionarPiscinas";
import CrearQuimico from "./Vistas/Quimicos/CrearQumico";
import AgregarInventario from "./Vistas/Quimicos/AgregarInventario";
import CrearParametro from "./Vistas/Parametros/CrearParametro";
import EditarNorma from "./Vistas/Parametros/EditarNorma";
import AsignarParametros from "./Vistas/Parametros/AsignarParametros";
import VerParamtrosPiscinas from "./Vistas/Parametros/VerParamtrosPiscinas";
import Notificaciones from "./Vistas/notificaciones/Notificaciones";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/principal" element={<Principal></Principal>} />
          <Route
            path="/sidebar"
            element={<TemporaryDrawer></TemporaryDrawer>}
          />
          <Route path="/crearUsuario" element={<CrearUsuario></CrearUsuario>} />
          <Route
            path="/listaDeUsuarios"
            element={<ListaDeUsuarios></ListaDeUsuarios>}
          />
          <Route path="/Pagination" element={<MyComponent></MyComponent>} />
          <Route path="/CrearPiscina" element={<CrearPiscina></CrearPiscina>} />
          <Route
            path="/EditarUsuario"
            element={<EditarUsuario></EditarUsuario>}
          ></Route>
          <Route
            path="/misPiscinas"
            element={<MisPiscinas></MisPiscinas>}
          ></Route>

          <Route
            path="/gestionarPiscinas"
            element={<GestionarPiscinas></GestionarPiscinas>}
          ></Route>

          <Route
            path="/crearQuimico"
            element={<CrearQuimico></CrearQuimico>}
          ></Route>

          <Route
            path="/agregarInventario"
            element={<AgregarInventario></AgregarInventario>}
          ></Route>

          <Route
            path="/crearParametro"
            element={<CrearParametro></CrearParametro>}
          ></Route>

          <Route
            path="/editarNorma"
            element={<EditarNorma></EditarNorma>}
          ></Route>
          <Route
            path="/asignarParametros"
            element={<AsignarParametros></AsignarParametros>}
          ></Route>

          <Route
            path="/verParametrosPiscinas"
            element={<VerParamtrosPiscinas></VerParamtrosPiscinas>}
          ></Route>

          <Route
            path="/verNotificaciones"
            element={<Notificaciones></Notificaciones>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// [

//   {

//     parametro:"",
//     fecha:"",
//     minimo:"",
//     real:"",
//     maximo:"",
//     estado:""
//   },
//   {

//     parametro:"",
//     fecha:"",
//     minimo:"",
//     real:"",
//     maximo:"",
//     estado:""

//   },

//   {

//     parametro:"",
//     fecha:"",
//     minimo:"",
//     real:"",
//     maximo:"",
//     estado:""

//   },

// ]

// {
//   "paramChlorine": {
//     "ppmActual": 0,
//     "ppmDesired": 0,
//     "ppmDesiredMin": 0,
//     "_id": "65ae83f33936288e292d0db5",
//     "nameParam": "Cloro",
//     "isAdjustedChlorine": false,
//     "message": "good",
//     "createAt": "2024-01-22T15:04:19.977Z"
//   },
//   "paramPh": {
//     "ppmActual": 23,
//     "ppmDesired": 10,
//     "ppmDesiredMin": 100,
//     "_id": "65ae83f33936288e292d0db6",
//     "nameParam": "Ph",
//     "isAdjustedPh": false,
//     "message": "Ph está fuera de lo requerido",
//     "createAt": "2024-01-22T15:04:19.977Z"
//   },
//   "_id": "65ae83f33936288e292d0db4",
//   "poolId": {
//     "depth": {
//       "depthA": 5,
//       "depthB": 5,
//       "depthC": 5
//     },
//     "recirculationPeriod": {
//       "min": 5,
//       "max": 5
//     },
//     "_id": "65aacd8dcfcbb2fe8310b409",
//     "name": "Nueva Pisicna Refrescando 57",
//     "address": "Mi casa",
//     "height": 5,
//     "width": 6,
//     "city": "Florencia",
//     "externalTemperature": 24,
//     "category": "Adultos",
//     "form": "RECTANGULAR",
//     "use": "PRIVADA",
//     "photo": "https://res.cloudinary.com/dyxelh9kw/image/upload/v1705692555/pool/powqw1leby9cxtzymrva.jpg",
//     "typePool": "CUBIERTA",
//     "temperature": 23,
//     "typeInstallation": "Piscina de nado",
//     "systemOperation": "Recirculacion",
//     "airConditioned": "Si",
//     "caudal": 19,
//     "autoDosing": "Si",
//     "filters": [
//       {
//         "filter": "Arena",
//         "filterHeight": 56,
//         "filterDiameter": 34,
//         "filterCapacity": 34,
//         "filterBedHeight": 5,
//         "_id": "65aacd8dcfcbb2fe8310b40a"
//       }
//     ],
//     "pumps": [
//       {
//         "pumpFlow": "23",
//         "referencePump": "NO se",
//         "pumpBrand": "Luva",
//         "platePhoto": "https://res.cloudinary.com/dyxelh9kw/image/upload/v1705692556/pool/hitc3i4aqnxazpiqtjf3.png",
//         "dataSheetPump": "https://res.cloudinary.com/dyxelh9kw/image/upload/v1705692555/pool/zuulhujk5ei8x8mtksql.pdf",
//         "_id": "65aacd8dcfcbb2fe8310b40b"
//       }
//     ],
//     "heaters": [
//       {
//         "heaterReference": "No se",
//         "heaterBrand": "No se",
//         "dataSheetHeater": "https://res.cloudinary.com/dyxelh9kw/image/upload/v1705692556/pool/kzkmq2r0jgu4q3e5yxma.pdf",
//         "_id": "65aacd8dcfcbb2fe8310b40c"
//       }
//     ],
//     "department": "Caquetá",
//     "createAt": "2024-01-19T19:29:17.314Z",
//     "state": true,
//     "minDepth": 5,
//     "maxDepth": 5,
//     "meanDepth": 5,
//     "poolVolumR": 150,
//     "numberLitersR": 150000,
//     "modifiedBy": "656e4d4ffc0a8a2e68e1bc7e"
//   },
//   "isAdjusted": false,
//   "date": "2024-01-17T00:00:00.000Z",
//   "createAt": "2024-01-22T15:04:02.214Z",
//   "state": true,
//   "changeHistory": [],
//   "modifiedBy": "656e4d4ffc0a8a2e68e1bc7e"
// }
