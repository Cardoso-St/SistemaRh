import { useEffect, useRef, useState } from "react";
import {
    HiCheck,
    HiChevronDown,
    HiOutlineMagnifyingGlass,
    HiOutlineXMark,
} from "react-icons/hi2";
import "../../styles/ui/FiltroMultiSelect.css";
import { normalizarTexto } from "../../utils/Normalizar.js";

const FiltroMultiSelect = ({
    rotulo,
    opcoes = [],
    selecionados = [],
    aoAlterar,
    desabilitado = false,
}) => {
    const [aberto, setAberto] = useState(false);
    const [busca, setBusca] = useState("");
    const containerRef = useRef(null);

    // Fecha ao clicar fora do dropdown
    useEffect(() => {
        const aoClicarFora = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setAberto(false);
                setBusca("");
            }
        };

        document.addEventListener("mousedown", aoClicarFora);
        return () => document.removeEventListener("mousedown", aoClicarFora);
    }, []);

    const opcoesFiltradas = opcoes.filter((opcao) =>
        normalizarTexto(opcao).includes(normalizarTexto(busca.trim()))
    );

    const alternarOpcao = (opcao) => {
        if (selecionados.includes(opcao)) {
            aoAlterar(selecionados.filter((item) => item !== opcao));
        } else {
            aoAlterar([...selecionados, opcao]);
        }
    };

    const limparSelecao = (event) => {
        event.stopPropagation();
        aoAlterar([]);
    };

    const textoExibido = () => {
        if (selecionados.length === 0) return rotulo;
        if (selecionados.length === 1) return selecionados[0];
        return `${selecionados[0]} (+${selecionados.length - 1})`;
    };

    return (
        <div
            ref={containerRef}
            className={`multiselect-ui ${aberto ? "aberto" : ""} ${desabilitado ? "desabilitado" : ""
                }`}
        >
            <button
                type="button"
                className={`gatilho-multiselect-ui ${selecionados.length > 0 ? "com-filtro" : ""
                    }`}
                disabled={desabilitado}
                onClick={() => setAberto((prev) => !prev)}
                aria-expanded={aberto}
            >
                <span className="texto-gatilho-multiselect">{textoExibido()}</span>

                <div className="acoes-gatilho-multiselect">
                    {selecionados.length > 0 && !desabilitado && (
                        <span
                            role="button"
                            tabIndex={0}
                            className="limpar-multiselect-ui"
                            title="Limpar filtro"
                            onClick={limparSelecao}
                            onKeyDown={(e) => e.key === "Enter" && limparSelecao(e)}
                        >
                            <HiOutlineXMark aria-hidden="true" />
                        </span>
                    )}

                    <HiChevronDown className="seta-multiselect-ui" aria-hidden="true" />
                </div>
            </button>

            {aberto && !desabilitado && (
                <div className="menu-multiselect-ui">
                    {opcoes.length > 5 && (
                        <div className="busca-multiselect-ui">
                            <HiOutlineMagnifyingGlass aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Filtrar opções..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                autoFocus
                            />
                        </div>
                    )}

                    <ul className="lista-opcoes-multiselect-ui">
                        {opcoesFiltradas.map((opcao) => {
                            const marcado = selecionados.includes(opcao);

                            return (
                                <li key={opcao}>
                                    <button
                                        type="button"
                                        className={`opcao-multiselect-ui ${marcado ? "marcado" : ""
                                            }`}
                                        onClick={() => alternarOpcao(opcao)}
                                    >
                                        <span className="caixa-check-multiselect">
                                            {marcado && <HiCheck aria-hidden="true" />}
                                        </span>
                                        <span className="nome-opcao-multiselect">{opcao}</span>
                                    </button>
                                </li>
                            );
                        })}

                        {opcoesFiltradas.length === 0 && (
                            <li className="vazio-multiselect-ui">Nenhuma opção encontrada</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FiltroMultiSelect;