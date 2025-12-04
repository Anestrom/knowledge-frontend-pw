import { Container, Row, Col, Card } from 'react-bootstrap';
import { BookFill, QuestionCircleFill, LightbulbFill } from 'react-bootstrap-icons';

const Home = () => {

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
