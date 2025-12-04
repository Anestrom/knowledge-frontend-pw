import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from "./componentes/Menu";
import ProtectedRoute from "./componentes/ProtectedRoute";
import AdminRoute from "./componentes/AdminRoute";

import Home from "./componentes/telas/Home";
import Sobre from "./componentes/telas/Sobre";
import Login from "./componentes/telas/auth/Login";
import Register from "./componentes/telas/auth/Register";
import Usuario from './componentes/telas/usuario/Usuario';
import Materia from "./componentes/telas/materia/Materia";
import Chamado from "./componentes/telas/chamado/Chamado";
import MeuPerfil from "./componentes/telas/MeuPerfil";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <ProtectedRoute><Menu /></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "sobre",
                element: <Sobre />
            },
            {
                path: "usuario",
                element: <AdminRoute><Usuario /></AdminRoute>
            },
            {
                path: "materia",
                element: <Materia />
            },
            {
                path: "chamado/aberto",
                element: <Chamado filtro="ABERTO" />
            },
            {
                path: "chamado/historico",
                element: <AdminRoute><Chamado filtro="TODOS" /></AdminRoute>
            },
            {
                path: "meu-perfil",
                element: <MeuPerfil /> 
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
