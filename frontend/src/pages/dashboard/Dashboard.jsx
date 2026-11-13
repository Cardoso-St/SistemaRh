import { useState } from "react";
import {
    HiOutlineDocumentMinus,
    HiOutlineExclamationTriangle,
    HiOutlineMagnifyingGlass,
    HiOutlineUserGroup,
} from "react-icons/hi2";
import CabecalhoPagina from "../../components/ui/CabecalhoPagina.jsx";
import Paginacao from "../../components/ui/Paginacao.jsx";
import SeloStatus from "../../components/ui/SeloStatus.jsx";
import "../../styles/pages/Dashboard.css";
import { normalizarTexto } from "../../utils/Normalizar.js";

const indicadoresRh = [
    {
        id: "todos",
        titulo: "Colaboradores ativos",
        valor: "7",
        descricao: "Total de vínculos ativos",
        icone: HiOutlineUserGroup,
        categoria: "colaboradores-ativos",
    },
    {
        id: "contratos-vencer",
        titulo: "Contratos a vencer",
        valor: "3",
        descricao: "Nos próximos 30 dias",
        icone: HiOutlineExclamationTriangle,
        categoria: "contratos-vencer",
    },
    {
        id: "pendencias-documentais",
        titulo: "Pendências documentais",
        valor: "4",
        descricao: "Documentos ou ASO pendentes",
        icone: HiOutlineDocumentMinus,
        categoria: "pendencias-documentais",
    },
];

const colaboradoresExemplo = [
    {
        id: 1,
        nome: "Steven Bonitão Cardoso Batista",
        matricula: "RH-001",
        cargo: "Modelo",
        vinculo: "CLT",
        municipio: "Maceió",
        status: "Ativo",
        contratoVencer: false,
        pendenciaDocumental: false,
        fotoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    },
    {
        id: 2,
        nome: "Luís Eduardo do Sítio",
        matricula: "RH-002",
        cargo: "Matemático",
        vinculo: "Colaborador associado",
        municipio: "Sítio",
        status: "Ativo",
        contratoVencer: true,
        pendenciaDocumental: false,
        fotoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    },
    {
        id: 3,
        nome: "Gabriel do Corre",
        matricula: "RH-003",
        cargo: "Torcedor do Corinthians",
        vinculo: "Prestador de serviços",
        municipio: "NUpal",
        status: "Desligado",
        contratoVencer: false,
        pendenciaDocumental: true,
        fotoUrl: null,
    },
    {
        id: 4,
        nome: "Gabriela Camboim",
        matricula: "RH-004",
        cargo: "Pedagógica",
        vinculo: "CLT",
        municipio: "Mato",
        status: "Afastado",
        contratoVencer: true,
        pendenciaDocumental: true,
        fotoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
        id: 5,
        nome: "Flávio Venenoso",
        matricula: "RH-005",
        cargo: "Atleta",
        vinculo: "PJ",
        municipio: "Palmeira dos Índios",
        status: "Ativo",
        contratoVencer: false,
        pendenciaDocumental: true,
        fotoUrl: null,
    },
    {
        id: 6,
        nome: "Juliana Medeiros",
        matricula: "RH-006",
        cargo: "Analista de RH",
        vinculo: "CLT",
        municipio: "Maceió",
        status: "Ativo",
        contratoVencer: true,
        pendenciaDocumental: false,
        fotoUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    },
    {
        id: 7,
        nome: "Lucas Matheus Costa",
        matricula: "RH-007",
        cargo: "Desenvolvedor",
        vinculo: "CLT",
        municipio: "Arapiraca",
        status: "Desligado",
        contratoVencer: false,
        pendenciaDocumental: true,
        fotoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    },
    {
        id: 8,
        nome: "Camila Fernandes",
        matricula: "RH-008",
        cargo: "Coordenadora de Projetos",
        vinculo: "CLT",
        municipio: "Maceió",
        status: "Ativo",
        contratoVencer: false,
        pendenciaDocumental: false,
        fotoUrl:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    },
    {
        id: 9,
        nome: "Rodrigo Alencar",
        matricula: "RH-009",
        cargo: "Designer UI/UX",
        vinculo: "PJ",
        municipio: "Rio Largo",
        status: "Ativo",
        contratoVencer: false,
        pendenciaDocumental: false,
        fotoUrl: null,
    },
    {
        id: 10,
        nome: "Beatriz Vasconcelos",
        matricula: "RH-010",
        cargo: "Assistente Administrativo",
        vinculo: "Estágio",
        municipio: "Maceió",
        status: "Ativo",
        contratoVencer: false,
        pendenciaDocumental: false,
        fotoUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    },
];

