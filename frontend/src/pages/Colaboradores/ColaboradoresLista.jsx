import { useState } from "react";
import {
    HiOutlineArchiveBox,
    HiOutlineExclamationTriangle,
    HiOutlineEye,
    HiOutlineMagnifyingGlass,
    HiOutlinePencilSquare,
    HiOutlinePlus,
    HiOutlineTrash,
    HiOutlineUsers,
    HiOutlineXMark,
} from "react-icons/hi2";
import CabecalhoPagina from "../../components/ui/CabecalhoPagina.jsx";
import Paginacao from "../../components/ui/Paginacao.jsx";
import SeloStatus from "../../components/ui/SeloStatus.jsx";
import "../../styles/pages/Colaboradores/ColaboradoresLista.css";
import { normalizarTexto } from "../../utils/Normalizar.js";

const municipiosBase = [
    "SEDE",
    "IGACI",
    "PINDOBA",
    "TANQUE D'ARCA",
    "BENTO DE ABREU",
    "BRANQUINHA",
    "CAMPESTRE",
    "SANTANA DO MUNDAÚ",
    "CANAPI",
];

const tiposVinculo = [
    "CLT",
    "PJ",
    "Voluntário",
    "Prestador de serviços",
    "Colaborador associado",
];

const colaboradoresExemplo = [
    {
        id: 1,
        nome: "Ana Beatriz Souza",
        cpf: "123.546.789-00",
        matricula: "RH-001",
        cargo: "Assistente Administrativo",
        vinculo: "CLT",
        municipio: "SEDE",
        secretaria: "Administração",
        departamento: "Recursos Humanos",
        status: "Ativo",
    },
    {
        id: 2,
        nome: "Carlos Eduardo Lima",
        cpf: "234.567.890-11",
        matricula: "RH-002",
        cargo: "Educador Social",
        vinculo: "Colaborador associado",
        municipio: "IGACI",
        secretaria: "Assistência Social",
        departamento: "Projetos Sociais",
        status: "Ativo",
    },
    {
        id: 3,
        nome: "Mariana Alves Costa",
        cpf: "345.678.901-22",
        matricula: "RH-003",
        cargo: "Psicóloga",
        vinculo: "Prestador de serviços",
        municipio: "PINDOBA",
        secretaria: "Saúde",
        departamento: "Acompanhamento",
        status: "Ativo",
    },
    {
        id: 4,
        nome: "João Pedro Santos",
        cpf: "456.789.012-33",
        matricula: "RH-004",
        cargo: "Auxiliar de Serviços Gerais",
        vinculo: "CLT",
        municipio: "CANAPI",
        secretaria: "Educação",
        departamento: "Operacional",
        status: "Afastado",
    },
    {
        id: 5,
        nome: "Luciana Ferreira",
        cpf: "567.890.123-44",
        matricula: "RH-005",
        cargo: "Coordenadora de Projetos",
        vinculo: "PJ",
        municipio: "BRANQUINHA",
        secretaria: "Administração",
        departamento: "Projetos",
        status: "Ativo",
    },
    {
        id: 6,
        nome: "Rafael Oliveira",
        cpf: "678.901.234-55",
        matricula: "RH-006",
        cargo: "Motorista",
        vinculo: "CLT",
        municipio: "SEDE",
        secretaria: "Administração",
        departamento: "Transportes",
        status: "Ativo",
    },
    {
        id: 7,
        nome: "Juliana Medeiros",
        cpf: "789.012.345-66",
        matricula: "RH-007",
        cargo: "Analista de RH",
        vinculo: "CLT",
        municipio: "IGACI",
        secretaria: "Administração",
        departamento: "Recursos Humanos",
        status: "Ativo",
    },
    {
        id: 8,
        nome: "Diego Nascimento",
        cpf: "890.123.456-77",
        matricula: "RH-008",
        cargo: "Professor",
        vinculo: "Voluntário",
        municipio: "TANQUE D'ARCA",
        secretaria: "Educação",
        departamento: "Pedagógico",
        status: "Ativo",
    },
    {
        id: 9,
        nome: "Patrícia Gomes",
        cpf: "901.234.567-88",
        matricula: "RH-009",
        cargo: "Enfermeira",
        vinculo: "CLT",
        municipio: "CANAPI",
        secretaria: "Saúde",
        departamento: "Enfermagem",
        status: "Inativo",
    },
    {
        id: 10,
        nome: "Felipe Cardoso",
        cpf: "012.345.678-99",
        matricula: "RH-010",
        cargo: "Assistente Financeiro",
        vinculo: "CLT",
        municipio: "SEDE",
        secretaria: "Administração",
        departamento: "Financeiro",
        status: "Ativo",
    },
    {
        id: 11,
        nome: "Camila Fernandes",
        cpf: "111.222.333-44",
        matricula: "RH-011",
        cargo: "Assistente Social",
        vinculo: "CLT",
        municipio: "CAMPESTRE",
        secretaria: "Assistência Social",
        departamento: "Atendimento",
        status: "Ativo",
    },
    {
        id: 12,
        nome: "Rodrigo Alencar",
        cpf: "555.666.777-88",
        matricula: "RH-012",
        cargo: "Técnico de Enfermagem",
        vinculo: "Prestador de serviços",
        municipio: "SANTANA DO MUNDAÚ",
        secretaria: "Saúde",
        departamento: "Enfermagem",
        status: "Afastado",
    },
];

