
import React, { useContext } from 'react'
import UsuarioContext from './UsuarioContext';
import Alerta from '../../comuns/Alerta';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash, PersonPlus } from 'react-bootstrap-icons'; 

function Tabela() {

    // Usa o useContext para acessar os dados do Provider (Usuario.jsx)
    const { alerta, listaObjetos, remover, editar, novoObjeto } = useContext(UsuarioContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Usuarios</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={novoObjeto} className="mb-3">
                Novo <PersonPlus />
            </Button>
            
            {listaObjetos.length === 0 && <h1>Nenhum usuário encontrado</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
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
                                <td align="center">
                                    {/* Botão para Editar */}
                                    <Button variant="info" onClick={() => editar(objeto)} className="me-2">
                                        <PencilSquare />
                                    </Button>
                                    {/* Botão para Deletar */}
                                    <Button variant="danger" onClick={() => remover(objeto.id)}>
                                        <Trash />
                                    </Button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.email}</td>
                                <td>{objeto.curso}</td>
                                <td>{objeto.avaliacao_media}</td>
                                <td>{objeto.creditos_saber}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;