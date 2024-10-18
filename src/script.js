
// Armazenar os dados no localStorage
function salvarDados(dados, chave) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// Carregar os dados do localStorage
function carregarDados(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}
