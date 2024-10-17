// Armazenar os dados no localStorage
function salvarDados(dados, chave) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// Carregar os dados do localStorage
function carregarDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

// Função para atualizar a contagem de cards em cada coluna
function atualizarContagem() {
  const toDoCount = document.querySelectorAll(".to-do-column .task").length;
  const inProgressCount = document.querySelectorAll(
    ".in-progress-column .task"
  ).length;
  const doneCount = document.querySelectorAll(".done-column .task").length;

  document.getElementById("to-do-count").textContent = toDoCount;
  document.getElementById("in-progress-count").textContent = inProgressCount;
  document.getElementById("done-count").textContent = doneCount;
}

// Função para carregar as imagens dos usuários a partir da API
async function carregarUsuarios() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/MatheusQuintanilhaa/d008a9b0ce7f621ac9cfffca90900c43/raw/c752bd091a450da6f8b780934eefa05a8dcfa759/users"
    );
    const usuarios = await response.json();

    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Limpar as imagens estáticas

    // Adicionar cada imagem do usuário ao HTML
    usuarios.forEach((usuario, index) => {
      const img = document.createElement("img");
      img.src = usuario.foto; // Link da foto do usuário da API
      img.alt = `Usuário ${usuario.nome}`;
      img.classList.add("team-photo");
      img.id = `usuario${index + 1}`;
      userList.appendChild(img);
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

// Chamar a função ao carregar a página
window.onload = () => {
  atualizarContagem(); // Atualizar contagem de cards
  carregarUsuarios(); // Carregar usuários da API e atualizar as imagens
};
