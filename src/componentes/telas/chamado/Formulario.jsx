import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import CampoEntrada from '../../comuns/CampoEntrada'; 
import CampoEntradaTextArea from '../../comuns/CampoEntradaTextArea';
import ChamadoContext from './ChamadoContext';
import { getMateriasAPI } from '../../../servicos/MateriaServico';
import { getUser } from '../../../servicos/AuthServico';

function Formulario() {
    
    const { 
        setAlerta, 
        objeto, setObjeto,
        setExibirTabela, 
        recuperarChamados,
        abrirChamadoAPI 
    } = useContext(ChamadoContext); 

    const [formValidated, setFormValidated] = useState(false);
    const [materias, setMaterias] = useState([]);
    const titulo = "Abrir Novo Chamado de Ajuda";
    const user = getUser();
    
    useEffect(() => {
        const fetchMaterias = async () => {
            const lista = await getMateriasAPI();
            if (lista && Array.isArray(lista)) {
                setMaterias(lista);
                if (lista.length > 0) {
                     setObjeto(prev => ({ ...prev, id_materia: lista[0].id }));
                }
            }
        };
        fetchMaterias();
    }, [setObjeto]); 

    const handleChange = (e) => {
        const { id, value } = e.target;
        setObjeto(prev => ({ ...prev, [id]: id === 'id_materia' ? parseInt(value) : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        setFormValidated(true);
        if (form.checkValidity() === false) return;

        try {
            const dadosParaEnvio = {
                id_aprendiz: user.id,
                id_materia: objeto.id_materia,
                localizacao: objeto.localizacao,
                duvida_detalhes: objeto.duvida_detalhes
            };
            
            let retornoAPI = await abrirChamadoAPI(dadosParaEnvio); 
            
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            
            if (retornoAPI.status === 'success') {
                setExibirTabela(true);
                recuperarChamados(); 
            }

        } catch (error) {
            setAlerta({ status: 'error', message: "Erro na requisição: " + error.message });
        }
    };
    
    return (
        <Container className="mt-4">
            <h2>{titulo}</h2>
            <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
                <Row className="mb-3">

                    <Col md={6}>
                         <Form.Group controlId="id_materia" className="mb-3">
                            <Form.Label>Matéria</Form.Label>
                            <Form.Select id="id_materia" value={objeto.id_materia} onChange={handleChange} required>
                                <option value="">Selecione a Matéria</option>
                                {materias.map(m => (
                                    <option key={m.id} value={m.id}>{m.nome}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecione uma matéria.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        <CampoEntrada id="localizacao" label="Localização (Ex: Biblioteca)" tipo="text" value={objeto.localizacao} onChange={handleChange} required msgvalida="A localização é obrigatória" />
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col>
                        <CampoEntradaTextArea id="duvida_detalhes" label="Descreva sua Dúvida" value={objeto.duvida_detalhes} onChange={handleChange} required msgvalida="A descrição da dúvida é obrigatória" linhas={3} />
                    </Col>
                </Row>

                <Button type="submit" variant="success" className="me-2">Lançar Chamado</Button>
                <Button variant="secondary" onClick={() => setExibirTabela(true)}>Voltar</Button>
            </Form>
        </Container>
    );
}

export default Formulario;
