import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BookFill, BellFill, JournalBookmarkFill, PersonCircle, QuestionCircleFill, LightbulbFill } from 'react-bootstrap-icons';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container className="py-5">
            <Card className="text-center shadow-lg border-0 mb-5" bg="primary" text="white">
                <Card.Body className="p-5">
                    <BookFill size={80} className="mb-3" />
                    <h1 className="display-3 fw-bold mb-3">Knowledge</h1>
                    <p className="lead fs-4">Conectando alunos que precisam de ajuda com mentores que dominam o assunto</p>
                    <p className="fs-5">Aprenda, ensine e cresça junto!</p>
                </Card.Body>
            </Card>

            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="h-100 shadow border-0 text-center">
                        <Card.Body className="p-4">
                            <BellFill size={70} className="text-primary mb-3" />
                            <Card.Title className="fw-bold fs-4 text-primary">Chamados Abertos</Card.Title>
                            <Card.Text className="text-muted mb-4">
                                Veja quem precisa de ajuda agora e ofereça sua mentoria
                            </Card.Text>
                            <Button variant="primary" size="lg" onClick={() => navigate('/chamado/aberto')}>
                                Ver Chamados
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow border-0 text-center">
                        <Card.Body className="p-4">
                            <JournalBookmarkFill size={70} className="text-success mb-3" />
                            <Card.Title className="fw-bold fs-4 text-success">Matérias</Card.Title>
                            <Card.Text className="text-muted mb-4">
                                Explore as matérias disponíveis e adicione ao seu perfil
                            </Card.Text>
                            <Button variant="success" size="lg" onClick={() => navigate('/materia')}>
                                Ver Matérias
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow border-0 text-center">
                        <Card.Body className="p-4">
                            <PersonCircle size={70} className="text-warning mb-3" />
                            <Card.Title className="fw-bold fs-4 text-warning">Meu Perfil</Card.Title>
                            <Card.Text className="text-muted mb-4">
                                Gerencie suas informações e matérias de interesse
                            </Card.Text>
                            <Button variant="warning" size="lg" onClick={() => navigate('/meu-perfil')}>
                                Ver Perfil
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="shadow border-0">
                <Card.Body className="p-5">
                    <h3 className="fw-bold text-primary mb-4">
                        <LightbulbFill className="me-2" />Como Funciona?
                    </h3>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Card bg="light" className="h-100">
                                <Card.Body>
                                    <h5 className="text-danger fw-bold">
                                        <QuestionCircleFill className="me-2" />Precisa de Ajuda?
                                    </h5>
                                    <p className="mb-0">Abra um chamado informando a matéria e aguarde um mentor aceitar. Você será notificado e poderá iniciar a sessão de mentoria!</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card bg="light" className="h-100">
                                <Card.Body>
                                    <h5 className="text-success fw-bold">
                                        <BookFill className="me-2" />Quer Ajudar?
                                    </h5>
                                    <p className="mb-0">Navegue pelos chamados abertos, aceite aqueles que você domina e ganhe créditos e avaliações positivas!</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
