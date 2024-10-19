// Drag and Drop adicionados
// document.querySelectorAll("drag-list").forEach((card) => {
//   card.addEventListener("dragstart", (e) => {
//     e.currentTarget.classList.add("dragging");
//   });

//   card.addEventListener("dragend", (e) => {
//     e.currentTarget.classList.remove("dragging");
//   });
// });

// document.querySelectorAll("drag-column").forEach((column) => {
//   column.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     e.currentTarget.classList.add("cards-hover");
//   });

//   column.addEventListener("dragleave", (e) => {
//     e.currentTarget.classList.remove("cards-hover");
//   });
//   column.addEventListener("drop", (e) => {
//     const dragCard = document.querySelector(".drag-list.dragging");
//     e.currentTarget.appendChild(dragCard);
//   });
// });

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

// Função assíncrona para carregar os usuários da API e exibi-los
async function carregarUsuarios() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/MatheusQuintanilhaa/d008a9b0ce7f621ac9cfffca90900c43/raw/4f9850b5ad9917a48e3cc0939cd168c25bd4fcb1/users"
    );

    // Verifique se a resposta é válida
    if (!response.ok) {
      throw new Error("Erro na rede: " + response.status);
    }

    const usuarios = await response.json();
    const userList = document.getElementById("user-list");

    // Limpa a lista de usuários antes de adicionar novos
    userList.innerHTML = "";

    // Adiciona os usuários à lista
    usuarios.forEach((usuario) => {
      const img = document.createElement("img");
      img.src = usuario.foto;
      img.alt = usuario.nome;
      img.classList.add("team-photo");
      img.id = `usuario${usuario.id}`;

      const nome = document.createElement("p");
      nome.textContent = usuario.nome;

      const figure = document.createElement("figure");
      figure.appendChild(img);

      const userContainer = document.createElement("div");
      userContainer.appendChild(figure);
      userContainer.appendChild(nome);

      userList.appendChild(userContainer);

      // Adiciona evento de clique
      img.addEventListener("click", (event) => {
        const teamPhoto = document.querySelectorAll(".team-photo");

        // Remove a classe "selected" de todos os usuários
        teamPhoto.forEach((photo) => {
          photo.parentNode.classList.remove("selected");
        });

        // Adiciona a classe "selected" ao contêiner do usuário clicado
        event.target.parentNode.classList.add("selected");

        // Atualiza o nome do usuário selecionado
        document.getElementById(
          "selected-user-name"
        ).textContent = `Usuário Selecionado: ${usuario.nome}`;
      });
    });

    // Seleciona o primeiro usuário inicialmente
    if (usuarios.length > 0) {
      const firstUser = usuarios[0];
      const firstImage = document.querySelector(`img[src="${firstUser.foto}"]`);

      if (firstImage) {
        // Seleciona o contêiner do primeiro usuário
        firstImage.parentNode.classList.add("selected");

        // Atualiza o nome do usuário selecionado
        document.getElementById(
          "selected-user-name"
        ).textContent = `Usuário Selecionado: ${firstUser.nome}`;
      }
    }
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

// Carrega os usuários da API ao carregar a página
window.onload = () => {
  carregarUsuarios();
  atualizarContagem();
};
