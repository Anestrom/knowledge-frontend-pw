
import React, { useState, useEffect, useCallback } from 'react';
import UsuarioContext from './UsuarioContext';
import { getUsuariosAPI, deleteUsuarioAPI } from '../../../servicos/UsuarioServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';

function Usuario() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true); // Controla a visualização

    const [carregando, setCarregando] = useState(true);

    // Objeto em Edição/Criação
    const [objeto, setObjeto] = useState({
        id: '', nome: '', email: '', senha: '', curso: '', avaliacao_media: '', creditos_saber: ''
    });

    // Função de recuperação de dados
    const recuperarUsuarios = useCallback(async () => {
        setCarregando(true);
        const lista = await getUsuariosAPI();
        setListaObjetos(lista);
        setCarregando(false);
    }, []);

    // Função de remoção
    const remover = async codigo => {
        if (window.confirm('Deseja remover este usuário?')) {
            let retornoAPI = await deleteUsuarioAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarUsuarios(); // Recarrega a lista
        }
    }

    // Função para preparar a edição (chamada pela Tabela)
    const editar = (usuarioParaEditar) => {
        setObjeto(usuarioParaEditar);
        setExibirTabela(false); // Alterna para o Formulário
    }

    // Função para preparar o cadastro (chamada pela Tabela)
    const novoObjeto = () => {
        setObjeto({ // Limpa o objeto para o POST
            id: '', nome: '', email: '', senha: '', curso: ''
        });
        setExibirTabela(false); // Alterna para o Formulário
    }

    // Carrega a lista de usuários ao montar
    useEffect(() => {
        recuperarUsuarios();
    }, [recuperarUsuarios]);

    if (carregando) {
        return <Carregando />;
    }

    return (
        <UsuarioContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                objeto, setObjeto,
                exibirTabela, setExibirTabela,

                remover,
                editar,
                novoObjeto,
                recuperarUsuarios
            }
        }>
            {exibirTabela ? <Tabela /> : <Formulario />}
        </UsuarioContext.Provider>
    );
}

export default Usuario;