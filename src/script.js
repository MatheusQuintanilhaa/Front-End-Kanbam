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

class App {
  constructor() {
    this.$todo = document.querySelector('#todo ul');
    this.$doing = document.querySelector('#doing ul');
    this.$completed = document.querySelector('#completed ul');
    this.cards = [];
  }

}

// Adiciona evento para o botão de nova tarefa
const modaisAbrir = document.querySelectorAll('.add-card');
const modal = document.getElementById('modal');
const botaoFechar = document.querySelector('.close');
const botaoSalvar = document.getElementById('salvarTarefa');
const inputNomeTarefa = document.getElementById('nomeTarefa');
let listaAtual;


function abrirModal(event) {
  modal.style.display = 'flex';
  inputNomeTarefa.value = '';

  const section = event.target.closest('section');
  listaAtual = section.querySelector('ul');
}

function fecharModal() {
  modal.style.display = 'none';
}

function salvarTarefa() {
  const nomeTarefa = inputNomeTarefa.value.trim();

  if (nomeTarefa && listaAtual) {
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = nomeTarefa;

    listaAtual.appendChild(novaTarefa);

    const contador = listaAtual.closest('section').querySelector('small');
    contador.textContent = `${listaAtual.children.length}`;

    fecharModal();
  } else {
    alert('Por favor, insira o nome da tarefa.');
  }
}

modaisAbrir.forEach(botao => {
  botao.addEventListener('click', abrirModal);
});

botaoFechar.addEventListener('click', fecharModal);

botaoSalvar.addEventListener('click', salvarTarefa);

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    fecharModal();
  }
});

function onMove(event) {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const id = +button.dataset.id;
  const move = button.dataset.move;
  const card = this.cards.find((card) => card.id === id);

  switch (card.section) {
    case 'todo':
      card.section = 'doing';
      break;
    case 'doing':
      if (move === 'left') {
        card.section = 'todo';
      } else {
        card.section = 'completed';
      }
      break;
    case 'completed':
      card.section = 'doing';
      break  
  }
this.render();
}

function render() {
  const todoCards = this.cards.filter((card) => card.section === 'todo');
  const doingCards = this.cards.filter((card) => card.section === 'doing');
  const completedCards = this.cards.filter((card) => card.section === 'completed');

  this.renderTotal(this.$todo.querySelector("small"), todoCards.length);
  this.renderCards(this.$todo.querySelector("ul"), todoCards);

  this.renderTotal(this.$doing.querySelector("small"), doingCards.length);
  this.renderCards(this.$doing.querySelector("ul"), doingCards);

  this.renderTotal(
    this.$completed.querySelector("small"),
    completedCards.length
  );
  this.renderCards(this.$completed.querySelector("ul"), completedCards);
}

function renderTotal(dom, total) {
  dom.textContent = `total ${total}`;
}

function renderCards(dom, cards) {
  const html = cards
    .map((card) => {
      return `
    <li>
      <span>${card.tag}</span>
      <p>${card.description}</p>
      <div>
        ${
          card.section === "todo"
            ? ""
            : `<button class="move" data-id="${card.id}" data-move="left">◀️</button>`
        }  
        ${
          card.section === "completed"
            ? ""
            : `<button class="move" data-id="${card.id}" data-move="right">▶️</button>`
        }  
        
      </div>
      <span>${card.createdAt}</span>
    </li>
  `;
    })
    .join("");

  dom.innerHTML = html;
}

const app = new App();


// Função para atualizar a contagem de cards em cada coluna
function atualizarContagem() {
  const toDoCount = document.querySelectorAll(".to-do-column .task").length;
  const doingCount = document.querySelectorAll(
    ".in-progress-column .task"
  ).length;
  const completedCount = document.querySelectorAll(".completed-column .task").length;

  document.getElementById("to-do-count").textContent = toDoCount;
  document.getElementById("in-progress-count").textContent = doingCount;
  document.getElementById("completed-count").textContent = completedCount;
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
