
import { Form } from 'react-bootstrap';

function CampoEntrada({ id, label, tipo, value, onChange, required, readOnly, msgvalida }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                id={id}
                name={id}
                type={tipo}
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
                placeholder={readOnly ? value : ''} 
            />

            <Form.Control.Feedback type="invalid">
                {msgvalida}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default CampoEntrada;