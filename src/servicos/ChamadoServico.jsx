const ENDERECO_API = `${process.env.REACT_APP_ENDERECO_API}/chamado`;

export const getTodosChamadosAPI = async () => {
    const response = await fetch(ENDERECO_API, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const getChamadosAbertosAPI = async () => {
    const response = await fetch(`${ENDERECO_API}/aberto`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const deleteChamadoAPI = async id => {
    const response = await fetch(`${ENDERECO_API}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const abrirChamadoAPI = async (objeto) => {
    const response = await fetch(ENDERECO_API, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto), 
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
}

export const aceitarChamadoAPI = async (id, id_mentor) => {
    const response = await fetch(`${ENDERECO_API}/aceitar/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_mentor: id_mentor }), 
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
}

// 6. PUT: Finalizar Chamado
export const finalizarChamadoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/finalizar/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
        // Não precisa de Body
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
}