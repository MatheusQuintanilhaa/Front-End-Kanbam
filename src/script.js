// // Drag and Drop adicionados
// // document.querySelectorAll("drag-list").forEach((card) => {
// //   card.addEventListener("dragstart", (e) => {
// //     e.currentTarget.classList.add("dragging");
// //   });

// //   card.addEventListener("dragend", (e) => {
// //     e.currentTarget.classList.remove("dragging");
// //   });
// // });

// // document.querySelectorAll("drag-column").forEach((column) => {
// //   column.addEventListener("dragover", (e) => {
// //     e.preventDefault();
// //     e.currentTarget.classList.add("cards-hover");
// //   });

// //   column.addEventListener("dragleave", (e) => {
// //     e.currentTarget.classList.remove("cards-hover");
// //   });
// //   column.addEventListener("drop", (e) => {
// //     const dragCard = document.querySelector(".drag-list.dragging");
// //     e.currentTarget.appendChild(dragCard);
// //   });
// // });

// class App {
//   constructor() {
//     this.$todo = document.querySelector('#todo ul');
//     this.$doing = document.querySelector('#doing ul');
//     this.$completed = document.querySelector('#completed ul');
//     this.cards = [];
//     this.loadCards(); // Carregar os cards que foram armazenados no localStorage
//   }

//   // Função que carrega os cards armazenados no localStorage
//   loadCards() {
//     const carregaCards = JSON.parse(localStorage.getItem('cards'));
//     if (carregaCards) {
//       this.cards = carregaCards;
//       this.render();
//     }
//   }

//   // Função que Salva os cards no localStorage
//   salvarCards() {
//     localStorage.setItem('cards', JSON.stringify(this.cards));
//   }

//   // Renderizar os cards
//   render() {
//     const todoCards = this.cards.filter((card) => card.section === 'todo');
//     const doingCards = this.cards.filter((card) => card.section === 'doing');
//     const completedCards = this.cards.filter((card) => card.section === 'completed');

//     // Renderiza os totais
//     this.renderTotal(this.$todo.closest('section').querySelector("small"), todoCards.length);
//     this.renderCards(this.$todo, todoCards);

//     this.renderTotal(this.$doing.closest('section').querySelector("small"), doingCards.length);
//     this.renderCards(this.$doing, doingCards);

//     this.renderTotal(this.$completed.closest('section').querySelector("small"), completedCards.length);
//     this.renderCards(this.$completed, completedCards);

//     this.salvarCards(); // Salvar cards no localStorage após renderizar
//   }

//   // Renderiza o total de cards
//   renderTotal(dom, total) {
//     if (dom) {
//       dom.textContent = `total ${total}`;
//     }
//   }

//   // Renderiza os cards em um container específico
//   renderCards(dom, cards) {
//     const html = cards
//       .map((card) => {
//         return `
//       <li>
//         <span>${card.tag}</span>
//         <p>${card.description}</p>
//         <div>
//           ${
//             card.section === "todo"
//               ? ""
//               : `<button class="move" data-id="${card.id}" data-move="left">◀️</button>`
//           }  
//           ${
//             card.section === "completed"
//               ? ""
//               : `<button class="move" data-id="${card.id}" data-move="right">▶️</button>`
//           }  
//         </div>
//         <span>${card.createdAt}</span>
//       </li>
//     `;
//       })
//       .join("");

//     dom.innerHTML = html;
//   }

//   // Adiciona um novo card
//   addCard(tag, description, section) {
//     const newCard = {
//       id: this.cards.length + 1,
//       tag,
//       description,
//       section,
//       createdAt: new Date().toLocaleString(),
//     };
//     this.cards.push(newCard);
//     this.render();
//   }

//   // Move um card entre as seções
//   moveCard(id, move) {
//     const card = this.cards.find((card) => card.id === id);
//     if (!card) return;

//     switch (card.section) {
//       case 'todo':
//         card.section = 'doing';
//         break;
//       case 'doing':
//         card.section = move === 'left' ? 'todo' : 'completed';
//         break;
//       case 'completed':
//         card.section = 'doing';
//         break;
//     }
//     this.render();
//   }
// }

// // Instância da classe App
// const app = new App();

// // Adiciona evento para o botão de nova tarefa
// const modaisAbrir = document.querySelectorAll('.add-card');
// const modal = document.getElementById('modal');
// const botaoFechar = document.querySelector('.close');
// const botaoSalvar = document.getElementById('salvarTarefa');
// const inputNomeTarefa = document.getElementById('nomeTarefa');
// let listaAtual;

// function abrirModal(event) {
//   modal.style.display = 'flex';
//   inputNomeTarefa.value = '';

//   const section = event.target.closest('section');
//   listaAtual = section.querySelector('ul');
// }

// function fecharModal() {
//   modal.style.display = 'none';
// }

// // Função para salvar uma nova tarefa
// function salvarTarefa() {
//   const nomeTarefa = inputNomeTarefa.value.trim();

