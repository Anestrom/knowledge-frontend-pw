import React, { useContext, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import CampoEntrada from '../../comuns/CampoEntrada'; 
import MateriaContext from './MateriaContext';

function Formulario() {
    
    const { 
        setAlerta, 
        objeto, setObjeto,
        setExibirTabela, 
        recuperarMaterias,
        cadastrarMateriaAPI 
    } = useContext(MateriaContext);

    const [formValidated, setFormValidated] = useState(false);
    const titulo = objeto.id ? "Alteração de Matéria" : "Cadastro de Nova Matéria";
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setObjeto({ ...objeto, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        setFormValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        try {
            const metodo = objeto.id ? 'PUT' : 'POST';
            
            let dadosParaEnvio = { id: objeto.id, nome: objeto.nome }; 

            let retornoAPI = await cadastrarMateriaAPI(dadosParaEnvio, metodo);
            
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            
            if (retornoAPI.status === 'success') {
                setExibirTabela(true);
                recuperarMaterias(); 
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
                    
                    {objeto.id && (
                        <Col md={3}>
                            <CampoEntrada id="id" label="Código" tipo="text" value={objeto.id || ''} readOnly={true} />
                        </Col>
                    )}
                    
                    <Col md={objeto.id ? 9 : 12}>
                        <CampoEntrada 
                            id="nome" 
                            label="Nome da Matéria" 
                            tipo="text" 
                            value={objeto.nome} 
                            onChange={handleChange} 
                            required 
                            msgvalida="O nome da matéria é obrigatório"
                        />
                    </Col>
                </Row>

                <Button type="submit" variant="success" className="me-2">
                    <i className="bi bi-save me-1"></i> Salvar
                </Button>
                <Button variant="secondary" onClick={() => setExibirTabela(true)}>
                    Voltar
                </Button>
            </Form>
        </Container>
    );
}

export default Formulario;