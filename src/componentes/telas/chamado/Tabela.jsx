import React, { useContext } from 'react';
import ChamadoContext from './ChamadoContext';
import Alerta from '../../comuns/Alerta';
import { Table, Button } from 'react-bootstrap';
import { CheckLg, XLg, ChatDots } from 'react-bootstrap-icons';

function Tabela() {

    const { alerta, listaObjetos, remover, acaoChamado, novoObjeto } = useContext(ChamadoContext);

    const ID_MENTOR_LOGADO = 1;

    return (
        <div style={{ padding: '20px' }}>
            <h1><ChatDots /> Histórico de Chamados</h1>
            <Alerta alerta={alerta} />
            <Button variant="success" onClick={novoObjeto} className="mb-3">
                Abrir Novo Chamado
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhum chamado encontrado</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
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
                                <td align="center">
                                    {objeto.status === 'Aberto' && (
                                        // Botão para Aceitar (Apenas mentores)
                                        <Button
                                            variant="success"
                                            onClick={() => acaoChamado(objeto.id, 'aceitar', ID_MENTOR_LOGADO)}
                                            className="me-2"
                                        >
                                            Aceitar
                                        </Button>
                                    )}
                                    {objeto.status === 'Aceito' && objeto.mentor?.id === ID_MENTOR_LOGADO && (
                                        // Botão para Finalizar (Apenas mentor ou aprendiz após sessão)
                                        <Button
                                            variant="primary"
                                            onClick={() => acaoChamado(objeto.id, 'finalizar')}
                                            className="me-2"
                                        >
                                            Finalizar <CheckLg />
                                        </Button>
                                    )}
                                    <Button variant="danger" onClick={() => remover(objeto.id)}>
                                        <XLg />
                                    </Button>
                                </td>
                                <td>{objeto.id}</td>

                                <td>{objeto.materia ? objeto.materia.nome : 'N/D'}</td>
                                <td>{objeto.aprendiz ? objeto.aprendiz.nome : 'N/D'}</td>
                                <td>{objeto.mentor ? objeto.mentor.nome : 'Aguardando'}</td>

                                <td>{objeto.status}</td>
                                <td>{objeto.localizacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;