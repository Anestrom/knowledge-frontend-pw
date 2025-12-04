import React, { useContext } from 'react';
import ChamadoContext from './ChamadoContext';
import Alerta from '../../comuns/Alerta';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { CheckLg, XLg, ChatDotsFill, BellFill, CheckCircleFill, ClockFill } from 'react-bootstrap-icons';
import { isAdmin, getUser } from '../../../servicos/AuthServico';

function Tabela() {
    const { alerta, listaObjetos, remover, acaoChamado, novoObjeto } = useContext(ChamadoContext);
    const admin = isAdmin();
    const user = getUser();
    const ID_USUARIO_LOGADO = user?.id;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Aberto':
                return <Badge bg="warning" text="dark"><ClockFill className="me-1" />Aberto</Badge>;
            case 'Aceito':
                return <Badge bg="info"><CheckCircleFill className="me-1" />Aceito</Badge>;
            case 'Finalizado':
                return <Badge bg="success"><CheckLg className="me-1" />Finalizado</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold text-primary">
                    <ChatDotsFill className="me-2" />Chamados
                </h1>
                <Button variant="primary" size="lg" onClick={novoObjeto}>
                    <BellFill className="me-2" /> Abrir Novo Chamado
                </Button>
            </div>

            <Alerta alerta={alerta} />

            {listaObjetos.length === 0 && (
                <div className="text-center py-5">
                    <h3 className="text-muted">Nenhum chamado encontrado</h3>
                </div>
            )}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive className="shadow-sm">
                    <thead className="table-primary">
                        <tr>
                            <th className="text-center">Ações</th>
                            <th>ID</th>
                            <th>Matéria</th>
                            <th>Aprendiz</th>
                            <th>Mentor</th>
                            <th>Status</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id}>
                                <td className="text-center">
                                    {objeto.status === 'Aberto' && (
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => acaoChamado(objeto.id, 'aceitar', ID_USUARIO_LOGADO)}
                                            className="me-2"
                                        >
                                            <CheckLg className="me-1" />Aceitar
                                        </Button>
                                    )}
                                    {objeto.status === 'Aceito' && objeto.mentor?.id === ID_USUARIO_LOGADO && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => acaoChamado(objeto.id, 'finalizar')}
                                            className="me-2"
                                        >
                                            <CheckCircleFill className="me-1" />Finalizar
                                        </Button>
                                    )}
                                    {admin && (
                                        <Button variant="danger" size="sm" onClick={() => remover(objeto.id)}>
                                            <XLg />
                                        </Button>
                                    )}
                                </td>
                                <td><Badge bg="primary">{objeto.id}</Badge></td>
                                <td className="fw-semibold">{objeto.materia ? objeto.materia.nome : 'N/D'}</td>
                                <td>{objeto.aprendiz ? objeto.aprendiz.nome : 'N/D'}</td>
                                <td>{objeto.mentor ? objeto.mentor.nome : <span className="text-muted">Aguardando...</span>}</td>
                                <td>{getStatusBadge(objeto.status)}</td>
                                <td>{objeto.localizacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}

export default Tabela;
