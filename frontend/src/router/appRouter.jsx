import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas internas: todas terão Sidebar + Layout */}
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />

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