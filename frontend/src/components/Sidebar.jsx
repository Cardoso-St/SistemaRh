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
    <aside className="sidebar">
      <header className="sidebar-brand">
        <div className="sidebar-logo-box">
          <img
            src="/images/logo-instituto-superar.png"
            alt="Instituto Superar"
          />
        </div>
      </header>

      <nav className="side-navigator" aria-label="Menu principal">
        <p className="sidebar-menu-label">GESTÃO</p>

        {itensDoMenu.map(({ caminho, texto, icone: Icone }) => (
          <NavLink
            key={caminho}
            to={caminho}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <Icone aria-hidden="true" />
            <span>{texto}</span>
          </NavLink>
        ))}

        <NavLink
          to="/app/configuracoes"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <HiOutlineCog6Tooth aria-hidden="true" />
          <span>Configurações</span>
        </NavLink>
      </nav>

      <footer className="sidebar-user">
        {/* Depois estes dados virão do usuário autenticado via JWT. */}
        <div className="sidebar-user-avatar">AR</div>

        <div className="sidebar-user-info">
          <strong>Administrador RH</strong>
          <span>Administrador</span>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;