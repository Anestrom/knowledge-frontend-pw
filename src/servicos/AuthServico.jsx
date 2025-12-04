const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;

export const loginAPI = async (email, senha) => {
    console.log('🔍 LOGIN - Enviando:', { email, senha });
    console.log('🔍 LOGIN - URL:', `${ENDERECO_API}/auth/login`);
    
    const response = await fetch(`${ENDERECO_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });
    
    const data = await response.json();
    console.log('🔍 LOGIN - Resposta:', data);
    
    if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

export const registerAPI = async (usuario) => {
    console.log('🔍 REGISTER - Enviando:', usuario);
    console.log('🔍 REGISTER - URL:', `${ENDERECO_API}/auth/register`);
    
    const response = await fetch(`${ENDERECO_API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    
    const data = await response.json();
    console.log('🔍 REGISTER - Resposta:', data);
    
    return data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getToken();

export const isAdmin = () => {
    const user = getUser();
    return user?.tipo_usuario === 'admin';
};
