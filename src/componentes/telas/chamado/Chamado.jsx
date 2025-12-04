import React, { useState, useEffect, useCallback } from 'react';
import ChamadoContext from './ChamadoContext';
import { getTodosChamadosAPI, deleteChamadoAPI, aceitarChamadoAPI, finalizarChamadoAPI, abrirChamadoAPI, getChamadosAbertosAPI, getMeusChamadosAPI } from '../../../servicos/ChamadoServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';

function Chamado({ filtro }) {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [carregando, setCarregando] = useState(false);

    const [objeto, setObjeto] = useState({
        id: '', id_aprendiz: '', id_materia: '', localizacao: '', duvida_detalhes: ''
    });

    const recuperarChamados = useCallback(async () => {
        setCarregando(true);
        let lista;

        try {
            if (filtro === "ABERTO") {
                lista = await getChamadosAbertosAPI();
            } else if (filtro === "MEUS") {
                lista = await getMeusChamadosAPI()
            } else {
                lista = await getTodosChamadosAPI(); // Chamada para Histórico Completo
            }

            setListaObjetos(lista && Array.isArray(lista) ? lista : []);
            setAlerta({ status: "success", message: "" });
        } catch (error) {
            setListaObjetos([]);
            setAlerta({ status: "error", message: "Falha ao carregar dados da API." });
        } finally {
            setCarregando(false);
        }
    }, [filtro]);

    // DELETE
    const remover = async id => {
        if (window.confirm('Deseja remover este Chamado?')) {
            let retornoAPI = await deleteChamadoAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarChamados();
        }
    }

    // PUT
    const acaoChamado = async (id, acao, id_mentor = null) => {
        let retornoAPI;
        if (acao === 'aceitar') {
            if (!id_mentor) {
                return setAlerta({ status: "error", message: "ID do Mentor é necessário para aceitar." });
            }
            retornoAPI = await aceitarChamadoAPI(id, id_mentor);
        } else if (acao === 'finalizar') {
            retornoAPI = await finalizarChamadoAPI(id);
        }

        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        recuperarChamados();
    }

    // POS
    const novoObjeto = () => {
        setObjeto({ id: '', id_aprendiz: '', id_materia: '', localizacao: '', duvida_detalhes: '' });
        setExibirTabela(false);
    }

    useEffect(() => {
        recuperarChamados();
    }, [recuperarChamados]);

    return (
        <ChamadoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                objeto, setObjeto,
                exibirTabela, setExibirTabela,

                remover,
                acaoChamado,
                novoObjeto,
                recuperarChamados,
                abrirChamadoAPI: abrirChamadoAPI,
            }
        }>
            {carregando ? <Carregando /> : (
                exibirTabela ? <Tabela /> : <Formulario />
            )}
        </ChamadoContext.Provider>
    );
}

export default Chamado;