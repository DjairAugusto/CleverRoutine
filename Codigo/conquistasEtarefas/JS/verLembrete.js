const titulo = document.querySelector("#titulo-lembrete");
const local = document.querySelector("#local-lembrete");
const horario = document.querySelector("#horario-lembrete");
const descricao = document.querySelector("#descricao-lembrete");
const prioridade = document.querySelector("#prioridade-lembrete");

function verDetalhes() {

    const id = sessionStorage.getItem("idLembrete");
    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    let lembrete = lembretes.find((d) => { return d.id == id});
    titulo.innerText = lembrete.titulo;
    local.innerText = lembrete.local;
    horario.innerText = lembrete.horarioEdia;
    descricao.innerText = lembrete.descricao;
    prioridade.innerText = lembrete.prioridade;
}

window.addEventListener("load", () => {

    verDetalhes();

});