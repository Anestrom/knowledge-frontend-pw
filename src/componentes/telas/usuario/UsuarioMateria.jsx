import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { getAssocByUsuarioAPI, deleteAssocAPI, addAssocAPI } from '../../../servicos/UsuarioMateriaServico';
import { getMateriasAPI } from '../../../servicos/MateriaServico';

function UsuarioMateria({ idUsuario, setAlerta, onUpdate }) {
    
    const [assocs, setAssocs] = useState([]);
    const [materiasDisponiveis, setMateriasDisponiveis] = useState([]);
    const [novaAssoc, setNovaAssoc] = useState({ id_materia: '', user_type: 'Aprendiz' });

    const buscarDados = useCallback(async () => {
        if (!idUsuario) return;
        
        const [assocData, materiasData] = await Promise.all([
            getAssocByUsuarioAPI(idUsuario),
            getMateriasAPI()
        ]);

        setAssocs(assocData && Array.isArray(assocData) ? assocData : []);
        setMateriasDisponiveis(materiasData);
    }, [idUsuario]);

    useEffect(() => {
        buscarDados();
    }, [buscarDados]);

    const handleRemove = async (id_assoc) => {
        if (window.confirm("Deseja remover esta associação do perfil?")) {
            const retornoAPI = await deleteAssocAPI(id_assoc);
            setAlerta(retornoAPI);
            buscarDados();
            onUpdate();
        }
    };
    
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!novaAssoc.id_materia || !novaAssoc.user_type) {
            setAlerta({ status: "error", message: "Selecione a Matéria e o Tipo." });
            return;
        }

        const retornoAPI = await addAssocAPI(
            idUsuario, 
            novaAssoc.id_materia, 
            novaAssoc.user_type
        );
        
        setAlerta(retornoAPI);
        if (retornoAPI.status === 'success') {
            setNovaAssoc({ id_materia: '', user_type: 'Aprendiz' });
            buscarDados();
            onUpdate();
        }
    };

    return (
        <div className="mt-5 border p-3 rounded">
            <h5>Matérias Associadas (Mentor/Aprendiz)</h5>

            <Table striped bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Matéria</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {assocs.map((assoc) => (
                        <tr key={assoc.id}>
                            <td>{assoc.subject_name}</td>
                            <td>{assoc.user_type}</td>
                            <td>
                                <Button variant="outline-danger" size="sm" onClick={() => handleRemove(assoc.id)}>
                                    <Trash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {assocs.length === 0 && (
                         <tr><td colSpan="3" className="text-center">Nenhuma matéria associada.</td></tr>
                    )}
                </tbody>
            </Table>

            <Form onSubmit={handleAdd} className="mt-4">
                <h6>Adicionar Matéria ao Perfil:</h6>
                <Row>

                    <Col md={5}>
                        <Form.Select 
                            value={novaAssoc.id_materia} 
                            onChange={(e) => setNovaAssoc({...novaAssoc, id_materia: parseInt(e.target.value)})}
                            required
                        >
                            <option value="">Selecione a Matéria</option>
                            {materiasDisponiveis.map(m => (
                                <option key={m.id} value={m.id}>{m.nome}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    
                    <Col md={4}>
                        <Form.Select 
                            value={novaAssoc.user_type} 
                            onChange={(e) => setNovaAssoc({...novaAssoc, user_type: e.target.value})}
                            required
                        >
                            <option value="Aprendiz">Preciso de Ajuda (Aprendiz)</option>
                            <option value="Mentor">Quero Ajudar (Mentor)</option>
                        </Form.Select>
                    </Col>

                    <Col md={3}>
                        <Button type="submit" variant="success" className="w-100">
                            Adicionar
                        </Button>
                    </Col>
                </Row>
            </Form>

        </div>
    );
}

export default UsuarioMateria;