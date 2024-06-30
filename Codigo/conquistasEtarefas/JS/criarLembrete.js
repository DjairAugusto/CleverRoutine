const form = document.getElementById("lembreteForm");
const tituloInput = document.querySelector("#titulo-lembrete");
const localInput = document.querySelector("#local-lembrete");
const horarioEdiaInput = document.querySelector("#horario-lembrete");
const prioridadeInputs = document.querySelectorAll("input[name='prioridade']");
const descricaoInput = document.querySelector("#descricao-lembrete");

function salvar() {
    let lembrete = {};
    lembrete.id = obterID();
    lembrete.titulo = tituloInput.value.trim();
    lembrete.local = localInput.value.trim();
    lembrete.horarioEdia = horarioEdiaInput.value.trim();
    lembrete.prioridade = obterPrioridadeSelecionada();
    lembrete.descricao = descricaoInput.value.trim();

    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    lembretes.push(lembrete);
    localStorage.setItem("lembretes", JSON.stringify(lembretes));

    form.reset();
    window.location.href = "lembretes.html";
}

function obterID() {
    let id = parseInt(localStorage.getItem("id")) || 0;
    id += 1;
    localStorage.setItem("id", id);
    return id;
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
        salvar();
    } else {
        form.reportValidity();
    }
});
