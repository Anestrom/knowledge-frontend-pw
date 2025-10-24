const ENDERECO_API = `${process.env.REACT_APP_ENDERECO_API}/usuario`; 

export const getUsuariosAPI = async () => {
    const response = await fetch(ENDERECO_API,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getUsuariosPorIdAPI = async codigo => {
    const response = await fetch(`${ENDERECO_API}/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteUsuarioAPI = async codigo => {
    const response = await fetch(`${ENDERECO_API}/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastrarUsuarioAPI = async (objeto, metodo) => {

    let endpoint = ENDERECO_API;
    
    if (metodo === 'PUT' && objeto.id) {
        endpoint = `${ENDERECO_API}/${objeto.id}`;
    }
    
    const response = await fetch(endpoint, {
        method: metodo, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        return { status: "error", message: errorData.message || `Erro HTTP: ${response.status}` };
    }
    
    const data = await response.json();
    
    return { status: "success", message: data.message || "Operação realizada", objeto: data.objeto || data };
}