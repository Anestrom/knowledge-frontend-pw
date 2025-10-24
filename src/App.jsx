
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from "./componentes/Menu";

import Home from "./componentes/telas/Home";
import Sobre from "./componentes/telas/Sobre";
import Usuario from './componentes/telas/usuario/Usuario';
import Materia from "./componentes/telas/materia/Materia";
import Chamado from "./componentes/telas/chamado/Chamado";
import MeuPerfil from "./componentes/telas/MeuPerfil";

// Definição das Rotas
const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/sobre",
                element: <Sobre />
            },
            // CRUD
            {
                path: "/usuario",
                element: <Usuario />
            },
            {
                path: "/materia",
                element: <Materia />
            },
            {
                path: "/chamado",
                element: <Chamado />
            },
            {
                path: "/chamado/aberto",
                element: <Chamado filtro="ABERTO" />
            },
            {
                path: "/chamado/historico",
                element: <Chamado filtro="TODOS" /> 
            },
            {
                path: "/meu-perfil/:id",
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