const Dashboard = () => {
    const [termoBusca, setTermoBusca] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("todos");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    const colaboradoresFiltrados = colaboradoresExemplo.filter((colaborador) => {
        const termoNormalizado = normalizarTexto(termoBusca.trim());

        const passaBusca =
            !termoNormalizado ||
            normalizarTexto(colaborador.nome).includes(termoNormalizado) ||
            normalizarTexto(colaborador.matricula).includes(termoNormalizado);

        if (!passaBusca) return false;

        if (filtroCategoria === "contratos-vencer") return colaborador.contratoVencer;
        if (filtroCategoria === "pendencias-documentais")
            return colaborador.pendenciaDocumental;
        return true;
    });

    const totalPaginas =
        Math.ceil(colaboradoresFiltrados.length / itensPorPagina) || 1;
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const colaboradoresPaginados = colaboradoresFiltrados.slice(
        indiceInicial,
        indiceInicial + itensPorPagina
    );

    const handleSelecaoFiltro = (idFiltro) => {
        setFiltroCategoria((prev) => (prev === idFiltro ? "todos" : idFiltro));
        setPaginaAtual(1);
    };

    return (
        <section className="pagina-dashboard">
            <CabecalhoPagina
                rotulo="PAINEL ADMINISTRATIVO"
                titulo="Visão geral"
                descricao="Acompanhe os principais indicadores e localize colaboradores rapidamente."
            />

            <section className="lista-cartoes-indicadores">
                {indicadoresRh.map(
                    ({ id, titulo, valor, descricao, icone: Icone, categoria }) => {
                        const estaAtivo = filtroCategoria === id;

                        return (
                            <article
                                key={id}
                                role="button"
                                tabIndex={0}
                                className={`cartao-indicador ${estaAtivo ? "card-selecionado" : ""}`}
                                onClick={() => handleSelecaoFiltro(id)}
                                onKeyDown={(e) => e.key === "Enter" && handleSelecaoFiltro(id)}
                            >
                                <div className={`icone-indicador icone-${categoria}`}>
                                    <Icone aria-hidden="true" />
                                </div>

                                <div className="conteudo-indicador">
                                    <p className="titulo-indicador">{titulo}</p>
                                    <strong className="valor-indicador">{valor}</strong>
                                    <span className="descricao-indicador">{descricao}</span>
                                </div>
                            </article>
                        );
                    }
                )}
            </section>

            <section className="secao-colaboradores">
                <header className="cabecalho-lista-colaboradores">
                    <div className="topo-lista-colaboradores">
                        <h2>Colaboradores recentes</h2>
                        <p>
                            Exibindo <strong>{colaboradoresPaginados.length}</strong> de{" "}
                            <strong>{colaboradoresFiltrados.length}</strong> registros
                        </p>
                    </div>

                    <label className="campo-busca-colaborador busca-full">
                        <HiOutlineMagnifyingGlass aria-hidden="true" />
                        <input
                            type="search"
                            placeholder="Buscar colaborador por nome ou matrícula..."
                            value={termoBusca}
                            onChange={(event) => {
                                setTermoBusca(event.target.value);
                                setPaginaAtual(1);
                            }}
                        />
                    </label>
                </header>

                <div className="area-tabela-colaboradores">
                    <table className="tabela-colaboradores">
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
                            {colaboradoresPaginados.map((colaborador) => {
                                const estaDesligado = colaborador.status === "Desligado";

                                return (
                                    <tr
                                        key={colaborador.id}
                                        className={
                                            estaDesligado ? "linha-colaborador-desligado" : ""
                                        }
                                    >
                                        <td>
                                            <div className="identificacao-colaborador">
                                                <div className="avatar-wrapper">
                                                    {colaborador.fotoUrl ? (
                                                        <img
                                                            src={colaborador.fotoUrl}
                                                            alt={colaborador.nome}
                                                            className="foto-colaborador"
                                                        />
                                                    ) : (
                                                        <span className="avatar-colaborador">
                                                            {colaborador.nome
                                                                .split(" ")
                                                                .slice(0, 2)
                                                                .map((nome) => nome[0])
                                                                .join("")}
                                                        </span>
                                                    )}
                                                </div>

                                                <div>
                                                    <strong>{colaborador.nome}</strong>
                                                    <small>Matrícula: {colaborador.matricula}</small>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{colaborador.cargo}</td>
                                        <td>
                                            <span className="badge-vinculo">{colaborador.vinculo}</span>
                                        </td>
                                        <td>{colaborador.municipio}</td>

                                        <td>
                                            <SeloStatus status={colaborador.status} />
                                        </td>

                                        <td>
                                            <button className="botao-ver-perfil-dashboard" type="button">
                                                Ver perfil
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {colaboradoresFiltrados.length === 0 && (
                        <p className="mensagem-sem-colaboradores">
                            Nenhum colaborador encontrado para este filtro ou busca.
                        </p>
                    )}
                </div>

                <Paginacao
                    paginaAtual={paginaAtual}
                    totalPaginas={totalPaginas}
                    aoMudarPagina={setPaginaAtual}
                />
            </section>
        </section>
    );
};

export default Dashboard;