//   if (nomeTarefa && listaAtual) {
//     const section = listaAtual.closest('section').id; // Obtém a seção atual (todo, doing ou completed)
//     app.addCard(nomeTarefa, "Descrição da tarefa", section); // Adiciona o card ao app

//     fecharModal();
//   } else {
//     alert('Por favor, insira o nome da tarefa.');
//   }
// }

// modaisAbrir.forEach(botao => {
//   botao.addEventListener('click', abrirModal);
// });

// botaoFechar.addEventListener('click', fecharModal);
// botaoSalvar.addEventListener('click', salvarTarefa);

// window.addEventListener('click', function (event) {
//   if (event.target === modal) {
//     fecharModal();
//   }
// });

// // Mover card
// function onMove(event) {
//   const button = event.target.closest('button');
//   if (!button) {
//     return;
//   }

//   const id = +button.dataset.id;
//   const move = button.dataset.move;
//   app.moveCard(id, move);
// }

// document.addEventListener('click', onMove); // Adiciona evento de clique ao documento

// // Função para atualizar a contagem de cards em cada coluna
// function atualizarContagem() {
//   const toDoCount = document.querySelectorAll(".to-do-column .task").length;
//   const doingCount = document.querySelectorAll(
//     ".in-progress-column .task"
//   ).length;
//   const completedCount = document.querySelectorAll(".completed-column .task").length;

//   document.getElementById("to-do-count").textContent = toDoCount;
//   document.getElementById("in-progress-count").textContent = doingCount;
//   document.getElementById("completed-count").textContent = completedCount;
// }

// // Função assíncrona para carregar os usuários da API e exibi-los
// async function carregarUsuarios() {
//   try {
//     const response = await fetch(
//       "https://gist.githubusercontent.com/MatheusQuintanilhaa/d008a9b0ce7f621ac9cfffca90900c43/raw/4f9850b5ad9917a48e3cc0939cd168c25bd4fcb1/users"
//     );

//     if (!response.ok) {
//       throw new Error("Erro na rede: " + response.status);
//     }

//     const usuarios = await response.json();
//     const userList = document.getElementById("user-list");

//     userList.innerHTML = "";

//     usuarios.forEach((usuario) => {
//       const img = document.createElement("img");
//       img.src = usuario.foto;
//       img.alt = usuario.nome;
//       img.classList.add("team-photo");
//       img.id = `usuario${usuario.id}`;

//       const nome = document.createElement("p");
//       nome.textContent = usuario.nome;

//       const figure = document.createElement("figure");
//       figure.appendChild(img);

//       const userContainer = document.createElement("div");
//       userContainer.appendChild(figure);
//       userContainer.appendChild(nome);

//       userList.appendChild(userContainer);

//       img.addEventListener("click", (event) => {
//         const teamPhoto = document.querySelectorAll(".team-photo");

//         teamPhoto.forEach((photo) => {
//           photo.parentNode.classList.remove("selected");
//         });

//         event.target.parentNode.classList.add("selected");

//         document.getElementById(
//           "selected-user-name"
//         ).textContent = `Usuário Selecionado: ${usuario.nome}`;
//       });
//     });

//     if (usuarios.length > 0) {
//       const firstUser = usuarios[0];
//       const firstImage = document.querySelector(`img[src="${firstUser.foto}"]`);

//       if (firstImage) {
//         firstImage.parentNode.classList.add("selected");

//         document.getElementById(
//           "selected-user-name"
//         ).textContent = `Usuário Selecionado: ${firstUser.nome}`;
//       }
//     }
//   } catch (error) {
//     console.error("Erro ao carregar usuários:", error);
//   }
// }

