import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Row, Col, Button, Form, Badge, Alert } from 'react-bootstrap';
import { PersonCircle, PencilSquare, CheckLg, XLg, BookFill, EnvelopeFill } from 'react-bootstrap-icons';
import { getUsuariosPorIdAPI, cadastrarUsuarioAPI } from '../../servicos/UsuarioServico';
import { getUser, isAdmin } from '../../servicos/AuthServico';
import CampoEntrada from '../comuns/CampoEntrada';

function MeuPerfil() {
    const user = getUser();
    const admin = isAdmin();
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [objeto, setObjeto] = useState({ id: '', nome: '', email: '', curso: '', senha: '' });
    const [editando, setEditando] = useState(false);
    const [formValidated, setFormValidated] = useState(false);

    const recuperarPerfil = useCallback(async () => {
        if (user?.id) {
            const userData = await getUsuariosPorIdAPI(user.id);
            if (userData) {
                delete userData.senha;
                setObjeto({ ...userData, senha: '' });
            } else {
                setAlerta({ status: "error", message: "Perfil não encontrado." });
            }
        }
    }, [user?.id]);

    useEffect(() => {
        recuperarPerfil();
    }, [recuperarPerfil]);

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
            let dadosParaEnvio = { ...objeto };
            delete dadosParaEnvio.email;

            if (!dadosParaEnvio.senha || dadosParaEnvio.senha.trim() === '') {
                delete dadosParaEnvio.senha;
            }

            console.log('Dados enviados:', dadosParaEnvio); // DEBUG

            const retornoAPI = await cadastrarUsuarioAPI(dadosParaEnvio, 'PUT');
            console.log('Resposta API:', retornoAPI); // DEBUG

            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

            if (retornoAPI.status === 'success') {
                setEditando(false);
                recuperarPerfil();
            }
        } catch (error) {
            console.error('Erro:', error); // DEBUG
            setAlerta({ status: 'error', message: "Erro na requisição: " + error.message });
        }
    };


    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow border-0 mb-4">
                        <Card.Body className="text-center p-5">
                            <PersonCircle size={100} className="text-warning mb-3" />
                            <h2 className="fw-bold text-warning mb-2">{objeto.nome || 'Carregando...'}</h2>
                            <p className="text-muted mb-3">
                                <EnvelopeFill className="me-2" />{objeto.email}
                            </p>
                            {admin && (
                                <Badge bg="warning" text="dark" className="fs-6">
                                    Administrador
                                </Badge>
                            )}
                        </Card.Body>
                    </Card>

                    {alerta.message && (
                        <Alert
                            variant={alerta.status === 'success' ? 'success' : 'danger'}
                            dismissible
                            onClose={() => setAlerta({ status: "", message: "" })}
                        >
                            {alerta.message}
                        </Alert>
                    )}

                    <Card className="shadow border-0">
                        <Card.Header className="bg-warning text-black d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                <PersonCircle className="me-2" />Informações Pessoais
                            </h5>
                            {!editando ? (
                                <Button variant="outline-dark" size="sm" onClick={() => setEditando(true)}>
                                    <PencilSquare className="me-1" />Editar
                                </Button>
                            ) : (
                                <Button variant="outline-light" size="sm" onClick={() => setEditando(false)}>
                                    <XLg className="me-1" />Cancelar
                                </Button>
                            )}
                        </Card.Header>
                        <Card.Body className="p-4">
                            {!editando ? (
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <strong className="text-muted">Nome Completo:</strong>
                                        <p className="fs-5 mb-0">{objeto.nome}</p>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <strong className="text-muted">Email:</strong>
                                        <p className="fs-5 mb-0">{objeto.email}</p>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <strong className="text-muted">Curso:</strong>
                                        <p className="fs-5 mb-0">
                                            <BookFill className="me-2 text-warning" />
                                            {objeto.curso}
                                        </p>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <strong className="text-muted">ID do Usuário:</strong>
                                        <p className="fs-5 mb-0">
                                            <Badge bg="secondary">#{objeto.id}</Badge>
                                        </p>
                                    </Col>
                                </Row>
                            ) : (
                                <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <CampoEntrada
                                                id="nome"
                                                label="Nome Completo"
                                                tipo="text"
                                                value={objeto.nome}
                                                onChange={handleChange}
                                                required
                                                msgvalida="O nome é obrigatório"
                                            />
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <CampoEntrada
                                                id="email"
                                                label="Email"
                                                tipo="email"
                                                value={objeto.email}
                                                readOnly={true}
                                                helpText="Email não pode ser alterado"
                                            />
                                        </Col>
                                        <Col md={6} className="mb-4">
                                            <CampoEntrada
                                                id="curso"
                                                label="Curso"
                                                tipo="text"
                                                value={objeto.curso}
                                                onChange={handleChange}
                                                required
                                                msgvalida="Informe o curso"
                                            />
                                        </Col>
                                        <Col md={6} className="mb-4">
                                            <CampoEntrada
                                                id="senha"
                                                label="Nova Senha (opcional)"
                                                tipo="password"
                                                value={objeto.senha || ''}
                                                onChange={handleChange}
                                                placeholder="Deixe em branco para manter a atual"
                                                helpText="Preencha apenas se desejar alterar a senha"
                                            />
                                        </Col>
                                    </Row>
                                    <div className="d-flex gap-2">
                                        <Button type="submit" variant="success">
                                            <CheckLg className="me-1" />Salvar Alterações
                                        </Button>
                                        <Button variant="secondary" onClick={() => setEditando(false)}>
                                            <XLg className="me-1" />Cancelar
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MeuPerfil;
