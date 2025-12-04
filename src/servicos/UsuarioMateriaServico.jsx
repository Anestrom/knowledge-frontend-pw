import { getToken } from './AuthServico';

const ENDERECO_API = `${process.env.REACT_APP_ENDERECO_API}`;

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
});

export const getAssociacaoUsuarioAPI = async (id_usuario) => {
    const response = await fetch(`${ENDERECO_API}/usuariomateria/${id_usuario}`, {
        method: "GET",
        headers: getHeaders()
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    }
    return [];
}

export const criarAssociacaoUsuarioAPI = async (id_user, id_subject, user_type) => {
    const response = await fetch(`${ENDERECO_API}/usuariomateria`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ id_user, id_subject, user_type }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
    }

    const data = await response.json();
    return { status: "success", message: "Associação criada com sucesso!", objeto: data.objeto || data };
}

export const deleteAssociacaoPI = async (id_associacao) => {
    const response = await fetch(`${ENDERECO_API}/usuariomateria/${id_associacao}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (response.status === 204) {
        return { status: "success", message: "Associação removida com sucesso." };
    }

    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
}