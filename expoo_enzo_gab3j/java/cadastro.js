// ===== Captura do formulário =====
const formCadastro = document.getElementById("cadastroForm");

// Carrega usuários já cadastrados (ou cria lista vazia)
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// ===== Função de exibir mensagens animadas =====
function mostrarMensagem(texto, tipo = "info") {
  const msg = document.createElement("div");
  msg.classList.add("mensagem-cadastro", tipo);
  msg.textContent = texto;
  document.body.appendChild(msg);

  setTimeout(() => msg.classList.add("mostrar"), 50);
  setTimeout(() => {
    msg.classList.remove("mostrar");
    setTimeout(() => msg.remove(), 300);
  }, 2000);
}

// ===== Cadastro de Usuário =====
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmar = document.getElementById("confirmarSenha").value.trim();

    // ===== Validação básica =====
    if (!nome || !email || !senha || !confirmar) {
      mostrarMensagem("Preencha todos os campos!", "erro");
      return;
    }

    if (senha.length < 6) {
      mostrarMensagem("A senha deve ter pelo menos 6 caracteres!", "erro");
      return;
    }

    if (senha !== confirmar) {
      mostrarMensagem("As senhas não coincidem!", "erro");
      return;
    }

    const emailExistente = usuarios.find(u => u.email === email);
    if (emailExistente) {
      mostrarMensagem("Este e-mail já está cadastrado!", "erro");
      return;
    }

    // ===== Cadastra novo usuário =====
    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensagem("✅ Cadastro realizado com sucesso!", "sucesso");

    // Redireciona para login
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}

// ===== Estilos de mensagens dinâmicas =====
const estilo = document.createElement("style");
estilo.textContent = `
  .mensagem-cadastro {
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
  .mensagem-cadastro.mostrar {
    opacity: 1;
    transform: translateY(0);
  }
  .mensagem-cadastro.erro {
    background: #a30000;
  }
  .mensagem-cadastro.sucesso {
    background: #28a745;
  }
`;
document.head.appendChild(estilo);
