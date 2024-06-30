const lembreteList = document.querySelector("#lembrete-list");

function carregarLembretes() {
    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

    lembreteList.innerHTML = ''; 

    for (let i = 0; i < lembretes.length; i++) {
        const lembrete = lembretes[i];
        const lembreteDiv = criarLembreteDiv(lembrete);
        lembreteList.appendChild(lembreteDiv);
    }
}

function criarLembreteDiv(lembrete) {
    const lembreteDiv = document.createElement("div");
    lembreteDiv.className = "lembrete";
    lembreteDiv.id = `lembrete-${lembrete.id}`;

    if (lembrete.concluido) {
        lembreteDiv.classList.add("concluido");
    }

    const idDiv = criarCampoDiv("ID", lembrete.id);
    const tituloDiv = criarCampoDiv("Título", lembrete.titulo);
    const localDiv = criarCampoDiv("Local", lembrete.local);
    const dataDiv = criarCampoDiv("Data", lembrete.horarioEdia);
    const prioridadeDiv = criarCampoDiv("Prioridade", lembrete.prioridade);
    const descricaoDiv = criarCampoDiv("Descrição", lembrete.descricao);
    const acoesDiv = criarBotoesAcao(lembrete.id);

    lembreteDiv.appendChild(idDiv);
    lembreteDiv.appendChild(tituloDiv);
    lembreteDiv.appendChild(localDiv);
    lembreteDiv.appendChild(dataDiv);
    lembreteDiv.appendChild(prioridadeDiv);
    lembreteDiv.appendChild(descricaoDiv);
    lembreteDiv.appendChild(acoesDiv);

    return lembreteDiv;
}

function criarCampoDiv(label, value) {
    const campoDiv = document.createElement("div");
    const campoLabel = document.createElement("div");
    campoLabel.classList.add("strong");
    campoLabel.innerText = `${label}: `;
    const campoValue = document.createElement("div");
    campoValue.classList.add("span");
    campoValue.innerText = value;
    campoDiv.appendChild(campoLabel);
    campoDiv.appendChild(campoValue);
    return campoDiv;
}

function criarBotao(rotulo) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.innerText = rotulo;
    return botao;
}

function criarBotoesAcao(id) {
    const acoesDiv = document.createElement("div");
    acoesDiv.className = "acoes";

    const visualizarButton = criarBotao("Visualizar");
    const editarButton = criarBotao("Editar");
    const excluirButton = criarBotao("Excluir");
    const concluirButton = criarBotao("Concluir"); 

    visualizarButton.addEventListener("click", () => visualizarLembrete(id));
    editarButton.addEventListener("click", () => editarLembrete(id));
    excluirButton.addEventListener("click", () => excluirLembrete(id));
    concluirButton.addEventListener("click", () => completarTarefa(id));

    acoesDiv.appendChild(visualizarButton);
    acoesDiv.appendChild(editarButton);
    acoesDiv.appendChild(excluirButton);
    acoesDiv.appendChild(concluirButton); 

    return acoesDiv;
}

function visualizarLembrete(id) {
    sessionStorage.setItem("idLembrete", id);
    window.location.href = "verLembrete.html";
}

function editarLembrete(id) {
    sessionStorage.setItem("idLembrete", id);
    window.location.href = "editarLembrete.html";
}

function excluirLembrete(id) {
    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    const lembreteIndex = buscarLembrete(id, lembretes);

    if (lembreteIndex > -1) {
        const confirmacao = confirm("Deseja Excluir esse Lembrete?");
        if (confirmacao) {
            lembretes.splice(lembreteIndex, 1);
            localStorage.setItem("lembretes", JSON.stringify(lembretes));
            document.getElementById(`lembrete-${id}`).remove();
        }
    }
}

window.completarTarefa = function (id) {
    let lembretes = JSON.parse(localStorage.getItem('lembretes')) || [];

    const lembreteIndex = buscarLembrete(id, lembretes);
    if (lembreteIndex > -1 && !lembretes[lembreteIndex].concluido) {
        lembretes[lembreteIndex].concluido = true;
        localStorage.setItem('lembretes', JSON.stringify(lembretes));

        
        const lembreteDiv = document.getElementById(`lembrete-${id}`);
        if (lembreteDiv) {
            lembreteDiv.classList.add("concluido");
        }

       
        let tarefasConcluidas = Number(localStorage.getItem('tarefasConcluidas')) || 0;
        tarefasConcluidas++;
        localStorage.setItem('tarefasConcluidas', tarefasConcluidas);

        
        verificarConquistas();

        
        armazenarConcluidoSessionStorage(lembreteIndex);
    }
}

function verificarConquistas() {
    if (tarefasConcluidas >= 5 && !conquista5Exibida) {
        adicionarMensagemConquista("Parabéns! Você concluiu 5 tarefas.");
        conquista5Exibida = true;
        localStorage.setItem('conquista5Exibida', true);
    }
    if (tarefasConcluidas >= 10 && !conquista10Exibida) {
        adicionarMensagemConquista("Parabéns! Você concluiu 10 tarefas.");
        conquista10Exibida = true;
        localStorage.setItem('conquista10Exibida', true);
    }
}

function adicionarMensagemConquista(mensagem) {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = 'ConquistaCard mensagem-conquista';
    mensagemDiv.textContent = mensagem;

    const conquistasAdquiridas = document.getElementById('conquistasAdquiridas');
    conquistasAdquiridas.appendChild(mensagemDiv);
}

function buscarLembrete(id, lembretes) {
    return lembretes.findIndex(lembrete => lembrete.id === id);
}

window.addEventListener("load", carregarLembretes);
