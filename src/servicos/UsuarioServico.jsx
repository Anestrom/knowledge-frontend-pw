export const getUsuariosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario`,
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
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario/${codigo}`,
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
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario/${codigo}`,
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
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}