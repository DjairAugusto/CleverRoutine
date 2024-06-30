document.addEventListener('DOMContentLoaded', carregarTarefas);

function exibirDetalhesTarefa(tarefa) {
    const modal = new bootstrap.Modal(document.getElementById('taskDetailModal'));
    const taskDetailBody = document.getElementById('taskDetailBody');
    taskDetailBody.innerHTML = `<p>${tarefa.innerText}</p>`;
    modal.show();
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
        verificarConquistas(tarefasConcluidas);
        armazenarConcluidoSessionStorage(lembreteIndex);
    }
}

function verificarConquistas(tarefasConcluidas) {
    const conquistas = [
        { id: 'trofeu1', requiredTarefas: 5, image: '/conquistasEtarefas/Trpys/trpmadeira.png' },
        { id: 'trofeu2', requiredTarefas: 10, image: '/conquistasEtarefas/Trpys/trpcobre.png' },
        { id: 'trofeu3', requiredTarefas: 20, image: '/conquistasEtarefas/Trpys/trpbronze.png' },
        { id: 'trofeu4', requiredTarefas: 30, image: '/conquistasEtarefas/Trpys/trpprata.png' },
        { id: 'trofeu5', requiredTarefas: 40, image: '/conquistasEtarefas/Trpys/trpouro.png' },
        { id: 'trofeu6', requiredTarefas: 50, image: '/conquistasEtarefas/Trpys/trpdiamante.png' }
    ];

    conquistas.forEach(conquista => {
        if (tarefasConcluidas >= conquista.requiredTarefas) {
            const trofeuDiv = document.getElementById(conquista.id);
            trofeuDiv.innerHTML = `
                <div class="trofeu-inner">
                    <img src="${conquista.image}" alt="Troféu desbloqueado">
                    <div class="progress bg-secondary">
                        <div class="progress-bar" style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            `;
            trofeuDiv.classList.remove('locked');
            trofeuDiv.querySelector('.lock-icon').classList.remove('bi-lock-fill');
            trofeuDiv.querySelector('.lock-icon').classList.add('bi-unlock-fill');
        }
    });
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

function armazenarConcluidoSessionStorage(lembreteIndex) {
    let concluidos = JSON.parse(sessionStorage.getItem('concluidos')) || [];
    if (!concluidos.includes(lembreteIndex)) {
        concluidos.push(lembreteIndex);
        sessionStorage.setItem('concluidos', JSON.stringify(concluidos));
    }
}

function carregarLembretes() {
    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    const lembreteList = document.getElementById('lembreteList');
    lembreteList.innerHTML = '';
    for (let i = 0; i < lembretes.length; i++) {
        const lembrete = lembretes[i];
        const lembreteDiv = criarLembreteDiv(lembrete);
        lembreteList.appendChild(lembreteDiv);
    }
}

if (!localStorage.getItem('lembretes')) {
    localStorage.setItem('lembretes', JSON.stringify(tasks));
}

function carregarTarefas() {
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    calendarioData = JSON.parse(localStorage.getItem('lembretes')) || [];
    let tarefasConcluidas = calendarioData.filter(tarefa => tarefa.concluida).length;

    todoList.innerHTML = '';
    doneList.innerHTML = '';
    calendarioData.forEach((tarefa, index) => {
        const tarefaLi = document.createElement('li');
        tarefaLi.innerHTML = `
            <span class="task-name">${tarefa.titulo}</span>
            <button onclick="verDetalhes(${index})">Ver Detalhes</button>
            <button onclick="concluirTarefa(${index}, this)">Concluir</button>
        `;
        if (tarefa.concluida) {
            tarefaLi.classList.add('done');
            tarefaLi.querySelector('button:last-child').textContent = 'Desmarcar';
            tarefaLi.querySelector('button:last-child').setAttribute('onclick', `desmarcarTarefa(${index}, this)`);
            doneList.appendChild(tarefaLi);
        } else {
            todoList.appendChild(tarefaLi);
        }
    });

    verificarConquistas(tarefasConcluidas); // Verifica as conquistas ao carregar as tarefas
}

function verDetalhes(index) {
    const tarefa = calendarioData[index];
    const modalBody = document.getElementById('taskDetailBody');
    modalBody.innerHTML = `
        <p><strong>Dia:</strong> ${tarefa.horario}</p>
        <p><strong>Local:</strong> ${tarefa.local}</p>
        <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
        <p><strong>Anotação:</strong> ${tarefa.descricao}</p>
    `;
    const modal = new bootstrap.Modal(document.getElementById('taskDetailModal'));
    modal.show();
}

function concluirTarefa(index, button) {
    calendarioData[index].concluida = true;
    localStorage.setItem('lembretes', JSON.stringify(calendarioData));
    let tarefasConcluidas = calendarioData.filter(tarefa => tarefa.concluida).length;
    localStorage.setItem('tarefasConcluidas', tarefasConcluidas);
    button.textContent = 'Desmarcar';
    button.setAttribute('onclick', `desmarcarTarefa(${index}, this)`);
    button.parentElement.classList.add('done');
    document.getElementById('done-list').appendChild(button.parentElement);
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    verificarConquistas(tarefasConcluidas); // Verifica as conquistas ao concluir uma tarefa
}

function desmarcarTarefa(index, button) {
    calendarioData[index].concluida = false;
    localStorage.setItem('lembretes', JSON.stringify(calendarioData));
    let tarefasConcluidas = calendarioData.filter(tarefa => tarefa.concluida).length;
    localStorage.setItem('tarefasConcluidas', tarefasConcluidas);
    button.textContent = 'Concluir';
    button.setAttribute('onclick', `concluirTarefa(${index}, this)`);
    button.parentElement.classList.remove('done');
    document.getElementById('todo-list').appendChild(button.parentElement);
    verificarConquistas(tarefasConcluidas); // Verifica as conquistas ao desmarcar uma tarefa
}
