import "../../styles/ui/CabecalhoPagina.css";

const CabecalhoPagina = ({ rotulo, titulo, descricao }) => {
    return (
        <header className="cabecalho-pagina">
            <div className="cabecalho-pagina-linha" aria-hidden="true" />
            <div>
                <p className="cabecalho-pagina-rotulo">{rotulo}</p>
                <h1>{titulo}</h1>
                {descricao && <p className="cabecalho-pagina-descricao">{descricao}</p>}
            </div>
        </header>
    );
};

export default CabecalhoPagina;