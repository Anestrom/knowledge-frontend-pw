
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" to="/">Knowledge</NavLink> 
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            
                            {/* Link principal */}
                            <NavLink className="nav-link" end to="/">
                                Home
                            </NavLink>
                            
                            {/* Dropdown de Manutenções (CRUDs) */}
                            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" to="/materia">
                                    Matérias
                                </NavLink>
                                <NavLink className="dropdown-item" to="/usuario">
                                    Usuários
                                </NavLink>
                                {/* A rota de Chamados terá uma página principal */}
                                <NavDropdown.Divider />
                                <NavLink className="dropdown-item" to="/usuariomateria">
                                    Associações
                                </NavLink>
                            </NavDropdown>

                            {/* Link Principal de Chamados (O coração do sistema) */}
                             <NavLink className="nav-link" to="/chamado/aberto">
                                Chamados Abertos
                            </NavLink>
                            
                            {/* Link Sobre */}
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