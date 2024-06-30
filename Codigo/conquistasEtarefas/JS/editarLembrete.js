let lembretes = [];
let lembrete = {};

const idInput = document.querySelector("#id-lembrete");
const form = document.getElementById("lembreteForm");
const tituloInput = document.querySelector("#titulo-lembrete");
const localInput = document.querySelector("#local-lembrete");
const horarioEdiaInput = document.querySelector("#horario-lembrete");
const prioridadeInputs = document.querySelectorAll("input[name='prioridade']");
const descricaoInput = document.querySelector("#descricao-lembrete");

function loadDadosFormulario() {
    const id = sessionStorage.getItem("idLembrete");
    lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

    lembrete = lembretes.find((d) => d.id == id);

    idInput.value = lembrete.id;
    tituloInput.value = lembrete.titulo;
    localInput.value = lembrete.local;
    horarioEdiaInput.value = lembrete.horarioEdia;
    prioridadeInputs.forEach(input => {
        if (input.value === lembrete.prioridade) {
            input.checked = true;
        }
    });
    descricaoInput.value = lembrete.descricao;
}

function buscarLembrete(id) {
    for (let i = 0; i < lembretes.length; i++) {
        if (lembretes[i].id == id)
            return i;
    }
    return -1;
}

function atualizar() {
    lembrete.titulo = tituloInput.value.trim();
    lembrete.local = localInput.value.trim();
    lembrete.horarioEdia = horarioEdiaInput.value.trim();
    lembrete.prioridade = obterPrioridadeSelecionada();
    lembrete.descricao = descricaoInput.value.trim();

    let indice = buscarLembrete(lembrete.id);

    lembretes[indice] = lembrete;

    localStorage.setItem("lembretes", JSON.stringify(lembretes));

    form.reset();
    window.location.href = "lembretes.html";
}

function obterPrioridadeSelecionada() {
    for (const input of prioridadeInputs) {
        if (input.checked) {
            return input.value;
        }
    }
    return null;
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    if (form.checkValidity()) {
        atualizar();
    } else {
        form.reportValidity();
    }
});

window.addEventListener("load", loadDadosFormulario);
