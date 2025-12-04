import React, { useContext } from 'react'
import UsuarioContext from './UsuarioContext';
import Alerta from '../../comuns/Alerta';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { PencilSquare, Trash, PersonPlus, StarFill, CashCoin, PeopleFill } from 'react-bootstrap-icons';
import { isAdmin } from '../../../servicos/AuthServico';

function Tabela() {
    const { alerta, listaObjetos, remover, editar, novoObjeto } = useContext(UsuarioContext);
    const admin = isAdmin();

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold text-primary">
                    <PeopleFill className="me-2" />Usuários
                </h1>
                <Button variant="primary" size="lg" onClick={novoObjeto}>
                    <PersonPlus className="me-2" /> Novo Usuário
                </Button>
            </div>

            <Alerta alerta={alerta} />

            {listaObjetos.length === 0 && (
                <div className="text-center py-5">
                    <h3 className="text-muted">Nenhum usuário encontrado</h3>
                </div>
            )}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive className="shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center">Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Curso</th>
                            <th>Avaliação</th>
                            <th>Créditos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id}>
                                <td className="text-center">
                                    <Button variant="info" size="sm" onClick={() => editar(objeto)} className="me-2">
                                        <PencilSquare />
                                    </Button>
                                    {admin && (
                                        <Button variant="danger" size="sm" onClick={() => remover(objeto.id)}>
                                            <Trash />
                                        </Button>
                                    )}
                                </td>
                                <td><Badge bg="secondary">{objeto.id}</Badge></td>
                                <td className="fw-semibold">{objeto.nome}</td>
                                <td>{objeto.email}</td>
                                <td>{objeto.curso}</td>
                                <td>
                                    {objeto.avaliacao_media ? (
                                        <Badge bg="warning" text="dark">
                                            <StarFill className="me-1" />{objeto.avaliacao_media}
                                        </Badge>
                                    ) : '-'}
                                </td>
                                <td>
                                    {objeto.creditos ? (
                                        <Badge bg="success">
                                            <CashCoin className="me-1" />{objeto.creditos}
                                        </Badge>
                                    ) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}

export default Tabela;
