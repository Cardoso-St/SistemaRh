import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ColaboradoresLista from "../pages/Colaboradores/ColaboradoresLista.jsx"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas internas: todas terão Sidebar + Layout */}
        <Route path="/app" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="colaboradores" element={<ColaboradoresLista />} />

          {/* Temporário: páginas do menu ainda não feitas retornam ao dashboard */}
          <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
        </Route>

        {/* Endereço inexistente retorna ao login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;