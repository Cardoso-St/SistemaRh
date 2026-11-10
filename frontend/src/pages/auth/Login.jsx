import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import "../../styles/auth/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const validarFormulario = () => {
    const novosErros = {};

    if (!email.trim()) {
      novosErros.email = "Informe seu e-mail corporativo.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
    }

    if (!senha) {
      novosErros.senha = "Informe sua senha.";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMensagem("");

    if (!validarFormulario()) {
      return;
    }

    // Temporário: depois só navega quando o backend confirmar o login.
    navigate("/app/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <aside className="login-presentation">
          <div className="brand-logo-box">
            <img
              className="institute-logo"
              src="/images/logo-instituto-superar.png"
              alt="Instituto Superar"
            />
          </div>

          <div className="presentation-content">
            <p className="login-eyebrow">PORTAL INTERNO</p>

            <h1>
              Gestão de RH
              <span>simples, segura e centralizada.</span>
            </h1>

            <p>
              Gerencie colaboradores, documentos, contratos e informações de
              lotação em um único sistema.
            </p>
          </div>

          <p className="presentation-footer">
            Instituto Superar · Recursos Humanos
          </p>
        </aside>

        <section className="login-form-area">
          {/* Este container mantém título e inputs na mesma coluna. */}
          <div className="login-form-container">
            <div className="login-mobile-logo">
              <img
                src="/images/logo-instituto-superar.png"
                alt="Instituto Superar"
              />
            </div>

            <header className="login-heading">
              <p className="login-eyebrow">ACESSO RESTRITO</p>
              <h2>Boas-vindas</h2>
              <p>Entre com suas credenciais para acessar o sistema.</p>
            </header>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="email">E-mail corporativo</label>

                <div className="input-with-icon">
                  <HiOutlineEnvelope aria-hidden="true" />

                  <input
                    id="email"
                    type="email"
                    placeholder="nome@institutosuperar.org.br"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(erros.email)}
                    aria-describedby={erros.email ? "erro-email" : undefined}
                  />
                </div>

                {erros.email && (
                  <span id="erro-email" className="field-error">
                    {erros.email}
                  </span>
                )}
              </div>

              <div className="form-field">
                <div className="field-label-row">
                  <label htmlFor="senha">Senha</label>

                  <button type="button" className="forgot-password">
                    Esqueci minha senha
                  </button>
                </div>

                <div className="input-with-icon">
                  <HiOutlineLockClosed aria-hidden="true" />

                  <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    aria-invalid={Boolean(erros.senha)}
                    aria-describedby={erros.senha ? "erro-senha" : undefined}
                  />

                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                  </button>
                </div>

                {erros.senha && (
                  <span id="erro-senha" className="field-error">
                    {erros.senha}
                  </span>
                )}
              </div>

              <button type="submit" className="login-submit">
                Entrar no sistema
              </button>

              {mensagem && (
                <p className="login-feedback" role="status">
                  {mensagem}
                </p>
              )}
            </form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Login;