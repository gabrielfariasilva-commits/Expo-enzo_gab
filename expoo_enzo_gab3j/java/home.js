// ===== Botões "Ver Mais" =====
const botoes = document.querySelectorAll('.ver-mais');

botoes.forEach(botao => {
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
  if (user) {
    alert('Login bem-sucedido!');
  } else {
    alert('Credenciais inválidas.');
  }
}

// ===== Pesquisa de Produtos =====
const searchBar = document.getElementById('search-bar');

if (searchBar) {
  searchBar.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll('.produto').forEach(p => {
      const nome = p.querySelector('h3').textContent.toLowerCase();
      p.style.display = nome.includes(termo) ? 'block' : 'none';
    });
  });
}
