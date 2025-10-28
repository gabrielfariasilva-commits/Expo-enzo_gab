// ===== Inicialização =====
const listaCarrinho = document.getElementById("lista-carrinho");
const valorTotal = document.getElementById("valor-total");
const btnLimpar = document.getElementById("limparCarrinho");
const btnFinalizar = document.getElementById("finalizarCompra");

// ===== Recupera produtos do carrinho =====
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ===== Função para atualizar o carrinho =====
function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `<p>🛒 Seu carrinho está vazio.</p>`;
    valorTotal.textContent = "R$ 0,00";
    return;
  }

  // Cria tabela
  const tabela = document.createElement("table");
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Produto</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Qtd</th>
        <th>Remover</th>
      </tr>
    </thead>
    <tbody>
      ${carrinho.map((item, index) => `
        <tr>
          <td><img src="${item.imagem}" alt="${item.nome}"></td>
          <td>${item.nome}</td>
          <td>R$ ${item.preco.toFixed(2)}</td>
          <td>${item.quantidade}</td>
          <td><button onclick="removerItem(${index})">❌</button></td>
        </tr>
      `).join("")}
    </tbody>
  `;

  listaCarrinho.appendChild(tabela);

  // Atualiza o total
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  valorTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// ===== Remover item individual =====
function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarMensagem("Item removido com sucesso!", "aviso");
  atualizarCarrinho();
}

// ===== Limpar carrinho =====
if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    if (carrinho.length === 0) {
      mostrarMensagem("O carrinho já está vazio.", "erro");
      return;
    }

    if (confirm("Deseja realmente limpar o carrinho?")) {
      carrinho = [];
      localStorage.removeItem("carrinho");
      mostrarMensagem("Carrinho limpo com sucesso!", "sucesso");
      atualizarCarrinho();
    }
  });
}

// ===== Finalizar compra =====
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
      mostrarMensagem("Adicione itens ao carrinho antes de finalizar!", "erro");
      return;
    }

    mostrarMensagem("🎉 Compra finalizada com sucesso!", "sucesso");
    setTimeout(() => {
      carrinho = [];
      localStorage.removeItem("carrinho");
      atualizarCarrinho();
    }, 2000);
  });
}

// ===== Mensagens animadas =====
function mostrarMensagem(texto, tipo = "info") {
  const msg = document.createElement("div");
  msg.classList.add("mensagem-carrinho", tipo);
  msg.textContent = texto;
  document.body.appendChild(msg);

  setTimeout(() => msg.classList.add("mostrar"), 50);
  setTimeout(() => {
    msg.classList.remove("mostrar");
    setTimeout(() => msg.remove(), 300);
  }, 2500);
}

// ===== Estilo das mensagens =====
const estilo = document.createElement("style");
estilo.textContent = `
  .mensagem-carrinho {
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
  .mensagem-carrinho.mostrar {
    opacity: 1;
    transform: translateY(0);
  }
  .mensagem-carrinho.erro {
    background: #a30000;
  }
  .mensagem-carrinho.sucesso {
    background: #28a745;
  }
  .mensagem-carrinho.aviso {
    background: #ff9800;
  }
`;
document.head.appendChild(estilo);

// ===== Inicializa carrinho ao carregar =====
document.addEventListener("DOMContentLoaded", atualizarCarrinho);
