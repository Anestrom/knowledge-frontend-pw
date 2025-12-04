import { getToken } from './AuthServico';

const ENDERECO_API = `${process.env.REACT_APP_ENDERECO_API}/usuario`;

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
});

export const getUsuariosAPI = async () => {
    const response = await fetch(ENDERECO_API, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const getUsuariosPorIdAPI = async codigo => {
    const response = await fetch(`${ENDERECO_API}/${codigo}`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const deleteUsuarioAPI = async codigo => {
    const response = await fetch(`${ENDERECO_API}/${codigo}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};

export const cadastrarUsuarioAPI = async (objeto, metodo) => {
    let endpoint = ENDERECO_API;
    if (metodo === 'PUT' && objeto.id) {
        endpoint = `${ENDERECO_API}/${objeto.id}`;
    }
    const response = await fetch(endpoint, {
        method: metodo,
        headers: getHeaders(),
        body: JSON.stringify(objeto),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
    }
    const data = await response.json();
    return { status: "success", message: data.message || "Operação realizada", objeto: data.objeto || data };
};
