import React, { useContext } from 'react';
import MateriaContext from './MateriaContext';
import Alerta from '../../comuns/Alerta';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { JournalBookmarkFill, PencilSquare, Trash, PlusCircleFill } from 'react-bootstrap-icons';
import { isAdmin } from '../../../servicos/AuthServico';

function Tabela() {
    const { alerta, listaObjetos, remover, editar, novoObjeto } = useContext(MateriaContext);
    const admin = isAdmin();

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold text-success">
                    <JournalBookmarkFill className="me-2" />Matérias
                </h1>
                {admin && (
                    <Button variant="success" size="lg" onClick={novoObjeto}>
                        <PlusCircleFill className="me-2" /> Nova Matéria
                    </Button>
                )}
            </div>

            <Alerta alerta={alerta} />

            {listaObjetos.length === 0 && (
                <div className="text-center py-5">
                    <h3 className="text-muted">Nenhuma matéria encontrada</h3>
                </div>
            )}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive className="shadow-sm">
                    <thead className="table-success">
                        <tr>
                            {admin && <th className="text-center">Ações</th>}
                            <th>ID</th>
                            <th>Nome da Matéria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id}>
                                {admin && (
                                    <td className="text-center">
                                        <Button variant="info" size="sm" onClick={() => editar(objeto)} className="me-2">
                                            <PencilSquare />
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => remover(objeto.id)}>
                                            <Trash />
                                        </Button>
                                    </td>
                                )}
                                <td><Badge bg="success">{objeto.id}</Badge></td>
                                <td className="fw-semibold">{objeto.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}

export default Tabela;
