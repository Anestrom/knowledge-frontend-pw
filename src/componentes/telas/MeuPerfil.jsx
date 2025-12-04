import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import UsuarioContext from './usuario/UsuarioContext';
import Formulario from './usuario/Formulario';
import Alerta from '../comuns/Alerta';
import { getUsuariosPorIdAPI } from '../../servicos/UsuarioServico';
import { getUser } from '../../servicos/AuthServico';
import { PersonCircle } from 'react-bootstrap-icons';

function MeuPerfil() {
    const user = getUser();
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [objeto, setObjeto] = useState({ id: '', nome: '', email: '', senha: '', curso: '' });

    const recuperarPerfil = useCallback(async () => {
        if (user?.id) {
            const userData = await getUsuariosPorIdAPI(user.id);
            if (userData) {
                delete userData.senha;
                setObjeto(userData);
            } else {
                setAlerta({ status: "error", message: "Perfil não encontrado." });
            }
        }
    }, [user?.id]);

    useEffect(() => {
        recuperarPerfil();
    }, [recuperarPerfil]);

    const contextValue = {
        alerta, setAlerta,
        objeto, setObjeto,
        setExibirTabela: () => setAlerta({ status: "success", message: "Perfil atualizado com sucesso." }),
        recuperarUsuarios: recuperarPerfil,
    };

    return (
        <UsuarioContext.Provider value={contextValue}>
            <Container className="py-4">
                <h1 className="fw-bold text-primary mb-4">
                    <PersonCircle className="me-2" />Meu Perfil
                </h1>
                <Alerta alerta={alerta} />
                {objeto.id && <Formulario />}
            </Container>
        </UsuarioContext.Provider>
    );
}

export default MeuPerfil;
