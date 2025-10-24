// src/servicos/MateriaServico.jsx

const ENDERECO_API = `${process.env.REACT_APP_ENDERECO_API}/materia`; 

export const getMateriasAPI = async () => {
    const response = await fetch(ENDERECO_API, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const deleteMateriaAPI = async id => {
    const response = await fetch(`${ENDERECO_API}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const getMateriaPorIdAPI = async id => {
    const response = await fetch(`${ENDERECO_API}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const cadastrarMateriaAPI = async (objeto, metodo) => {
    // Define o endpoint: /materia para POST, /materia/{id} para PUT
    const endpoint = metodo === 'POST' 
        ? ENDERECO_API
        : `${ENDERECO_API}/${objeto.id}`;

    const response = await fetch(endpoint, {
        method: metodo, 
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