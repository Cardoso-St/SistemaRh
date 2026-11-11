import { NavLink } from "react-router-dom";
import {
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineWallet,
} from "react-icons/hi2";
import "../styles/components/Sidebar.css";

const itensDoMenu = [
  {
    caminho: "/app/dashboard",
    texto: "Visão geral",
    icone: HiOutlineHome,
  },
  {
    caminho: "/app/colaboradores",
    texto: "Colaboradores",
    icone: HiOutlineUsers,
  },
  {
    caminho: "/app/lotacao",
    texto: "Lotação",
    icone: HiOutlineBuildingOffice2,
  },
  {
    caminho: "/app/documentos",
    texto: "Documentos",
    icone: HiOutlineDocumentText,
  },
  {
    caminho: "/app/ocorrencias",
    texto: "Ocorrências e férias",
    icone: HiOutlineCalendarDays,
  },
  {
    caminho: "/app/folha",
    texto: "Folha de pagamento",
    icone: HiOutlineWallet,
  },
  {
    caminho: "/app/relatorios",
    texto: "Relatórios",
    icone: HiOutlineChartBarSquare,
  },
];

const Sidebar = () => {
  return (
    <aside className="menu-lateral">
      <header className="menu-lateral-topo">
        <div className="menu-lateral-logo">
          <img
            src="/images/logo-instituto-superar.png"
            alt="Instituto Superar"
          />
        </div>
      </header>

      <nav className="menu-lateral-navegacao" aria-label="Menu principal">
        <p className="menu-lateral-titulo-secao">GESTÃO</p>

        {itensDoMenu.map(({ caminho, texto, icone: Icone }) => (
          <NavLink
            key={caminho}
            to={caminho}
            className={({ isActive }) =>
              isActive ? "menu-lateral-link ativo" : "menu-lateral-link"
            }
          >
            <Icone aria-hidden="true" />
            <span>{texto}</span>
          </NavLink>
        ))}

        <NavLink
          to="/app/configuracoes"
          className={({ isActive }) =>
            isActive ? "menu-lateral-link ativo" : "menu-lateral-link"
          }
        >
          <HiOutlineCog6Tooth aria-hidden="true" />
          <span>Configurações</span>
        </NavLink>
      </nav>

      <footer className="menu-lateral-usuario">
        {/* Depois estes dados virão do usuário autenticado via JWT */}
        <div className="menu-lateral-avatar">AR</div>

        <div className="menu-lateral-usuario-dados">
          <strong>Administrador RH</strong>
          <span>Administrador</span>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;