import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/components/Layout.css";

const Layout = () => {
  return (
    <div className="estrutura-sistema">
      <Sidebar />

      <main className="conteudo-principal">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;