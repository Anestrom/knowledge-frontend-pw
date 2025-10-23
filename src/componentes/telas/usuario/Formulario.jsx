// src/componentes/telas/usuario/Formulario.jsx
import React, { useContext, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import CampoEntrada from '../../comuns/CampoEntrada'; 
import UsuarioContext from './UsuarioContext';
import { cadastrarUsuarioAPI } from '../../../servicos/UsuarioServico';

function Formulario() {
    
    const { 
        setAlerta, 
        objeto, setObjeto, // Objeto e Setter
        setExibirTabela, 
        recuperarUsuarios // Recarregar a lista
    } = useContext(UsuarioContext);

    const [formValidated, setFormValidated] = useState(false);
    const titulo = objeto.id ? "Edição de Usuário" : "Cadastro de Usuário";

    const handleChange = (e) => {
        const { id, value } = e.target;
        setObjeto({ ...objeto, [id]: value });
    };

    // 2. Submissão (POST ou PUT)
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
            
            let dadosParaEnvio = { ...objeto };
            
            if (metodo === 'PUT') {
                 delete dadosParaEnvio.email;
                 delete dadosParaEnvio.senha;
            }
            
            let retornoAPI = await cadastrarUsuarioAPI(dadosParaEnvio, metodo);
            
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            
            if (retornoAPI.status === 'success') {
                setExibirTabela(true); // Volta para a tabela
                recuperarUsuarios(); // Recarrega a lista
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
                    {/* Campo ID (Somente leitura) */}
                    {objeto.id && (
                        <Col md={3}>
                            <CampoEntrada id="id" label="Código" tipo="text" value={objeto.id || ''} readOnly={true} />
                        </Col>
                    )}
                    
                    {/* Campo Nome */}
                    <Col md={objeto.id ? 9 : 6}>
                        <CampoEntrada id="nome" label="Nome Completo" tipo="text" value={objeto.nome} onChange={handleChange} required msgvalida="O nome é obrigatório" />
                    </Col>
                    
                    {/* Campo Curso */}
                    <Col md={objeto.id ? 12 : 6}>
                        <CampoEntrada id="curso" label="Curso" tipo="text" value={objeto.curso} onChange={handleChange} required msgvalida="Informe o curso" />
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    {/* Campo Email (POST) */}
                    {!objeto.id && (
                        <Col md={6}>
                            <CampoEntrada id="email" label="Email" tipo="email" value={objeto.email} onChange={handleChange} required msgvalida="Informe um email válido" />
                        </Col>
                    )}
                    
                    {/* Campo Senha (POST) */}
                    {!objeto.id && (
                        <Col md={6}>
                            <CampoEntrada id="senha" label="Senha" tipo="password" value={objeto.senha} onChange={handleChange} required msgvalida="Informe uma senha segura" />
                        </Col>
                    )}
                </Row>

                {/* Botões de Ação */}
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