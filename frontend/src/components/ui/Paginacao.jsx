import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "../../styles/ui/Paginacao.css";

const Paginacao = ({ paginaAtual, totalPaginas, aoMudarPagina }) => {
    return (
        <footer className="rodape-paginacao-ui">
            <span>
                Página <strong>{paginaAtual}</strong> de{" "}
                <strong>{totalPaginas}</strong>
            </span>

            <div className="controles-paginacao-ui">
                <button
                    type="button"
                    className="botao-paginacao-ui"
                    disabled={paginaAtual === 1}
                    onClick={() => aoMudarPagina(paginaAtual - 1)}
                    aria-label="Página anterior"
                >
                    <HiChevronLeft aria-hidden="true" />
                </button>

                {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
                    (numeroPagina) => (
                        <button
                            key={numeroPagina}
                            type="button"
                            className={`numero-paginacao-ui ${paginaAtual === numeroPagina ? "ativo" : ""
                                }`}
                            onClick={() => aoMudarPagina(numeroPagina)}
                        >
                            {numeroPagina}
                        </button>
                    )
                )}

                <button
                    type="button"
                    className="botao-paginacao-ui"
                    disabled={paginaAtual === totalPaginas}
                    onClick={() => aoMudarPagina(paginaAtual + 1)}
                    aria-label="Próxima página"
                >
                    <HiChevronRight aria-hidden="true" />
                </button>
            </div>
        </footer>
    );
};

export default Paginacao;