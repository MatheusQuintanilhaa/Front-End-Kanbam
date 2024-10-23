
# 📄 Kanban - Santander Coders 2024


Projeto da Atividade Final do Módulo 4 do **Santander Coders 2024**.  Este projeto é a implementação de um quadro Kanban utilizando HTML, CSS e JavaScript, com a opção de Typescript, conforme os requisitos especificados no desafio.

## 📆 Comando da Atividade Final - Módulo 4
Este trabaho faz parte do Módulo 4 do programa Santander Coders 2024 e envolve a criação de um quadro Kanban conforme o modelo: 

<img src="./src/img/Kanban-modelo.png" alt="modelo do projeto" width="600">

##🛠️ Instruções de execução:

1. O projeto pode ser implementado com ferramentas como **Vite**, **Webpack** ou outros bundlers, mas isso é opcional.
2. O quadro Kanban pode ser feito diretamente com **HTML**, **CSS**, e **JavaScript**, em uma página única ou com arquivos separados.

## 📋 Desafio Explicado:

### Colunas

- O quadro deve conter 3 colunas:
  - **Todo**
  - **Doing**
  - **Completed**

- As colunas devem exibir um título, o total de cards e os cards dentro delas.

### Usuários

- Mostrar 4 usuários (id, nome, imagem) alimentados por uma API externa.
- Um usuário deve estar sempre selecionado.
- Deve ser possível alterar o usuário selecionado.

### Tags

- Utilizar 3 tags pré-definidas: `frontend`, `backend`, `ux`.
- As tags serão usadas na criação e filtragem dos cards.

### Cards

- Criar cards que devem ser vinculados a uma coluna, uma tag, e conter uma descrição e a data de criação.
- Novos cards devem ser criados automaticamente na coluna **Todo**.
- É necessário permitir a edição da descrição e tag de um card.
- Deve ser possível mover cards entre as colunas.
- Deve ser possível excluir um card.

### Filtros

- Exibir filtro por usuário e por tag.
- O filtro deve permitir alternar entre usuários e tags.
- Ao clicar em um filtro, exibir apenas os cards que atendam aos critérios selecionados.

### Salvamento

- O estado dos cards, usuário selecionado e filtros aplicados devem ser salvos no **localStorage** para persistência de dados.

## 🎯 Objetivos do Projeto

- Implementar uma interface funcional de quadro Kanban com todas as funcionalidades descritas.
- Usar boas práticas de desenvolvimento de software, como organização do código e manipulação eficiente do DOM.


✔️ Funcionalidades Implementadas:
 Exibição de 3 colunas (Todo, Doing, Completed).
 Manipulação de cards: criação, edição, movimentação e remoção.
 Filtros por usuário e por tag.
 Salvamento de dados no localStorage.

## 📈 Avaliação:

### Critérios de Avaliação:

1. **Organização do Código**: O código deve ser bem estruturado e legível.
2. **Boas Práticas**: Seguir práticas de programação, como DRY e modulação de código.
3. **Requisitos Atendidos**: Todos os requisitos especificados no desafio devem ser implementados.
4. **Avaliação dos Colegas**: 30% da nota será feita pela média das avaliações dos colegas.

### Critérios das Avaliações dos Colegas:

1. **Participação Ativa**: Como o colega contribuiu nas discussões e na execução das tarefas?
2. **Compromisso e Pontualidade**: O colega foi responsável e pontual nas entregas e reuniões?
3. **Qualidade das Entregas**: O trabalho que o colega entregou foi de boa qualidade?

## 💻 Tecnologias Utilizadas:

- **HTML5**: Estruturação das páginas e componentes.
- **CSS3**: Estilização da interface do usuário.
- **JavaScript**: Manipulação básica do DOM.
- **localStorage**: Persistência de dados no navegador.
- **API**: Consumo de dados para alimentar a lista de usuários.

## 🗂️ Estrutura do Projeto

📦 kanban-project 
┣ 📂src
┃┣ img 
┃┗📜 index.html 
┃┗📜 styles.css 
┣📜 README.md 
┗📜.gitignore

## 🚀 Projeto Finalizado

<img src="./src/img/kanbam-finalizado.png" alt="projeto finalizado" width="600">

## 🔗 https://marcelylobato.github.io/Front-End-JS-DOM/


## 👥 Equipe de Desenvolvimento
Este projeto foi desenvolvido por:

- **[Cezanilton Silva](https://github.com/Cezaniltom/)**
- **[Karolyne Carvalho](https://github.com/KarolyneC)**
- **[Marcely Lobato](https://github.com/marcelylobato/)**
- **[Matheus Quintanilha](https://github.com/MatheusQuintanilhaa)**


Orientado pelo professor **[Palmer Oliveira](https://github.com/expalmer)** como parte do programa Santander Coders 2024.



## 🔗 Links Úteis

- [API de Armazenamento na Web](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API)
- [Manipulando o DOM](http://devfuria.com.br/javascript/dom-manipulando-o-dom/)

- [Gist](https://gist.github.com/)

Esse README fornece uma descrição clara do projeto, suas funcionalidades e como ele pode ser executado, além de incluir os critérios de avaliação.
