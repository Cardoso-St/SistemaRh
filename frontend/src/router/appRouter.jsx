import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial: tela de login */}
        <Route path="/" element={<Login />} />

        {/* Qualquer endereço inexistente volta para o login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;