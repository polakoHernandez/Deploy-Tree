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
import NormasVigentes from "./Vistas/Parametros/NormasVigentes";
import VerDataParametro from "./Vistas/Parametros/VerDataParametro";
import ListaQuimicos from "./Vistas/Quimicos/ListaQuimicos";
import ActualizarQuimico from "./Vistas/Quimicos/ActualizarQuimico";
import AdministrarInventario from "./Vistas/Quimicos/AdministrarInventario";
import ExportToExcel from "./Reporte";
import CambiarPassword from "./Vistas/Inicio de sesion/CambiarPassword";

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
            element={<AdministrarInventario></AdministrarInventario>}
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
          <Route
            path="/verNormasVigentes"
            element={<NormasVigentes></NormasVigentes>}
          ></Route>
          <Route
            path="/verDataParametro"
            element={<VerDataParametro></VerDataParametro>}
          ></Route>

          <Route
            path="/listaQuimicos"
            element={<ListaQuimicos></ListaQuimicos>}
          ></Route>

          <Route
            path="/actualizarQuimico"
            element={<ActualizarQuimico></ActualizarQuimico>}
          ></Route>

          <Route
            path="/administrarInventario"
            element={<AdministrarInventario></AdministrarInventario>}
          ></Route>
          <Route
            path="/reporte"
            element={<ExportToExcel></ExportToExcel>}
          ></Route>

          <Route
            path="/reset-password/:idUser/:token"
            element={<CambiarPassword></CambiarPassword>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
