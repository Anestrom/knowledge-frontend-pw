const ENDERECO_API_BASE = `${process.env.REACT_APP_ENDERECO_API}`;

export const getAssociacaoUsuarioAPI = async (id_usuario) => {
    const response = await fetch(`${ENDERECO_API_BASE}/usuariomateria/${id_usuario}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    }
    return [];
}

export const criarAssociacaoUsuarioAPI = async (id_user, id_subject, user_type) => {
    const response = await fetch(`${ENDERECO_API_BASE}/usuariomateria`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`${ENDERECO_API_BASE}/usuariomateria/${id_associacao}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    if (response.status === 204) {
        return { status: "success", message: "Associação removida com sucesso." };
    }

    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
}