import React from 'react';
import { Form } from 'react-bootstrap';

function CampoEntradaTextArea({ id, label, value, onChange, required, readOnly, msgvalida, linhas }) {
    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                id={id}
                name={id}
                as="textarea" 
                rows={linhas || 3} 
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
            />
            <Form.Control.Feedback type="invalid">
                {msgvalida}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default CampoEntradaTextArea;