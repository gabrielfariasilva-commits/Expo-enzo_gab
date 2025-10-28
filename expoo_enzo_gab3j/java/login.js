// ===== Captura do formulário =====
const formLogin = document.getElementById("loginForm");

// Carrega os usuários cadastrados (ou cria uma lista vazia)
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// ===== Função para exibir mensagens na tela =====
function mostrarMensagem(texto, tipo = "info") {
  const msg = document.createElement("div");
  msg.classList.add("mensagem-login", tipo);
  msg.textContent = texto;
  document.body.appendChild(msg);

  setTimeout(() => msg.classList.add("mostrar"), 50);
  setTimeout(() => {
    msg.classList.remove("mostrar");
    setTimeout(() => msg.remove(), 300);
  }, 2000);
}

// ===== Validação do Login =====
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
      mostrarMensagem("Por favor, preencha todos os campos!", "erro");
      return;
    }

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      mostrarMensagem("✅ Login realizado com sucesso!", "sucesso");
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      // Redireciona após 1.5s
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } else {
      mostrarMensagem("❌ E-mail ou senha incorretos!", "erro");
    }
  });
}

// ===== Estilos de mensagem dinâmica =====
const estilo = document.createElement("style");
estilo.textContent = `
  .mensagem-login {
    position: fixed;
    top: 100px;
    right: 30px;
    background: #5a00a3;
    color: white;
    padding: 12px 20px;
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(162, 89, 255, 0.5);
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.4s ease;
    z-index: 2000;
    font-size: 0.95rem;
  }
  .mensagem-login.mostrar {
    opacity: 1;
    transform: translateY(0);
  }
  .mensagem-login.erro {
    background: #a30000;
  }
  .mensagem-login.sucesso {
    background: #28a745;
  }
`;
document.head.appendChild(estilo);
