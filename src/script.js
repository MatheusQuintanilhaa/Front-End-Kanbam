// Armazenar os dados no localStorage
function salvarDados(dados, chave) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// Carregar os dados do localStorage
function carregarDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

// Drag and Drop adicionados
document.querySelectorAll("drag-list").forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.currentTarget.classList.add("dragging");
  });

  card.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });
});

document.querySelectorAll("drag-column").forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("cards-hover");
  });

  // teste
  column.addEventListener("dragleave", (e) => {
    e.currentTarget.classList.remove("cards-hover");
  });
  column.addEventListener("drop", (e) => {
    const dragCard = document.querySelector(".drag-list.dragging");
    e.currentTarget.appendChild(dragCard);
  });
});

// teste
