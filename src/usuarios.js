const lista = document.querySelector(".listasTasks");

const API = "https://gist.githubusercontent.com/marcelylobato/be7a632a10cd359b281237361155c338/raw/9ad081dec8dec048471c6092cbd0dc06e99e3adf/gistfile1.txt"

async function pegarDados() {
    const res = await fetch(API);
    return await res.json(); 
}

pegarDados().then(dados => {
    dados.forEach(dado => {
        lista.innerHTML += `<li>
        ${dado.nome}
        <img src="${dado.foto}" alt="">
        </li>`;
    });
});