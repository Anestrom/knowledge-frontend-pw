import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar
                expand="lg"
                variant="dark"
                className="bg-dark shadow-sm"
                sticky="top"
            >
                <Container>
                    <NavLink className="navbar-brand" to="/">Knowledge</NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavLink className="nav-link" end to="/">Home</NavLink>

                            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" to="/materia">Matérias</NavLink>
                                <NavLink className="dropdown-item" to="/usuario">Usuários</NavLink>
                            </NavDropdown>

                            <NavDropdown title="Chamados" id="chamados-dropdown">
                                <NavLink className="dropdown-item" to="/chamado/aberto">
                                    Chamados Abertos
                                </NavLink>
                                <NavLink className="dropdown-item" to="/chamado/historico">
                                    Histórico Completo
                                </NavLink>
                            </NavDropdown>

                        </Nav>

                        <Nav>
                            <NavLink className="nav-link" to="/meu-perfil/1">
                                Meu Perfil
                            </NavLink>
                            <NavLink className="nav-link" to="/sobre">
                                Sobre
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default Menu;