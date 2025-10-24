import React, { useContext } from 'react';
import MateriaContext from './MateriaContext';
import Alerta from '../../comuns/Alerta';
import { Table, Button } from 'react-bootstrap';
import { Book, PencilSquare, Trash } from 'react-bootstrap-icons'; 

function Tabela() {

    const { alerta, listaObjetos, remover, editar, novoObjeto } = useContext(MateriaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1><Book /> Cadastro de Matérias</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={novoObjeto} className="mb-3">
                Nova Matéria
            </Button>
            
            {listaObjetos.length === 0 && <h1>Nenhuma matéria encontrada</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id}>
                                <td align="center">
                                    <Button variant="info" onClick={() => editar(objeto)} className="me-2">
                                        <PencilSquare />
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.id)}>
                                        <Trash />
                                    </Button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;