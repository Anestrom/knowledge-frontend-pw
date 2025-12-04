import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { loginAPI } from '../../../servicos/AuthServico';
import { BookFill, EnvelopeFill, LockFill } from 'react-bootstrap-icons';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginAPI(email, senha);
        if (result.status === 'success') {
            navigate('/');
        } else {
            setErro(result.message);
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center bg-primary" style={{minHeight: '100vh'}}>
            <Card style={{width: '450px'}} className="shadow-lg">
                <Card.Body className="p-5">
                    <div className="text-center mb-4">
                        <BookFill size={60} className="text-primary mb-3" />
                        <h2 className="fw-bold text-primary">Knowledge</h2>
                        <p className="text-muted">Faça login para continuar</p>
                    </div>
                    
                    {erro && <Alert variant="danger" dismissible onClose={() => setErro('')}>{erro}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                                <EnvelopeFill className="me-2" />Email
                            </Form.Label>
                            <Form.Control 
                                size="lg"
                                type="email" 
                                placeholder="seu@email.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">
                                <LockFill className="me-2" />Senha
                            </Form.Label>
                            <Form.Control 
                                size="lg"
                                type="password" 
                                placeholder="••••••••" 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        
                        <Button variant="primary" size="lg" type="submit" className="w-100 mb-3">
                            Entrar
                        </Button>
                    </Form>
                    
                    <div className="text-center">
                        <span className="text-muted">Não tem conta? </span>
                        <a href="/register" className="text-primary fw-semibold text-decoration-none">Cadastre-se</a>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
