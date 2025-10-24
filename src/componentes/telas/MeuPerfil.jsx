import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsuarioContext from './usuario/UsuarioContext';
import Formulario from './usuario/Formulario';
import Alerta from '../comuns/Alerta';
import { getUsuariosPorIdAPI } from '../../servicos/UsuarioServico';

function MeuPerfil() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [objeto, setObjeto] = useState({ id: '', nome: '', email: '', senha: '', curso: '' });
    
    const recuperarPerfil = useCallback(async () => {
        if (id) {
            const user = await getUsuariosPorIdAPI(id);
            if (user) {
                delete user.senha; 
                setObjeto(user); 
            } else {
                setAlerta({ status: "error", message: "Perfil não encontrado." });

            }
        }
    }, [id]);

    useEffect(() => {
        recuperarPerfil();
    }, [recuperarPerfil]);

    const mockRecuperarUsuarios = () => {
        recuperarPerfil(); 
    };

    const contextValue = {
        alerta, setAlerta,
        objeto, setObjeto,

        setExibirTabela: () => setAlerta({ status: "success", message: "Perfil atualizado com sucesso." }),
        recuperarUsuarios: mockRecuperarUsuarios,
    };

    return (
        <UsuarioContext.Provider value={contextValue}>
            <div className='p-4'>
                <h1 className='mb-4'>Meu Perfil (ID: {id})</h1>
                <Alerta alerta={alerta} />
                {objeto.id && <Formulario />}
            </div>
        </UsuarioContext.Provider>
    );
}

export default MeuPerfil;