// // Carrega os usuários da API ao carregar a página
// window.onload = () => {
//   carregarUsuarios();
//   atualizarContagem();
// };



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
    this.loadCards(); // Carregar os cards que foram armazenados no localStorage
  }

  // Função que carrega os cards armazenados no localStorage
  loadCards() {
    const carregaCards = JSON.parse(localStorage.getItem('cards'));
    if (carregaCards) {
      this.cards = carregaCards;
      this.render();
    }
  }

  // Função que Salva os cards no localStorage
  salvarCards() {
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  // Renderizar os cards com filtro
  render() {
    // Aplica o filtro de categoria e usuário, se existirem
    const filteredCards = this.cards.filter((card) => {
      const matchCategoria = filtroCategoria ? card.tag === filtroCategoria : true;
      const matchUsuario = usuarioSelecionado ? card.usuario.nome === usuarioSelecionado.nome : true;
      return matchCategoria && matchUsuario;
    });

    const todoCards = filteredCards.filter((card) => card.section === 'todo');
    const doingCards = filteredCards.filter((card) => card.section === 'doing');
    const completedCards = filteredCards.filter((card) => card.section === 'completed');

    // Renderiza os totais
    this.renderTotal(this.$todo.closest('section').querySelector("small"), todoCards.length);
    this.renderCards(this.$todo, todoCards);

    this.renderTotal(this.$doing.closest('section').querySelector("small"), doingCards.length);
    this.renderCards(this.$doing, doingCards);

    this.renderTotal(this.$completed.closest('section').querySelector("small"), completedCards.length);
    this.renderCards(this.$completed, completedCards);

    this.salvarCards(); // Salvar cards no localStorage após renderizar
  }

  // Renderiza o total de cards
  renderTotal(dom, total) {
    if (dom) {
      dom.textContent = `total ${total}`;
    }
  }

  // Renderiza os cards em um container específico
  renderCards(dom, cards) {
    const html = cards
      .map((card) => {
        const usuario = card.usuario || { foto: '', nome: 'Usuário desconhecido' }; // Valor padrão para o usuário

        return `
      <li>
        <figure>
          <img src="${usuario.foto}" alt="${usuario.nome}" class="card-user-photo"/>
        </figure>
        <span>${card.tag}</span> <!-- Exibe a tag no card -->
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

  // Adiciona um novo card
  addCard(tag, description, section) {
    if (!usuarioSelecionado) {
      alert("Por favor, selecione um usuário antes de criar um card.");
      return;
    }

    const newCard = {
      id: this.cards.length + 1,
      tag,
      description,
      section,
      createdAt: new Date().toLocaleString(),
      usuario: usuarioSelecionado // Adiciona o usuário selecionado
    };
    
    this.cards.push(newCard);
    this.render();
  }

  // Move um card entre as seções
  moveCard(id, move) {
    const card = this.cards.find((card) => card.id === id);
    if (!card) return;

    switch (card.section) {
      case 'todo':
        card.section = 'doing';
        break;
      case 'doing':
        card.section = move === 'left' ? 'todo' : 'completed';
        break;
      case 'completed':
        card.section = 'doing';
        break;
    }
    this.render();
  }
}

// Instância da classe App
const app = new App();

// Adiciona evento para o botão de nova tarefa
const modaisAbrir = document.querySelectorAll('.add-card');
const modal = document.getElementById('modal');
const botaoFechar = document.querySelector('.close');
const botaoSalvar = document.getElementById('salvarTarefa');
const inputNomeTarefa = document.getElementById('nomeTarefa');
const selectCategoria = document.getElementById('categoria'); // Caixa de seleção
let listaAtual;
let usuarioSelecionado = null; // Armazena o usuário selecionado
let filtroCategoria = ''; // Armazena a categoria selecionada

// Adiciona eventos de clique para os filtros de categoria (Frontend, Backend, UX)
document.querySelectorAll('#tag-filter li').forEach(filtro => {
  filtro.addEventListener('click', function() {
    filtroCategoria = this.getAttribute('data-tag'); // Obtém a categoria clicada
    app.render(); // Re-renderiza os cards aplicando o filtro
  });
});

function abrirModal(event) {
  modal.style.display = 'flex';
  inputNomeTarefa.value = '';

  const section = event.target.closest('section');
  listaAtual = section.querySelector('ul');
}

function fecharModal() {
  modal.style.display = 'none';
}

// Função para salvar uma nova tarefa
function salvarTarefa() {
  const nomeTarefa = inputNomeTarefa.value.trim();
  const categoria = selectCategoria.value; // Obtém o valor selecionado na caixa de seleção

  if (nomeTarefa && listaAtual) {
    if (!usuarioSelecionado) {
      alert("Por favor, selecione um usuário antes de criar o card.");
      return;
    }

    const section = listaAtual.closest('section').id; // Obtém a seção atual (todo, doing ou completed)
    app.addCard(categoria, nomeTarefa, section); // Adiciona o card ao app com a tag selecionada

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

// Mover card
function onMove(event) {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const id = +button.dataset.id;
  const move = button.dataset.move;
  app.moveCard(id, move);
}

document.addEventListener('click', onMove); // Adiciona evento de clique ao documento

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

    if (!response.ok) {
      throw new Error("Erro na rede: " + response.status);
    }

    const usuarios = await response.json();
    const userList = document.getElementById("user-list");

    userList.innerHTML = "";

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

      img.addEventListener("click", (event) => {
        const teamPhoto = document.querySelectorAll(".team-photo");

        teamPhoto.forEach((photo) => {
          photo.parentNode.classList.remove("selected");
        });

        event.target.parentNode.classList.add("selected");

        usuarioSelecionado = { nome: usuario.nome, foto: usuario.foto };

        document.getElementById(
          "selected-user-name"
        ).textContent = `Usuário Selecionado: ${usuario.nome}`;
      });
    });

    if (usuarios.length > 0) {
      const firstUser = usuarios[0];
      const firstImage = document.querySelector(`img[src="${firstUser.foto}"]`);

      if (firstImage) {
        firstImage.parentNode.classList.add("selected");

        usuarioSelecionado = { nome: firstUser.nome, foto: firstUser.foto };

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