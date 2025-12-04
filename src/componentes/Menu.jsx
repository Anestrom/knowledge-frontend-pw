import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout, getUser, isAdmin } from '../servicos/AuthServico';
import { BookFill, PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';

function Menu() {
    const navigate = useNavigate();
    const user = getUser();
    const admin = isAdmin();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <BookFill className="me-2" /> Knowledge
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>

                            {admin && (
                                <NavDropdown title="Cadastros">
                                    <NavDropdown.Item as={NavLink} to="/materia">Matérias</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/usuario">Usuários</NavDropdown.Item>
                                </NavDropdown>
                            )}

                            {!admin && (
                                <Nav.Link as={NavLink} to="/materia">Matérias</Nav.Link>
                            )}

                            <NavDropdown title="Chamados">
                                <NavDropdown.Item as={NavLink} to="/chamado/aberto">Chamados Abertos</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/chamado/meus">Meus Chamados</NavDropdown.Item>
                                {admin && (
                                    <NavDropdown.Item as={NavLink} to="/chamado/historico">Histórico Completo</NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={NavLink} to="/meu-perfil">
                                <PersonCircle className="me-1" /> {user?.nome} {admin && <Badge bg="warning" text="dark">Admin</Badge>}
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout}>
                                <BoxArrowRight className="me-1" /> Sair
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Menu;
