
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from "./componentes/Menu";

import Home from "./componentes/telas/Home";
import Sobre from "./componentes/telas/Sobre";
import Usuario from './componentes/telas/usuario/Usuario';

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
            // ROTAS DE CADASTRO/CRUD
            {
                path: "/usuario",
                element: <Usuario />
            },
            // ROTAS DO FLUXO PRINCIPAL
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;