const ColaboradoresLista = () => {
    const [colaboradores, setColaboradores] = useState(colaboradoresExemplo);
    const [termoBusca, setTermoBusca] = useState("");
    const [vinculoSelecionado, setVinculoSelecionado] = useState("");
    const [municipioSelecionado, setMunicipioSelecionado] = useState("");
    const [secretariaSelecionada, setSecretariaSelecionada] = useState("");
    const [departamentoSelecionado, setDepartamentoSelecionado] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [colaboradorParaExcluir, setColaboradorParaExcluir] = useState(null);

    const itensPorPagina = 10;

    const secretariasDisponiveis = [
        ...new Set(
            colaboradores
                .filter(
                    (colaborador) =>
                        !municipioSelecionado ||
                        colaborador.municipio === municipioSelecionado
                )
                .map((colaborador) => colaborador.secretaria)
        ),
    ];

    const departamentosDisponiveis = [
        ...new Set(
            colaboradores
                .filter(
                    (colaborador) =>
                        (!municipioSelecionado ||
                            colaborador.municipio === municipioSelecionado) &&
                        (!secretariaSelecionada ||
                            colaborador.secretaria === secretariaSelecionada)
                )
                .map((colaborador) => colaborador.departamento)
        ),
    ];

    const colaboradoresFiltrados = colaboradores.filter((colaborador) => {
        const termoNormalizado = normalizarTexto(termoBusca.trim());

        const correspondeBusca =
            !termoNormalizado ||
            normalizarTexto(colaborador.nome).includes(termoNormalizado) ||
            normalizarTexto(colaborador.cpf).includes(termoNormalizado) ||
            normalizarTexto(colaborador.matricula).includes(termoNormalizado);

        const correspondeVinculo =
            !vinculoSelecionado || colaborador.vinculo === vinculoSelecionado;

        const correspondeMunicipio =
            !municipioSelecionado ||
            colaborador.municipio === municipioSelecionado;

        const correspondeSecretaria =
            !secretariaSelecionada ||
            colaborador.secretaria === secretariaSelecionada;

        const correspondeDepartamento =
            !departamentoSelecionado ||
            colaborador.departamento === departamentoSelecionado;

        return (
            correspondeBusca &&
            correspondeVinculo &&
            correspondeMunicipio &&
            correspondeSecretaria &&
            correspondeDepartamento
        );
    });

    const totalPaginas =
        Math.ceil(colaboradoresFiltrados.length / itensPorPagina) || 1;
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const colaboradoresPaginados = colaboradoresFiltrados.slice(
        indiceInicial,
        indiceInicial + itensPorPagina
    );

    const confirmarExclusao = (tipo) => {
        if (tipo === "inativar") {
            setColaboradores((listaAtual) =>
                listaAtual.map((colaborador) =>
                    colaborador.id === colaboradorParaExcluir.id
                        ? { ...colaborador, status: "Inativo" }
                        : colaborador
                )
            );
        } else if (tipo === "permanente") {
            setColaboradores((listaAtual) => {
                const novaLista = listaAtual.filter(
                    (colaborador) => colaborador.id !== colaboradorParaExcluir.id
                );
                const novoTotalPaginas =
                    Math.ceil(novaLista.length / itensPorPagina) || 1;
                if (paginaAtual > novoTotalPaginas) {
                    setPaginaAtual(novoTotalPaginas);
                }
                return novaLista;
            });
        }

        setColaboradorParaExcluir(null);
    };

    return (
        <section className="pagina-colaboradores">
            <CabecalhoPagina
                rotulo="GESTÃO DE PESSOAS"
                titulo="Colaboradores"
                descricao="Consulte, filtre e gerencie os registros de colaboradores da instituição."
            />

            <section className="painel-lista-colaboradores">
                <header className="cabecalho-painel-colaboradores">
                    <div className="titulo-lista-colaboradores">
                        <div className="icone-lista-colaboradores">
                            <HiOutlineUsers aria-hidden="true" />
                        </div>

                        <div>
                            <h2>Todos os colaboradores</h2>
                            <p>
                                Exibindo <strong>{colaboradoresPaginados.length}</strong> de{" "}
                                <strong>{colaboradoresFiltrados.length}</strong> registro(s)
                            </p>
                        </div>
                    </div>

                    <button
                        className="botao-novo-colaborador"
                        type="button"
                        aria-label="Novo colaborador"
                        title="Cadastrar novo colaborador"
                    >
                        <HiOutlinePlus aria-hidden="true" />
                        Novo
                    </button>
                </header>

                <div className="filtros-colaboradores">
                    <label className="campo-busca-lista">
                        <HiOutlineMagnifyingGlass aria-hidden="true" />

                        <input
                            type="search"
                            placeholder="Buscar por nome, CPF ou matrícula"
                            value={termoBusca}
                            onChange={(event) => {
                                setTermoBusca(event.target.value);
                                setPaginaAtual(1);
                            }}
                        />
                    </label>

                    <select
                        aria-label="Filtrar por tipo de vínculo"
                        value={vinculoSelecionado}
                        onChange={(event) => {
                            setVinculoSelecionado(event.target.value);
                            setPaginaAtual(1);
                        }}
                    >
                        <option value="">Todos os vínculos</option>

                        {tiposVinculo.map((vinculo) => (
                            <option key={vinculo} value={vinculo}>
                                {vinculo}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="Filtrar por município"
                        value={municipioSelecionado}
                        onChange={(event) => {
                            setMunicipioSelecionado(event.target.value);
                            setSecretariaSelecionada("");
                            setDepartamentoSelecionado("");
                            setPaginaAtual(1);
                        }}
                    >
                        <option value="">Todos os municípios</option>

                        {municipiosBase.map((municipio) => (
                            <option key={municipio} value={municipio}>
                                {municipio}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="Filtrar por secretaria"
                        value={secretariaSelecionada}
                        disabled={!municipioSelecionado}
                        onChange={(event) => {
                            setSecretariaSelecionada(event.target.value);
                            setDepartamentoSelecionado("");
                            setPaginaAtual(1);
                        }}
                    >
                        <option value="">Todas as secretarias</option>

                        {secretariasDisponiveis.map((secretaria) => (
                            <option key={secretaria} value={secretaria}>
                                {secretaria}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="Filtrar por departamento"
                        value={departamentoSelecionado}
                        disabled={!secretariaSelecionada}
                        onChange={(event) => {
                            setDepartamentoSelecionado(event.target.value);
                            setPaginaAtual(1);
                        }}
                    >
                        <option value="">Todos os departamentos</option>

                        {departamentosDisponiveis.map((departamento) => (
                            <option key={departamento} value={departamento}>
                                {departamento}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="area-tabela-lista">
                    <table className="tabela-lista-colaboradores">
                        <thead>
                            <tr>
                                <th>Colaborador</th>
                                <th>Cargo</th>
                                <th>Tipo de vínculo</th>
                                <th>Município</th>
                                <th>Status</th>
                                <th aria-label="Ações" />
                            </tr>
                        </thead>

                        <tbody>
                            {colaboradoresPaginados.map((colaborador) => (
                                <tr key={colaborador.id}>
                                    <td>
                                        <div className="identificacao-lista-colaborador">
                                            <span className="avatar-lista-colaborador">
                                                {colaborador.nome
                                                    .split(" ")
                                                    .slice(0, 2)
                                                    .map((nome) => nome[0])
                                                    .join("")}
                                            </span>

                                            <div>
                                                <strong>{colaborador.nome}</strong>
                                                <small>
                                                    {colaborador.matricula} · CPF: {colaborador.cpf}
                                                </small>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{colaborador.cargo}</td>

                                    <td>
                                        <span className="badge-vinculo-colaborador">
                                            {colaborador.vinculo}
                                        </span>
                                    </td>

                                    <td>
                                        <strong className="municipio-colaborador">
                                            {colaborador.municipio}
                                        </strong>

                                        <small className="departamento-colaborador">
                                            {colaborador.secretaria} · {colaborador.departamento}
                                        </small>
                                    </td>

                                    <td>
                                        <SeloStatus status={colaborador.status} />
                                    </td>

                                    <td>
                                        <div className="acoes-lista-colaborador">
                                            <button
                                                className="botao-acao-tabela botao-ver-perfil"
                                                type="button"
                                                aria-label={`Ver perfil de ${colaborador.nome}`}
                                                title="Ver perfil"
                                            >
                                                <HiOutlineEye aria-hidden="true" />
                                            </button>

                                            <button
                                                className="botao-acao-tabela botao-editar-colaborador"
                                                type="button"
                                                aria-label={`Editar ${colaborador.nome}`}
                                                title="Editar cadastro"
                                            >
                                                <HiOutlinePencilSquare aria-hidden="true" />
                                            </button>

                                            <button
                                                className="botao-acao-tabela botao-excluir-colaborador"
                                                type="button"
                                                aria-label={`Excluir ou inativar ${colaborador.nome}`}
                                                title="Excluir / Inativar"
                                                onClick={() => setColaboradorParaExcluir(colaborador)}
                                            >
                                                <HiOutlineTrash aria-hidden="true" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {colaboradoresFiltrados.length === 0 && (
                        <p className="mensagem-lista-vazia">
                            Nenhum colaborador encontrado para os filtros informados.
                        </p>
                    )}
                </div>

                <Paginacao
                    paginaAtual={paginaAtual}
                    totalPaginas={totalPaginas}
                    aoMudarPagina={setPaginaAtual}
                />
            </section>

            {colaboradorParaExcluir && (
                <div
                    className="fundo-modal-exclusao"
                    role="presentation"
                    onClick={() => setColaboradorParaExcluir(null)}
                >
                    <section
                        className="modal-exclusao"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-exclusao"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className="topo-modal-exclusao">
                            <div className="icone-alerta-modal">
                                <HiOutlineExclamationTriangle aria-hidden="true" />
                            </div>

                            <button
                                type="button"
                                className="botao-fechar-modal"
                                onClick={() => setColaboradorParaExcluir(null)}
                                aria-label="Fechar janela"
                            >
                                <HiOutlineXMark aria-hidden="true" />
                            </button>
                        </header>

                        <h2 id="titulo-modal-exclusao">Gerenciar vínculo do colaborador</h2>
                        <p className="subtitulo-modal-exclusao">
                            Escolha como deseja prosseguir com o registro abaixo:
                        </p>

                        <div className="resumo-colaborador-modal">
                            <span className="avatar-modal-colaborador">
                                {colaboradorParaExcluir.nome
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((nome) => nome[0])
                                    .join("")}
                            </span>

                            <div>
                                <strong>{colaboradorParaExcluir.nome}</strong>
                                <span>
                                    {colaboradorParaExcluir.matricula} ·{" "}
                                    {colaboradorParaExcluir.cargo} ({colaboradorParaExcluir.municipio})
                                </span>
                            </div>
                        </div>

                        <div className="opcoes-modal-exclusao">
                            {colaboradorParaExcluir.status !== "Inativo" && (
                                <button
                                    type="button"
                                    className="cartao-opcao-modal opcao-inativar"
                                    onClick={() => confirmarExclusao("inativar")}
                                >
                                    <span className="icone-opcao-modal">
                                        <HiOutlineArchiveBox aria-hidden="true" />
                                    </span>

                                    <div className="texto-opcao-modal">
                                        <div className="titulo-opcao-linha">
                                            <strong>Inativar colaborador</strong>
                                            <span className="selo-recomendado-modal">Recomendado</span>
                                        </div>
                                        <small>
                                            Mantém todo o histórico de documentos, férias e folha.
                                        </small>
                                    </div>
                                </button>
                            )}

                            <button
                                type="button"
                                className="cartao-opcao-modal opcao-excluir"
                                onClick={() => confirmarExclusao("permanente")}
                            >
                                <span className="icone-opcao-modal">
                                    <HiOutlineTrash aria-hidden="true" />
                                </span>

                                <div className="texto-opcao-modal">
                                    <strong>Excluir permanentemente</strong>
                                    <small>
                                        Apaga o registro definitivamente. Use apenas para erros de
                                        cadastro.
                                    </small>
                                </div>
                            </button>
                        </div>

                        <footer className="rodape-modal-exclusao">
                            <button
                                type="button"
                                className="botao-cancelar-exclusao"
                                onClick={() => setColaboradorParaExcluir(null)}
                            >
                                Cancelar
                            </button>
                        </footer>
                    </section>
                </div>
            )}
        </section>
    );
};

export default ColaboradoresLista;