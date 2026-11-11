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
    <main className="login-pagina">
      <section className="login-cartao">
        <aside className="login-apresentacao">
          <div>
            <img
              className="login-logo-instituto"
              src="/images/logo-instituto-superar.png"
              alt="Instituto Superar"
            />
          </div>

          <div className="login-apresentacao-conteudo">
            <p className="login-etiqueta">PORTAL INTERNO</p>

            <h1>
              Gestão de RH
              <span>simples, segura e centralizada.</span>
            </h1>

            <p>
              Gerencie colaboradores, documentos, contratos e informações de
              lotação em um único sistema.
            </p>
          </div>

          <p className="login-apresentacao-rodape">
            Instituto Superar · Recursos Humanos
          </p>
        </aside>

        <section className="login-area-formulario">
          {/* Este bloco mantém título e campos alinhados na mesma coluna */}
          <div className="login-caixa-formulario">
            <div className="login-logo-celular">
              <img
                src="/images/logo-instituto-superar.png"
                alt="Instituto Superar"
              />
            </div>

            <header className="login-cabecalho">
              <p className="login-etiqueta">ACESSO RESTRITO</p>
              <h2>Boas-vindas</h2>
              <p>Entre com suas credenciais para acessar o sistema.</p>
            </header>

            <form className="login-formulario" onSubmit={handleSubmit} noValidate>
              <div className="campo-grupo">
                <label htmlFor="email">E-mail corporativo</label>

                <div className="campo-com-icone">
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
                  <span id="erro-email" className="campo-erro">
                    {erros.email}
                  </span>
                )}
              </div>

              <div className="campo-grupo">
                <div className="campo-linha-rotulo">
                  <label htmlFor="senha">Senha</label>

                  <button type="button" className="login-esqueci-senha">
                    Esqueci minha senha
                  </button>
                </div>

                <div className="campo-com-icone">
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
                    className="campo-botao-mostrar-senha"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                  </button>
                </div>

                {erros.senha && (
                  <span id="erro-senha" className="campo-erro">
                    {erros.senha}
                  </span>
                )}
              </div>

              <button type="submit" className="login-botao-entrar">
                Entrar no sistema
              </button>

              {mensagem && (
                <p className="login-mensagem-retorno" role="status">
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