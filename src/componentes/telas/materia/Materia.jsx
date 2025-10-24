import React, { useState, useEffect, useCallback } from 'react';
import MateriaContext from './MateriaContext';
import { getMateriasAPI, deleteMateriaAPI, cadastrarMateriaAPI } from '../../../servicos/MateriaServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';

function Materia() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);

    const [carregando, setCarregando] = useState(true);

    const [objeto, setObjeto] = useState({ id: '', nome: '' });

    const recuperarMaterias = useCallback(async () => {
        setCarregando(true)
        const lista = await getMateriasAPI();
        setListaObjetos(lista);
        setCarregando(false)
    }, []);

    // DELETE
    const remover = async id => {
        if (window.confirm('Deseja remover esta Matéria? ATENÇÃO: Se estiver associada a perfis ou chamados, pode falhar!')) {
            let retornoAPI = await deleteMateriaAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarMaterias();
        }
    }

    // PUT 
    const editar = (materiaParaEditar) => {
        setObjeto(materiaParaEditar);
        setExibirTabela(false);
    }

    // POST 
    const novoObjeto = () => {
        setObjeto({ id: '', nome: '' });
        setExibirTabela(false);
    }

    useEffect(() => {
        recuperarMaterias();
    }, [recuperarMaterias]);

    if (carregando) {
        return <Carregando />;
    }

    return (
        <MateriaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                objeto, setObjeto,
                exibirTabela, setExibirTabela,
                remover, editar, novoObjeto, recuperarMaterias,
                cadastrarMateriaAPI
            }
        }>
            {exibirTabela ? <Tabela /> : <Formulario />}
        </MateriaContext.Provider>
    );
}

export default Materia;