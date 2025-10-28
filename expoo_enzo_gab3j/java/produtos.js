// ===== Carrinho e Mensagens =====
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

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

// ===== Adicionar Produtos ao Carrinho =====
function adicionarAoCarrinho(nome, preco, imagem = "") {
  const produtoExistente = carrinho.find(p => p.nome === nome);
  if (produtoExistente) {
    produtoExistente.quantidade = (produtoExistente.quantidade || produtoExistente.qtd || 1) + 1;
    mostrarMensagem(`+1 ${nome} adicionado ao carrinho!`, "aviso");
  } else {
    carrinho.push({ nome, preco: parseFloat(preco), imagem, quantidade: 1 });
    mostrarMensagem(`${nome} foi adicionado ao carrinho!`, "sucesso");
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ===== Criar Botões "Adicionar ao Carrinho" =====
document.querySelectorAll(".produto").forEach(prod => {
  const nome = prod.querySelector("h3").textContent;
  const preco = prod.querySelector(".preco").textContent;
  const imagem = prod.querySelector("img") ? prod.querySelector("img").src : "";

  const botaoCarrinho = document.createElement("button");
  botaoCarrinho.textContent = "🛒 Adicionar ao carrinho";
  botaoCarrinho.classList.add("btn-carrinho");

  botaoCarrinho.addEventListener("click", () => adicionarAoCarrinho(nome, preco, imagem));

  prod.appendChild(botaoCarrinho);
});

// ===== Botões "Ver Mais" =====
document.querySelectorAll('.ver-mais').forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.dataset.id;
    window.location.href = `produto.html?id=${id}`;
  });
});

// ===== Simulação de Login/Cadastro =====
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function cadastrarUsuario(email, senha) {
  usuarios.push({ email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Cadastro realizado com sucesso!');
}

function loginUsuario(email, senha) {
  const user = usuarios.find(u => u.email === email && u.senha === senha);
  alert(user ? 'Login bem-sucedido!' : 'Credenciais inválidas.');
}

// ===== Pesquisa de Produtos =====
const searchBar = document.getElementById('search-bar');
if (searchBar) {
  searchBar.addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.produto').forEach(p => {
      const nome = p.querySelector('h3').textContent.toLowerCase();
      p.style.display = nome.includes(termo) ? 'block' : 'none';
    });
  });
}

// ===== Filtros e Ordenação =====
const filtroCategoria = document.getElementById('categoria');
const filtroOrdenar = document.getElementById('ordenar');
const produtos = Array.from(document.querySelectorAll('.produto'));

function filtrarProdutos() {
  const categoria = filtroCategoria.value;
  const termoBusca = searchBar ? searchBar.value.toLowerCase() : '';

  produtos.forEach(prod => {
    const nome = prod.querySelector('h3').textContent.toLowerCase();
    const tipo = nome.includes("guitarra") || nome.includes("teclado") || nome.includes("violão") ? "instrumentos" :
                nome.includes("microfone") || nome.includes("fone") || nome.includes("caixa") ? "audio" : "acessorios";

    const correspondeCategoria = categoria === "todos" || tipo === categoria;
    const correspondeBusca = nome.includes(termoBusca);

    prod.style.display = (correspondeCategoria && correspondeBusca) ? "block" : "none";
  });
}

function ordenarProdutos() {
  const criterio = filtroOrdenar.value;
  const container = document.querySelector(".grid-produtos");
  const produtosVisiveis = produtos.filter(p => p.style.display !== "none");

  produtosVisiveis.sort((a, b) => {
    const precoA = parseFloat(a.querySelector(".preco").textContent.replace(/[^\d,]/g, '').replace(',', '.'));
    const precoB = parseFloat(b.querySelector(".preco").textContent.replace(/[^\d,]/g, '').replace(',', '.'));
    if (criterio === "precoMenor") return precoA - precoB;
    if (criterio === "precoMaior") return precoB - precoA;
    return 0;
  });

  produtosVisiveis.forEach(p => container.appendChild(p));
}

if (filtroCategoria) filtroCategoria.addEventListener("change", filtrarProdutos);
if (filtroOrdenar) filtroOrdenar.addEventListener("change", ordenarProdutos);

// ===== Estilo dinâmico =====
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
.mensagem-carrinho.mostrar { opacity: 1; transform: translateY(0); }
.mensagem-carrinho.sucesso { background: #28a745; }
.mensagem-carrinho.aviso { background: #ff9800; }

.btn-carrinho {
  background: linear-gradient(90deg, #5a00a3, #9b00ff);
  border: none;
  color: white;
  padding: 8px 18px;
  border-radius: 25px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.btn-carrinho:hover { background: linear-gradient(90deg, #9b00ff, #5a00a3); transform: scale(1.05); }
`;
document.head.appendChild(estilo);
