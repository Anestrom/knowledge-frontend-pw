import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { registerAPI } from '../../../servicos/AuthServico';
import { PersonPlusFill, EnvelopeFill, LockFill, BookFill } from 'react-bootstrap-icons';

function Register() {
    const [form, setForm] = useState({ nome: '', email: '', senha: '', curso: '' });
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerAPI(form);
        if (result.status === 'success') {
            setMensagem({ tipo: 'success', texto: 'Cadastro realizado! Redirecionando...' });
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setMensagem({ tipo: 'danger', texto: result.message });
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center bg-success" style={{minHeight: '100vh'}}>
            <Card style={{width: '450px'}} className="shadow-lg">
                <Card.Body className="p-5">
                    <div className="text-center mb-4">
                        <PersonPlusFill size={60} className="text-success mb-3" />
                        <h2 className="fw-bold text-success">Criar Conta</h2>
                        <p className="text-muted">Junte-se à comunidade</p>
                    </div>
                    
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo} dismissible onClose={() => setMensagem({ tipo: '', texto: '' })}>
                            {mensagem.texto}
                        </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                                <PersonPlusFill className="me-2" />Nome Completo
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Seu nome" 
                                value={form.nome} 
                                onChange={(e) => setForm({...form, nome: e.target.value})} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                                <EnvelopeFill className="me-2" />Email
                            </Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="seu@email.com" 
                                value={form.email} 
                                onChange={(e) => setForm({...form, email: e.target.value})} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                                <LockFill className="me-2" />Senha
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="••••••••" 
                                value={form.senha} 
                                onChange={(e) => setForm({...form, senha: e.target.value})} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">
                                <BookFill className="me-2" />Curso
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ex: Ciência da Computação" 
                                value={form.curso} 
                                onChange={(e) => setForm({...form, curso: e.target.value})} 
                                required 
                            />
                        </Form.Group>
                        
                        <Button variant="success" size="lg" type="submit" className="w-100 mb-3">
                            Cadastrar
                        </Button>
                    </Form>
                    
                    <div className="text-center">
                        <span className="text-muted">Já tem conta? </span>
                        <a href="/login" className="text-success fw-semibold text-decoration-none">Faça login</a>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;
