const getCurrentDate = () => new Date().toLocaleString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

class App {
  constructor() {
    this.$form = document.querySelector("#form");
    this.$todo = document.querySelector("#todo");
    this.$doing = document.querySelector("#doing");
    this.$completed = document.querySelector("#completed");
    this.$tags = document.querySelector("#tags");
    this.$responsibles = document.querySelector("#responsibles");
    this.filters = {
      tag: null,
      responsible: null,
    };
    this.responsibles = {};
    this.cards = [
      {
        id: 1,
        section: "todo",
        tag: "frontend",
        description: "Criar componente modal",
        createdAt: getCurrentDate(),
        responsible: 2,
      },
      {
        id: 2,
        section: "completed",
        tag: "backend",
        description: "Criar API de produtos",
        createdAt: getCurrentDate(),
        responsible: 1,
      },
      {
        id: 3,
        section: "doing",
        tag: "ux",
        description: "Fazer mocks das telas de login",
        createdAt: getCurrentDate(),
        responsible: 3,
      },
    ];
    this.currentEditId = null; // Variável para armazenar a ID do card em edição
    this.carregarUsuarios();
    this.eventListener();
    this.render();
  }

  async carregarUsuarios() {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/marcelylobato/412262e8ea312865637db6a01de306cc/raw/84610a469565b6ed30d1b7dd9b822eaade914ca2/users"
      );
      if (!response.ok) {
        throw new Error("Erro na rede: " + response.status);
      }
      const usuarios = await response.json();
      this.responsibles = usuarios.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      this.renderResponsibles();
      this.render();
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  eventListener() {
    this.$form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.$form);
      const values = Object.fromEntries(formData);

      if (!values.tag || !values.description || !values.responsible) {
        return;
      }

      const cardIndex = this.cards.findIndex((card) => card.id === this.currentEditId);
      
      if (cardIndex >= 0) {
        // Atualiza o card existente
        this.cards[cardIndex] = {
          ...this.cards[cardIndex],
          tag: values.tag,
          description: values.description,
          responsible: parseInt(values.responsible),
        };
        this.currentEditId = null; // Limpa a ID do card em edição
      } else {
        // Cria um novo card
        const card = {
          id: Date.now(),
          section: "todo",
          tag: values.tag,
          description: values.description,
          createdAt: getCurrentDate(),
          imageURL: values.imageURL || "",
          responsible: parseInt(values.responsible),
        };
        this.cards.push(card);
      }

      this.$form.reset();
      this.render();
    });

    this.$todo.addEventListener("click", (event) => {
      this.onMove(event);
      this.onDelete(event);
      this.onEdit(event);
    });

    this.$doing.addEventListener("click", (event) => {
      this.onMove(event);
      this.onDelete(event);
      this.onEdit(event);
    });

    this.$completed.addEventListener("click", (event) => {
      this.onMove(event);
      this.onDelete(event);
      this.onEdit(event);
    });

    this.$tags.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const tag = event.target.dataset.tag;
        this.filters.tag = tag === this.filters.tag ? null : tag;
        this.render();
      }
    });

    this.$responsibles.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const responsible = event.target.dataset.responsible;
        this.filters.responsible =
          responsible === this.filters.responsible ? null : responsible;
        this.render();
      }
    });

    // Adiciona o evento para remover todos os filtros
    document.querySelector("#removeFilters").addEventListener("click", () => {
      this.filters = {
        tag: null,
        responsible: null,
      };
      this.render();
    });
  }

  onMove(event) {
    const button = event.target.closest("button.move");
    if (!button) {
      return;
    }
    const id = +button.dataset.id;
    const move = button.dataset.move;
    const card = this.cards.find((card) => card.id === id);
    switch (card.section) {
      case "todo":
        card.section = "doing";
        break;
      case "doing":
        if (move === "left") {
          card.section = "todo";
        } else {
          card.section = "completed";
        }
        break;
      case "completed":
        card.section = "doing";
        break;
    }
    this.render();
  }

  onDelete(event) {
    const button = event.target.closest("button.delete");
    if (!button) {
      return;
    }
    const id = +button.dataset.id;
    this.cards = this.cards.filter((card) => card.id !== id);
    this.render();
  }

  onEdit(event) {
    const button = event.target.closest("button.edit");
    if (!button) {
      return;
    }
    const id = +button.dataset.id;
    const card = this.cards.find((card) => card.id === id);

    if (card) {
      this.currentEditId = card.id; // Armazena a ID do card em edição
      this.$form.querySelector('select[name="tag"]').value = card.tag;
      this.$form.querySelector('textarea[name="description"]').value = card.description;
      this.$form.querySelector('select[name="responsible"]').value = card.responsible;
    }
  }

  render() {
    this.renderTags();
    this.renderCards();
    this.updateCounts();
  }

  renderTags() {
    const tags = ["frontend", "backend", "ux"];
    const html = tags
      .map((tag) => {
        const className = this.filters.tag === tag ? "active" : "";
        return `<li data-tag="${tag}" class="${className}">${tag}</li>`;
      })
      .join("");
    this.$tags.innerHTML = html;
  }

  renderResponsibles() {
    const html = Object.entries(this.responsibles)
      .map(([key, value]) => {
        const className = this.filters.responsible === key ? "active" : "";
        return `<li data-responsible="${key}" class="${className}">${value.nome}</li>`;
      })
      .join("");
    this.$responsibles.innerHTML = html;
  }

  renderCards() {
    const filteredCards = this.cards.filter((card) => {
      const { tag, responsible } = this.filters;
      if (tag && responsible) {
        return card.tag === tag && card.responsible == responsible;
      }
      if (tag) {
        return card.tag === tag;
      }
      if (responsible) {
        return card.responsible == responsible;
      }
      return true;
    });

    const sections = {
      todo: this.$todo.querySelector("ul"),
      doing: this.$doing.querySelector("ul"),
      completed: this.$completed.querySelector("ul"),
    };

    Object.keys(sections).forEach((section) => {
      sections[section].innerHTML = "";
    });

    filteredCards.forEach((card) => {
      const user = this.responsibles[card.responsible];
      const li = document.createElement("li");
      li.className = card.tag;
      li.innerHTML = `
        <h3>${card.description}</h3>
        <p>${card.tag}</p>
        <img src="${user?.foto}" alt="${user?.nome}" width="42" height="42" />
        <p>${card.createdAt}</p>
        <div class="actions">
          <button class="move" data-id="${card.id}" data-move="left">👈</button>
          <button class="move" data-id="${card.id}" data-move="right">👉</button>
          <button class="edit" data-id="${card.id}">✏️</button>
          <button class="delete" data-id="${card.id}">🗑️</button>
        </div>
      `;
      sections[card.section].appendChild(li);
    });
  }

  updateCounts() {
    const toDoCount = this.cards.filter((card) => card.section === "todo").length;
    const doingCount = this.cards.filter((card) => card.section === "doing").length;
    const completedCount = this.cards.filter((card) => card.section === "completed").length;

    document.querySelector("#todoCount").textContent = toDoCount;
    document.querySelector("#doingCount").textContent = doingCount;
    document.querySelector("#completedCount").textContent = completedCount;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
